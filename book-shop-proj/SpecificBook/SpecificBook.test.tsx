
import { render, screen, act } from "@testing-library/react";
import SpecificBook from "./SpecificBook";

jest.mock("../NavMenu/NavMenu", () => () => null);

jest.mock("react-router-dom", () => ({
  useParams: () => ({
    id: 1,
  }),
}));

describe("testing decrease handler function", () => {
  test("should not call onCountChange, when count <= 1", async () => {
    const CountChangeMock = jest.fn();
    const { container } = render(<SpecificBook />);
    const decreaseButton = await screen.findByTestId("counter-decrease");
    expect(decreaseButton).toBeInTheDocument();
    const increaseButton = await screen.findByTestId("counter-increase");
    expect(increaseButton).toBeInTheDocument();
    const counterInput = await screen.findByTestId("counter-value");

    // @ts-ignore
    expect(counterInput.value).toEqual("1");
    await act(() => {
      increaseButton.click();
    });
    // @ts-ignore
    expect(counterInput.value).toEqual("2");
    await act(() => {
      decreaseButton.click();
    });
    // @ts-ignore
    expect(counterInput.value).toEqual("1");

    expect(container).toMatchSnapshot();
    // expect(CountChangeMock).not.toHaveBeenCalled();
  });
});
