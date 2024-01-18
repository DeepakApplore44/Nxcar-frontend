import React, { useState } from "react";
import "./SpinSection.css";
import image1 from "../../assets/png/image1.png";
import image2 from "../../assets/png/image2.png";
import image3 from "../../assets/png/image3.png";
import image4 from "../../assets/png/image4.png";
import image5 from "../../assets/png/image5.png";
import image6 from "../../assets/png/image6.png";
import image7 from "../../assets/png/image7.png";
import TakeASpin from "../../assets/svg/TakeASpin.svg";
import LoginForm from "../../components/LoginForm/LoginForm";
import Navbar from "../../components/Navbar/Navbar";

const SpinSection = () => {
  const [openLoginForm, setOpenLoginForm] = useState(false);
  const [animateCards, setAnimateCards] = useState(false);
  const [moveText, setMoveText] = useState(false);
  const images = [image1, image2, image3, image4, image5, image6, image7];

  const handleGetStarted = () => {
    setAnimateCards(!animateCards);
    setMoveText(!moveText);
  };

  // const shuffleArray = (array) => {
  //   let shuffledArray = [...array];
  //   for (let i = shuffledArray.length - 1; i > 0; i--) {
  //     const j = Math.floor(Math.random() * (i + 1));
  //     [shuffledArray[i], shuffledArray[j]] = [
  //       shuffledArray[j],
  //       shuffledArray[i],
  //     ];
  //   }
  //   return shuffledArray;
  // };

  // const shuffledImages = shuffleArray(images);

  return (
    <>
      <Navbar
        openLoginForm={openLoginForm}
        setOpenLoginForm={setOpenLoginForm}
      />
      <div className={`spin-container ${animateCards ? "animate" : ""}`}>
        {images?.map((image, index) => (
          <img
            key={index}
            src={image}
            className={`card-image ${animateCards ? "animate-card" : ""}`}
            alt={`Image ${index + 1}`}
          />
        ))}
        <h1 className={moveText ? "move-text" : ""}>
          {moveText ? <img src={TakeASpin} /> : "Take A SPIN"}
        </h1>

        <button
          className={`get-started-button ${
            animateCards ? "after-animation" : ""
          }`}
          onClick={handleGetStarted}
        >
          {animateCards ? "Click again" : "Get Started"}
        </button>
        {openLoginForm && (
          <div className="login-modal">
            <LoginForm
              openLoginForm={openLoginForm}
              setOpenLoginForm={setOpenLoginForm}
            />
          </div>
        )}
      </div>
    </>
  );
};

export default SpinSection;
