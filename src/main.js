var express = require("express");

var app = express.createServer();

app.configure(function () {
  var pub = __dirname + "./public";
  pub = require("path").normalize(pub);
  app.set("views", __dirname + "/views");
  app.set("view engine", "jade");
});

app.use(express.bodyParser());
app.use(express.cookieParser());

app.get("/index:page?", function (req, res) {
  var page = req.param("page"),
    template = "index";
  console.log("param: " + page);
  app.get("/old", function (req, res) {
    res.redirect("/new");
  });

  app.get("/new", function (req, res) {
    res.send("Hi New Page");
    res.cookie("rememberme", 1);
  });

  if (page) template = page;

  res.render(template, {
    locals: {
      pageTitle: "Template: " + page,
    },
  });
});

app.listen(3000);

console.log("Created server running on http://localhost:3000");
