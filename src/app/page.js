"use client";
import React, { useState, useEffect } from "react";

const diceColors = {
  1: "#EF4444",
  2: "#EAB307",
  3: "#22C55E",
  4: "#3B82F6",
  5: "#6366F1",
  6: "#A855F7",
};
const DiceComponent = ({ index, diceValues }) => {
  const [isRolling, setIsRolling] = useState(false);

  useEffect(() => {
    setIsRolling(true);

    const timeout = setTimeout(() => {
      setIsRolling(false);
    }, 100);

    return () => clearTimeout(timeout);
  }, [diceValues]);

  const animationStyle = {
    transform: isRolling ? "rotate(-90deg)" : "rotate(90deg)",
    transition: " transform 0.15s ",
  };

  const diceValue = diceValues[index];
  const selectDice = () => {
    switch (diceValue) {
      case 1:
        return (
          <span className="absolute top-[40%] left-[40%] bg-[#713E12] rounded-full w-4 h-4" />
        );
      case 2:
        return (
          <>
            <span className="absolute top-[15%] left-[15%]  bg-[#713E12] rounded-full w-4 h-4" />
            <span className="absolute top-[65%] left-[65%]  bg-[#713E12] rounded-full w-4 h-4" />
          </>
        );
      case 3:
        return (
          <>
            <span className="absolute top-[15%] left-[15%]  bg-[#713E12] rounded-full w-4 h-4" />
            <span className="absolute top-[40%] left-[40%]  bg-[#713E12] rounded-full w-4 h-4" />
            <span className="absolute top-[65%] left-[65%]  bg-[#713E12] rounded-full w-4 h-4" />
          </>
        );
      case 4:
        return (
          <>
            <span className="absolute top-[15%] left-[15%] bg-[#713E12] rounded-full w-4 h-4" />
            <span className="absolute top-[15%] left-[65%] bg-[#713E12] rounded-full w-4 h-4" />
            <span className="absolute top-[65%] left-[15%] bg-[#713E12] rounded-full w-4 h-4" />
            <span className="absolute top-[65%] left-[65%]  bg-[#713E12] rounded-full w-4 h-4" />
          </>
        );
      case 5:
        return (
          <>
            <span className="absolute top-[15%] left-[15%]  bg-[#713E12] rounded-full w-4 h-4" />
            <span className="absolute top-[15%] left-[65%]  bg-[#713E12] rounded-full w-4 h-4" />
            <span className="absolute top-[40%] left-[40%]  bg-[#713E12] rounded-full w-4 h-4" />
            <span className="absolute top-[65%] left-[15%]  bg-[#713E12] rounded-full w-4 h-4" />
            <span className="absolute top-[65%] left-[65%]  bg-[#713E12] rounded-full w-4 h-4" />
          </>
        );
      case 6:
        return (
          <>
            <span className="absolute top-[15%] left-[15%] bg-[#713E12] rounded-full w-4 h-4" />
            <span className="absolute top-[15%] left-[65%] bg-[#713E12] rounded-full w-4 h-4" />
            <span className="absolute top-[40%] left-[15%] bg-[#713E12] rounded-full w-4 h-4" />
            <span className="absolute top-[40%] left-[65%] bg-[#713E12] rounded-full w-4 h-4" />
            <span className="absolute top-[65%] left-[15%] bg-[#713E12] rounded-full w-4 h-4" />
            <span className="absolute top-[65%] left-[65%] bg-[#713E12] rounded-full w-4 h-4" />
          </>
        );
      default:
        return <>Invalid</>;
    }
  };

  return (
    <div style={{ ...animationStyle }}>
      <div
        className="w-20 h-20 rounded-lg relative"
        style={{ backgroundColor: diceColors[index + 1] }}
      >
        {selectDice()}
      </div>
    </div>
  );
};

