const router = require("express").Router();

router.use("/", require("./swagger"));

// Define your routes here
router.get("/", (req, res) => {
  //swagger.tags = ["Home page"];
  res.send("Welcome to the home page!");
});

router.get("/about", (req, res) => {
  res.send("About us page");
});

router.use("/users", require("./users"));
module.exports = router;
