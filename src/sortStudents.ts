export interface Student {
  name: string,
  surname: string,
  age: number,
  married: boolean,
  grades: number[],
}

export enum SortType {
  Name = 'name',
  Surname = 'surname',
  Age = 'age',
  Married = 'married',
  AverageGrade = 'grades',
}

export type SortOrder = 'asc' | 'desc';

export function calcAverageGrade(grades: number[]): number {
  return grades.reduce((grade, total) => grade + total) / grades.length;
}

export function sortStudents(
  students: Student[],
  sortBy: SortType,
  order: SortOrder,
): Student[] {
  const sortedStudents: Student[] = [...students];

  switch (sortBy) {
    case SortType.Name:
    case SortType.Surname:
      return order === 'asc'
        ? sortedStudents.sort((a, b) => a[sortBy].localeCompare(b[sortBy]))
        : sortedStudents.sort((a, b) => b[sortBy].localeCompare(a[sortBy]));

    case SortType.Age:
    case SortType.Married:
      return order === 'asc'
        ? sortedStudents.sort((a, b) => +a[sortBy] - +b[sortBy])
        : sortedStudents.sort((a, b) => +b[sortBy] - +a[sortBy]);

    case SortType.AverageGrade:
      sortedStudents.sort(
        (a, b) => (order === 'asc'
          ? calcAverageGrade(a.grades) - calcAverageGrade(b.grades)
          : calcAverageGrade(b.grades) - calcAverageGrade(a.grades)
        ),
      );
      break;

    default:
      return sortedStudents;
  }

  return sortedStudents;
}
