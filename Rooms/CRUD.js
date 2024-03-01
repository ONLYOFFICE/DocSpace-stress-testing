import http from 'k6/http';
import { check, group } from 'k6';
import { rooms } from '../config/index.js';
import faker  from 'https://cdnjs.cloudflare.com/ajax/libs/Faker/3.1.0/faker.min.js';
import { getScenarioData } from '../config/scenarios.js';


function addTagsDefault(def, property){
    let tags = {};
    let scenarioData = getScenarioData();
    if(def == true)
    {
        tags = {
            scenario_executor: scenarioData.scenario_executor,
            scenario_startTime: scenarioData.scenario_startTime,
            scenario_gracefulStop: scenarioData.scenario_gracefulStop,
            scenario_exec: scenarioData.scenario_exec,
            scenario_vus: scenarioData.scenario_vus,
            scenario_duration: scenarioData.scenario_duration,
            scenario_iterations: scenarioData.scenario_iterations,
            scenario_maxDuration: scenarioData.scenario_maxDuration,
            scenario_stages: scenarioData.scenario_stages,
            scenario_gracefulRampDown: scenarioData.scenario_gracefulRampDown,
            scenario_startVUs: scenarioData.scenario_startVUs,
            scenario_preAllocatedVUs: scenarioData.scenario_preAllocatedVUs,
            scenario_rate: scenarioData.scenario_rate,
            scenario_maxVUs: scenarioData.scenario_maxVUs,
            scenario_timeUnit: scenarioData.scenario_timeUnit,
            scenario_startRate: scenarioData.scenario_startRate,
            property: property,
        };
        return tags;
    }
}

export function createRoom(params, trend, environment){
    const roomTitle = faker.random.words();
    const payload = JSON.stringify({
        Title: roomTitle,
        RoomType: 6,
    });

    let URL = rooms;
    const res = http.post(URL, payload, {
        headers: params.headers, 
        tags: addTagsDefault(true, 'Create new room'),
    });
    check(res, {
        'Cretion room status': res => res.status === 200,
        'Room title': res => res.json().response.title === roomTitle,
    });
    trend[environment].add(res.timings.duration, { url: res.request.url, status: res.status, method: res.request.method,});
    return res.json().response.id;
}

export function getRoomInfo(id, params, trend, environment){
    let URL = `${rooms}/${id}`;
    const res = http.get(URL, {
        headers: params.headers, 
        tags: addTagsDefault(true, 'Get room info'),
    });
    check(res, {
        'Get room info status': res => res.status === 200,
        'Room id': res => res.json().response.id === id,
    });
    trend[environment].add(res.timings.duration, { url: res.request.url, status: res.status, method: res.request.method,});
}

export function renameRoom(id, params, trend, environment){
    const roomTitle = faker.random.words();
    const payload = JSON.stringify({
        Title: roomTitle,
    });
    let URL = `${rooms}/${id}`;
    const res = http.put(URL, payload, {
        headers: params.headers, 
        tags: addTagsDefault(true, 'Rename room'),
    });
    check(res, {
        'Rename room status': res => res.status === 200,
        'Room title': res => res.json().response.title === roomTitle,
    });
    trend[environment].add(res.timings.duration, { url: res.request.url, status: res.status, method: res.request.method,});
}

export function removeRoom(id, params, trend, environment){
    const payload = JSON.stringify({
        DeleteAfter: false,
    });
    let URL = `${rooms}/${id}`;
    const res = http.del(URL, payload, {
        headers: params.headers, 
        tags: addTagsDefault(true, 'Remove room'),
    });
    check(res, { 'Room delete status': res => res.status === 200 });
    trend[environment].add(res.timings.duration, { url: res.request.url, status: res.status, method: res.request.method,});
}

export function archiveRoom(id, params, trend, environment){
    const payload = JSON.stringify({
        DeleteAfter: false,
    });
    let URL = `${rooms}/${id}/archive`;
    const res = http.put(URL, payload, {
        headers: params.headers, 
        tags: addTagsDefault(true, 'Archive room'),
    });
    check(res, { 'Room archive status': res => res.status === 200 });
    trend[environment].add(res.timings.duration, { url: res.request.url, status: res.status, method: res.request.method,});
}

export function unarchiveRoom(id, params, trend, environment){
    const payload = JSON.stringify({
        DeleteAfter: false,
    });
    let URL = `${rooms}/${id}/unarchive`;
    const res = http.put(URL, payload, {
        headers: params.headers, 
        tags: addTagsDefault(true, 'Unarchive room'),
    });
    check(res, { 'Room unarchive status': res => res.status === 200 });
    trend[environment].add(res.timings.duration, { url: res.request.url, status: res.status, method: res.request.method,});
}

export function RoomCRUD(params, trend, environment) {
    let folderId = null;

    group('Create new room', () => {
        folderId = createRoom(params, trend, environment);
    });

    group('Get room info', () => {
        getRoomInfo(folderId, params, trend, environment);
    });

    group('Rename room', () => {
        renameRoom(folderId, params, trend, environment);
    });

    group('Archive room', () =>{
        archiveRoom(folderId, params, trend, environment);
    })

    group('Unarchive room', () => {
        unarchiveRoom(folderId, params, trend, environment);
    })

    group('Remove room', () => {
        removeRoom(folderId, params, trend, environment);
    });

};