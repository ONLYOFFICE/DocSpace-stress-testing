import http from 'k6/http';
import { check, group } from 'k6';
import { folderMy, basePath } from '../config/index.js';


/*------------------------FOLDER------------------------*/

/*
Function get folder my id
*/
export function getFolderMyId(params){
    const res = http.get(folderMy, params);
    const id = res.json().response.current.id;
    return id;
}

/*
Function create folder 
id - id of folder my
params - headers 
*/
export function createFolder(id, params){
    const payload = JSON.stringify({
        title:	"NewFolder",
    });
    let URL = `${basePath}files/folder/${id}`;
    const res = http.post(URL, payload, params);
    check(res, {
        'Cretion folder status': res => res.status === 200,
        'Folder title': res => res.json().response.title === "NewFolder",
    });
    return res.json().response.id;
}

/*
Function get folder info
id - id of folder
params - headers
*/
export function getFolder(id, params){
    let URL = `${basePath}files/folder/${id}`;
    const res = http.get(URL, params);
    check(res, {
        'Get folder info status': res => res.status === 200,
        'Folder id': res => res.json().response.id === id,
    });
}

/*
Function update folder
id - id of folder
params - headers
*/
export function updateFolder(id, params){
    const payload = JSON.stringify({
        title: "UpdateTitle",
    });
    let URL = `${basePath}files/folder/${id}`;
    const res = http.put(URL, payload, params);
    console.log(res);
    check(res, {
        'Update folder status': res => res.status === 200,
        'Folder title': res => res.json().response.title === "UpdateTitle",
    });

}

/*
Function delete folder
id - id of folder
params - headers
*/
export function deleteFolder(id, params){
    const payload = JSON.stringify({
        DeleteAfter: true,
        Immediately: true,
    });
    let URL = `${basePath}files/folder/${id}`;
    const res = http.del(URL, payload, params);
    check(res, { 'Folder delete status': res => res.status === 200 });
}

export function FolderCRUD(idMy, params) {
    let folderId = null;

    group('1. Create new folder', () => {
        folderId = createFolder(idMy, params);
    });

    group('2. Get folder info', () => {
        getFolder(folderId, params);
    });

    group('3. Update folder title', () => {
        updateFolder(folderId, params);
    });

    group('4. Delete folder', () => {
        deleteFolder(folderId, params);
    });

};


/*------------------------FILE------------------------*/

/*
Function create file 
id - id of folder my
params - headers 
*/
export function createFile(id, params){
    const payload = JSON.stringify({
        title:	"NewFile.docx",
        EnableExternalExt: true,
    });
    let URL = `${basePath}files/${id}/file`;
    const res = http.post(URL, payload, params);
    check(res, {
        'Cretion file status': res => res.status === 200,
        'File title': res => res.json().response.title === "NewFile.docx",
    });
    return res.json().response.id;
}

/*
Function get file info
id - id of file
params - headers
*/
export function getFile(id, params){
    let URL = `${basePath}files/file/${id}`;
    const res = http.get(URL, params);
    check(res, {
        'Get file info status': res => res.status === 200,
        'File id': res => res.json().response.id === id,
    });
}

/*
Function update file
id - id of file
params - headers
*/
export function updateFile(id, params){
    const payload = JSON.stringify({
        title: "NewTitle.docx",
    });
    let URL = `${basePath}files/file/${id}`;
    const res = http.put(URL, payload, params);
    check(res, {
        'Update file status': res => res.status === 200,
        'File title': res => res.json().response.title === "NewTitle.docx",
    });

}

/*
Function delete file
id - id of folder
params - headers
*/
export function deleteFile(id, params){
    const payload = JSON.stringify({
        DeleteAfter: true,
        Immediately: true,
    });
    let URL = `${basePath}files/file/${id}`;
    const res = http.del(URL, payload, params);
    check(res, { 'File delete status': res => res.status === 200 });
}

export function FileCRUD(idMy, params){
    let fileid = null;

    group('1. Create a new file', () => {
        fileid = createFile(idMy, params);
    });

    group('2. Get file info', () => {
        getFile(fileid, params);
    });

    group('3. Update file title', () => {
        updateFile(fileid, params);
    });

    group('4. Delete file', () => {
        deleteFile(fileid, params);
    });

}