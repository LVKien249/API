const router = require("express").Router();
const orAccount = require("../models/OrganizationAccount");
const CryptoJS = require("crypto-js");
const verify = require("../verifyToken");


//UPDATE
router.put("/:id", verify, async (req, res) => {
  if (req.account.id === req.params.id || req.account.isHealthOrganization) {
    if (req.body.password) {
      req.body.password = CryptoJS.AES.encrypt(
        req.body.password,
        process.env.SECRET_KEY
      ).toString();
    }

    try {
      const updatedAccount = await orAccount.findByIdAndUpdate(
        req.params.id,
        {
          $set: req.body,
        },
        { new: true }
      );
      res.status(200).json(updatedAccount);
    } catch (err) {
      res.status(500).json(err);
    }
  } else {
    res.status(403).json("You can update only your account!");
  }
});

//DELETE
router.delete("/:id", verify, async (req, res) => {
  if (req.account.id === req.params.id || req.account.isHealthOrganization) {
    try {
      await orAccount.findByIdAndDelete(req.params.id);
      res.status(200).json("User has been deleted...");
    } catch (err) {
      res.status(500).json(err);
    }
  } else {
    res.status(403).json("You can delete only your account!");
  }
});

//GET

router.get("/find/:id", async (req, res) => {
  try {
    const account = await orAccount.findById(req.params.id);
    const { password, ...info } = account._doc;
    res.status(200).json(info);
  } catch (err) {
    res.status(500).json(err);
  }
});

//GET ALL
router.get("/", verify, async (req, res) => {
  const query = req.query.new;
  if (req.account.isHealthOrganization) {
    try {
      const accounts = query
        ? await orAccount.find().sort({ _id: -1 }).limit(5)
        : await orAccount.find();
      res.status(200).json(accounts);
    } catch (err) {
      res.status(500).json(err);
    }
  } else {
    res.status(403).json("You are not allowed to see all users!");
  }
});


module.exports = router;