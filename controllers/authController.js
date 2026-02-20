import User from "../model/user.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";

async function registerUser(req, res) { // means sign up krna
  const { name, email, password, role = "user" } = req.body;

  //if email is already exist
  const isUserAlreadyExists = await User.findOne({
    $or: [{ name }, { email }],
  });

  if (isUserAlreadyExists) {
    return res.status(401).json({ message: "User already exits" });
  }

  const hash = await bcrypt.hash(password, 10);

  const user = await User.create({
    name,
    email,
    password: hash,
    role,
  });

  const token = jwt.sign(
    {
      id: user._id,
      role: user.role,
    },
    process.env.JWT_SECRET,
  );

  res.cookie("token", token, {
    httpOnly: true,
    secure: false, // production me true
    sameSite: "strict",
  });

  res.status(201).json({
    message: "User created successfully",
    user: {
      id: user._id,
      name: user.name,
      email: user.email,
      role: user.role,
    },
  });
}


async function loginUser(req,res){

    const { name,email,password} = req.body;

    const user = await User.findOne({
        $or : [
            {name} ,{email}
        ]
    })

    if(!user){
        return res.status(401).json({ message : "Invalid crentials" })
    }

    const isPasswordValid = await bcrypt.compare(password,user.password);

     if(!isPasswordValid){
        return res.status(401).json({ message : "Invalid crentials" })
    }

    //if password valid create token

    const token = jwt.sign(
    {
      id: user._id,
      role: user.role,
    },
    process.env.JWT_SECRET,
  );

  //save token cookie
    res.cookie("token", token, {
    httpOnly: true,
    secure: false, // production me true
    sameSite: "strict",
  });

  res.status(201).json({
    message: "User log in successfully",
    user: {
      id: user._id,
      name: user.name,
      email: user.email,
      role: user.role,
    },
  });




}

async function logoutUser(req,res){
  res.clearCookie("token")
  res.status(200).json({ message : "User logged out succesfully"})
}

export default { registerUser,loginUser,logoutUser };

// $or : Koi bhi condition true ho → data mil jayega
