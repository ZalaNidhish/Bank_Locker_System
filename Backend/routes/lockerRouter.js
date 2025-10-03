const express = require("express");
const router = express.Router();
const Locker = require("../models/locker");
const User = require("../models/user");

// Create a new locker for a user
router.post("/create", async (req, res) => {
    const { password, id, items } = req.body;

    try {
        // Check if user exists
        const user = await User.findById(id);
        if (!user) {
            return res.status(404).json({ success: false, message: "User not found" });
        }

        // Verify password
        if (password !== user.password) {
            return res.status(401).json({ success: false, message: "Verification failed" });
        }

        // Create a new locker
        const newLocker = new Locker({
            userId: id,
            items: items || [], // default empty array if no items
        });

        await newLocker.save();

        // Push locker reference into user
        user.lockers.push(newLocker._id);
        await user.save();

        res.status(201).json({
            success: true,
            message: "Locker created successfully",
            username: user.username,
            lockerId: newLocker._id,
            lockers: user.lockers.length
        });
    } catch (error) {
        console.error("Error creating locker:", error);
        res.status(500).json({ success: false, message: "Server error" });
    }
});

module.exports = router;
