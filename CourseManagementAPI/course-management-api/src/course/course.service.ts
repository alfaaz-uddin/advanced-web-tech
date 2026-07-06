import { Injectable } from '@nestjs/common';

@Injectable()
export class CourseService {
    getAllCourses {
        return 'Returning all courses';
    }

    getCourseById(id: string) {
        return `Showing course with ID: ${id}`;
    }

    createCourse() {
    return 'Creating a new course';
  }

  updateCourse(id: string) {
    return `Updating course with ID: ${id}`;
  }

  patchCourse(id: string) {
    return `Partially updating course with ID: ${id}`;
  }

  deleteCourse(id: string) {
    return `Deleting course with ID: ${id}`;
  }

}
