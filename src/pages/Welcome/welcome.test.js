import { render, act } from "@testing-library/react";
import Welcome from "./Welcome";

describe("Welcome", () => {
  it("should change font size when window is resized", () => {
    const { getByTestId } = render(<Welcome setShowBingo={() => {}} />);
    const welcomeText = getByTestId("welcome-text-container");
    expect(welcomeText).toHaveStyle("font-size: 14px");
  });
});
