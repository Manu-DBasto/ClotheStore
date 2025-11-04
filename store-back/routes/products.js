import mysql from "mysql2";
import dotenv from "dotenv";
import bcrypt from "bcrypt";
import fs from "fs";
import path from "path";

dotenv.config();

const pool = mysql
    .createPool({
        host: process.env.HOST,
        user: process.env.USER,
        password: process.env.PASSWORD,
        database: process.env.DATABASE,
    })
    .promise();

export async function getProducts(search = "") {
    let query = `  
        SELECT DISTINCT p.product_id, p.product_name, p.price, p.image, GROUP_CONCAT (tp.tag_id SEPARATOR ' , ') AS tag_ids
        FROM products p  
        LEFT JOIN tag_products tp ON p.product_id = tp.product_id  
        LEFT JOIN tags t ON tp.tag_id = t.tag_id  
        WHERE p.product_name LIKE ? OR t.tag LIKE ?
        GROUP BY
            p.product_id, p.product_name, p.price, p.image;`;

    const params = [`%${search}%`, `%${search}%`]; // Usar el mismo search para ambas condiciones

    try {
        const [products] = await pool.query(query, params);
        return products;
    } catch (error) {
        console.error(
            `Failed getting products - It wasn't possible to get data.`,
            error
        );
        throw error;
    }
}

export async function createProduct(product_name, price, imagePath, tags) {
    const connection = await pool.getConnection();
    try {
        await connection.beginTransaction();

        // Insertar producto
        const [result] = await connection.query(
            `INSERT INTO products (product_name, price, image) VALUES (?, ?, ?)`,
            [product_name, price, imagePath]
        );

        const productId = result.insertId;

        // Insertar etiquetas
        if (tags && tags.length > 0) {
            const tagValues = tags.map((tag) => [productId, tag]);
            await connection.query(
                `INSERT INTO tag_products (product_id, tag_id) VALUES ?`,
                [tagValues]
            );
        }

        await connection.commit();
        return { id: productId, product_name, price, imagePath, tags };
    } catch (error) {
        await connection.rollback();
        console.error("Error creando producto:", error);
        throw error;
    } finally {
        connection.release();
    }
}

export async function updateProduct(
    product_id,
    product_name,
    price,
    newImagePath,
    newTags
) {
    const connection = await pool.getConnection();
    try {
        await connection.beginTransaction();

        // 1. Obtener el producto actual para comparar
        const [currentProduct] = await connection.query(
            `SELECT * FROM products WHERE product_id = ?`,
            [product_id]
        );

        if (!currentProduct.length) {
            throw new Error("Producto no encontrado");
        }

        const current = currentProduct[0];

        // 2. Actualizar datos básicos (siempre)
        await connection.query(
            `UPDATE products SET product_name = ?, price = ? WHERE product_id = ?`,
            [product_name, price, product_id]
        );

        // 3. Actualizar imagen solo si se proporcionó una nueva
        if (newImagePath) {
            await connection.query(
                `UPDATE products SET image = ? WHERE product_id = ?`,
                [newImagePath, product_id]
            );
        }

        // 4. Actualizar tags solo si se indicó que cambiaron
        if (newTags) {
            // Eliminar tags antiguas
            await connection.query(
                `DELETE FROM tag_products WHERE product_id = ?`,
                [product_id]
            );

            // Insertar nuevas tags si hay
            if (newTags.length > 0) {
                const tagValues = newTags.map((tag) => [product_id, tag]);
                await connection.query(
                    `INSERT INTO tag_products (product_id, tag_id) VALUES ?`,
                    [tagValues]
                );
            }
        }

        await connection.commit();

        // 5. Obtener y retornar el producto actualizado
        const [updatedProduct] = await connection.query(
            `SELECT p.*, 
             (SELECT GROUP_CONCAT(tag_id) FROM tag_products WHERE product_id = p.product_id) AS tags
             FROM products p WHERE product_id = ?`,
            [product_id]
        );

        return {
            ...updatedProduct[0],
            tags: updatedProduct[0].tags
                ? updatedProduct[0].tags.split(",").map(Number)
                : [],
        };
    } catch (error) {
        await connection.rollback();
        console.error("Error actualizando producto:", error);
        throw error;
    } finally {
        connection.release();
    }
}

export async function deleteProduct(product_id) {
    try {
        // Obtener la ruta de la imagen antes de eliminar el producto
        const [product] = await pool.query(
            `SELECT image FROM products WHERE product_id = ?`,
            [product_id]
        );

        if (product.length === 0) {
            throw new Error("Producto no encontrado");
        }

        const imagePath = path.join(
            process.cwd(),
            "..",
            "public",
            product[0].image
        );

        // Eliminar el producto de la base de datos
        const [result] = await pool.query(
            `DELETE FROM products WHERE product_id = ?`,
            [product_id]
        );

        // Eliminar la imagen si el producto fue eliminado correctamente
        if (result.affectedRows > 0 && fs.existsSync(imagePath)) {
            fs.unlinkSync(imagePath);
        }

        return result;
    } catch (error) {
        console.error("Error deleting product:", error);
        throw error;
    }
}
