const express = require("express");
const ObjectId = require("mongodb").ObjectId;
require("dotenv").config();
const cors = require("cors");
const { MongoClient } = require("mongodb");
const app = express();
const port = 8000;
app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Hello World!");
});
const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@cluster0.sz6ue.mongodb.net/${process.env.DB_Name}?retryWrites=true&w=majority`;

const client = new MongoClient(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const run = async () => {
  try {
    await client.connect();
    const database = client.db(process.env.DB_NAME);
    const events = database.collection("events");
    const registration = database.collection("registration");

    app.get("/events", async (req, res) => {
      const result = await events.find({}).toArray();
      res.send(result);
    });

    app.get("/register/", async (req, res) => {
      const result = await registration.find({}).toArray();
      res.json(result);
    });

    app.post("/register/", async (req, res) => {
      const result = await registration.insertOne(req.body);
      res.json(result);
    });

    app.delete(`/register/:id`, async (req, res) => {
      const id = req.params.id;
      const query = { _id: ObjectId(id) };
      const result = await registration.deleteOne(query);
      res.json(result);
    });

    app.post(`/events/`, async (req, res) => {
      const query = { email: { $in: [req.body.email] } };
      const result = await registration.find(query).toArray();
      res.json(result);
    });

    app.delete(`/events/:id`, async (req, res) => {
      const query = { _id: ObjectId(req.params.id) };
      const result = await registration.deleteOne(query);
      res.json(result);
    });
  } finally {
  }
};
run().catch(console.dir);

app.listen(port, () => {
  console.log(`Volunteer app listening at http://localhost:${port}`);
});
