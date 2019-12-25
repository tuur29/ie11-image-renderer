const express = require("express");
const browser = require("./browser");
const bodyParser = require('body-parser');

const app = express();
app.use(bodyParser.json());
app.use(express.static("public"));

app.set("views", __dirname + "/../../views");
app.set("view engine", "ejs");

app.get("/", (req, res) => {
  res.render("index");
});

app.get("/:url", (req, res) => {
  const { url } = req.params;
  res.render("image", {
    title: url,
    url: url,
  });
});

app.post("/", async (req, res) => {
  const { width, height, url } = req.body;
  const { title, image } = await browser(url, width, height);

  res.send({
    title,
    image
  });
});

app.listen(process.env.PORT || 3000);
