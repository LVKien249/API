const router = require("express").Router();
const Vaccine = require("../models/Vaccine");
const verify = require("../verifyToken");


//CREATE
router.post("/", verify, async (req, res) => {
      const newVaccine = new Vaccine(req.body);
      try {
        const savedVaccine = await newVaccine.save();
        res.status(201).json(savedVaccine);
      } catch (err) {
        res.status(500).json(err);
      }
  });


//UPDATE
router.put("/:id", verify, async (req, res) => {
    
        try{
            const updateVaccine = await Vaccine.findByIdAndUpdate(req.params.id, {
                $set: req.body,
            },
            {new: true}
        );
        res.status(201).json(updateVaccine);
        }
        catch (err){
            res.status(500).json(err);
        }
});


//DELETE
router.delete("/:id", verify, async (req, res) => {
    try{
        await Vaccine.findByIdAndDelete(
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
        const vaccine = await Vaccine.findById(req.params.id);
        res.status(201).json(vaccine);
    }
    catch (err){
        res.status(500).json(err);
    }
});


//GET ALL VACCINES
router.get("/", verify, async (req, res) => {
    
        try{
            const vaccines = await Vaccine.find();
            res.status(201).json(vaccines);
    }
    catch (err){
        res.status(500).json(err);
        }
});

module.exports = router;