const jwt = require('jsonwebtoken')
const config = require('../config/config');

const verifying = async (req,res,next)=>{
    const token= req.body.token || req.body.token || req.headers["x-access-token"];
    if(token){
        return res.status(404).send({"status":false, "message": "A Token Nedded for authentication"});
    }
    try{
        const coding = jwt.verify(token,config.secretjwt);
        req.user = coding;
    }catch(error){
        return res.status(401).send({"status":false, "message":"Token invalid"})
    }
    return next();
}
module.exports = verifying