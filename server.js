import express from "express"
const app = express();

app.get("/",(req,res) => {
    res.send("Server connected");
})


// ..port or server slot
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on ${PORT}`);
});

