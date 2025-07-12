
import dotenv from 'dotenv';
import express from 'express';

import cors from "cors";

const app =express();
app.use(express.json());

app.use(cors());

app.get("/", (req,res) => {
    res.status(200).json({message: "Successfully set up the configuration"});
})

app.listen(3000, () => {
    console.log("we are listening to 3000");
})