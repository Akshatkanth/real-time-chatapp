const express = require("express");
const cors = require("cors");

const app = express();
app.use(express.json());
app.use(cors({ origin: true }));

app.post("/authenticate", async (req, res) => {
  const { username } = req.body;

  try{
    const r = await axios.put =
  }catch(e){

  }

  sec-c-MWFjZDVmODEtNzYxZS00OGU1LTllZTktMTlkODBjYzdmNzNh
  return res.json({ username: username, secret: "pass1234" });
});

app.listen(3001);