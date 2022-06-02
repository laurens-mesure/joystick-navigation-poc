import { useEffect, useRef } from "react";
import type { NextPage } from "next";

const Home: NextPage = () => {
  const center = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!center.current) return;

    window.addEventListener("gamepadconnected", gamePadConnected);
    window.addEventListener("gamepaddisconnected", gamePadDisconnected);

    center.current.focus();

    return () => {
      window.removeEventListener("gamepadconnected", gamePadConnected);
      window.removeEventListener("gamepaddisconnected", gamePadDisconnected);
    };
  }, [center]);

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

function gamePadConnected(e: GamepadEvent) {
  console.log(
    "Gamepad connected at index %d: %s. %d buttons, %d axes.",
    e.gamepad.index,
    e.gamepad.id,
    e.gamepad.buttons.length,
    e.gamepad.axes.length
  );
  console.log("full gamepad", e.gamepad);
}

function gamePadDisconnected(e: GamepadEvent) {
  console.log(
    "Gamepad disconnected from index %d: %s",
    e.gamepad.index,
    e.gamepad.id
  );

  console.log(e.gamepad);
}

export default Home;
