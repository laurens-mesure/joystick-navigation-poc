import { useEffect, useRef } from "react";
// eslint-disable-next-line
// @ts-ignore
import GamepadController from "gamepadcontroller";
import type { NextPage } from "next";

import { getAngle } from "../functions/calculateDirection";

const debug = true;
const timeDiffs: number[] = [];

const Home: NextPage = () => {
  const virtualCursor = useRef<HTMLSpanElement>(null);
  const selectedElement = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const gamepad = new GamepadController(0);
    gamepad.onStickMove(0, moveJoystickEventHandler);

    return () => {
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

      // No virtual cursor because it would continuously select the cursor instead of the element

      if (
        (0 > x && x > window.innerWidth) || // If cursor moves out of screen range, stop
        (0 > y && y > window.innerHeight)
      ) {
        console.log("Breaking loop");

        break;
      }

      const node = document.elementFromPoint(x, y);
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

      radius++;
    }

    timeDiffs.push(performance.now() - startTime);
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
          3
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
