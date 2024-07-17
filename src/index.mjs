import cookieParser from "cookie-parser";
import express from "express";
import session from "express-session";
import routes from "./routes/index.mjs";
const app = express(); // to create an express application we need to call this top level function

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
app.use(routes);

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

app.get(
  "/",
  (request, response, next) => {
    console.log("Base URL1");
    next();
  },
  (request, response, next) => {
    console.log("Base URL2");
    next();
  },
  (request, response, next) => {
    console.log("Base URL3");
    next();
  },
  (request, response, next) => {
    console.log("Base URL4");
    next();
  },
  (request, response, next) => {
    console.log("Base URL5");
    next();
  },
  (request, response) => {
    console.log(request.session);
    console.log("ljkljkl", request.session.id);
    request.session.visited = true;
    response.cookie("Hello", "world", { maxAge: 30000, signed: true });
    response.status(201).send({ msg: "Hello" });
  }
);

// even request handlers are also middlewares we can keep next if necessary
// session will create a cookie or it will
// set the cookie and then the cookie will be sent to the browser or client side the client side will store the cookie and then on subsequent requests or future requests that cookie will be sent to the server assuming it has not been expired, the server offcourse will
// go through the express session middleware and then it will validate that cookie,if the cookie is not expired or its not invalid then express session actually wont generate a new session or sessionid at all.

app.post("/api/auth", (request, response) => {
  const { body } = request;
});
