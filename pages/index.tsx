import { useEffect, useRef } from "react";
// eslint-disable-next-line
// @ts-ignore
import GamepadController from "gamepadcontroller";
import type { NextPage } from "next";

import { getAngle } from "../functions/calculateDirection";

const Home: NextPage = () => {
  const center = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!center.current) return;

    window.addEventListener("gamepadconnected", gamePadConnected);
    window.addEventListener("gamepaddisconnected", gamePadDisconnected);

    center.current.focus();
    const gamepad = new GamepadController(0);
    gamepad.onStickMove(0, moveJoystickEventHandler);

    return () => {
      window.removeEventListener("gamepadconnected", gamePadConnected);
      window.removeEventListener("gamepaddisconnected", gamePadDisconnected);
      gamepad.removeOnStickMove(0);
    };
  }, [center]);

  function moveJoystickEventHandler(state: any) {
    const { current } = state;
    getAngle(current);
  }

  function gamePadConnected(e: GamepadEvent) {
    console.log(
      "Gamepad connected at index %d: %s. %d buttons, %d axes.",
      e.gamepad.index,
      e.gamepad.id,
      e.gamepad.buttons.length,
      e.gamepad.axes.length
    );
  }

  function gamePadDisconnected(e: GamepadEvent) {
    console.log(
      "Gamepad disconnected from index %d: %s",
      e.gamepad.index,
      e.gamepad.id
    );
  }

  return (
    <div className="grid h-screen w-screen shrink-0 grid-cols-7 grid-rows-6 bg-white">
      <div className="bg-blue-500" tabIndex={0}></div>
      <div className="col-start-5 row-start-2 bg-orange-500" tabIndex={0}></div>
      <div className="col-start-6 row-start-2 bg-green-500" tabIndex={0}></div>
      <div
        className="col-start-4 row-start-3 bg-purple-500"
        onClick={() => {
          center.current?.focus();
        }}
        ref={center}
        tabIndex={0}
      ></div>
      <div className="col-start-2 row-start-5 bg-red-500" tabIndex={0}></div>
      <div className="col-start-5 row-start-5 bg-pink-500" tabIndex={0}></div>
      <div className="col-start-6 row-start-6 bg-teal-500" tabIndex={0}></div>
    </div>
  );
};

export default Home;
