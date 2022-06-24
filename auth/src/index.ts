import express from "express";
import { json } from "body-parser";
import "express-async-errors";

import { currentUserRouter } from "./routes/current-user";
import { signinRouter } from "./routes/signin";
import { signupRouter } from "./routes/signup";
import { signoutRouter } from "./routes/signout";

import { errorHandler } from "./middlewares/error-handler";
import { NotFoundError } from "./errors/not-found-error";

const app = express();
app.use(json());

const authPort = 3000;

app.use(currentUserRouter);
app.use(signinRouter);
app.use(signupRouter);
app.use(signoutRouter);

app.get("*", () => {
  throw new NotFoundError();
});

app.use(errorHandler);

app.listen(authPort, () => {
  console.log(`Listening on port ${authPort}!!!`);
});
