import express from "express"
import dotenv from 'dotenv';
import cors from "cors";
import { Request, Response } from 'express'; 
import connectDB from "./config/db";
import ProductRoute from "./routes/productRoutes";



dotenv.config();
const app = express();
app.use(express.json())
app.use(cors())
app.use("/uploads", express.static("src/uploads"));


const PORT = process.env.PORT || 5000;



app.get("/", (req: Request, res: Response) => { 
  res.send("API is running...");
});

app.use("/api/products", ProductRoute)


connectDB()

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
