import base64 from "base-64";
import { baseUrl, apiV1 } from "./config";
import { addReps } from "./util";
// const joinPath = (...urlParts) => urlParts.join("/").replace(/\/\//g, "/");
console.tap.label = str => (...args) => console.tap(...args, str);
const req = (strings, ...values) => {
  const url = strings
    .reduce((acc, str, i) => acc + str + (values[i] || ""), `/${apiV1}/`)
    .replace(/\/\//g, "/");

  return (userName, config = {}) => {
    return (
      fetch(baseUrl + url + ".json", {
        mode: "cors",
        headers: new Headers({
          // Host: baseUrl,
          Authorization: `Basic ${base64.encode(`${userName}:workfit`)}`,
          "Content-type": "application/json"
        }),
        ...config
      })
        .then(response => {
          // console.log(url, userName, response);
          if (response.status >= 400) throw new Error(JSON.stringify(response));
          if (response.status === 302 || response.type === "opaque")
            return true;
          return response.json();
        })
        // .then(res => console.tap(res, url))
        .catch(console.error.tap)
    );
  };
};

export const getExersizes = req`exercises`;
export const getExersize = exersizeId => req`exercises/${exersizeId}`;

export const getUserWorkouts = (userName, selectedUserId) =>
  req`users/${selectedUserId}/workouts`(userName);

export const getUsers = req`users`;

export const getUsersExersizes = (userName, userId, workoutId) =>
  req`users/${userId}/workouts/${workoutId}/single_sets`(userName);

export const user_workout_single_set = (
  userName,
  userId,
  workoutId,
  exersizeId
) =>
  req`users/${userId}/workouts/${workoutId}/single_sets/${exersizeId}`(
    userName
  );

export async function getExersizeList(userName, selectedExersize) {
  const exercises = await getExersizes(userName);

  const { id: userId } = await getUsers(userName).then(
    findSelectedUserData(userName)
  );
  const { id: workoutId } = await getUserWorkouts(userName, userId).then(
    wks => wks[0]
  );

  return await getUserWorkouts(userName, userId)
    .then(workouts =>
      Promise.all(
        workouts.map(({ id }) => getUsersExersizes(userName, userId, id))
      )
    )
    .then(allExersizes =>
      allExersizes.flat().reduce(
        (acc, ex) => ({
          ...acc,
          [ex.exercise_id]: Object.assign(acc[ex.exercise_id] || {}, {
            [ex.performed_at]: ex
          })
        }),
        {}
      )
    )
    .then(allExersizes =>
      Promise.all(
        Object.keys(allExersizes).map(exercise_id =>
          getExersize(exercise_id)(userName)
        )
      )
        .then(console.tap.label("before merge"))
        .then(exs => exs.forEach(ex => (allExersizes[ex.id].name = ex.name)))
        .then(() => Object.values(allExersizes).map(addReps))
    )
    .then(res => console.tap(res, "res"));
}

const findSelectedUserData = userName => (users = []) =>
  users.find(u => u.email === userName);

export default req;
