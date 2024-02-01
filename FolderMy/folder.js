import { auth } from '../config/auth.js';
import { fastTest } from "../config/options.js";
import { FolderCRUD, createFolder, getFolder, updateFolder, deleteFolder, getFolderMyId } from "./CRUD.js";

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
    const idMy = getFolderMyId(params);
    FolderCRUD(idMy, params);
}