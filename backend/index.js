const express = require("express");

const app = express();

app.use(express.urlencoded());

const PORT = process.env.PORT || 8000;

app.get("/", (req, res) => {
  res.json({ msg: "success" });
});

app.listen(PORT, () => {
  console.log(`server running at port ${PORT}`);
});
