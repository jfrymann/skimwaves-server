import express from "express";
import db from "../db/conn.js";
import { ObjectId } from "mongodb";

const router = express.Router();

router.get("/", async (req, res) => {
  let collection = await db.collection("spots");
  let results = await collection.find({})
    .toArray();
  res.send(results).status(200);
});

// Get a single spot
router.get("/spot-info/:slug/:_id", async (req, res) => {
  let collection = await db.collection("spots");
  let query = { _id: new ObjectId(req.params._id) };
  let result = await collection.findOne(query);

  if (!result) res.send("Not found").status(404);
  else res.send(result).status(200);
});

router.get("/spot-info/edit/:slug/:_id", async (req, res) => {
  console.log('getting ' + req.params.slug)

  let collection = await db.collection("spots");
  let query = { _id: new ObjectId(req.params._id) };
  let result = await collection.findOne(query);
});

router.patch("/spot-info/edit/:slug/:_id", async (req, res) => {
  let collection = await db.collection("spots");
  collection.updateOne(
    { _id: new ObjectId(req.params._id) },
    {
      $set: {
        spotName: req.body.spotName,
        description: req.body.description,
        bestTide: req.body.bestTide,
        bestHeight: req.body.bestHeight,
        "location.coordinates": [req.body.location.coordinates[0], req.body.location.coordinates[1]],
      }
    }
  )
});

export default router;
