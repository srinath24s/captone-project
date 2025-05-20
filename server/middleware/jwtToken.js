const jwt = require("jsonwebtoken");

const generateToken = (email,id)=>{
    try {
        if(!email || !id){
            throw new Error("Email and Id are required to generated token");
        }
        const playload = {id,email}
        const generate = jwt.sign(playload, process.env.JWT_SECRET, {expiresIn: '30m'})
        if(!generate){
            throw new Error(generate.message)
        }
        return {
            status:"ok",
            result:generate
        }
    } catch (error) {
        return {
            status:"Error",
            result:error.message
        }
    }
}

const verifyToken = (token)=>{
    try{
        if(!token){
            throw new Error("Token not found");
        }
        const verifyed = jwt.verify(token, process.env.JWT_SECRET)
        if(!verifyed){
            throw new Error(verifyed.message)
        }
        return {
            status:"ok",
            result:verifyed
        }
    }catch(error){
        return {
            status:"Error",
            result:error.message
        }
    }
}


module.exports = {generateToken, verifyToken}