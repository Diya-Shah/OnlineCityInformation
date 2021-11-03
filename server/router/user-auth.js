const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');

require('../db/connectdb');
var { User } = require("../model/schema");
var { City } = require("../model/schema");
var { Place } = require("../model/schema");
var { Food } = require("../model/schema");

router.post('/signup', async (req, res) => {
    const { name, email, password, cpassword, gender, contactNumber } = req.body;
    if (!name || !email || !password || !cpassword || !gender || !contactNumber) {
        return res.status(422).json({ error: "All fields are required" });
    }
    try {
        const userExist = await User.findOne({ email: email });

        if (userExist) {
            return res.status(422).json({ error: "Email already in use" });

        } else if (password != cpassword) {
            return res.status(422).json({ error: "Passwords do not match" });
        }
        else {
            const user = new User({ name, email, password, cpassword, gender, contactNumber });
            await user.save();
            res.status(201).json({ message: "User Registered Successfully!" });
        }
    } catch (err) {
        console.log(err);
    }
});

router.post('/signin', async (req, res) => {

    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(400).json({ error: "All fields are required" });
    }
    else if (email == "admin@gmail.com" && password == "admin") {
        return res.status(500).json({ error: "Admin login" });
    }

    try {
        const user = await User.findOne({ email: email });

        const valid = await bcrypt.compare(password, user.password);

        if (user && valid) {
            return res.status(422).json({ error: "Signin Success" });
        }
        else if (user) {
            return res.status(400).json({ error: "Incorrect Password" });
        }
        else if (valid) {
            return res.status(400).json({ error: "User Not Found" });
        }
    } catch (err) {
        console.log(err);
    }
});


router.post('/addcity', async (req, res) => {
    const { image, name, details, location,latitude,longitude } = req.body;
    if (!image || !name || !details || !location || !latitude || !longitude || image == " ") {
        return res.status(500).json({ error: "All fields are required" });
    }
    else {
        const city = new City({ image, name, details, location,latitude,longitude });
        city.save();
        res.status(422).json({ message: "City Information Added Successfully" });
    }
});

router.post('/displaycity', async (req, res) => {
    const cityname = await City.find();
    res.json(cityname);
});

router.post('/viewcity', async (req, res) => {
    const { id } = req.body;
    const city = await City.findById(id);
    res.json(city);
});

router.post('/editcity', async (req, res) => {
    const id = req.body.id;
    const image = req.body.image;
    const name = req.body.name;
    const details = req.body.details;
    const location = req.body.location;
    const latitude = req.body.latitude;
    const longitude = req.body.longitude;
    City.updateOne({ _id: id },
        {
            $set: {
                "image": image,
                "name": name,
                "details": details,
                "location": location,
                "latitude": latitude,
                "longitude": longitude
            }
        }).then(
            () => { 
                res.status(422).json({ message: "Done" });
            }
        ).catch(
            (error) => {
                res.status(400).json({ error: error });
            }
        )
});

router.post('/deletecity', async (req, res) => {
    const { id } = req.body;
    City.findByIdAndDelete(id).
        then(
            () => {
                res.status(422).json({ message: "Deleted" });
            })
        .catch(
            (error) => {
                res.status(400).json({ error: error });
            }
        )
});

router.post('/addplace', async (req, res) => {

    const { CId, name, image, details, location, latitude, longitude } = req.body;

    if (!CId || !name || !image || !details || !location || !latitude || !longitude || image == null) {
        return res.status(500).json({ error: "All fields are required" });
    }
    else {
        const place = new Place({ CId, name, image, details, location, latitude, longitude });
        place.save();
        res.status(422).json({ message: "Place Information Added Successfully" });
    }

});

router.post('/displayplace', async (req, res) => {
    const placename = await Place.find();
    res.json(placename);
});

router.post('/viewplaces', async (req, res) => {
    const cid = req.body.cid
    const places = await Place.find({ "CId": cid });
    res.json(places);
});

router.post('/viewplace', async (req, res) => {
    const { id } = req.body;
    const place = await Place.findById(id);
    res.json(place);
});

router.post('/editplace', async (req, res) => {
    const id = req.body.id;
    const CId = req.body.CId;
    const image = req.body.image;
    const name = req.body.name;
    const details = req.body.details;
    const location = req.body.location;
    const latitude = req.body.latitude;
    const longitude = req.body.longitude;
    Place.updateOne({ _id: id },
        {
            $set: {
                "CId": CId,
                "image": image,
                "name": name,
                "details": details,
                "location": location,
                "latitude": latitude,
                "longitude": longitude
            }
        }).then(
            () => {
                res.status(422).json({ message: "Done" });
            }
        ).catch(
            (error) => {
                res.status(400).json({ error: error });
            }
        )
});

router.post('/deleteplace', async (req, res) => {
    const { id } = req.body;
    Place.findByIdAndDelete(id).
        then(
            () => {
                res.status(422).json({ message: "Deleted" });
            })
        .catch(
            (error) => {
                res.status(400).json({ error: error });
            }
        )
});

router.post('/addfood', async (req, res) => {

    const { CId, PId, name, image, details } = req.body;
    if (!CId || !PId || !name || !image || !details || image == " ") {
        return res.status(500).json({ error: "All fields are required" });
    }
    else {
        const food = new Food({ CId, PId, name, image, details });
        food.save();
        res.status(422).json({ message: "Food Information Added Successfully" });
    }

});

router.post('/viewfood', async (req, res) => {
    const pid = req.body.pid;
    const food = await Food.find({ "PId": pid });
    res.json(food);
});

router.post('/viewfoodcity', async (req, res) => {
    const cid = req.body.cid;
    const food = await Food.find({ "CId": cid });
    res.json(food);
});

router.post('/viewsinglefood', async (req, res) => {
    const id = req.body.id;
    const food = await Food.findById(id);
    res.json(food);
});

router.post('/editfood', async (req, res) => {
    const id = req.body.id;
    const CId = req.body.CId;
    const PId = req.body.PId;
    const image = req.body.image;
    const name = req.body.name;
    const details = req.body.details;
    Food.updateOne({ _id: id },
        {
            $set: {
                "CId": CId,
                "PId": PId,
                "image": image,
                "name": name,
                "details": details,
            }
        }).then(
            () => {
                res.status(422).json({ message: "Done" });
            }
        ).catch(
            (error) => {
                res.status(400).json({ error: error });
            }
        )
});

router.post('/deletefood', async (req, res) => {
    const { id } = req.body;
    Food.findByIdAndDelete(id).
        then(
            () => {
                res.status(422).json({ message: "Deleted" });
            })
        .catch(
            (error) => {
                res.status(400).json({ error: error });
            }
        )
});

module.exports = router;