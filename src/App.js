import React, { useState } from "react";
import Bingo from "./pages/Bingo/Bingo";
import Welcome from "./pages/Welcome/Welcome";

const App = () => {
  const [showBingo, setShowBingo] = useState(false);
  if (!showBingo) {
    localStorage.setItem("isFirstTime", true);
    return <Welcome setShowBingo={setShowBingo} />;
  } else {
    return <Bingo />;
  }
};

export default App;
