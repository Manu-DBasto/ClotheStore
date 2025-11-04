import mysql from "mysql2";
import dotenv from "dotenv";
import bcrypt from "bcrypt";

dotenv.config();

const pool = mysql
    .createPool({
        host: process.env.HOST,
        user: process.env.USER,
        password: process.env.PASSWORD,
        database: process.env.DATABASE,
    })
    .promise();

export async function getUsers() {
    const [users] = await pool.query(`SELECT * FROM users`);
    return users;
}

export async function getUserByEmail(email) {
    try {
        const [user] = await pool.query(`SELECT * FROM users WHERE email = ?`, [
            email,
        ]);
        if (user.length > 0) {
            return user;
        } else {
            console.error(`No user - email is not in database.`);
            throw new Error(
                "Su correo electrónico no se encuentra registrado."
            );
        }
    } catch (error) {
        console.error(
            `Failed getting user - It wasn't posible find the user with the introduced email.`,
            error
        );
        throw error;
    }
}

export async function logUser(email, password, ipAddress) {
    try {
        const [data] = await pool.query(`SELECT * FROM users WHERE email = ?`, [
            email,
        ]);
        if (data.length > 0) {
            const user = data[0];
            // const match = await bcrypt.compare(password, user.password);
            if (password === user.password) {
                return user;
            } else {
                console.error(`Failed Login - incorrect email or password.`);
                throw new Error(
                    "La contraseña o correo electrónico no coinciden."
                );
            }
        } else {
            console.error(`Failed login - Can't find email: ${email}.`);
            throw new Error("No fue posible encontrar su correo electrónico.");
        }
    } catch (error) {
        console.error(
            `Failed login - It wasn't posible to verify your data.`,
            error
        );
        throw error;
    }
}

export async function createUser(username, email, password) {
    try {
        const [existingUser] = await pool.query(
            `SELECT * FROM users WHERE email = ?`,
            [email]
        );

        if (existingUser.length > 0) {
            throw new Error("El correo electrónico ya existe.");
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        const [result] = await pool.query(
            `INSERT INTO users (username, email, password) VALUES (?, ?, ?)`,
            [username, email, password]
        );
        return result;
    } catch (error) {
        console.error("Error creating user:", error);
        throw error;
    }
}

export async function updateUser(id, username, email, role) {
    try {
        const [existingUser] = await pool.query(
            `SELECT * FROM users WHERE user_id = ?`,
            [id]
        );

        if (existingUser.length === 0) {
            throw new Error(
                "El usuario no ha sido encontrado. Intente más rarde."
            );
        }

        const [result] = await pool.query(
            `UPDATE users SET username = ?, email = ?, role = ? WHERE user_id = ?`,
            [username, email, role, id]
        );
        return result;
    } catch (error) {
        console.error("Error updating user:", error);
        throw error;
    }
}

export async function deleteUser(user_id) {
    try {
        // Eliminar el producto de la base de datos
        const [result] = await pool.query(
            `DELETE FROM users WHERE user_id = ?`,
            [user_id]
        );

        return result;
    } catch (error) {
        console.error("Error deleting user:", error);
        throw error;
    }
}
