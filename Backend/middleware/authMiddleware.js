
import jwt from "jsonwebtoken";

async function middleware_1(req, res, next) {
  const token = req.cookies.token;

  if (!token) {
    return res.status(401).json({ message: "Unauthorized" });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // Pehle user set karo
    req.user = decoded;

    // Fir role check karo
    if (req.user.role !== "artist") {
      return res.status(403).json({
        message: "Only artists can create albums",
      });
    }

    next();
  } catch (error) {
    console.log(error);
    return res.status(401).json({ message: "Unauthorized" });
  }
}

export default { middleware_1 };