const MultipleDiceComponent = () => {
  const [diceValues, setDiceValues] = useState([6, 6, 6, 6, 6, 6]);
  const [diceLength, setDiceLength] = useState(6);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [names, setNames] = useState(["Player 1", "Player 2"]);
  const [currentName, setCurrentName] = useState("");
  const [currentPlayerIndex, setCurrentPlayerIndex] = useState(0);

  const rollDice = () => {
    const randomValues = Array.from(
      { length: diceLength },
      () => Math.floor(Math.random() * 6) + 1
    );
    setDiceValues(randomValues);
  };

  const diceSum = diceValues.reduce((sum, value) => sum + value, 0);

  const handleButtonClick = () => {
    setIsDrawerOpen(!isDrawerOpen);
  };
  const handleCloseDrawer = () => {
    setIsDrawerOpen(false);
  };

  useEffect(() => {
    rollDice();
  }, [diceLength]);

  const subDiceLength = () => {
    setDiceLength(diceLength - 1);
  };
  const addDiceLength = () => {
    setDiceLength(diceLength + 1);
  };

  const handleInputChange = (event) => {
    const { value } = event.target;
    setCurrentName(value);
  };

  const handleAddName = () => {
    if (currentName.trim() !== "") {
      setNames([...names, currentName.trim()]);
      setCurrentName("");
    }
  };

  const handleRemoveName = (index) => {
    const itemToRemove = names[index];
    setNames(names.filter((i) => i !== itemToRemove));
  };

  const playerCount = names.length;

  const handleDiceClick = () => {
    if (names.length > 0) {
      const delayTime = 500;
      setTimeout(() => {
        setCurrentPlayerIndex((prevIndex) => (prevIndex + 1) % names.length);
      }, delayTime);
    }
  };

  return (
    <div
      className={
        "flex flex-col gap-12 justify-center items-center w-full h-screen"
      }
    >
      <div className="bg-[#E8E8E8] text-black rounded-lg">
        <button
          onClick={() => {
            handleDiceClick();
            rollDice();
          }}
          disabled={names.length === 0}
        >
          <div className={"font-bold py-2"}>
            {names[currentPlayerIndex]}
            <p className={"font-normal p-5"}>played</p>
          </div>

          {diceSum}

          {diceValues.length > 0 && (
            <div
              className={
                "flex flex-wrap justify-center px-4 py-4 gap-x-4 gap-y-4"
              }
            >
              {diceValues.map((value, index) => (
                <DiceComponent
                  key={index}
                  index={index}
                  diceValues={diceValues}
                />
              ))}
            </div>
          )}

          <div className={"py-5 space-y-5"}>
            <p className="font-bold">
              {names[(currentPlayerIndex + 1) % names.length]}
            </p>
            <p>plays next</p>
          </div>
        </button>
      </div>
      <div className={"text-center"}>
        {!isDrawerOpen && (
          <button
            onClick={handleButtonClick}
            className="text-white rounded-lg bg-[#B4530A] p-2 "
          >
            Open Manager
          </button>
        )}
        <div
          className={`flex flex-col justify-items-center bg-slate-500 h-screen fixed left-0 w-full p-4 
                ${
                  isDrawerOpen ? "top-0" : "top-[100%]"
                } transition-all ease-in-out duration-300`}
        >
          <button
            onClick={handleCloseDrawer}
            className="text-center mx-auto text-white rounded-lg bg-[#B4530A] p-2 "
          >
            {isDrawerOpen ? "Close Manager" : "Open Manager"}
          </button>
          <h2 className="text-center font-bold text-xl mx-auto py-5">Dices</h2>
          <div className="flex justify-center h-8 bg-white mx-auto gap-4">
            <button
              disabled={diceLength === 1}
              className="w-10 text-white bg-blue-700 hover:bg-blue-400 disabled:cursor-not-allowed"
              onClick={subDiceLength}
            >
              -
            </button>
            <span className="text-black flex justify-cente mx-auto my-auto">
              {diceLength}
            </span>
            <button
              disabled={diceLength === 6}
              className="w-10 text-white bg-blue-700 hover:bg-blue-400 disabled:cursor-not-allowed"
              onClick={addDiceLength}
            >
              +
            </button>
          </div>
          <div className="py-4 text-2xl">
            <span className="font-bold text-xl">Players ({playerCount})</span>
          </div>
          <div className={"bg-white text-left"}>
            <input
              type="text"
              className="w-full"
              placeholder="Name"
              value={currentName}
              onChange={handleInputChange}
              onKeyUp={(event) => {
                if (event.key === "Enter") {
                  handleAddName();
                }
              }}
            />
            <button
              className="bg-blue-500 hover:bg-blue-700 absolute right-0 rounded-sm mx-5 w-10 text-white"
              onClick={handleAddName}
            >
              +
            </button>
            <div className="border border-gray-300 rounded">
              {names.map((name, index) => (
                <div key={index} className="flex justify-between">
                  <p>{name}</p>
                  <button
                    className="text-white hover:bg-red-300 bg-red-800 m-1 rounded-sm w-10"
                    onClick={() => handleRemoveName(index)}
                  >
                    -
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MultipleDiceComponent;
