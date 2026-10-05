export const API_BASE_URL = '';

export const REPORTS = {
  students: {
    title: 'Estudiantes',
    endpoint: 'students',
    columns: [
      { label: 'Código', field: 'code' },
      { label: 'Estudiante', field: (row) => `${row.firstName} ${row.lastName}` },
      { label: 'Identificación', field: 'identificationNumber' },
      { label: 'Correo', field: 'email' },
      { label: 'Ciudad', field: 'city' }
    ]
  },
  teachers: {
    title: 'Profesores',
    endpoint: 'teachers',
    columns: [
      { label: 'Profesor', field: (row) => `${row.firstName} ${row.lastName}` },
      { label: 'Identificación', field: 'identificationNumber' },
      { label: 'Correo', field: 'email' }
    ]
  },
  schedules: {
    title: 'Horarios por curso',
    endpoint: 'schedules',
    filterByCourse: true,
    columns: [
      { label: 'Curso', field: 'course' },
      { label: 'Profesor', field: (row) => `${row.teacherFirstName} ${row.teacherLastName}` },
      { label: 'Aula', field: 'classroomCode' },
      { label: 'Inicio', field: 'startDate' },
      { label: 'Fin', field: 'endDate' }
    ]
  },
  enrollments: {
    title: 'Estudiantes por curso',
    endpoint: 'enrollments',
    columns: [
      { label: 'Curso', field: 'course' },
      { label: 'Código estudiante', field: 'studentCode' },
      { label: 'Estudiante', field: (row) => `${row.firstName} ${row.lastName}` },
      { label: 'Correo', field: 'email' },
      { label: 'Inscripción', field: 'registerDate' }
    ]
  },
  topics: {
    title: 'Temas de un curso',
    endpoint: 'topics',
    filterByCourse: true,
    columns: [
      { label: 'Curso', field: 'course' },
      { label: 'Código', field: 'code' },
      { label: 'Tema', field: 'title' },
      { label: 'Descripción', field: 'description' }
    ]
  }
};
