export interface Course {
    id: string;
    name: string;
    slope: number;
    par: number;
    numberOfSides: number;
    sides: Side[];
    city: string;
    state: string;
}

export interface Side {
    name: string;
    holes: Hole[];
}

export interface Hole {
    holeNumber: number;
    par: number;
    handicap: number;
}