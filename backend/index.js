import express from "express"
import cors from "cors"
import cookieParser from "cookie-parser"
import connectDB from "./db/db.js";
import dotenv from "dotenv"
import userRoute from "./routes/user.route.js";
import recipeRoute from "./routes/recipe.route.js"
const app = express()
dotenv.config();

app.use(cors());
app.use(cors({
  origin: "http://localhost:5173",
  credentials: true
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));
app.use(cookieParser());

app.use("/api/v1/users/", userRoute);
app.use("/api/v1/recipe/", recipeRoute);

app.listen(process.env.PORT, () => {
  console.log(`Server Starting on http://localhost:${process.env.PORT}`);
  connectDB()
});
