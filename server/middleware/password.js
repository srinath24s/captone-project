const { compare, hash } = require("bcrypt")

const encryptingPassword = async(password)=>{
    try {
        if(!password){
            throw new Error("Password not provided");
        }
        const encryptingPassword = await hash(password,10);
        if(!encryptingPassword){
            throw new Error(encryptingPassword.message);
        }
        return {
            status:"ok",
            result:encryptingPassword
        }
    } catch (error) {
        return {
            status:"Error",
            result:error.message
        }
    }
}

const decryptingPassword = async(password, dbPassword)=>{
    try {
        if(!password || !dbPassword){
            throw new Error("Password not provided");
        }
        const decryptingPassword = await compare(password,dbPassword);
        if(!decryptingPassword){
            throw new Error(decryptingPassword.message);
        }
        return {
            status:"ok",
            result:decryptingPassword
        }
    } catch (error) {
        return {
            status:"Error",
            result:error.message
        }
    }
}

module.exports = {encryptingPassword, decryptingPassword}