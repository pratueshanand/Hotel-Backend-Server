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

router.put('/:id', async (req, res) => {
  try{
    const menuItemId = req.params.id;
    const updateMenuItemData = req.body;

    const response = await Menu.findByIdAndUpdate(menuItemId, updateMenuItemData, {
      new: true,
      runValidators: true
    })

    if(!response){
      return res.status(404).json({error: 'Menu Item not found'});
    }

    console.log('Menu Item Updated');
    res.status(200).json(response);
  }catch(err){
    console.log(err);
    res.status(500).json({error: 'Internal Server Error'});
  }
});

router.delete('/:id', async (req, res) => {
  try{
    const menuItemId = req.params.id;
    const response = await Menu.findByIdAndDelete(menuItemId);
    if(!response){
      return res.status(404).json({error: 'Menu Item not found'});
    }
    console.log('Menu Item Deleted');
    res.status(500).json({message: 'Menu Item Deleted successfully'});
  }catch(err){
    console.log(err);
        res.status(500).json({error: 'Internal Server Error'});
  }
})

module.exports = router;