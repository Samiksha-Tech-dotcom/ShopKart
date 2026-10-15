import express  from "express";
import mongoose from "mongoose";
import userRoutes from "./routes/userR.js";
import "dotenv/config";
import dotenv from "dotenv";
import dns from 'node:dns';
import cookieParser from "cookie-parser";
import cors from "cors"
import productRoutes from "./routes/productsR.js";
import wishlistRoutes from "./routes/wishlistR.js";
import cartRoutes from "./routes/cartR.js";
import orderRoutes from "./routes/orderR.js";




const app = express();
const PORT = 2026;

dns.setServers([
  '8.8.8.8',
  '[2001:4860:4860::8888]',
  '8.8.8.8:1053',
  '[2001:4860:4860::8888]:1053',
]);

app.use(express.json());
app.use(cookieParser())

app.use(cors({
    origin:
            "http://localhost:5173",
    credentials:true
}))


mongoose.connect(process.env.dbUrl).then(() => {
    console.log('DB Connected')
}).catch((err) => {
    console.log(err)
})

app.use("/user", userRoutes)
app.use("/product", productRoutes)
app.use("/wishlist",wishlistRoutes)
app.use("/cart", cartRoutes)
app.use("/orders", orderRoutes)



app.listen(PORT, () => {
    console.log("Server started on port 2026");
});

