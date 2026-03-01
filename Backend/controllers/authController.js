import User from "../model/user.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";

const createToken = (user) => {
  return jwt.sign( // ye 3 chize leta hai 
    { id: user._id, role: user.role }, //Payload (Token ke andar kya store hoga)
    process.env.JWT_SECRET, //Ye secret key hoti hai jo token ko sign karti hai.
    { expiresIn: "7d" } //Matlab token 7 din me expire ho jayega.
  );
};

async function registerUser(req, res) {
  try {
    const { name, email, password, role = "user" } = req.body; // frontend se jo data aaya use json format me if role nhi hai ro by defaylt user 

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "Email already exists" }); //400 bad req 
    }

    const hash = await bcrypt.hash(password, 10); //Plain password ko encrypt kar rahe hain, 10 → salt rounds (jitna zyada utna secure, but slow)

    const user = await User.create({ //MongoDB me new user insert ho raha hai Password hashed version save ho raha hai 
      name, 
      email,
      password: hash,
      role,
    });

    const token = createToken(user); //createToken() function JWT token banata hai  Isme user ki info encode hoti hai

    res.cookie("token", token, { //tojen cookeie name
      httpOnly: true, //JS se access nahi hoga (secure)
      secure: false, // HTTPS pe hi chalega (production me true karte hain)
      sameSite: "strict", //CSRF attack se bachata hai
    });

    res.status(201).json({ //201 → Created (new resource create hua)
      message: "Signup successful",
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
      },
    });
 
  } catch (error) { //Agar koi unexpected error aaye:
    res.status(500).json({ message: "Server error" });
  }
}

async function loginUser(req, res) {
  try {
    const { email, password } = req.body; 

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({ message: "Invalid credentials" }); 
    }

    const valid = await bcrypt.compare(password, user.password);
    if (!valid) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

   //Login successful hone ke baad JWT generate karte hain.
    const token = createToken(user);

    //Token browser me cookie ke form me store ho raha hai.
    res.cookie("token", token, {
      httpOnly: true,
      secure: false,
      sameSite: "strict",
    });

    res.status(200).json({
      message: "Login successful",
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
      },
    });

  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
}

async function logoutUser(req, res) { //I implemented a logout API where I clear the JWT token stored in the HTTP-only cookie using res.clearCookie().
  res.clearCookie("token");
  res.status(200).json({ message: "Logout successful" });
}

export default { registerUser, loginUser, logoutUser };