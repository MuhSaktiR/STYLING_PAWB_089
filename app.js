const express = require("express");
const path = require("path");
const session = require("express-session");
const bodyParser = require("body-parser");
const flash = require("req-flash");

const app = express();

app.use(
  session({
    resave: false,
    saveUninitialized: false,
    secret: "t@1k0ch3ng",
    name: "secretName",
    cookie: {
      sameSite: true,
      maxAge: 1000 * 60 * 60 * 24,
    },
  })
);

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(flash());

app.use(function (req, res, next) {
  res.setHeader(
    "Cache-Control",
    "no-cache, private, no-store, must-revalidate, max-stale=0, post-check=0, pre-check=0"
  );
  res.setHeader("Pragma", "no-cache");
  next();
});

app.set("views", path.join(__dirname, "src", "views"));
app.set("view engine", "ejs");

app.use('/public', express.static(path.join(__dirname, 'src', 'public')));

const loginRoutes = require("./src/routes/router-login");
const registerRoutes = require("./src/routes/router-register");
const appRoutes = require("./src/routes/router-app");
const todoRoutes = require('./src/routes/router-todo');
const contactRoutes = require("./src/routes/router-contact");

app.use('/todo', todoRoutes);
app.use("/login", loginRoutes);
app.use("/register", registerRoutes);
app.use("/contact", contactRoutes);
app.use("/", appRoutes);

app.get('/', (req, res) => {
    if (req.session.loggedin) {
        res.render('home', {
            username: req.session.username
        });
    } else {
        res.redirect('/login');
    }
});

app.listen(3000, () => {
  console.log(`Server running at http://localhost:3000`);
});
