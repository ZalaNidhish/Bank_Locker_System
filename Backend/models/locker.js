const mongoose = require("mongoose");


function generateLockerId() {
  const date = new Date();

  const year = String(date.getFullYear()).slice(-2); // last 2 digits
  const month = String(date.getMonth() + 1).padStart(2, "0"); // 01–12
  const day = String(date.getDate()).padStart(2, "0"); // 01–31

  const randomNum = Math.floor(100000 + Math.random() * 900000); // 6-digit random

  return `LCKR-${year}${month}${day}${randomNum}`;
}

// Example usage:
console.log(generateLockerId());


const lockerSchema = new mongoose.Schema({
  lockerId: { type: String, required: true, unique: true,default:generateLockerId },   // Unique ID for the locker
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "user", required: true }, // Link to the user
  status: { type: String, enum: ["available", "maintenance"], default: "available" },
  items: [{ type: String }], // List of items stored in the locker
  history: [
    {
      action: { type: String, enum: ["deposit", "withdraw"], required: true },
      itemName: String,
      quantity: Number,
      date: { type: Date, default: Date.now }
    }
  ],

  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model("Locker", lockerSchema);
