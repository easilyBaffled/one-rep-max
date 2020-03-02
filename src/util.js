import { useState } from "react";
import _ from "lodash";

export const unwrapEvent = func => e => func(e.target.value);

// const mapObject = (obj, mapper) =>
//   Object.fromEntries(Object.entries(obj).map(mapper));

const mapObjectValues = (obj, mapper) =>
  Object.fromEntries(Object.entries(obj).map(([k, v]) => [k, mapper(v)]));

export const calculateOneRepMax = ({ reps, weight }) =>
  weight / (1.0278 - 0.0278 * reps);

export const addReps = ({ name, ...workouts }) => ({
  name,
  ...mapObjectValues(workouts, entry => ({
    ...entry,
    repMax: calculateOneRepMax(entry)
  }))
});

export const getExersizeMaxRep = ({ name, ...exersize }) =>
  _.sortBy(Object.values(exersize), "repMax").slice(-1)[0].repMax;

// const exampleEntry = {
//   created_at: "2020-01-07T18:37:12.141Z",
//   exercise_id: 1,
//   id: 4465,
//   performed_at: "2018-04-27T13:57:33.973Z",
//   repMax: 180.04801280341425,
//   reps: 10,
//   updated_at: "2020-01-07T18:37:12.141Z",
//   weight: 135,
//   workout_id: 155
// };

export const useToggle = initialValue => {
  const [value, setValue] = useState(initialValue);
  const toggle = () => setValue(!value);
  return [value, toggle];
};
