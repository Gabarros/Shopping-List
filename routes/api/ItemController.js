const express = require('express');
const router = express.Router();

// Item Model

const Item = require('../../models/Item');

// @route GET api/items
// @desc GET all items
//@access Public

router.get('/', (req, res) => {
    Item
        .find()
        .sort({ date: -1 })
        .then(items => {
            res.json(items)
        });

});


// @route POST api/items
// @desc CREATE a Item
//@access Public

router.post('/', (req, res) => {
    const newItem = new Item({
        name: req.body.name
    });

    newItem.save().then(item => {
        res.json(item);
    })


});

// @route DELETE api/items/:id
// @desc DELETE a Item
//@access Public

router.delete('/:id', (req, res) => {
    const id = req.params.id;

    Item.findById(id).then(item => {

      Item.deleteOne(item).then(()=>{
          res.json(item);
      })

}).catch(err=> res.status(404).json({sucess: false}));
});


module.exports = router;