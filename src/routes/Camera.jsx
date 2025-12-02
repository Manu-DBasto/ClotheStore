import React, { useRef, useState } from "react";

export const Camera = () => {
    const videoRef = useRef(null);
    const [profilePicture, setprofilePicture] = useState("");
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
            imgElement.width = 50;
            imgElement.height = 50;
            document.body.appendChild(imgElement);
            setprofilePicture(imgURL);
        } catch (error) {
            console.error("takePhoto() error:", error);
        }
    };

    return (
        <>
            <nav className="navbar bg-body-tertiary">
                <div className="container d-flex justify-content-between">
                    {profilePicture != "" ? (
                        <img src={profilePicture} height={50} width={50} />
                    ) : (
                        <img
                            src="images/placeholder/profile-holder.png"
                            height={50}
                            width={50}
                        />
                    )}

                    <h5>Perfil</h5>
                    <h3>ClotheStore</h3>
                </div>
            </nav>

            <div className="p-2">
                <button
                    type="button"
                    className="btn btn-primary"
                    data-bs-toggle="modal"
                    data-bs-target="#exampleModal"
                >
                    Tomar foto
                </button>
                <div
                    className="modal fade"
                    id="exampleModal"
                    tabIndex="-1"
                    aria-labelledby="exampleModalLabel"
                    aria-hidden="true"
                >
                    <div className="modal-dialog">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h1
                                    className="modal-title fs-5"
                                    id="exampleModalLabel"
                                >
                                    Modal title
                                </h1>
                                <button
                                    type="button"
                                    className="btn-close"
                                    data-bs-dismiss="modal"
                                    aria-label="Close"
                                ></button>
                            </div>
                            <div className="modal-body">
                                <div className="p-2 d-flex gap-2 justify-content-center">
                                    <button
                                        className="btn btn-primary"
                                        onClick={useCamera}
                                    >
                                        Video
                                    </button>
                                    <button
                                        className="btn btn-success"
                                        onClick={takePhoto}
                                    >
                                        Tomar captura
                                    </button>
                                </div>
                                <div className="d-flex justify-content-center flex-column gap-2">
                                    <video
                                        className="bg-secondary"
                                        autoPlay
                                        ref={videoRef}
                                    ></video>
                                </div>
                                <script src="https://webrtc.github.io/adapter/adapter-latest.js"></script>
                            </div>
                            <div className="modal-footer">
                                <button
                                    type="button"
                                    className="btn btn-secondary"
                                    data-bs-dismiss="modal"
                                >
                                    Close
                                </button>
                                <button
                                    type="button"
                                    className="btn btn-primary"
                                >
                                    Save changes
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};
