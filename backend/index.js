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
      `https://ps.pndsn.com/v1/objects/pub-c-34a9e494-db68-4fee-b86b-20ff59680e7a/users`,
      {
        // Body of the request with user data
        data: {
          id: username,  // The user id, usually a username
          name: username,
          external_id: username,
          profile_url: "https://www.example.com/avatar.jpg", // Optional, can be user profile image URL
        },
      },
      {
        headers: {
          "Authorization": "Bearer sec-c-MWFjZDVmODEtNzYxZS00OGU1LTllZTktMTlkODBjYzdmNzNh",  // PubNub private key
          "Content-Type": "application/json",
        },
      }
    );
    
    // Log response data (for debugging)
    console.log("User created:", response.data);
    
    return res.status(response.status).json(response.data);
  } catch (error) {
    console.error("Error creating user:", error.response?.data || error.message);
    
    // Send error response
    const status = error.response?.status || 500;
    const data = error.response?.data || { error: "Something went wrong." };
    return res.status(status).json(data);
  }
});

app.listen(3001, () => {
  console.log("Server running on http://localhost:3001");
});
