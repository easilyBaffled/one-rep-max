import React from "react";
import MainHeader from "./Header";
import GraphPage from "./GraphPage";
import { useToggle } from "../../util";
const Main = ({ selectedEx }) => {
  const [showMenu, toggleMenu] = useToggle(false);
  return (
    <main id="main" className={showMenu ? "show-menu" : ""}>
      <MainHeader toggleMenu={toggleMenu} selectedEx={selectedEx} />
      <GraphPage selectedEx={selectedEx} />
    </main>
  );
};

export default Main;
