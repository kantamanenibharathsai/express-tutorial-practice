import cookieParser from "cookie-parser";
import express from "express";
import session from "express-session";
import mongoose from "mongoose";
import passport from "passport";
import routes from "./routes/index.mjs";
import "./strategies/local-strategy.mjs";
import { mockUsers } from "./utils/constants.mjs";
const app = express(); // to create an express application we need to call this top level function

mongoose
  .connect(
    "mongodb+srv://bharathkantamaneni:mQPzHseitNBXWzSZ@cluster0.4yqzve0.mongodb.net/"
  )
  .then(() => console.log("Connected to Database"))
  .catch((err) => console.log(`Error: ${err}`));

app.use(express.json()); //use method register middleware

app.use(cookieParser("secret")); // we need to register cookieParser middleware before all the routes
app.use(
  session({
    secret: "anson the dev",
    saveUninitialized: false,
    resave: false,
    cookie: {
      maxAge: 60000 * 60,
    },
  })
);

app.use(passport.initialize());
app.use(passport.session());

app.use(routes);

// app.post("/api/auth", passport.authenticate("local"), (request, response) => {
//   response.sendStatus(200);
// });

app.get("/api/auth/status", (request, response) => {
  console.log(`Inside /auth/status endpoint`);
  console.log(request.user);
  console.log(request.session);
  return request.user ? response.send(user) : response.sendStatus(401);
});

app.post("/api/auth/logout", (request, response) => {
  if (!request.user) return response.sendStatus(401);

  request.logout((err) => {
    if (err) return response.sendStatus(400);
    response.send(200);
  });
});

const PORT = process.env.PORT || 4000;

app.listen(PORT, () => {
  console.log(`Running on Port ${PORT}`);
});

// const loggingMiddleware = (request, response, next) => {
//   console.log(`${request.method} - ${request.url}`);
//   next();
// }; //middleware will be called right before request handler is called for all the routes, middleware enabled globally

// app.use(
//   loggingMiddleware,
//   (request, response, next) => {
//     console.log("Finished Logging1...");
//     next();
//   },
//   (request, response, next) => {
//     console.log("Finished Logging2..");
//     next();
//   },
//   (request, response, next) => {
//     console.log("Finished Logging3...");
//     next();
//   } // we can as many as we can in app.use()
// ); //enabled globally

// app.get(
//   "/",
//   (request, response, next) => {
//     console.log("Base URL1");
//     next();
//   },
//   (request, response, next) => {
//     console.log("Base URL2");
//     next();
//   },
//   (request, response, next) => {
//     console.log("Base URL3");
//     next();
//   },
//   (request, response, next) => {
//     console.log("Base URL4");
//     next();
//   },
//   (request, response, next) => {
//     console.log("Base URL5");
//     next();
//   },
//   (request, response) => {
//     console.log(request.session);
//     console.log("ljkljkl", request.session.id);
//     request.session.visited = true;
//     response.cookie("Hello", "world", { maxAge: 30000, signed: true });
//     response.status(201).send({ msg: "Hello" });
//   }
// );

// // even request handlers are also middlewares we can keep next if necessary
// // session will create a cookie or it will
// // set the cookie and then the cookie will be sent to the browser or client side the client side will store the cookie and then on subsequent requests or future requests that cookie will be sent to the server assuming it has not been expired, the server offcourse will
// // go through the express session middleware and then it will validate that cookie,if the cookie is not expired or its not invalid then express session actually wont generate a new session or sessionid at all.

// app.post("/api/auth", (request, response) => {
//   const {
//     body: { username, password },
//   } = request;
//   const findUser = mockUsers.find((user) => user.username === username);
//   if (!findUser || findUser.password !== password)
//     return response.status(401).send({ msg: "BAD CREDENTIALS" });
//   request.session.user = findUser;
//   return response.status(200).send(findUser);
// });

// app.get("/api/auth/status", (request, response) => {
//   request.sessionStore.get(request.sessionID, (err, session) => {
//     console.log("sessionobj", session);
//   });
//   return request.session.user
//     ? response.status(200).send(request.session.user)
//     : response.status(401).send({ msg: "Not Authenticated" });
// });

// app.post("/api/cart", (request, response) => {
//   if (!request.session.user) return response.sendStatus(401);
//   const { body: item } = request;
//   const { cart } = request.session;
//   if (cart) cart.push(item);
//   else request.session.cart = [item];
//   return response.status(201).send(item);
// });

// app.get("/api/cart", (request, response) => {
//   if (!request.session.user) return response.sendStatus(401);
//   return response.send(request.session.cart ?? []);
// });
