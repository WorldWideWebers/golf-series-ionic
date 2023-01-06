import { Course } from "./course.model";
import { Player } from "./player.model";

export default interface Event {
    id: string,
    name: string,
    date: string,
    course: Course,
    players: Player[]
}