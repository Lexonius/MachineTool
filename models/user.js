import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
  name: String,
  fullCompanyName: String,
  companyName: String,
  directorName: String,
  email: String,
  password: String,
  isLegalPerson: Boolean,
  contactPhone: Number,
  companyInfo: String,
  birthDate: String,
  country: String,
  city: String,
  inn: String,
});

export default mongoose.models.User || mongoose.model("User", UserSchema);