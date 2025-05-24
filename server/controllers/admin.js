const { generateToken } = require("../middleware/jwtToken");
const { encryptingPassword, decryptingPassword } = require("../middleware/password");
const adminUser = require("../models/adminUser");
const product = require("../models/product");

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
    const {name,email,password, role} = req.body;
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
    const newUser = new adminUser({ name, email, password: encryptedPassword.result, role});
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

const editUser = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, email, role } = req.body;

    const updatedUser = await adminUser.findOneAndUpdate(
      { id },
      { name, email, role },
      { new: true }
    );

    if (!updatedUser) {
      return res.json({
        status: "Error",
        result: "User not found"
      });
    }

    res.json({
      status: "ok",
      result: "Updated User Successfully"
    });

  } catch (error) {
    res.json({
      status: "Error",
      result: error.message
    });
  }
};

const deleteUser = async (req, res) => {
  try {
    const { id } = req.params;

    const deletedUser = await adminUser.findOneAndDelete({ id });

    if (!deletedUser) {
      return res.json({
        status: "Error",
        result: "User not found"
      });
    }

    res.json({
      status: "ok",
      result: "User deleted successfully"
    });

  } catch (error) {
    res.json({
      status: "Error",
      result: error.message
    });
  }
};


const addProduct = async(req,res)=>{
  try {
    const {name, description, price, image, rating, stocks, category, uploadedBy} = req.body;
    if (!name || !price || !image || !stocks || !category || !uploadedBy) {
      throw new Error('Missing required fields.');
    }

    const newProduct={
      name,
      description,
      price,
      image,
      rating,
      stocks,
      category,
      uploadedBy
    };
    
    const response = await product(newProduct)
    if(!response){
      throw new Error(response.message);
    }
    response.save();
    res.json({
      status:"ok",
      result:response,
      message: 'Product added successfully.',
    })

  } catch (error) {
    res.json(
      { status:"Error",
        result:error.message
      });
  }
}

const getProducts = async (req, res) => {
  try {
    const response = await product.find();
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

module.exports = {
  getUsers,
  createUser,
  loginUser,
  editUser,
  deleteUser,
  addProduct,
  getProducts
};
