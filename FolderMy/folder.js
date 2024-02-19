import { auth } from '../config/auth.js';
import { fastTest } from "../config/options.js";
import { FolderCRUD, createFolder, getFolder, updateFolder, deleteFolder, getFolderMyId } from "./CRUD.js";
import { shared_iter_scenario, const_vus_scenario } from '../config/scenarios.js';

export const options = { scenarios: {const_vus_scenario,}};

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