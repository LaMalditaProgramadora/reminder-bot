import mongoose from "mongoose";

const schemaReport = {
  username: String,
  date: Date,
  detail: String,
};

const Report = mongoose.model("Report", schemaReport, "reports");

export default Report;