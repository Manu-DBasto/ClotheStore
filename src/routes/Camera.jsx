import React, { useRef, useState } from "react";

export const Camera = () => {
    const videoRef = useRef(null);
    const canvas = useRef(null);
    const useCamera = async () => {
        try {
            const stream = await navigator.mediaDevices.getUserMedia({
                video: {
                    facingMode: "user",
                },
                audio: false,
            });
            const videoTracks = stream.getVideoTracks();
            const track = videoTracks[0];
            alert(`Getting video from: ${track.label}`);
            if (videoRef.current) {
                videoRef.current.srcObject = stream;
            }
            setTimeout(() => {
                track.stop();
            }, 3000);
        } catch (error) {
            console.error(error);
        }
    };
    const takePhoto = async () => {
        try {
            const stream = videoRef.current.srcObject;
            const track = stream.getVideoTracks()[0];
            const imageCapture = new ImageCapture(track);

            const blob = await imageCapture.takePhoto();
            console.log("Took photo:", blob);

            // Mostrar en un <img>
            const imgURL = URL.createObjectURL(blob);
            const imgElement = document.createElement("img");
            imgElement.src = imgURL;
            document.body.appendChild(imgElement); // o usar un ref en React
        } catch (error) {
            console.error("takePhoto() error:", error);
        }
    };

    return (
        <>
            <div className="p-2 d-flex gap-2 justify-content-center">
                <button className="btn btn-primary" onClick={useCamera}>
                    Video
                </button>
                <button className="btn btn-success" onClick={takePhoto}>
                    Tomar captura
                </button>
            </div>
            <div className="d-flex justify-content-center flex-column gap-2">
                <video className="bg-secondary" autoPlay ref={videoRef}></video>
                <canvas className="bg-secondary" ref={canvas}></canvas>
            </div>
            <script src="https://webrtc.github.io/adapter/adapter-latest.js"></script>
        </>
    );
};
