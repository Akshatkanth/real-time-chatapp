const express = require("express");
const cors = require("cors");
const PubNub = require("pubnub");

const app = express();
app.use(express.json());
app.use(cors({ origin: true }));

// Initialize the PubNub client with your keys
const pubnub = new PubNub({
  subscribeKey: 'sub-c-976da269-e7b9-480d-9b3c-0103dfb8faf3',
  publishKey: 'pub-c-34a9e494-db68-4fee-b86b-20ff59680e7a',  
  secretKey: 'sec-c-MWFjZDVmODEtNzYxZS00OGU1LTllZTktMTlkODBjYzdmNzNh',  
  uuid: 'server'  // Set your UUID for server-side operations
});

// Handle the user creation request
app.post("/authenticate", async (req, res) => {
  const { username } = req.body; // Only using 'username' from the body

  if (!username) {
    return res.status(400).json({ error: "Username is required" });
  }

  try {
    // Create or update user using the PubNub SDK
    const result = await pubnub.objects.setUUIDMetadata({
      uuid: username,  // Use the username as UUID
      data: {
        name: username,  // Set 'name' to the username
        externalId: username,  // Set 'externalId' to the username
        custom: {
          profileUrl: "https://www.example.com/avatar.jpg"  // Optional profile picture URL
        }
      }
    });

    // Log result for debugging
    console.log("User created:", result);

    // Respond with the result
    res.status(200).json(result);
  } catch (error) {
    console.error("PubNub error:", error);  // Detailed error logging
    if (error.response) {
      console.error("Response Error:", error.response.data);  // Log the actual response error
      return res.status(error.response.status).json(error.response.data);  // Return response from PubNub
    } else {
      console.error("Error without response:", error);  // For errors without response object
      return res.status(500).json({ error: "Failed to create user" });
    }
  }
});

// Start the Express server
app.listen(3001, () => {
  console.log("Server running on http://localhost:3001");
});
