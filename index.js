import express from "express";
import morgan from "morgan";
import * as dotenv from "dotenv";
import cookieParser from "cookie-parser";
import cors from "cors";
import connectDB from "./config/db.js";
import mainRouter from "./routes/index.js";

dotenv.config();
const app = express();
if (process.env.NODE_ENV === "development") {
    app.use(morgan("dev"));
}

app.use(cookieParser());
app.use(express.json());
app.use(cors());
connectDB();

app.get("/", (req, res) => {
    res.send("Hello NxtWave");
});
app.use("/", mainRouter);

const port = process.env.PORT || 5100;
app.listen(port, () => {
    console.log(`App is running on port ${port}...`);
});