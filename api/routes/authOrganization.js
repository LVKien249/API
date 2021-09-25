const router = require("express").Router();
const OrganizationAccount = require("../models/OrganizationAccount");
const CryptoJS = require("crypto-js");
const jwt = require("jsonwebtoken");

//REGISTER
router.post("/register", async (req, res) => {
  const newAccount = new OrganizationAccount({
    organizationName: req.body.organizationName,
    address: req.body.address,
    representative: req.body.representative,
    phoneNumber: req.body.phoneNumber,
    city: req.body.city,
    province: req.body.province,
    wards: req.body.wards,
    email: req.body.email,
    password: CryptoJS.AES.encrypt(
        req.body.password,
        process.env.SECRET_KEY
    ).toString(),
    permission: req.body.permission,
    isHealthOrganization: req.body.isHealthOrganization
  });
  try {
    const account = await newAccount.save();
    res.status(201).json(account);
  } catch (err) {
    res.status(500).json(err);
  }
});


//LOGIN
router.post("/login", async (req, res) => {
    try {
      const account = await OrganizationAccount.findOne({ email: req.body.email });
      !account && res.status(401).json("Wrong password or username!");
  
      const bytes = CryptoJS.AES.decrypt(account.password, process.env.SECRET_KEY);
      const originalPassword = bytes.toString(CryptoJS.enc.Utf8);
  
      originalPassword !== req.body.password &&
        res.status(401).json("Wrong password or username!");
  
      const accessToken = jwt.sign(
        { id: account._id, isHealthOrganization: account.isHealthOrganization },
        process.env.SECRET_KEY,
        { expiresIn: "5d" }
      );
  
      const { password, ...info } = account._doc;
  
      res.status(200).json({ ...info, accessToken });
    } catch (err) {
      res.status(500).json(err);
    }
});



module.exports = router;