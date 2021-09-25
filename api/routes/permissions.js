const router = require("express").Router();
const Permission = require("../models/Permission");
const verify = require("../verifyToken");


//CREATE
router.post("/", verify, async (req, res) => {
      const newPermission = new Permission(req.body);
      try {
        const savedPermission = await newPermission.save();
        res.status(201).json(savedPermission);
      } catch (err) {
        res.status(500).json(err);
      }
  });


//UPDATE
router.put("/:id", verify, async (req, res) => {
        try{
            const updatePermission = await Permission.findByIdAndUpdate(req.params.id, {
                $set: req.body,
            },
            {new: true}
        );
        res.status(201).json(updatePermission);
        }
        catch (err){
            res.status(500).json(err);
        }
});


//DELETE
router.delete("/:id", verify, async (req, res) => {
    try{
        await Permission.findByIdAndDelete(
            req.params.id
        );
        res.status(201).json("Has been deleted");
    }
    catch (err){
        res.status(500).json(err);
    }
});


//GET
router.get("/find/:id", verify, async (req, res) => {
    try{
        const permission = await Permission.findById(req.params.id);
        res.status(201).json(permission);
    }
    catch (err){
        res.status(500).json(err);
    }
});


//GET ALL 
router.get("/", verify, async (req, res) => {
    
        try{
            const permissions = await Permission.find();
            res.status(201).json(permissions);
    }
    catch (err){
        res.status(500).json(err);
        }
});

module.exports = router;