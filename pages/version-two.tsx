import { useEffect, useRef } from "react";
// eslint-disable-next-line
// @ts-ignore
import GamepadController from "gamepadcontroller";
import type { NextPage } from "next";

import { getAngle } from "../functions/calculateDirection";
import { clamp } from "../functions/clamp";

const debug = true;
const timeDiffs: number[] = [];

const Home: NextPage = () => {
  const virtualCursor = useRef<HTMLSpanElement>(null);
  const selectedElement = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    window.addEventListener("gamepadconnected", gamePadConnected);
    window.addEventListener("gamepaddisconnected", gamePadDisconnected);

    const gamepad = new GamepadController(0);
    gamepad.onStickMove(0, moveJoystickEventHandler);

    return () => {
      window.removeEventListener("gamepadconnected", gamePadConnected);
      window.removeEventListener("gamepaddisconnected", gamePadDisconnected);
      gamepad.removeOnStickMove(0);
    };
  }, []);

  function moveJoystickEventHandler(state: any) {
    const startTime = performance.now();

    if (!selectedElement.current || !virtualCursor.current) return;

    const { current } = state;
    const angle = getAngle(current);
    const { height, width, x, y } =
      selectedElement.current.getBoundingClientRect(); // Current selected element

    // Getting the center point of the current selected element
    const center = {
      x: x + width / 2,
      y: y + height / 2,
    };
    const boundry = Math.max(window.innerWidth, window.innerHeight);

    let radius = 0;
    let found = false;

    while (radius < boundry && !found) {
      // Get current pixel coordinates at given angle
      const x = center.x + radius * Math.sin((Math.PI * 2 * angle) / 360);
      const y =
        center.y + radius * Math.cos((Math.PI * 2 * (angle - 180)) / 360);

      // Moving the virtual cursor
      if (debug) {
        virtualCursor.current.style.left = `${clamp(
          x,
          0,
          window.innerWidth
        )}px`;
        virtualCursor.current.style.top = `${clamp(
          y,
          0,
          window.innerHeight
        )}px`;
      }

      if (
        (0 > x && x > window.innerWidth) || // If cursor moves out of screen range, stop
        (0 > y && y > window.innerHeight)
      ) {
        console.log("Breaking loop");

        break;
      }

      const nodes = document.elementsFromPoint(x, y);
      for (const node of nodes) {
        if (
          node instanceof HTMLElement &&
          node !== selectedElement.current &&
          node.dataset.interest
        ) {
          console.log(node);
          node.focus();
          found = true;

          break;
        }
      }

      radius++;
    }

    timeDiffs.push(performance.now() - startTime);
  }

  function gamePadConnected(e: GamepadEvent) {
    if (!e.gamepad) return;

    console.log(
      "Gamepad connected at index %d: %s. %d buttons, %d axes.",
      e.gamepad.index,
      e.gamepad.id,
      e.gamepad.buttons.length,
      e.gamepad.axes.length
    );
  }

  function gamePadDisconnected(e: GamepadEvent) {
    if (!e.gamepad) return;

    console.log(
      "Gamepad disconnected from index %d: %s",
      e.gamepad.index,
      e.gamepad.id
    );
  }

  return (
    <>
      <span
        className="absolute block h-5 w-5 -translate-x-2 -translate-y-2 bg-red-600"
        ref={virtualCursor}
        style={{
          opacity: debug ? "1" : "0",
        }}
      ></span>
      <div className="grid h-screen w-screen shrink-0 grid-cols-7 grid-rows-6 bg-white">
        <button className="bg-blue-500" data-interest></button>
        <button
          className="col-start-5 row-start-2 bg-orange-500"
          data-interest
        ></button>
        <button
          className="col-start-6 row-start-2 bg-green-500"
          data-interest
        ></button>
        <button
          className="col-start-4 row-start-3 bg-purple-500"
          onClick={() => {
            const sum = timeDiffs.reduce((a, b) => a + b, 0);
            console.log(sum / timeDiffs.length);
          }}
          ref={selectedElement}
          data-interest
        >
          2
        </button>
        <button
          className="col-start-2 row-start-5 bg-red-500"
          data-interest
        ></button>
        <button
          className="col-start-5 row-start-5 bg-pink-500"
          data-interest
        ></button>
        <button
          className="col-start-6 row-start-6 bg-teal-500"
          data-interest
        ></button>
      </div>
    </>
  );
};

export default Home;
