import "console.tap/dist-src/polyfill.js";

import React, { useState, useEffect, Fragment } from "react";
import "./styles.scss";

import { getExersizeList } from "./req";
import UserSelect from "./components/UserSelect";
import SideBar from "./components/SideBar";
import Main from "./components/Main";

const userNames = [
  "user1@fitbod.me",
  "user2@fitbod.me",
  "user7@fitbod.me"
  // "user3@fitbod.me",
  // "user5@fitbod.me",
  // "user6@fitbod.me"
];
export default function App() {
  const [exerciseList, setList] = useState([]);
  const [selectedExersizeIndex, selectExersizeIndex] = useState(0);
  const [selectedUser, selectUser] = useState(userNames[0]);

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
          <Main selectedEx={selectedEx} />
        </Fragment>
      )}
    </div>
  );
}
