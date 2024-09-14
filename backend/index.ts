import exp from "express";
import dotenv from "dotenv";
import cors from "cors";
import { PrismaClient } from "@prisma/client";
import mainApp from "./routes/mainApp.js";

dotenv.config();
const app = exp();
const prisma = new PrismaClient();
app.use(exp.json());
app.use(
    cors({
        origin: process.env.FRONTEND_URL,
        optionsSuccessStatus: 200
    })
);

app.use("/api", mainApp);
app.use((req, res, next) => {
    res.status(404).send({ msg: "404 route not found" });
});

const port = process.env.PORT || 4000;
app.listen(port, () => {
    console.log(`\nHTTP Server on Port ${port}`);
});
