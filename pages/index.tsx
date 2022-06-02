import { useEffect, useRef } from "react";
// eslint-disable-next-line
// @ts-ignore
import GamepadController from "gamepadcontroller";
import type { NextPage } from "next";

import { getAngle } from "../functions/calculateDirection";
import { clamp } from "../functions/clamp";

const debug = true;

const Home: NextPage = () => {
  const virtualCursor = useRef<HTMLSpanElement>(null);

  const buttonRefOne = useRef<HTMLButtonElement>(null);
  const buttonRefTwo = useRef<HTMLButtonElement>(null);
  const buttonRefThree = useRef<HTMLButtonElement>(null);
  const buttonRefFour = useRef<HTMLButtonElement>(null); // Considered as center and starting point
  const buttonRefFive = useRef<HTMLButtonElement>(null);
  const buttonRefSix = useRef<HTMLButtonElement>(null);
  const buttonRefSeven = useRef<HTMLButtonElement>(null);

  const buttons = [
    buttonRefOne,
    buttonRefTwo,
    buttonRefThree,
    // buttonRefFour, // Should be removed in list of possible buttons
    buttonRefFive,
    buttonRefSix,
    buttonRefSeven,
  ];

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
    if (!buttonRefFour.current || !virtualCursor.current) return;

    const { current } = state;
    const angle = getAngle(current);
    const { height, width, x, y } =
      buttonRefFour.current.getBoundingClientRect(); // Current selected element

    // Getting the center point of the current selected element
    const center = {
      x: x + width / 2,
      y: y + height / 2,
    };

    let radius = 0;
    let found = false;

    while (radius < window.innerHeight && !found) {
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

      for (let i = 0; i < buttons.length; i++) {
        const elementRect = buttons[i].current?.getBoundingClientRect();
        if (elementRect) {
          if (
            elementRect.x < x &&
            x < elementRect.x + elementRect.width && // Is the x coordinate between the x range of the element
            elementRect.y < y &&
            y < elementRect.y + elementRect.height // Is the y coordinate between the y range of the element
          ) {
            console.log(buttons[i]);
            buttons[i].current?.focus();
            found = true;
            break;
          }
        }
      }

      radius++;
    }
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
        <button className="bg-blue-500" ref={buttonRefOne}></button>
        <button
          className="col-start-5 row-start-2 bg-orange-500"
          ref={buttonRefTwo}
        ></button>
        <button
          className="col-start-6 row-start-2 bg-green-500"
          ref={buttonRefThree}
        ></button>
        <button
          className="col-start-4 row-start-3 bg-purple-500"
          ref={buttonRefFour}
        ></button>
        <button
          className="col-start-2 row-start-5 bg-red-500"
          ref={buttonRefFive}
        ></button>
        <button
          className="col-start-5 row-start-5 bg-pink-500"
          ref={buttonRefSix}
        ></button>
        <button
          className="col-start-6 row-start-6 bg-teal-500"
          ref={buttonRefSeven}
        ></button>
      </div>
    </>
  );
};

export default Home;
