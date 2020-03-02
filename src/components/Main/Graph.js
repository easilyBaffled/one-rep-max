import React from "react";
import {
  ResponsiveContainer,
  AreaChart,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Area
} from "recharts";
import moment from "moment";
import { DateText } from "../Text";

export const Tick = ({
  payload: { value },
  verticalAnchor,
  visibleTicksCount,
  ...rest
}) => (
  <DateText as="text" {...rest} dy="16" fill="white">
    {value}
  </DateText>
);

const Graph = ({ exersize }) => {
  const { name, ...entries } = exersize;
  let data = console.tap(
    Object.values(entries)
      .sort(function compare(a, b) {
        var dateA = new Date(a.date);
        var dateB = new Date(b.date);
        return dateA - dateB;
      })
      .slice(-5)
  );

  return (
    <ResponsiveContainer height={230}>
      <AreaChart width="100%" margin={{ left: -25 }} data={data}>
        <defs>
          <linearGradient id="colorUv" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#4EC183" />
            <stop offset="100%" stopColor="rgba(78, 193, 131, 0)" />
          </linearGradient>
        </defs>
        <XAxis
          tick={<Tick />}
          dataKey="performed_at"
          allowDataOverflow
          tickFormatter={date => moment(date).format("MMM Do")}
        />
        <YAxis tick={{ fill: "white" }} dataKey="weight" allowDataOverflow />

        <Tooltip />
        <Area
          type="monotone"
          dataKey="weight"
          stroke="#4EC183"
          strokeWidth="2px"
          fill="url(#colorUv)"
        />
        <CartesianGrid stroke="rgba(255, 255, 255, 0.15)" />
      </AreaChart>
    </ResponsiveContainer>
  );
};

export default Graph;
