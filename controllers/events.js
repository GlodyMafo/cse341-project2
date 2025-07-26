const mongodb = require('../data/database.js');
const ObjectId = require ('mongodb').ObjectId;

const getAll = async (req, res)=>{

     // swaggerAutogen.tags=["events"]


const result = await mongodb.getDatabase().db().collection('events').find();

result.toArray().then((events)=>{
res.setHeader('content-type','application/json');
res.status(200).json(events);

})

}

const getSingle = async (req, res)=>{

     // swaggerAutogen.tags=["events"]


    const eventId = new ObjectId(req.params.id);
const result = await mongodb.getDatabase().db().collection('events').find({_id : eventId});

result.toArray().then((events)=>{
res.setHeader('content-type','application/json');
res.status(200).json(events[0]);

})

}


const createEvent = async (req, res)=> {

    // swaggerAutogen.tags=["events"]

const event = {
  
title:req.body.title,
description:req.body.description,
location:req.body.location,
date:new Date(req.body.date),
capacity:req.body.capacity,
ticketPrice:req.body.ticketPrice,
organizer:req.body.organizer,
createdAt:new Date()

}

const response = await mongodb.getDatabase().db().collection('events').insertOne(event);

if(response.acknowledged){
    res.status(204).send();
}
else{
    res.status(500).json(response.error || `can't create the event some error occured`)
}

}


const updateEvent = async (req, res)=> {

     // swaggerAutogen.tags=["events"]

const eventId = new ObjectId (req.params.id);

const event = {
  
title:req.body.title,
description:req.body.description,
location:req.body.location,
date:new Date(req.body.date),
capacity:req.body.capacity,
ticketPrice:req.body.ticketPrice,
organizer:req.body.organizer,
createdAt:new Date(),
updatedAt:new Date()

}

const response = await mongodb.getDatabase().db().collection('events').replaceOne({_id:eventId}, event);

if(response.modifiedCount){
    res.status(204).send();
}
else{
    res.status(500).json(response.error || `can't update the event some error occured`)
}

}

const deleteEvent = async (req,res)=>{

     // swaggerAutogen.tags=["events"]

    const eventId = new ObjectId (req.params.id);
    const response = await mongodb.getDatabase().db().collection('events').deleteOne({_id:eventId});
    if(response.deletedCount > 0){
    res.status(204).send();
}
else{
    res.status(500).json(response.error || `can't delete this event some error occured`)
}
}

module.exports ={
    getAll,
    getSingle,
    createEvent,
    updateEvent,
    deleteEvent
}