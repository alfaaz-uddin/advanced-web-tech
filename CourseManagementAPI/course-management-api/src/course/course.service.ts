import { Injectable } from '@nestjs/common';

@Injectable()
export class CourseService {
  getAllCourses() {
    return 'Showing All Courses';
  }

  getCourseById(id: string) {
    return `Showing Course with ID: ${id}`;
  }

  createCourse() {
    return 'Create Course';
  }

  updateCourse(id: string) {
    return `Update Course ${id}`;
  }

  patchCourse(id: string) {
    return `Patch Course ${id}`;
  }

  deleteCourse(id: string) {
    return `Delete Course ${id}`;
  }
}