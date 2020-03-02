import React from "react";
import _ from "lodash";
import Text, { Number, SubText } from "../Text";
import { getExersizeMaxRep } from "../../util";

const ExercisesList = ({ exersizes, selectExersizeIndex }) => (
  <ul id="exercises-list">
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

export default ExercisesList;
