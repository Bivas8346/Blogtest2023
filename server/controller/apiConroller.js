const UserModel = require('../model/user')
const PostModel = require('../model/post')
const ContactModel = require('../model/contact')
const AboutModel = require('../model/about')
const bcriyptjs = require('bcryptjs')
const jwt = require('jsonwebtoken')
const config = require('../config/config')


const securePassword = async (password) => {
   try{
    const passwordHas = await bcriyptjs.hash(password, 10);
    return passwordHas
   } catch(error){
    console.log(error);
   }
}

const createToken = async (id) =>{
    try{
        const token = await jwt.sign({_id : id}, config.secretjwt,{ expiresIn: "1h"});
        return token
    }
    catch(error){
        console.log(error);
    }
}

const registration = async(req,res) =>{
    try{
        const setpassword = await securePassword(req.body.password)
        const User = new UserModel({
            name: req.body.name,
            email: req.body.email,
            phone: req.body.phone,
            password: setpassword
        })
        const userdata = await User.collection.findOne({ email: req.body.email})
        if(userdata) {
            return res.status(404).send({success: false, message: "This mail already exist"});
        }
        else{
            const Usdata = await User.save();
            console.log(Usdata, "User Added Successfully");
            const tokenData =  await createToken(Usdata._id)
            return res.status(200).send({success: true, data: Usdata, "token": tokenData});
        }
    }
    catch(error){
        console.log(error.message);
    }
}

const UserLogin = async(req,res) =>{
   try{
    const {email, password} = req.body;

    if(!(email && password)){
        res.status(404).send("all field needed");
    }
    const Loguser = await UserModel.findOne({email});

    if(UserModel && (await bcriyptjs.compare(password, Loguser.password))) {
        const tokenData = await createToken(Loguser._id)
        res.status(200).json({"User":Loguser, "token":tokenData});
    }
    res.status(400).send("Invalide Data");
   }
   catch(error){
    console.log(error);
   }
}


const post = async (req,res) =>{
    try{
        const Seedata = await PostModel.find()
        res.status(200).json({ success: true, messsage: "get all posted data", data: Seedata})
    }
    catch(error){
        res.status(404).json({success: false, message: "Not get Posted Data"})
    }
}

const about = async (req,res) =>{
    try{
        const Seeabout = await AboutModel.find()
        res.status(200).json({ success: true, messsage: "get all about data", data: Seeabout})
    }
    catch(error){
        res.status(404).json({success: false, message: "Not get about Data"})
    }
}

const contactPost = async(req,res) =>{
    try{
        const contactData = await new ContactModel({
            name: req.body.name,
            email: req.body.email,
            phone: req.body.phone,
            message: req.body.message
        })
        const conta = await contactData.save();
        res.status(201).json({success: true, message: "added contact message", data: conta})
    }
    catch(error){
        res.status(404).json({success: false, message: "contact message not added"})
    }
}



module.exports = {
    registration,
    UserLogin,
    post,
    contactPost,
    about
}