import { auth } from '../config/auth.js';
import { fastTest } from "../config/options.js";
import { FileCRUD, createFile, getFile, updateFile, deleteFile, getFolderMyId } from './CRUD.js';
import { sharedIterations } from '../config/scenarios.js';

export const options = sharedIterations;

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
    const idMy = getFolderMyId(params);
    FileCRUD(idMy, params);
}