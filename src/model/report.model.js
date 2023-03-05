import mongoose from "mongoose";

await mongoose.connect(process.env.MONGODB_URL);

const schemaReport = {
  username: String,
  date: Date,
  detail: String,
};

const Report = mongoose.model("Report", schemaReport, "reports");

export default Report;