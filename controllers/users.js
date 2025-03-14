const mongodb = require("../data/database");
const ObjectId = require("mongodb").ObjectId;

const getAll = async (req, res) => {
  const result = await mongodb.getDatabase().collection("users").find();
  result.toArray().then((users) => {
    res.setHeader("Content-Type", "application/json");
    res.status(200).json(users);
  });
};

const getSingle = async (req, res) => {
  const userid = new ObjectId(req.params.id);
  const result = await mongodb
    .getDatabase()
    .collection("users")
    .find({ _id: userid });
  result.toArray().then((users) => {
    res.setHeader("Content-Type", "application/json");
    res.status(200).json(users[0]);
  });
};

const createUser = async (req, res) => {
  const user = {
    name: req.body.name,
    username: req.body.username,
    email: req.body.email,
    ipaddress: req.body.ipaddress,
  };
  const result = await mongodb
    .getDatabase()
    .collection("users")
    .insertOne(user);
  if (result.acknowledged) {
    res.status(204).send();
  } else {
    res
      .status(500)
      .json(result.error || "Something went wrong with creating the user");
  }
};

const updateUser = async (req, res) => {
  const userid = new ObjectId(req.params.id);
  const user = {
    email: req.body.email,
    username: req.body.username,
    name: req.body.name,
    ipaddress: req.body.ipaddress,
  };
  const result = await mongodb
    .getDatabase()
    .collection("users")
    .updateOne({ _id: userid }, { $set: user }); // Fixed: Use updateOne instead of replaceOne

  if (result.modifiedCount > 0) {
    res.status(204).send();
  } else {
    res
      .status(500)
      .json(result.error || "Something went wrong with updating the user");
  }
};

const deleteUser = async (req, res) => {
  const userid = new ObjectId(req.params.id);
  const result = await mongodb
    .getDatabase()
    .collection("users")
    .deleteOne({ _id: userid });

  if (result.deletedCount > 0) {
    res.status(204).send();
  } else {
    res
      .status(500)
      .json(result.error || "Something went wrong with deleting the user");
  }
};

module.exports = {
  getAll,
  getSingle,
  createUser,
  updateUser,
  deleteUser,
};
