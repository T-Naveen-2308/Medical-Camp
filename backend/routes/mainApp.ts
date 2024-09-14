import { Router } from "express";
import expressAsyncHandler from "express-async-handler";
import medicalCamp from "../controllers/medicalCamp.js";

const mainApp = Router();

mainApp.post("/medical-camp", expressAsyncHandler(medicalCamp));

export default mainApp;