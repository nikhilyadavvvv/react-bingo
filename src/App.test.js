import React from "react";
import App from "./App";
import { fireEvent, render } from "@testing-library/react";
import Welcome from "./pages/Welcome/Welcome";

describe("App", () => {
  it("shows Welcome when the app starts", () => {
    const { getByText } = render(<App />);
    const welcomeText = getByText("Welcome to Medieval Bingo");
    expect(welcomeText).toBeInTheDocument();
  });

  it("it shows Bingo when clicked have fun", () => {
    const { getByTestId, debug } = render(<App />);
    const startButton = getByTestId("start-button");
    fireEvent.click(startButton);
    const bingBoard = getByTestId("bingo-board");
    expect(bingBoard).toBeInTheDocument();
  });
});
