import "console.tap/dist-src/polyfill.js";
import _ from "lodash";

import React, { useState, useEffect, Fragment } from "react";
import "./styles.scss";

import { unwrapEvent, getExersizeMaxRep } from "./util";
import { getExersizeList } from "./req";
import Logo from "./components/Logo";
import Graph from "./components/Graph";
import Text, { Number, SubText } from "./components/Text";

const ExercisesList = ({ exersizes, selectExersizeIndex }) => (
  <ul>
    {_.sortBy(exersizes, "name").map(({ name, ...entries }, i) => (
      <li
        className="exersize-list-item flex-quadrants"
        key={name + " " + i}
        onClick={() => selectExersizeIndex(i)}
      >
        <div>
          <Text>{name}</Text>
          <Number>{getExersizeMaxRep(entries)}</Number>
        </div>
        <div>
          <SubText>1 RM Record</SubText>
          <SubText>lbs</SubText>
        </div>
      </li>
    ))}
  </ul>
);

const SideBar = ({ exersizes, selectExersizeIndex }) => (
  <aside id="sidebar-menu">
    <SubText id="menu-title">YOUR EXERCISES</SubText>
    <ExercisesList
      exersizes={exersizes}
      selectExersizeIndex={selectExersizeIndex}
    />
    <Logo id="fitbod-logo" />s
  </aside>
);

const userNames = [
  "user1@fitbod.me",
  "user2@fitbod.me",
  "user7@fitbod.me"
  // "user3@fitbod.me",
  // "user5@fitbod.me",
  // "user6@fitbod.me"
];

const UserSelect = ({ userNames, selectedUser, selectUser }) => (
  <select
    className="user-select"
    value={selectedUser}
    onChange={unwrapEvent(selectUser)}
  >
    {userNames.map(userName => (
      <option key={userName} value={userName}>
        {userName}
      </option>
    ))}
  </select>
);

const useToggle = initialValue => {
  const [value, setValue] = useState(initialValue);
  const toggle = () => setValue(!value);
  return [value, toggle];
};

export default function App() {
  const [exerciseList, setList] = useState([]);
  const [selectedExersizeIndex, selectExersizeIndex] = useState(0);
  const [selectedUser, selectUser] = useState(userNames[0]);
  const [showMenu, toggleMenu] = useToggle(false);
  useEffect(() => {
    getExersizeList(selectedUser).then(setList);
  }, [selectedUser]);

  const selectedEx = exerciseList[selectedExersizeIndex];
  return (
    <div className="App">
      {selectedEx && (
        <Fragment>
          <SideBar
            exersizes={exerciseList}
            selectExersizeIndex={selectExersizeIndex}
          />
          <UserSelect
            userNames={userNames}
            selectedUser={selectedUser}
            selectUser={selectUser}
          />

          <main className={showMenu ? "show-menu" : ""}>
            <Text as="header" id="exersize-header">
              <button
                className="show-menu-button mobile-only"
                onClick={toggleMenu}
              >
                Show Menu
              </button>
              {selectedEx.name}
            </Text>
            <section id="graph-page">
              <header className="flex-quadrants">
                <div className="text-large">
                  <Text>One Rep Max</Text>
                  <Number>{getExersizeMaxRep(selectedEx)}</Number>
                </div>
                <div>
                  <SubText>Theoretical upper limit</SubText>
                  <SubText>lbs</SubText>
                </div>
              </header>
              <div>
                <Graph exersize={selectedEx} />
              </div>
            </section>
          </main>
        </Fragment>
      )}
    </div>
  );
}
