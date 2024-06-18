import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { tooltip } from "./tooltip";

describe("tooltip ", () => {
  it("validates email field", () => {
    render(<tooltip message={"Invalid email format"} />);
    expect(screen.getByTestId("tooltip-test")).toHaveTextContent(
      "Invalid email format"
    );
  });
  it("validates password field", () => {
    render(<tooltip message={"password requirement not meet"} />);
    expect(screen.getByTestId("tooltip-test")).toHaveTextContent(
      "password requirement not meet"
    );
  });
  it("validates confirm password field", () => {
    render(<tooltip message={"passwords do not match"} />);
    expect(screen.getByTestId("tooltip-test")).toHaveTextContent(
      "passwords do not match"
    );
  });
  it("validates confirm password field", () => {
    render(<tooltip message={"passwords do match"} />);
    expect(screen.getByTestId("tooltip-test")).toHaveTextContent(
      "something went wrong"
    );
  });
});
