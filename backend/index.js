const express = require("express");
const cors = require("cors");
const axios = require("axios");

const app = express();
app.use(express.json());
app.use(cors({ origin: true }));

app.post("/authenticate", async (req, res) => {
  const { username } = req.body;

  try {
    const response = await axios.post(
      `https://ps.pndsn.com/v2/objects/sub-c-976da269-e7b9-480d-9b3c-0103dfb8faf3/users`,
      {
        id: username, // Unique user ID
        name: username,
        externalId: username,
        profileUrl: "https://www.example.com/avatar.jpg",
        custom: {} // Optional: add any custom data if needed
      },
      {
        headers: {
          "Authorization": "Bearer sec-c-MWFjZDVmODEtNzYxZS00OGU1LTllZTktMTlkODBjYzdmNzNh",
          "Content-Type": "application/json"
        }
      }
    );

    console.log("✅ User created:", response.data);
    console.log("📦 Status:", response.status);
    return res.status(response.status).json(response.data);
  } catch (error) {
    console.error("❌ Error creating user:", error.response?.data || error.message);
    const status = error.response?.status || 500;
    const data = error.response?.data || { error: "Something went wrong." };
    return res.status(status).json(data);
  }
});

app.listen(3001, () => {
  console.log("🚀 Server running on http://localhost:3001");
});
