const { generateToken } = require("../middleware/jwtToken");
const { encryptingPassword, decryptingPassword } = require("../middleware/password");
const adminUser = require("../models/adminUser");

const getUsers = async (req, res) => {
  try {
    const response = await adminUser.find();
    if(!response){
      throw new Error("Internal database Server Issue");
    }
    res.json({
      status:"ok",
      result: response
    })
  } catch (error) {
    res.json({
      status:"Error",
      result: error.message
    })
  }
};

const createUser = async(req, res) => {
  try{
    const {name,email,password} = req.body;
    if (!name || !email || !password) {
      throw new Error("Name, email, and password are required");
    }
    const existingUser = await adminUser.findOne({ email });
    if (existingUser) {
      throw new Error("User already exists with this email");
    }
    const encryptedPassword = await encryptingPassword(password);
    if(encryptedPassword.status === "Error"){
      throw new Error(encryptedPassword.result)
    }
    const newUser = new adminUser({ name, email, password: encryptedPassword.result});
    if(!newUser){
      throw new Error("Not Uploaded to Database...")
    }
    await newUser.save();
    res.json({
      status:"ok",
      result:"Account Created Successfully"
    })    
  }catch(error){
    res.json({
        status:"Error",
        result:error.message
    })
  }
};


const loginUser = async(req, res) => {
  try{
    const {email,password} = req.body;
    if (!email || !password) {
      throw new Error("email, and password are required");
    }
    const findUser = await adminUser.findOne({ email });
    if (!findUser) {
      throw new Error("User not exists with this email");
    }
    const decryptedPassword = await decryptingPassword(password, findUser.password);
    if(decryptedPassword.status === "Error"){
      throw new Error(decryptedPassword.result)
    }
    const generatetoken = await generateToken(findUser.email, findUser.id);
    if(generatetoken.status === "Error"){
      throw new Error(generatetoken.result)
    }
    res.json({
      status:"ok",
      result: generatetoken.result
    })    
  }catch(error){
    res.json({
        status:"Error",
        result:error.message
    })
  }
};

module.exports = {
  getUsers,
  createUser,
  loginUser
};
