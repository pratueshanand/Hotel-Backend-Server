const express = require('express');
const router = express.Router();
const Menu = require('./../models/menu');

router.get('/', async (req, res) => {
    try{
      const data = await Menu.find();
      console.log('data fetched');
      res.status(200).json(data);
    }catch(err){
      console.log(err);
      res.status(500).json({error: 'Internal Server Error'});
    }
});

router.get('/:tastetype', async(req, res) => {
    try{
        const tasteType = req.params.tastetype;
        if(tasteType == 'sweet' || tasteType == 'sour' || tasteType == 'spicy'){
            const data = await Menu.find({taste: tasteType});
            console.log('data fetched');
            res.status(200).json(data);
        }
        else{
            res.status(404).json('Invalid Taste Type');
        }
        
    }catch(err){
        console.log(err);
        res.status(500).json('Internal Server Error');
    }
})
  
router.post('/', async (req, res) => {
    try{
      const data = req.body;
      const newMenu = new Menu(data);
      const response = await newMenu.save();
  
      console.log('menu saved');
      res.status(200).json(response);
    }catch(err){
      console.log(err);
      res.status(500).json({error: 'Internal Error occured'});
    }
});

module.exports = router;