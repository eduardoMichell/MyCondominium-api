const express = require("express");
const router = express.Router();
const People = require("../models/People")
const Block = require("../models/Block");


router.get("/", async (req, res) => {
    try {
        const peoples = await People.find()
        res.json(peoples)
    } catch (err) {
        res.status(500).json({message: err.message})
    }
});

router.get("/:id", async (req, res) => {
    People.findById(req.params.id).exec( (err, people) => {
        if(err){
            res.status(204).send({error: 'People Id Not Found'})
        } else {
            if(people == null){
                return res.status(404).json({ message: "Cannot find people" });
            }
            res.send(people)
        }
    })
});

router.post("/", async (req, res) => {
    const {name, ap, block} = req.body;
    let blockWithNewUser = [];
    const people = new People({name, ap, block});
    await people.save((err, doc) => {
        if (err) {
            return res.status(501).json({error: err});
        }
        Block.findById(block).exec((err, value) => {
            blockWithNewUser = value;
            blockWithNewUser.peoples.push(people)
            Block.findByIdAndUpdate(block, blockWithNewUser).exec((err, value) => {
            });
        })

        return res.status(200).json({people: doc});
    });
});

router.put("/:id", async (req, res) => {
      let people = {
        name: req.body.name,
        ap: req.body.ap,
        block: req.body.block,
    }

    People.findByIdAndUpdate({_id: req.params.id}, people, {new: true}).exec(
        (err,value) => {
            if(err){
                res.send(err)
            } else {
                res.send(value)
            }
        })
});

router.put("/updatePeople/:id", async (req, res) => {
     let people = {
        name: req.body.name,
        ap: req.body.ap,
        block: req.body.block,
    }

    People.findByIdAndUpdate({_id: req.params.id}, people, {new: true}).exec(
        (err,value) => {
            if(err){
                res.send(err)
            } else {
                res.send(value)
            }
        })
});



router.delete("/:id", async (req, res) => {
    People.findByIdAndDelete({_id: req.params.id}, (err, people) => {
        if(err){
            res.json({ people: people, success: false, msg: "Failed to delete people" });
        } else {
            res.json({ people: people, success: true, msg: "People deleted"  });
        }
    })
})

module.exports = router;
