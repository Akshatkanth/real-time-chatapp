const express = require("express");
const cors = require("cors");
const axios = require("axios");

const app = express();
app.use(express.json());
app.use(cors({ origin: true }));

app.post("/authenticate", async (req, res) => {
  const { username } = req.body;

  try {
    const r = await axios.put(
      "https://api.chatengine.io/users/",
      {
        username: username,
        secret: "pass1234", // use a generated password if needed
        first_name: username
      },
      {
        headers: {
          "Private-Key": "YOUR_CHATENGINE_PRIVATE_KEY"
        }
      }
    );

    console.log("User created or already exists:", r.data);
  } catch (e) {
    console.error("Error creating user:", e.response?.data || e.message);
    return res.status(500).json({ error: "Failed to create or fetch user" });
  }

  return res.json({ username: username, secret: "pass1234" });
});

app.listen(3001, () => {
  console.log("Server running on http://localhost:3001");
});
