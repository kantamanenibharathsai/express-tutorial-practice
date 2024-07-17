import { mockUsers } from "./constants.mjs";

export const resolveIndexByUserId = (request, response, next) => {
  const {
    params: { id },
  } = request;
  const parsedId = parseInt(id);
  if (isNaN(parsedId)) return response.sendStatus(400);

  const findUserIndex = mockUsers.findIndex((user) => user.id === parsedId);
  if (findUserIndex === -1) return response.sendStatus(404); // there is not direct way of passing data from one middleware to another middleware
  request.findUserIndex = findUserIndex;
  // next(new Error());// it will throw an error at the express level
  next();
  // attach properties dynamically to the request object
};
