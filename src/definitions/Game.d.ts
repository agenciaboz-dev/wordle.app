import { Server } from "socket.io";
import { DefaultEventsMap } from "socket.io/dist/typed-events";
import { Room } from "./Room";
import { Player } from "./Player";
export declare class Game {
    round: number;
    difficulty: number;
    history: string[];
    word: string;
    io: Server<DefaultEventsMap, DefaultEventsMap, DefaultEventsMap, any>;
    room: Room;
    static print: (message: any, priority?: boolean) => void;
    static word_list: string[];
    static randomWord: (difficulty: number) => string;
    static isValid: (attempt: string) => boolean;
    constructor(room: Room, difficulty: number);
    stop: () => void;
    toJSON(): never;
    makeAttempt: (word: string, player: Player) => void;
    nextRound: () => void;
}
