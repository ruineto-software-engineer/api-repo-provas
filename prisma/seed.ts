import { prisma } from '../src/database.js';
import { User, Term, Discipline, Category, Teacher } from '@prisma/client';

type CreateUserData = Omit<User, 'id'>;
type CreateTermData = Omit<Term, 'id'>;
type CreateDisciplineData = Omit<Discipline, 'id'>;
type CreateCategoryData = Omit<Category, 'id'>;
type CreateTeacherData = Omit<Teacher, 'id'>;

async function main() {
	const defaultUser : CreateUserData = {
		email: 'ruineto@email.com',
		password: '1234',
		githubId: null
	};
 
	const defaultTerms: CreateTermData[] = [
		{ number: 1 },
		{ number: 2 },
		{ number: 3 },
		{ number: 4 },
		{ number: 5 },
		{ number: 6 }
	];

	const defaultDisciplines: CreateDisciplineData[] = [
		{ name: 'HTML', termId: 1 },
		{ name: 'CSS', termId: 1 },
		{ name: 'JavaScript', termId: 2 },
		{ name: 'Axios', termId: 2 },
		{ name: 'React', termId: 3 },
		{ name: 'StyledComponents', termId: 3 },
		{ name: 'Node', termId: 4 },
		{ name: 'Express', termId: 4 },
		{ name: 'NPM', termId: 4 },
		{ name: 'Mongo', termId: 5 },
		{ name: 'SQL', termId: 6 }
	];

	const defaultCategories: CreateCategoryData[] = [ { name: 'P1' }, { name: 'P2' }, { name: 'P3' } ];

	const defaultTeachers: CreateTeacherData[] = [
		{ name: 'Fulano' },
		{ name: 'Ciclano' },
		{ name: 'Beltrano' },
		{ name: 'Fulana' },
		{ name: 'Ciclana' },
		{ name: 'Beltrana' }
	];

	await prisma.user.upsert({
		where: { email: defaultUser.email },
		update: {},
		create: { ...defaultUser }
	});

 	for (let i = 0; i < defaultTerms.length; i++) {
		const term = defaultTerms[i];

		await prisma.term.upsert({
			where: { number: term.number },
			update: {},
			create: { ...term }
		});
	}

 	for (let i = 0; i < defaultDisciplines.length; i++) {
		const discipline = defaultDisciplines[i];

		await prisma.discipline.upsert({
			where: { name: discipline.name },
			update: {},
			create: { ...discipline }
		});
	}

	for (let i = 0; i < defaultCategories.length; i++) {
		const category = defaultCategories[i];

		await prisma.category.upsert({
			where: { name: category.name },
			update: {},
			create: { ...category }
		});
	}

  for (let i = 0; i < defaultTeachers.length; i++) {
		const teacher = defaultTeachers[i];

		await prisma.teacher.upsert({
			where: { name: teacher.name },
			update: {},
			create: { ...teacher }
		});
	}
}

main()
  .catch((e) => {
    console.log(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
