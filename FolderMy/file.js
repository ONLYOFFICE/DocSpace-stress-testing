import { auth } from '../config/auth.js';
import { fastTest } from "../config/options.js";
import { FileCRUD, createFile, getFile, updateFile, deleteFile, getFolderMyId } from './CRUD.js';
import { shared_iter_scenario, const_arrival_rate_scenario, const_vus_scenario, per_vu_scenario } from '../config/scenarios.js';
import { folderMy } from '../config/index.js';
import { foldersAndFiles } from '../data/data.js';

export const options = { scenarios: {shared_iter_scenario, per_vu_scenario}};

export function setup() {
    var authToken = auth();
    foldersAndFiles(10, 10, folderMy, authToken);
    return authToken;
};

export default function (authToken) {
    let params = {
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `${authToken}`,
        }
    };
    const idMy = getFolderMyId(params);
    FileCRUD(idMy, params);
}