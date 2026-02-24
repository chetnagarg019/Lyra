//music controller file me do fun bnaye hai cretaMusic or album un dono me kuch code repeat ho rha hai jo ki production ke lievel ke liye shi nhi hai esliye humne ye ek middleware bnaya hai taki repetive code ko isme likh skee
import jwt from "jsonwebtoken";

async function middleware_1(req, res, next) {
  const token = req.cookies.token;

  if (!token) {
    return res.status(401).json({ message: "Unauthorizes" });
  }

  if (req.user.role !== "artist") {
    return res.status(403).json({ message: "Only artists can create albums" });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    if (decoded.role !== "artist") {
      return res
        .status(403)
        .json({ message: "You don't have access to create an music" });
    }

    req.user = decoded;

    next();
  } catch (error) {
    console.log(error);
    return res.status(401).json({ message: "Unauthorized" });
  }
}

export default { middleware_1 };
