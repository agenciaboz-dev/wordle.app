import { Server } from "socket.io";
import { DefaultEventsMap } from "socket.io/dist/typed-events";
import { Room } from "./Room";
export declare class Game {
    round: number;
    difficulty: number;
    word: string;
    history: string[];
    io: Server<DefaultEventsMap, DefaultEventsMap, DefaultEventsMap, any>;
    room: Room;
    static print: (message: any) => void;
    static randomWord: (difficulty: number) => string;
    constructor(room: Room, difficulty: number);
    toJSON(): never;
}
