import { Player } from "./Player";
import { Socket } from "socket.io";
import { Game } from "./Game";
export declare class Room {
    id: string;
    host: Player;
    name: string;
    created_at: Date;
    playing: boolean;
    password?: string;
    game?: Game;
    difficulty: number;
    attempts: number;
    players: Player[];
    static list: () => Room[];
    static resetRooms: () => Room[];
    static find: (id: string) => Room | undefined;
    static findSocket: (socket: Socket) => {
        room: Room | undefined;
        player: Player | undefined;
    };
    static print: (message: any) => void;
    constructor(host: Player, data: NewRoom);
    addPlayer: (player: Player) => void;
    findPlayer: (player_id: string) => Player | undefined;
    removePlayer: (player: Player) => void;
    startGame: () => void;
    update: (data: UpdateRoom) => void;
    readyCheck: () => boolean;
}
