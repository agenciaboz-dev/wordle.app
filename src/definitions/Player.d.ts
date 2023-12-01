import { Socket } from "socket.io";
export declare class Player {
    id: string;
    name: string;
    avatar: string;
    score: number;
    history: string[];
    socket: Socket;
    constructor(data: NewPlayer, socket: Socket);
    toJSON(): never;
}
