import { auth } from '../config/auth.js';
import { fastTest } from '../config/options.js';
import { RoomCRUD, createRoom, getRoomInfo, renameRoom, removeRoom } from './CRUD.js';
import { sharedIterations } from '../config/scenarios.js';

export const options = fastTest;

export function setup() {
    return auth();
};

export default function (auth) {
    let params = {
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `${auth}`,
        }
    };
    RoomCRUD(params);
}