import "dotenv/config";
import { PrismaPg } from "@prisma/adapter-pg";
import { PrismaClient } from "../../generated/prisma/client";

const connectionString = `${process.env.DATABASE_URL}`;

const adapter = new PrismaPg({ connectionString });

export const SECRET_KEY =
  process.env.SECRET_KEY || "h9z1K2MRevschSq8Fv9H2K3tTYOSCJRqumriDvEZ3Kg=";

export const saltRound = 10;

export const prisma = new PrismaClient({ adapter });

export const PORT = process.env.PORT || 3000;
