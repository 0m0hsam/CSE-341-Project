const { response } = require('express');
const mongodb = require('../data/database');
const ObjectId = require('mongodb').ObjectId;

const getAll = async(req, res) => {
    const result = await mongodb.getDatabase().db().collection('users').find();
    result.toArray().then((users) => {
        res.setHeader('Content-Type', 'application/json');
        res.status(200).json(users);
    });
};

const getSingle = async(req, res) => {
    const userid = new ObjectId(req.params.id);
    const result = await mongodb.getDatabase().db().collection('users').find({ _id: userid });
    result.toArray().then((users) => {
        res.setHeader('Content-Type', 'application/json');
        res.status(200).json(users[0]);
    });
  
};

const createUser = async (req,res) => {
    const user = {
        name: req.body.name,
        username : req.body.username,
        email : req.body.email,
        ipaddress : req.body.ipaddress
    };
    const result = await mongodb.getDatabase().db().collection('users').insertOne(user);
    if(response.modifiedCount){
        res.status(204).send();
    }else{
        res.status(500).json(response.error || 'Something went wrong with updating the user');
    }
};

const updateUser = async (req, res) => {
    const userid = new ObjectId(req.params.id);
    const user = {
        name: req.body.name,
        username : req.body.username,
        email : req.body.email,
        ipaddress : req.body.ipaddress
    };
    const result = await mongodb.getDatabase().db().collection('users').replaceOne({ _id: userid }, { $set: user });
    if(response.modifiedCount > 0){
        res.status(204).send();
    }else{
        res.status(500).json(response.error || 'Something went wrong with updating the user');
    }
};

const deleteUser = async (req, res) => {
    const userid = new ObjectId(req.params.id);
    const result = await mongodb.getDatabase().db().collection('users').deleteOne({ _id: userid });
    if(response.deletedCount > 0){
        res.status(204).send();
    }else{
        res.status(500).json(response.error || 'Something went wrong with deleting the user');
    }
};


module.exports = {
    getAll,
    getSingle,
    createUser,
    updateUser,
    deleteUser
};