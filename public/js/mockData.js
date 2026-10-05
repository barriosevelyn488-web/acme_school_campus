export const mockCourses = [
  { id: 1, code: 'NODE-01', description: 'Introducción a Node.js' },
  { id: 2, code: 'POO-02', description: 'POO, Patrones y Buenas Prácticas' },
  { id: 3, code: 'DB-03', description: 'Persistencia de Datos' }
];

export const mockReports = {
  students: [
    { code: 'EST-0001', firstName: 'Ana', lastName: 'López', identificationNumber: '1234567890101', email: 'ana.lopez@campus.edu', city: 'Guatemala' },
    { code: 'EST-0002', firstName: 'Luis', lastName: 'Morales', identificationNumber: '1234567890102', email: 'luis.morales@campus.edu', city: 'Guatemala' },
    { code: 'EST-0003', firstName: 'Sofía', lastName: 'Herrera', identificationNumber: 'A12345678', email: 'sofia.herrera@campus.edu', city: 'Antigua Guatemala' }
  ],
  teachers: [
    { firstName: 'Carlos', lastName: 'Méndez', identificationNumber: '9876543210101', email: 'carlos.mendez@campus.edu' },
    { firstName: 'María', lastName: 'García', identificationNumber: '9876543210102', email: 'maria.garcia@campus.edu' }
  ],
  schedules: [
    { courseId: 1, course: 'Introducción a Node.js', teacherFirstName: 'Carlos', teacherLastName: 'Méndez', classroomCode: 'A-101', startDate: '2026-09-04', endDate: '2026-10-02' },
    { courseId: 2, course: 'POO, Patrones y Buenas Prácticas', teacherFirstName: 'María', teacherLastName: 'García', classroomCode: 'B-202', startDate: '2026-09-07', endDate: '2026-10-05' }
  ],
  enrollments: [
    { course: 'Introducción a Node.js', studentCode: 'EST-0001', firstName: 'Ana', lastName: 'López', email: 'ana.lopez@campus.edu', registerDate: '2026-09-01' },
    { course: 'POO, Patrones y Buenas Prácticas', studentCode: 'EST-0003', firstName: 'Sofía', lastName: 'Herrera', email: 'sofia.herrera@campus.edu', registerDate: '2026-09-02' }
  ],
  topics: [
    { courseId: 1, course: 'Introducción a Node.js', code: 'N01', title: 'Entornos de ejecución', description: 'Fundamentos y módulos de Node.js.' },
    { courseId: 2, course: 'POO, Patrones y Buenas Prácticas', code: 'P01', title: 'Principios SOLID', description: 'Responsabilidad única e inversión de dependencias.' }
  ]
};
