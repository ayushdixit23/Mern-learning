const mongoose = require("mongoose")

const imageSchema = new mongoose.Schema({
	originalname: String,
	filename: String,
	mimetype: String,
	size: Number,
});

const MySchema = new mongoose.Schema({
	name: String,
	email: {
		type: String,
	},
	password: String,
	cpassword: String,
	images: [imageSchema],
})

const User = new mongoose.model("user", MySchema)

module.exports = User