//import autoincrement from 'mongoose-auto-increment';
const mongoose = require('mongoose');
const bcrpyt = require('bcryptjs');
const autoincrement = require('mongoose-auto-increment');

const Schema = mongoose.Schema;

const adminSchema = new mongoose.Schema({
    name: {
        type : String,
        required : "Required"
    },
    email:{
        type : String,
        required : "Required"
    },
    password:{
        type : String,
        required : "Required"
    }
});

const userSchema = new mongoose.Schema({
    name: {
        type : String,
        required : "Required"
    },
    email:{
        type : String,
        required : "Required"
    },
    password:{
        type : String,
        required : "Required"
    },
    cpassword:{
        type : String,
        required : "Required"
    },
    gender:{
        type : String,
        required : "Required"
    },
    contactNumber:{
        type : Number,
        required : "Required"
    }
});

const citySchema = new mongoose.Schema({
    image: {
        type : String,
        required : "Required"
    },
    name: {
        type : String,
        required : "Required"
    },
    details:{
        type : String,
        required : "Required"
    },
    location:{
        type : String,
        required : "Required"
    },
    latitude:{
        type: String,
        required: "Required"
    },
    longitude:{
        type: String,
        required: "Required"
    }
});

const placeSchema = new mongoose.Schema({
    CId: {
        type : String , ref: 'city'
    },
    name:{
        type : String,
        required : "Required"
    },
    image:{
        type : String,
        required : "Required"
    },
    details:{
        type : String,
        required : "Required"
    },
   location:{
        type : String,
        required : "Required"
    },
    latitude:{
        type: String,
        required: "Required"
    },
    longitude:{
        type: String,
        required: "Required"
    }
});

const foodSchema = new mongoose.Schema({
    CId: {
        type : String , ref: 'city'
    },
    PId: {
        type : String , ref: 'place'
    },
    name:{
        type : String,
        required : "Required"
    },
    image:{
        type : String,
        required : "Required"
    },
    details:{
        type : String,
        required : "Required"
    },
});


// Hashing Password
userSchema.pre('save',async function(next){
    if(this.isModified('password')){
        this.password = await bcrpyt.hash(this.password,12);
        this.cpassword = await bcrpyt.hash(this.cpassword,12);
    }
    next();
});

autoincrement.initialize(mongoose.connection);
userSchema.plugin(autoincrement.plugin , 'User');
citySchema.plugin(autoincrement.plugin , 'City');
placeSchema.plugin(autoincrement.plugin , 'Place');
foodSchema.plugin(autoincrement.plugin , 'Food');


const Admin = mongoose.model("Admin", adminSchema);
const User = mongoose.model("User", userSchema);
const City = mongoose.model("City", citySchema);
const Place = mongoose.model("Place", placeSchema);
const Food = mongoose.model("Food", foodSchema);

module.exports = { Admin , User , City , Place , Food };
