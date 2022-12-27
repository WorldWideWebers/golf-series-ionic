import { Course } from "./course.model";

export default interface Event {
    id: string,
    name: string,
    date: string,
    course: Course,
}