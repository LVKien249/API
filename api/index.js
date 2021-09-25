const express = require("express");
const app = express();
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const authOrganizationRoute = require("./routes/authOrganization");
const orAccountRoute = require("./routes/organizationAccounts");
const vaccineRoute = require("./routes/vaccines");
const permissionRoute = require("./routes/permissions");
const vaccinationRecordRoute = require("./routes/vaccinationRecords");

dotenv.config();

mongoose.connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("DB Connection Successfull"))
  .catch((err) => {
    console.error(err);
  });

app.use(express.json());

app.use("/api/authOrganization", authOrganizationRoute);
app.use("/api/organizationAccounts", orAccountRoute);
app.use("/api/vaccines", vaccineRoute);
app.use("/api/permissions", permissionRoute);
app.use("/api/vaccinationRecords", vaccinationRecordRoute);

app.listen(8800, () => {
    console.log("Running");
});

