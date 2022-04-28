const express = require("express");
const app = express();
const port = 3000;
// app.get("/", (req, res) => res.send("Hello World!"));
app.use(express.static("pages"));
app.set('view engine', 'html')
// app.get("/", (req, res) => res.json("data:success"));
app.get("/trang-chu", (req,res) => res.redirect("https://google.com"));
app.get("/", function (req, res) {
  res.render("index.html");
});
app.listen(port, () => console.log(`Example app listening on port ${port}!`));
