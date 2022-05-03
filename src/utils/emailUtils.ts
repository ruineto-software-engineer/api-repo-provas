export function generateEmailText(
  teacherName: string,
  categoryName: string,
  testName: string,
  disciplineName: string
) {
  return `A seguinte prova foi adicionada: ${teacherName} ${categoryName} ${testName} (${disciplineName})`;
}