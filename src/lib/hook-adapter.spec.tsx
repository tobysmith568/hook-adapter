import { cleanup, render, screen } from "@testing-library/react";
import { Component } from "react";
import { afterEach, describe, expect, it } from "vitest";
import { HookAdapter } from "./hook-adapter";

const hookResultTestId = "hook-result";

describe("hook-adapter", () => {
  afterEach(cleanup);

  it("should call the hook exactly once per render", () => {
    let hookCallCount = 0;

    const useHookUnderTest = () => {
      hookCallCount++;
      return "hook result";
    };

    class ClassComponent extends Component {
      render() {
        return (
          <div>
            <HookAdapter hook={useHookUnderTest}>
              {hookResult => <div data-testid={hookResultTestId}>{hookResult}</div>}
            </HookAdapter>
          </div>
        );
      }
    }

    const { rerender } = render(<ClassComponent />);
    expect(hookCallCount).toBe(1);

    rerender(<ClassComponent />);
    expect(hookCallCount).toBe(2);
  });

  describe("when the hook has no parameters", () => {
    it("should expose the return value of the hook", () => {
      const hookReturnValue = "hook result";

      const useHookUnderTest = () => hookReturnValue;

      class ClassComponent extends Component {
        render() {
          return (
            <div>
              <HookAdapter hook={useHookUnderTest}>
                {hookResult => <div data-testid={hookResultTestId}>{hookResult}</div>}
              </HookAdapter>
            </div>
          );
        }
      }

      render(<ClassComponent />);

      const hookResultElement = screen.getByTestId(hookResultTestId);
      expect(hookResultElement).toHaveTextContent(hookReturnValue);
    });
  });

  describe("when the hook has parameters that are called in-line", () => {
    it("should expose the return value of the hook", () => {
      const useHookUnderTest = (param1: string, param2: string) => `${param1}:${param2}`;

      class ClassComponent extends Component {
        render() {
          return (
            <div>
              <HookAdapter hook={() => useHookUnderTest("one", "two")}>
                {hookResult => <div data-testid={hookResultTestId}>{hookResult}</div>}
              </HookAdapter>
            </div>
          );
        }
      }

      render(<ClassComponent />);

      const hookResultElement = screen.getByTestId(hookResultTestId);
      expect(hookResultElement).toHaveTextContent("one:two");
    });
  });

  describe("when the hook has parameters that are passed in", () => {
    it("should expose the return value of the hook", () => {
      const useHookUnderTest = (param1: string, param2: string) => `${param1}:${param2}`;

      class ClassComponent extends Component {
        render() {
          return (
            <div>
              <HookAdapter hook={useHookUnderTest} parameters={["one", "two"]}>
                {hookResult => <div data-testid={hookResultTestId}>{hookResult}</div>}
              </HookAdapter>
            </div>
          );
        }
      }

      render(<ClassComponent />);

      const hookResultElement = screen.getByTestId(hookResultTestId);
      expect(hookResultElement).toHaveTextContent("one:two");
    });
  });
});
