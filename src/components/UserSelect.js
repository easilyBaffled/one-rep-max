import React from "react";
import { unwrapEvent } from "../util";

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

export default UserSelect;
