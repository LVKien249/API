const router = require("express").Router();
const VaccinationRecord = require("../models/VaccinationRecord");
const verify = require("../verifyToken");


//CREATE
router.post("/", verify, async (req, res) => {
      const newVaccinationRecord = new VaccinationRecord(req.body);
      try {
        const savedVaccinationRecord = await newVaccinationRecord.save();
        res.status(201).json(savedVaccinationRecord);
      } catch (err) {
        res.status(500).json(err);
      }
  });


//UPDATE
router.put("/:id", verify, async (req, res) => {
    
        try{
            const updateVaccinationRecord = await VaccinationRecord.findByIdAndUpdate(req.params.id, {
                $set: req.body,
            },
            {new: true}
        );
        res.status(201).json(updateVaccinationRecord);
        }
        catch (err){
            res.status(500).json(err);
        }
});


//DELETE
router.delete("/:id", verify, async (req, res) => {
    try{
        await VaccinationRecord.findByIdAndDelete(
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
        const vaccinationRecord = await VaccinationRecord.findById(req.params.id);
        res.status(201).json(vaccinationRecord);
    }
    catch (err){
        res.status(500).json(err);
    }
});


//GET ALL
router.get("/", verify, async (req, res) => {
    
        try{
            const vaccinationRecords = await VaccinationRecord.find();
            res.status(201).json(vaccinationRecords);
    }
    catch (err){
        res.status(500).json(err);
        }
});

module.exports = router;