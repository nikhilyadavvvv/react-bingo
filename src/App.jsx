import React, { useState, lazy, Suspense } from "react";
import Welcome from "./pages/Welcome/Welcome";
import Bingo from "./pages/Bingo/Bingo";

const App = () => {
  const [showBingo, setShowBingo] = useState(false);
  return <>{showBingo ? <Bingo /> : <Welcome setShowBingo={setShowBingo} />}</>;
};

export default App;
