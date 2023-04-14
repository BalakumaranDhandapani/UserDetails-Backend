const express = require("express");
const router = express.Router();
const Usermodel = require("../Model/model");

//Post Method
router.post("/adduser", async (req, res) => {
    //console.log(req.body)
    try {
        const data = new Usermodel({
            userid: req.body.userid,
            name: req.body.name,
            email: req.body.email,
            isDeleted: false
        })
        await data.save();
        res.status(200).json(data);
    } catch (error) {
        res.status(400).json({ message: "Something went wrong" })
    }
    //res.send("Post API");
});

//Get all Method
router.get("/getAll", async (req, res) => {
    try {
        const data = await Usermodel.find({
            $or: [
                {
                    isDeleted: false
                },
                {
                    isDeleted: { $exists: false }
                }
            ]
        });
        res.json(data);
    }
    catch (error) {
        res.status(500).json({ message: error.message })
    }
});

//Get by ID Method
router.get("/getOne/:id", async (req, res) => {
    try {
        const data = await Usermodel.findOne({
            $and: [{
                _id: req.params.id
            },
            {
                $or: [
                    {
                        isDeleted: false
                    },
                    {
                        isDeleted: { $exists: false }
                    }
                ]
            }
            ]
        });
        res.json(data);
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
});

//Update by ID Method
router.patch("/update/:id", async (req, res) => {
    try {
        const data = await Usermodel.findOneAndUpdate({ _id: req.params.id },
            {
                $set: req.body
            }
        )
        res.json({ message: "updated successfully" });
    } catch (error) {
        res.status(400).json({ message: error.message })
    }
});

//Delete by ID Method
router.delete("/delete/:id", async (req, res) => {
    try {
        const deleteops = await Usermodel.findOneAndUpdate({ _id: req.params.id },
            {
                $set: { isDeleted: true },
            }
        )
        res.json({ message: "User Deleted successfully" })
    } catch (error) {
        res.status(400).json({ message: error.message })
    }
});

module.exports = router;