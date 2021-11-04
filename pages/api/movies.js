/* eslint-disable */

import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export default async (req, res) => {
  const data = JSON.parse(req.body);
  
  const createMovies = await prisma.movie.create({
    data,
  });
  res.json(createMovies);
};
