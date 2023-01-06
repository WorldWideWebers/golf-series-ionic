import Event from './event.model';
import { Player } from './player.model';

export interface Series {
    id: string,
    owner: string,
    name: string,
    description: string,
    image: string,
    players: Player[],
    events: Event[],
    startDate: string,
    endDate: string,
    singleCourseId: string,
    state: string,
}