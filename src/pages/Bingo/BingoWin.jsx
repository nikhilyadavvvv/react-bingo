import React from "react";
import coin from "../../assets/images/coin.webp";
import Particles from "react-tsparticles";
import { loadFull } from "tsparticles";
import winAnimationParams from "../../assets/staticData/winAnimationParams";

const BingoWin = ({ winText, onClick }) => {
  const particlesInit = async (main) => {
    await loadFull(main);
  };
  return (
    <div
      onClick={onClick}
      style={{
        height: "100%",
        width: "100vw",
        position: "absolute",
        zIndex: 1,
      }}
      className="explosion d-flex justify-content-center align-items-center flex-column"
    >
      <span
        style={{ fontSize: 100, textAlign: "center" }}
        className="bouncing-text quote-text paper-style"
        data-text={winText}
      >
        {winText}
      </span>
      <span
        style={{
          fontSize: 35,
          textAlign: "center",
          backgroundColor: "rgba(255,255,255,0.6)",
          padding: 10,
        }}
        className="quote-text paper-style"
        data-text={winText}
      >
        {winText === "Bingo" ? "Tap anywhere to Continue" : "Start New Game"}
      </span>
      <Particles
        id="tsparticles"
        init={particlesInit}
        options={winAnimationParams}
      />
    </div>
  );
};

export default BingoWin;
