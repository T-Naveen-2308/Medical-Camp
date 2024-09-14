import { PrismaClient } from "@prisma/client";
import dotenv from "dotenv";
import { Request, Response, NextFunction } from "express-serve-static-core";

const prisma = new PrismaClient();

dotenv.config();

async function medicalCamp(
    req: Request,
    res: Response,
    next: NextFunction
): Promise<any> {
    const { registrationNumber, campDate, fields } = req.body;
    if(!registrationNumber) {
        return res.status(400).send({message: "Registration Number can't be empty."});
    }
    if(!campDate) {
        return res.status(400).send({message: "Camp Date can't be empty."})
    }
    for (const field of fields) {
        if (!field.mid && !field.quantity) {
            continue;
        }
        const med = await prisma.medicine.findUnique({
            where: { mid: field.mid }
        });
        if (!med) {
            res.status(400).json({
                message: "Medicine Not Found."
            });
            return;
        }
    }
    const arr = [];
    for (const field of fields) {
        if (!field.mid && !field.quantity) {
            continue;
        }
        const med = await prisma.medicine.findUnique({
            where: { mid: field.mid }
        });
        if (!med) {
            res.status(400).json({
                message: "Medicine Not Found."
            });
            return;
        }
        if (Number(field.quantity) > med.quantity) {
            arr.push(field.mid);
            const meda = await prisma.medicine.findUnique({
                where: { mid: field.mid + "a" }
            });
            if (meda) {
                await prisma.medicine.update({
                    where: { mid: field.mid + "a" },
                    data: { quantity: med.quantity - Number(field.quantity) }
                });
            } else {
                await prisma.medicine.create({
                    data: {
                        mid: field.mid + "a",
                        quantity: 0 - Number(field.quantity)
                    }
                });
            }
            continue;
        }
        await prisma.medicine.update({
            where: { mid: field.mid },
            data: { quantity: med.quantity - Number(field.quantity) }
        });
    }
    if (arr.length) {
        return res.status(400).json({
            message: `Insufficient Stock of MIDs ${arr.join(
                ", "
            )}. Please give alternate medicines.`
        });
    }
    return res.status(200).send({ message: "Stock Updated Successfully." });
}

export default medicalCamp;
