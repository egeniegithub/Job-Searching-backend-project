var createError = require("http-errors");
var express = require("express");
var path = require("path");
var http = require("http");
var cookieParser = require("cookie-parser");
var logger = require("morgan");
var indexRouter = require("./routes/index");

var Service = require("./routes/service");
var User = require("./routes/user");

var app = express();
var db = require("./db");
// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "hbs");
app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));
app.use("/", indexRouter);
app.use("/user", User);
app.use("/service", Service);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

app.get("/clean", (req, res) => {
  db.delete("users");
  res.send("DB clear");
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};
  // render the error page
  res.status(err.status || 500);
  res.render("error");
});
app = http.createServer(app);
app.listen(3003, () => console.log("localhost:3003"));

module.exports = app;
