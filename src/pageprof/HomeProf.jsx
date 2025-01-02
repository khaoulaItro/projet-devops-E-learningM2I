import React, { useState, useEffect } from "react";
import Topbarprof from "./Topbarprof";

// Carousel Component
const ImageCarousel = () => {
    const [currentIndex, setCurrentIndex] = useState(0);

    const images = [
        "/images/TS.jpg",
        "/images/ts9.png",
        "/images/TS8.jpg",
        "/images/TE2.jpeg",
        "/images/ts8.gif",
        "/images/TS4.jpg",
        "/images/TS5.png",
        "/images/TS6.jpg",
        "/images/ts10.png",
    ];

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
        }, 3000);
        return () => clearInterval(interval);
    }, []);

    return (
        <div
            className="carousel-container"
            style={{
                position: "relative",
                width: "100%",
                maxWidth: "600px",
                height: "300px",
                margin: "0 auto",
                borderRadius: "20px",
                overflow: "hidden",
                boxShadow: "0 10px 30px rgba(0, 0, 0, 0.2)",
            }}
        >
            {images.map((image, index) => (
                <img
                    key={index}
                    src={process.env.PUBLIC_URL + image}
                    alt={`Slide ${index + 1}`}
            style={{
                width: "100%",
                height: "100%",
                objectFit: "cover",
                opacity: currentIndex === index ? 1 : 0,
                position: "absolute",
                top: 0,
                left: 0,
                transition: "opacity 1s ease-in-out",
            }}
        />
      ))}
            <div
                style={{
                    position: "absolute",
                    bottom: "10px",
                    left: "50%",
                    transform: "translateX(-50%)",
                    display: "flex",
                    gap: "10px",
                }}
            >
                {images.map((_, index) => (
                    <span
                        key={index}
                        onClick={() => setCurrentIndex(index)}
                        style={{
                            width: "12px",
                            height: "12px",
                            borderRadius: "50%",
                            backgroundColor: currentIndex === index ? "#007bff" : "#ddd",
                            cursor: "pointer",
                            transition: "background-color 0.3s",
                        }}
                    ></span>
                ))}
            </div>
        </div>
    );
};

// Main HomeProf Component
const HomeProf = () => {
    return (

        <div
            id="wrapper"
            style={{
                display: "flex",
                flexDirection: "row",
                fontFamily: "'Poppins', sans-serif",
                backgroundColor: "#f9f9f9",
                minHeight: "100vh",
            }}
        >

            <div id="content-wrapper" className="d-flex flex-column flex-grow-1">

                <Topbarprof />
                <div
                    id="content"
                    style={{
                        padding: "20px",
                        marginTop: "20px",
                    }}
                >
                    {/* Header Section */}
                    <div
                        style={{
                            display: "flex",
                            justifyContent: "center",
                            alignItems: "center",
                            backgroundColor: "rgba(97, 165, 194, 0.6)",
                            color: "#fff",
                            padding: "30px",
                            borderRadius: "20px",
                            boxShadow: "0 8px 20px rgba(0, 123, 255, 0.2)",
                            marginBottom: "40px",
                        }}
                    >
                        <img
                            src={process.env.PUBLIC_URL + "/img1.png"}
                            alt="Icon Left"
                            style={{ maxHeight: "120px", marginRight: "20px" }}
                        />
                        <h1 style={{ fontWeight: "700", fontSize: "2.2rem", margin: 0 }}>
                            L'Espace de Partage & Formation
                        </h1>
                        <img
                            src={process.env.PUBLIC_URL + "/img2.png"}
                            alt="Icon Right"
                            style={{ maxHeight: "120px", marginLeft: "20px" }}
                        />
                    </div>

                    {/* Statistics Cards */}
                    <div className="row" style={{ marginBottom: "40px", gap: "20px", justifyContent: "center" }}>
                        {[
                            { title: "Cours", count: 12, color: "#28a745" },
                            { title: "TP", count: 10, color: "#ffc107" },
                            { title: "TD", count: 8, color: "#17a2b8" },
                        ].map((card, index) => (
                            <div
                                className="col-md-4"
                                key={index}
                                style={{
                                    flex: "1",
                                    maxWidth: "300px",
                                    padding: "8px",
                                    borderRadius: "20px",
                                    backgroundColor: "#fff",
                                    textAlign: "center",
                                    borderLeft: `5px solid ${card.color}`,
                            boxShadow: "0 4px 15px rgba(0, 0, 0, 0.1)",
                }}
              >
                        <h4
                            style={{
                                fontWeight: "600",
                                marginBottom: "15px",
                                color: card.color,
                            }}
                        >
                            {card.title}
                        </h4>
                        <h2 style={{ fontSize: "2.5rem", margin: "0", color: "#333" }}>
                            {card.count}
                        </h2>
                    </div>
            ))}
                </div>

                {/* Main Content Section */}
                <div style={{
                    display: "flex",
                    alignItems: "stretch",
                    justifyContent: "center",
                    gap: "30px",
                    marginTop: "40px",
                    flexWrap: "wrap"
                }}>
                    {/* Left Section - Informatics */}
                    <div
                        className="p-4 rounded"
                        style={{
                            backgroundColor: 'rgba(97, 165, 194, 0.6)',
                            width: '450px',
                            height: '300px',
                            display: 'flex',
                            flexDirection: 'column',
                            justifyContent: 'center'
                        }}
                    >
                        <div className="text-center">
                            <span style={{ fontSize: '5rem', marginBottom: '20px', display: 'block' }}>💻🤔</span>
                            <h3 style={{
                                marginTop: "20px",
                                fontWeight: "bold",
                                fontSize: "1.8rem",
                                color: "white",
                            }}>
                                Les principaux domaines de l'informatique
                            </h3>
                        </div>
                    </div>

                    {/* Right Section - Carousel */}
                    <div style={{ width: '650px' }}>
                        <ImageCarousel />
                    </div>
                </div>
            </div>
        </div>
    </div >
  );
};

export default HomeProf;