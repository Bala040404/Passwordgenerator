import { useCallback, useEffect, useRef, useState } from "react";

import "./App.css";

function App() {
  const [isNumber, setIsnumber] = useState(false);
  const [ischar, setIschar] = useState(false);
  const [range, setrange] = useState(8);
  const [password, setPassword] = useState("");
  const passwordRef = useRef(null);

  function genPassword() {
    let pass = "";
    let avl = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
    if (ischar) avl += "!@#$%^&*()_-";
    if (isNumber) avl += "0123456789";

    for (let i = 0; i < range; i++) {
      let rand = Math.floor(Math.random() * avl.length + 1);
      pass = pass + avl.charAt(rand);
    }

    setPassword(pass);
  }

  let passwordGen = useCallback(genPassword, [
    range,
    isNumber,
    ischar,
    genPassword,
  ]);
  useEffect(passwordGen, [range, isNumber, ischar]);

  return (
    <div className="bg-black text-white w-full h-screen flex flex-col items-center">
      <h1 className="text-3xl text-center py-10">Password generator</h1>

      <div className="h-2/4 w-3/4 flex flex-col items-center justify-center border-2 border-blue-600 rounded-sm bg-gray-900">
        <div className=" flex justify-center items-center w-3/4 h-12">
          <input
            ref={passwordRef}
            className="h-3/4 w-4/6 border-2 text-black rounded-l-md"
            type="text"
            value={password}
            readOnly
          />
          <button
            className="h-3/4 border-1 border-blue-700 rounded-r-md bg-blue-600 w-1/6 hover:bg-sky-600"
            onClick={() => {
              passwordRef.current?.focus();
              passwordRef.current?.select();
              window.navigator.clipboard.writeText(password);
            }}
          >
            copy
          </button>
        </div>

        <div className="w-3/5 h-12 flex justify-evenly items-center">
          <div>
            <label className="mr-2" htmlFor="slider">
              range {range}
            </label>
            <input
              className="cursor-pointer"
              type="range"
              id="slider"
              value={range}
              min={6}
              max={30}
              onChange={(e) => {
                setrange(e.target.value);
              }}
            />
          </div>

          <div>
            <label className="mr-2" htmlFor="number">
              Number
            </label>
            <input
              className="cursor-pointer"
              type="checkbox"
              id="number"
              value={isNumber}
              onChange={(e) => {
                setIsnumber((prev) => !prev);
              }}
            />
          </div>
          <div>
            <label className="mr-2" htmlFor="character">
              Character
            </label>
            <input
              className="cursor-pointer"
              type="checkbox"
              id="character"
              value={ischar}
              onChange={(e) => {
                setIschar((prev) => !prev);
              }}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
