import React, { useState } from "react";
import "./Welcome.css";
import { useEffect } from "react";

const Welcome = ({ setShowBingo }) => {
  const [width, setWidth] = useState(0);

  useEffect(() => {
    function handleResize() {
      const element = document.querySelector(".contain");
      if (element) {
        setWidth(element.clientWidth);
      }
    }
    window.addEventListener("resize", handleResize);
    handleResize();
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <div
      className="contain"
      style={{ padding: 10, height: "100%", width: "100%" }}
    >
      <div className="bg-image">
        <div
          data-testid="welcome-text-container"
          className="paper-style welcome-text"
          style={{ fontSize: width > 700 ? 28 : 14, lineHeight:0.8 }}
        >
          <p className="quote-text">Welcome to Medieval Bingo</p>
          <p className="quote-text">To win you can complete: </p>
          <ul>
            <li>Row</li>
            <li>Column</li>
            <li>Diagonal</li>
            <li>Corners</li>
          </ul>

          <p className="quote-text">The tile in center activates by magic</p>
          <p className="quote-text">You can win more than once</p>
          <p className="quote-text">Enjoy your video confrence</p>
        </div>
        <button
          id="start-button"
          data-testid="start-button"
          className="paper-style quote-text start-button"
          onClick={() => setShowBingo(true)}
        >
          Have Fun
        </button>
      </div>
    </div>
  );
};

export default Welcome;
