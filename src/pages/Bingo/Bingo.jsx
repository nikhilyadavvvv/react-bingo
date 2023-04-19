import React, { useState, useEffect, useRef } from "react";
import "./Bingo.css";
import {
  animClickedDiv,
  animOtherDivs,
  checkBingo,
  getRandomClass,
  shuffleQuotes,
  soundEffect,
} from "./bingoLogics";
import BingoWin from "./BingoWin";
import BackgroundMusic from "../../assets/sounds/background.mp3";
import useBackgroundMusic from "../../customHooks/useBackgroundMusic";
import stampSound from "../../assets/sounds/stamp.mp3";
import winSound from "../../assets/sounds/bingo.mp3";
import BingoTile from "./BingoTile";

const Bingo = () => {
  // state variables
  const [width, setWidth] = useState(100);
  const [height, setHeight] = useState(100);
  const [tileWidth, setTileWidth] = useState(100);
  const [tileHeight, setTileHeight] = useState(100);
  const [seletedQuotes, setSeletedQuotes] = useState([]);
  const [randomClasses, setRandomClasses] = useState([]);
  const [fontSize, setFontSize] = useState(20);
  const [winCombinations, setWinCombinations] = useState([]);
  const [quoteList, setQuoteList] = useState([]);
  const [showExplosion, setShowExplosion] = useState(false);
  const [winText, setWinText] = useState("Bingo");
  const [isPortrait, setIsPortrait] = useState(
    typeof window !== "undefined" && typeof window.matchMedia === "function"
      ? window.matchMedia("(orientation: portrait)").matches
      : false
  );
  // refs
  const imgRefs = useRef([]);
  const divRefs = useRef([]);

  // checks screen orientation and plays background music
  useBackgroundMusic(BackgroundMusic);

  // shuffles quoteList on initial render
  useEffect(() => {
    shuffleQuotes(quoteList, setQuoteList);
  }, []);

  // updates width, height and orientation when window is resized
  useEffect(() => {
    function handleResize() {
      const element = document.querySelector(".container");
      if (element) {
        setWidth(element.clientWidth);
        setHeight(element.clientHeight);
      }
      setIsPortrait(window.matchMedia("(orientation: portrait)").matches);
    }

    window.addEventListener("resize", handleResize);
    handleResize();

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // updates tile dimensions and font size based on window size
  useEffect(() => {
    setTileWidth((width - 20) / 5);
    setTileHeight((height - 120) / 5);
    width < 400 ? setFontSize(14) : setFontSize(20);
  }, [width, height]);

  // generates random classes for each tile based on quoteList length
  useEffect(() => {
    imgRefs.current = imgRefs.current.slice(0, quoteList.length);
    const newClasses = Array(25).fill("").slice(0, quoteList.length);
    let updatedClasses = newClasses.map(() => getRandomClass());
    for (let i = 1; i < updatedClasses.length; i++) {
      if (updatedClasses[i] === updatedClasses[i - 1]) {
        updatedClasses[i] = getRandomClass();
      }
    }
    setRandomClasses(updatedClasses);
  }, [quoteList.length]);

  // checks if a win combination has been achieved
  useEffect(() => {
    let length = winCombinations.length;
    if (length > 0) {
      soundEffect(winSound);
      if (length === 14) {
        setWinText("Bingo Fullhouse");
      } else {
        setWinText("Bingo");
      }
      setShowExplosion(true);
    }
  }, [winCombinations.length]);

  const handleClick = (index) => {
    if (seletedQuotes.includes(index)) {
      return;
    }

    soundEffect(stampSound);
    animOtherDivs(index, divRefs);
    animClickedDiv(index, imgRefs, setSeletedQuotes, seletedQuotes);
    checkBingo(
      index,
      setSeletedQuotes,
      seletedQuotes,
      winCombinations,
      setWinCombinations
    );
  };

  const handleTap = () => {
    winText === "Bingo" ? setShowExplosion(false) : window.location.reload();
  };

  return (
    <div className="container" data-testid="bingo-board">
      <div
        style={{ height: "100%", position: "relative" }}
        className="d-flex justify-content-center align-items-center flex-column"
      >
        {showExplosion && <BingoWin winText={winText} onClick={handleTap} />}

        <div className="grid" style={{ zIndex: 0, position: "absolute" }}>
          {quoteList.map((quote, index) => (
            <BingoTile
              key={index}
              divRefs={divRefs}
              quote={quote}
              randomClass={randomClasses[index]}
              isPortrait={isPortrait}
              tileWidth={tileWidth}
              tileHeight={tileHeight}
              fontSize={fontSize}
              handleClick={handleClick}
              index={index}
              imgRefs={imgRefs}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Bingo;
