import React from "react";
import Text from "../Text";
import MenuButton from "./MenuButton";
const Header = ({ toggleMenu, selectedEx }) => (
  <Text as="header" id="exersize-header">
    <MenuButton className="show-menu-button mobile-only" onClick={toggleMenu} />
    {selectedEx.name}
  </Text>
);

export default Header;
