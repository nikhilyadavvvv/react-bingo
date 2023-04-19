import { fireEvent, getAllByTestId, render } from "@testing-library/react";
import Bingo from "./Bingo";

describe("Bingo", () => {
  it("should have 25 bingo tiles", () => {
    const { getAllByTestId } = render(<Bingo />);
    const tiles = getAllByTestId("bingo-tile");
    expect(tiles.length).toEqual(25);
  });

  test("middle tile should have text Medieval Bingo", () => {
    const { getAllByTestId, getByText } = render(<Bingo />);
    const tiles = getAllByTestId("bingo-tile");
    const middleTile = tiles[12];
    const middleTileText = getByText("Medieval Bingo");
    expect(middleTile).toContainElement(middleTileText);
  });

  test("no stamp on any bingo tile initially", () => {
    const { getAllByTestId } = render(<Bingo />);
    getAllByTestId("tile-stamp").forEach((tile) => {
      expect(tile).toHaveClass("hide");
    });
  });

  test("all tiles have stamp on after click", () => {
    const { getAllByTestId } = render(<Bingo />);
    getAllByTestId("tile-stamp").forEach((tile) => {
      fireEvent.click(tile);
      expect(tile).toHaveClass("show");
    });
  });

  test("should contain text Bingo on win condition", () => {
    const { getAllByTestId, getByTestId } = render(<Bingo />);
    const tiles = getAllByTestId("bingo-tile");
    for (let i = 0; i < 5; i++) {
      fireEvent.click(tiles[i]);
    }
    const winText = getByTestId("win-text");
    expect(winText.textContent).toMatch(/bingo/i);
  });

  test("should contain test Bingo Fullhouse", () => {
    const { getAllByTestId, getByTestId } = render(<Bingo />);
    getAllByTestId("bingo-tile").forEach((tile) => {
      fireEvent.click(tile);
    });
    const winText = getByTestId("win-text");
    expect(winText.textContent).toMatch(/bingo fullhouse/i);
  });
});
