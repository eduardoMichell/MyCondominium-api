const express = require("express");
const router = express.Router();
const Block = require("../models/Block");
const People = require("../models/People");


router.get("/", async (req, res) => {
    try {
        const blocks = await Block.find()
        res.json(blocks)
    } catch (err) {
        res.status(500).json({message: err.message})
    }
});

router.get("/:id", async (req, res) => {
    Block.findById(req.params.id).exec( (err, block) => {
        if(err){
            res.status(204).send({error: 'Block Id Not Found'})
        } else {
            if(block == null){
                return res.status(404).json({ message: "Cannot find Block" });
            }
            res.send(block)
        }
    })
});

router.post("/", async (req, res) => {
    const {name} = req.body;

    const block = new Block({name});
    await block.save((err, doc) => {
        if (err) {
            return res.status(501).json({error: err});
        }
        return res.status(200).json({user: doc});
    });
});

router.put("/:id", async (req, res) => {
        let block = {
        name: req.body.name,
        peoples: req.body.peoples,
    }


    Block.findByIdAndUpdate({_id: req.params.id}, block, {new: true}).exec(
        (err,value) => {
            if(err){
                res.send(err)
            } else {
                res.send(value)
            }
    })

});

router.delete("/:id", async (req, res) => {
    Block.findByIdAndDelete({_id: req.params.id}, (err, block) => {
        if(err){
            res.json({ block: block, success: false, msg: "Failed to delete block" });
        } else {
            res.json({ block: block, success: true, msg: "Block deleted"  });
        }
    })
});

module.exports = router;
