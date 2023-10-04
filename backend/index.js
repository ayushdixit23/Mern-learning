const express = require("express")
const cors = require("cors")
const bcrypt = require("bcrypt")
const mongoose = require("mongoose")
const multer = require("multer")
const User = require("./models/User")
const port = process.env.PORT || 5000

const app = express()
app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: true }));


mongoose.connect("mongodb://127.0.0.1:27017/User").then(() => { console.log("Connected to Mongodb") }).catch((err) => console.log(err, "Error to Connecting Mongodb"))

const storage = multer.diskStorage({
	destination: (req, file, cb) => {
		cb(null, "uploads/")
	},
	filename: (req, file, cb) => {
		cb(null, file.originalname)
	},
})

const upload = multer({ storage: storage })

app.post("/Signup", upload.single("myFile"), async (req, res) => {
	try {
		const newUser = new User({
			email: req.body.email,
			name: req.body.name,
			password: req.body.password,
			cpassword: req.body.cpassword,
			images: [{
				originalname: req.body.originalname,
				filename: req.body.filename,
				mimetype: req.body.mimetype,
				size: req.body.size,
			}],
		})
		await newUser.save()
		if (newUser) {
			res.json({ user: "added" })
		} else {
			res.json({ user: "notAdded" })
		}

	} catch (err) {
		console.log(err)
	}
})

app.post("/login", async (req, res) => {
	const { email, password } = req.body
	try {
		const check = await User.findOne({ email: email, password: password })
		if (check) {
			res.json({ "user": "exists" })
		} else {
			res.json({ "user": "not exist" })
		}
	} catch (err) {
		console.log(err)
	}
})

app.listen(port, (err) => {
	if (err) throw err
	console.log(`Connected at port => ${port}`)
})