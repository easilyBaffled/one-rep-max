import React from "react";
import { SubText } from "../Text";
import Logo from "./Logo";
import ExercisesList from "./ExercisesList";

const SideBar = ({ exersizes, selectExersizeIndex }) => (
  <aside id="sidebar-menu">
    <SubText id="menu-title">YOUR EXERCISES</SubText>
    <ExercisesList
      exersizes={exersizes}
      selectExersizeIndex={selectExersizeIndex}
    />
    <Logo id="fitbod-logo" />
  </aside>
);

export default SideBar;
