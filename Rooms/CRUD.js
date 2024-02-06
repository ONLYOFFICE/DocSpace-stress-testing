import http from 'k6/http';
import { check, group } from 'k6';
import { rooms } from '../config/index.js';

export function createRoom(params){
    const payload = JSON.stringify({
        Title: "Testing room",
        RoomType: 6,
    });

    let URL = rooms;
    const res = http.post(URL, payload, params);
    check(res, {
        'Cretion room status': res => res.status === 200,
        'Room title': res => res.json().response.title === "Testing room",
    });
    return res.json().response.id;
}

export function getRoomInfo(id, params){
    let URL = `${rooms}/${id}`;
    const res = http.get(URL, params);
    check(res, {
        'Get room info status': res => res.status === 200,
        'Room id': res => res.json().response.id === id,
    });
}

export function renameRoom(id, params){
    const payload = JSON.stringify({
        Title: "New Title",
    });
    let URL = `${rooms}/${id}`;
    const res = http.put(URL, payload, params);
    check(res, {
        'Rename room status': res => res.status === 200,
        'Room title': res => res.json().response.title === "New Title",
    });
}

export function removeRoom(id, params){
    const payload = JSON.stringify({
        DeleteAfter: false,
    });
    let URL = `${rooms}/${id}`;
    const res = http.del(URL, payload, params);
    check(res, { 'Room delete status': res => res.status === 200 });
}

export function archiveRoom(id, params){
    const payload = JSON.stringify({
        DeleteAfter: false,
    });
    let URL = `${rooms}/${id}/archive`;
    const res = http.put(URL, payload, params);
    check(res, { 'Room archive status': res => res.status === 200 });
}

export function unarchiveRoom(id, params){
    const payload = JSON.stringify({
        DeleteAfter: false,
    });
    let URL = `${rooms}/${id}/unarchive`;
    const res = http.put(URL, payload, params);
    check(res, { 'Room unarchive status': res => res.status === 200 });
}

export function RoomCRUD(params) {
    let folderId = null;

    group('1. Create new room', () => {
        folderId = createRoom(params);
    });

    group('2. Get room info', () => {
        getRoomInfo(folderId, params);
    });

    group('3. Rename room', () => {
        renameRoom(folderId, params);
    });

    group('4. Archive room', () =>{
        archiveRoom(folderId, params);
    })

    group('5. Unarchive room', () => {
        unarchiveRoom(folderId, params);
    })

    group('6. Remove room', () => {
        removeRoom(folderId, params);
    });

};