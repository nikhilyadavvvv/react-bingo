import React from "react";
import stamp from "../../assets/images/stamp.webp";

const BingoTile = ({
  quote,
  randomClass,
  isPortrait,
  tileWidth,
  tileHeight,
  fontSize,
  handleClick,
  index,
  imgRefs,
  divRefs,
}) => {
  const tileStyle = {
    padding: 10,
    width: isPortrait ? tileWidth : tileWidth - 100,
    height: isPortrait ? tileHeight : tileWidth - 100,
  };

  return (
    <div
      ref={(el) => (divRefs.current[index] = el)}
      onClick={index === 12 ? null : () => handleClick(index)}
      className={`grid-item paper-style ${randomClass}`}
      style={tileStyle}
    >
      <div
        style={{ height: "100%", width: "100%" }}
        className={`d-flex justify-content-center align-items-center quote-div${
          index === 12 ? " middle-tile" : ""
        }`}
      >
        <span
          style={{ fontSize: fontSize, textAlign: "center" }}
          className="quote-text"
        >
          {quote}
        </span>
      </div>
      <div
        style={{ height: "100%", width: "100%" }}
        className="d-flex justify-content-end align-items-end stamp-div"
      >
        <img
          className="hide stamping"
          src={stamp}
          height={50}
          ref={(el) => (imgRefs.current[index] = el)}
        />
      </div>
    </div>
  );
};

export default BingoTile;
