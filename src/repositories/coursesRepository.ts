import { prisma } from '../database.js';

export async function getAll() {
  const disciplines = await prisma.discipline.findMany({
    include:{
      term: true
    }
  });

  return disciplines;
}
