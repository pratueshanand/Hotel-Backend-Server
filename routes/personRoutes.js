const express = require('express');
const router = express.Router();
const Person = require('./../models/person');

router.post('/', async (req, res) => {
    try{
      const data = req.body;
      const newPerson = new Person(data); 
      const response = await newPerson.save();
  
      console.log('data saved');
      res.status(200).json(response);
    }catch(err){
      console.log(err);
      res.status(500).json({error: 'Internal Error occured'});
    }
});

router.get('/', async (req, res) => {
    try{
      const data = await Person.find();
      console.log('data fetched');
      res.status(200).json(data);
    }catch(err){
      console.log(err);
      res.status(500).json({error: 'Internal Server Error'});
    }
});

router.get('/:worktype', async (req, res) => {
    try{
      const workType = req.params.worktype;
      if(workType == "chef" || workType == "manager" || workType == 'waiter'){
        const data = await Person.find({work: workType});
        console.log('data fetched');
        res.status(200).json(data);
      }
      else{
        res.status(404).json({error: 'Invalid Work Type'});
      }
    }catch(err){
      console.log(err);
      res.status(500).json({error: 'Internal Server Error'});
    }
});

router.put('/:id', async (req, res) => {
    try{
        const personId = req.params.id;
        const updatedPersonData = req.body;

        const response = await Person.findByIdAndUpdate(personId, updatedPersonData, {
            new: true,
            runValidators: true
        });

        if(!response){
            return res.status(404).json({error: 'Person not found'})
        }

        console.log('Data Updated');
        res.status(200).json(response);
    }catch(err){
        console.log(err);
        res.status(500).json({error: 'Internal Server Error'});
    }
})

router.delete('/:id', async (req, res) => {
    try{
        const personId = req.params.id;
        const response = await Person.findByIdAndDelete(personId);
        if(!response){
            return res.status(404).json({error: 'Person not found'})
        }
        console.log('Data Deleted');
        res.status(200).json({message: 'person Deleted Successfully'});
    }catch(err){
        console.log(err);
        res.status(500).json({error: 'Internal Server Error'});
    }
})

module.exports = router;