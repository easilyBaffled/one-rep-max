import React from "react";
import Graph from "./Graph";
import { getExersizeMaxRep } from "../../util";
import Text, { Number, SubText } from "../Text";

const GraphPage = ({ selectedEx }) => (
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
);

export default GraphPage;
