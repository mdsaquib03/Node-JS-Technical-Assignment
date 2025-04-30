import express from "express";
import morgan from "morgan";
import * as dotenv from "dotenv";
import cookieParser from "cookie-parser";
import cors from "cors";
import connectDB from "./config/db.js";
import mainRouter from "./routes/index.js";
import notFoundMiddleware from "./middleware/notFoundMiddleware.js";
import errorHandler from "./middleware/errorHandlerMiddleware.js";

dotenv.config();
const app = express();
if (process.env.NODE_ENV === "development") {
    app.use(morgan("dev"));
}

app.use(cookieParser());
app.use(express.json());
app.use(cors({
    origin: true,
    credentials: true
  }));
app.use(express.urlencoded({ extended: false }));
app.use(express.static("public"));
connectDB();

app.get("/", (req, res) => {
    res.send("Hello NxtWave");
});
app.use("/", mainRouter);
app.use(notFoundMiddleware);
app.use(errorHandler); 

const port = process.env.PORT || 5100;
app.listen(port, () => {
    console.log(`App is running on port ${port}...`);
});