import React from "react";
import moment from "moment";

const Text = ({ as: As = "span", ...props }) => <As {...props} />;
export const Number = ({ children = 0.0, ...props }) => (
  <Text {...props}>{children.toFixed(2)}</Text>
);
export const DateText = ({
  children = 0.0,
  formatString = "MMM Do",
  ...props
}) => <Text {...props}>{moment(children).format(formatString)}</Text>;

export const SubText = ({ className = "", ...props }) => (
  <Text className={`${className} sub-text`} {...props} />
);

export default Text;
