class ReportRepository {
  constructor(database) {
    this.database = database;
  }

  async getStudents() {
    const [rows] = await this.database.query(`
      SELECT student.id, student.code, student.firstName, student.lastName,
        student.identificationNumber, student.email, city.name AS city,
        identification.name AS identificationType
      FROM students AS student
      LEFT JOIN cities AS city ON city.id = student.city_id
      LEFT JOIN identification_types AS identification
        ON identification.id = student.identification_type_id
      ORDER BY student.lastName, student.firstName
    `);
    return rows;
  }

  async getTeachers() {
    const [rows] = await this.database.query(`
      SELECT teacher.id, teacher.firstName, teacher.lastName,
        teacher.identificationNumber, teacher.email,
        identification.name AS identificationType
      FROM teachers AS teacher
      LEFT JOIN identification_types AS identification
        ON identification.id = teacher.identification_type_id
      ORDER BY teacher.lastName, teacher.firstName
    `);
    return rows;
  }

  async getSchedules(courseId) {
    const filter = courseId ? 'AND course.id = ?' : '';
    const values = courseId ? [courseId] : [];
    const [rows] = await this.database.query(`
      SELECT schedule.id, course.id AS courseId, course.code AS courseCode,
        course.description AS course, teacher.firstName AS teacherFirstName,
        teacher.lastName AS teacherLastName, classroom.code AS classroomCode,
        classroom.description AS classroom, schedule.start_date AS startDate,
        schedule.end_date AS endDate
      FROM courses_schedules AS schedule
      JOIN courses AS course ON course.id = schedule.course_id
      JOIN teachers AS teacher ON teacher.id = schedule.teacher_id
      JOIN classrooms AS classroom ON classroom.id = schedule.classroom_id
      WHERE schedule.active = 1 ${filter}
      ORDER BY course.description, schedule.start_date
    `, values);
    return rows;
  }

  async getEnrollments() {
    const [rows] = await this.database.query(`
      SELECT course.id AS courseId, course.code AS courseCode,
        course.description AS course, student.code AS studentCode,
        student.firstName, student.lastName, student.email,
        inscription.register_date AS registerDate
      FROM inscriptions AS inscription
      JOIN students AS student ON student.id = inscription.student_id
      JOIN courses_schedules AS schedule ON schedule.id = inscription.course_schedule
      JOIN courses AS course ON course.id = schedule.course_id
      WHERE inscription.active = 1 AND schedule.active = 1
      ORDER BY course.description, student.lastName, student.firstName
    `);
    return rows;
  }

  async getTopics(courseId) {
    const filter = courseId ? 'AND course.id = ?' : '';
    const values = courseId ? [courseId] : [];
    const [rows] = await this.database.query(`
      SELECT course.id AS courseId, course.code AS courseCode,
        course.description AS course, topic.code, topic.title, topic.description
      FROM topics AS topic
      JOIN courses AS course ON course.id = topic.course_id
      WHERE topic.active = 1 ${filter}
      ORDER BY course.description, topic.code
    `, values);
    return rows;
  }

  async getCourses() {
    const [rows] = await this.database.query(`
      SELECT id, code, description FROM courses
      WHERE active = 1 ORDER BY description
    `);
    return rows;
  }
}

module.exports = { ReportRepository };
