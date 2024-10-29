const express = require("express");
const { authMiddleware } = require("./middleware/authMiddleware");

const app = express();

// Accepts any number of b in the URL: "+"
app.get("/ab+c", (req, res) => {
  res.send("Hello from any number of Bs controller!");
});

// b is optional in the URL: "?",
app.get("/ab?c", (req, res) => {
  res.send("Hello from optional b controller!");
});

// any characters of any length could be accepted in the place of *
app.get("/ab*cd", (res, req) => {
  res.send("Hello from random characters (*) controller");
});

// From the above example the URL should start from ab and end with cd,
// any character of any length could be placed in the place of *

// Accepts regex pattern as the route
app.get(/n/, (req, res) => {
  res.send(
    "Hello from the controller where it accepts any pattern that contains the character z"
  );
});

app.get(
  "/xyz",
  (req, res, next) => {
    // This callback is a middleware
    console.log("in first middleware");
    next();
  },
  (req, res) => {
    // This is the actual route handler or the controller
    res.send("From route handler or the controller!");
  }
);

app.get("/ghi", (req, res, next) => {
  // try {
  throw new Error("Default error handling");
  next();
  // } catch (err) {
  //   res.status(500).send("Internal server error!");
  // }
});

app.use("/", (err, req, res, next) => {
  console.log(err);
  if (err) {
    console.log("For generic unhandled errors", err);
    res.status(500).send("Someting went wrong.");
  }
});

app.post("/query", (req, res) => {
  console.log(req.query); // For query parameters in the URL
  res.send("query saved!");
});

app.post("/params/:userId/:password", (req, res) => {
  console.log(req.params); // For dynamic URL
  res.send("params saved!");
});

/** WORKING WITH MIDDLEWARES **/

app.get("/getUserData", authMiddleware, (req, res) => {
  res.send("User data");
});
/*************************** */

app.listen(2698, () => {
  console.log("server is listening on Port: 2698");
});
