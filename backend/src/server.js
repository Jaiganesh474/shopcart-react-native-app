import express, { json } from 'express'
import path from 'path'
import { clerkMiddleware } from '@clerk/express'

import { ENV } from "./config/env.js";
import { connectDB } from './config/db.js';


const app=express()

const __dirname=path.resolve()


app.use(clerkMiddleware()) // req.auth

app.get("/api/health",(req,res)=>{
    res.status(200).json({message:"Success"})
})

//for deployment
if (ENV.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "../admin/dist")));

  app.get("/{*any}", (req, res) => {
    res.sendFile(path.join(__dirname, "../admin", "dist", "index.html"));
  });
}
app.listen(ENV.PORT,()=>{
  app.listen(ENV.PORT, () => {
    console.log("Server is up and running");
  });
  connectDB();
})