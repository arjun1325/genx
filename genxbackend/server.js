import express from "express";
import { connectDB } from "./config/db.js";
import { apiRoutes } from "./routes/index.js";
import cookieParser from "cookie-parser";

connectDB();
const app = express();
const port = 3000;
app.use(express.json());
app.use(cookieParser())

app.use("/api", apiRoutes);


app.get("/", (req, res) => {
    res.send("Hello World!");
});

app.listen(port, () => {
    console.log(`Backend is listening port ${port}`);
});
