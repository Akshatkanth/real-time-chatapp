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
      'https://api.chatengine.io/users/',
      {
        username: username,
        secret: username,
        first_name: username
      },
      {
        headers: {
          "private-key": "sec-c-MWFjZDVmODEtNzYxZS00OGU1LTllZTktMTlkODBjYzdmNzNh"
        }
      }
    );

    console.log("✅ Response from ChatEngine:", r.data); // Debug log
    return res.status(r.status).json(r.data);

  } catch (e) {
    // Log the error details
    console.error("❌ Error from ChatEngine:", e?.response?.data || e.message);

    // Safely handle missing response
    const status = e?.response?.status || 500;
    const data = e?.response?.data || { error: "Something went wrong." };
    return res.status(status).json(data);
  }
});

app.listen(3001, () => {
  console.log("🚀 Server running on http://localhost:3001");
});
