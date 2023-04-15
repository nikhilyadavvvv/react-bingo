import quotes from "../../assets/staticData/quotes";

// This function takes an array of selected indexes and checks if any of the Bingo winning 
// combinations are present in the selected indexes. The winning combinations are defined in 
// the horizontalWins, verticalWins, diagonalWins, fourCornersWin, and fullHouseWin arrays.
function checkBingoWin(selectedIndexes) {
  const horizontalWins = [
    [0, 1, 2, 3, 4],
    [5, 6, 7, 8, 9],
    [10, 11, 12, 13, 14],
    [15, 16, 17, 18, 19],
    [20, 21, 22, 23, 24],
  ];
  const verticalWins = [
    [0, 5, 10, 15, 20],
    [1, 6, 11, 16, 21],
    [2, 7, 12, 17, 22],
    [3, 8, 13, 18, 23],
    [4, 9, 14, 19, 24],
  ];
  const diagonalWins = [
    [0, 6, 12, 18, 24],
    [4, 8, 12, 16, 20],
  ];
  const fourCornersWin = [0, 4, 20, 24];
  const fullHouseWin = [
    0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20,
    21, 22, 23, 24,
  ];

  const winningCombinations = [];

  horizontalWins.forEach((win) => {
    if (win.every((index) => selectedIndexes.includes(index))) {
      winningCombinations.push(win);
    }
  });

  verticalWins.forEach((win) => {
    if (win.every((index) => selectedIndexes.includes(index))) {
      winningCombinations.push(win);
    }
  });

  diagonalWins.forEach((win) => {
    if (win.every((index) => selectedIndexes.includes(index))) {
      winningCombinations.push(win);
    }
  });

  if (fourCornersWin.every((index) => selectedIndexes.includes(index))) {
    winningCombinations.push(fourCornersWin);
  }

  if (fullHouseWin.every((index) => selectedIndexes.includes(index))) {
    winningCombinations.push(fullHouseWin);
  }

  return winningCombinations;
}

// This function takes an index, a reference to an array of image elements, 
// a state setter function for selected quotes, and the current array of selected quotes. 
// It animates the image element at the given index to show it as "selected" and adds 
// the index to the selected quotes array. If the selected quotes array is empty, 
// it automatically selects the center tile.
export const animClickedDiv = (
  index,
  imgRefs,
  setSeletedQuotes,
  seletedQuotes
) => {
  const tile = imgRefs.current[index];
  tile.classList.remove("hide");
  tile.classList.add("show");
  setSeletedQuotes((seletedQuotes) => [...seletedQuotes, index]);
  if (seletedQuotes.length === 0) {
    setSeletedQuotes((seletedQuotes) => [...seletedQuotes, 12]);
    imgRefs.current[12].classList.remove("hide");
    imgRefs.current[12].classList.add("show");
  }
};

// This function takes an index and a reference to an array of all image elements, 
// and animates all other elements to give the appearance of shuffling. 
// It first adds a "ruffle" class to all other elements and removes 
// any "rotate-10", "rotate-15", or "rotate-20" classes. 
// After a 500ms timeout, it removes the "ruffle" class and 
// applies a random rotation to each element.
export const animOtherDivs = (index, divRefs) => {
  const otherDivs = divRefs.current.filter((_, i) => i !== index);
  otherDivs.forEach((div) => {
    div.classList.remove("rotate-10");
    div.classList.remove("rotate-15");
    div.classList.remove("rotate-20");
    div.classList.add("ruffle");
    setTimeout(() => {
      otherDivs.forEach((div) => {
        div.classList.remove("ruffle");
        const randomRotation = Math.floor(Math.random() * 6) * 5;
        div.style.transition = "transform 100ms ease-in-out";
        setTimeout(() => {
          div.style.transform = `rotate(${randomRotation}deg)`;
        }, 1);
      });
    }, 500);
  });
};

// This function takes an index, a state setter function for selected quotes, 
// the current array of selected quotes, the current array of winning combinations, 
// and a state setter function for the winning combinations. 
// It first calls checkBingoWin with the selected quotes array plus the new index, 
// and adds any new winning combinations to the list of current winning combinations. 
// It then updates the list of winning combinations using the state setter function.
export const checkBingo = (
  index,
  setSeletedQuotes,
  seletedQuotes,
  winCombinations,
  setWinCombinations
) => {
  const winningCombinations = checkBingoWin([...seletedQuotes, index]);
  if (winningCombinations.length > 0) {
    winningCombinations.forEach((combination) => {
      if (
        !winCombinations.some(
          (winCombination) =>
            JSON.stringify(winCombination) === JSON.stringify(combination)
        )
      ) {
        setWinCombinations((winCombinations) => [
          ...winCombinations,
          combination,
        ]);
      }
    });
  }
};

// This function generates a random class for the Bingo tiles. 
// It randomly selects a paper texture (out of four options) and a rotation angle (out of three options). 
// It then returns a string with the selected classes separated by spaces.
export function getRandomClass() {
  const randomNumber = Math.floor(Math.random() * 4) + 1;
  const randomRotation = Math.floor(Math.random() * 2);
  const rotationAngle = Math.floor(Math.random() * 3);

  let classes = "";

  switch (randomNumber) {
    case 1:
      classes += "crumpled-paper ";
      break;
    case 2:
      classes += "crumpled-paper_2 ";
      break;
    case 3:
      classes += "crumpled-paper_4 ";
      break;
    case 4:
      classes += "crumpled-paper_5 ";
      break;
    default:
      break;
  }

  if (randomRotation) {
    switch (rotationAngle) {
      case 0:
        classes += "rotate-10 ";
        break;
      case 1:
        classes += "rotate-15 ";
        break;
      case 2:
        classes += "rotate-20 ";
        break;
      default:
        break;
    }
  }

  return classes.trim();
}

// function takes in an array of quotes and a function to set the state of the shuffled quotes. 
// It creates a new array by spreading the original quoteList, shuffles the new array using 
// the Fisher-Yates shuffle algorithm.
export const shuffleQuotes = (quoteList, setQuoteList) => {
  const shuffledQuotes = [...quotes];

  for (let i = shuffledQuotes.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffledQuotes[i], shuffledQuotes[j]] = [
      shuffledQuotes[j],
      shuffledQuotes[i],
    ];
  }

  shuffledQuotes[12] = "Medieval Bingo";

  setQuoteList(shuffledQuotes);
};

// function takes in a file path for an audio file and creates a new Audio object with that path. 
// It then calls the play method on that object to play the audio.
export function soundEffect(effect) {
  const audio = new Audio(effect);
  audio.play();
}
