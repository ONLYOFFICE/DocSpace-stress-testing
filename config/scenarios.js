import exec from 'k6/execution';

import { constVusScenarioSettings, sharedIterationScenarioSettings, perVuScenarioSettings, constArrivalRateScenarioSettings, rampArrivalRateScenarioSettings, extControlledScenarioSettings,
 sISIterations, sISVUs, sISmaxDuration, sISstartTime, sISgracefulStop,
 pVUIterations, pVUVUs, pVUmaxDuration, pVUstartTime,  pVUgracefulStop,
 cVUDuration, cVUVUs, cVUstartTime, cVUgracefulStop,
 cARDuration, cARmaxVUs, cARpreAllocatedVUs, cARrate, cARstartTime, cARtimeUnit, cARgracefulStop,
 rARmaxVUs, rARpreAllocatedVUs, rARstages, rARstartRate, rARstartTime, rARtimeUnit, rARgracefulStop,
 eCduration, eCmaxVUs, eCstartTime, eCvus 
} from './index.js';

const shared_iter_scenario = {
    executor: 'shared-iterations',
    vus: sISVUs,
    iterations: sISIterations,
    startTime: sISstartTime,
    maxDuration: sISmaxDuration,
    gracefulStop: sISgracefulStop,
    env: { SCENARIO: 'shared-iterations' },
};

const per_vu_scenario = {
    executor: 'per-vu-iterations',
    vus: pVUVUs,
    iterations: pVUIterations,
    maxDuration: pVUmaxDuration,
    startTime: pVUstartTime,
    gracefulStop: pVUgracefulStop,
    env: { SCENARIO: 'per-vu-iterations' },
};

const const_vus_scenario = {
    executor: 'constant-vus', 
    vus: cVUVUs,
    duration: cVUDuration,
    startTime: cVUstartTime,
    gracefulStop: cVUgracefulStop,
    env: { SCENARIO: 'constant-vus' },
};

const const_arrival_rate_scenario = {
    executor: 'constant-arrival-rate',
    duration: cARDuration,
    rate: cARrate,
    timeUnit: cARtimeUnit,
    preAllocatedVUs: cARpreAllocatedVUs,
    maxVUs: cARmaxVUs,
    startTime: cARstartTime,
    gracefulStop: cARgracefulStop,
    env: { SCENARIO: 'constant-arrival-rate' },
};

const ramp_arrival_rate_scenario = {
    executor: 'ramping-arrival-rate',
    startRate: rARstartRate,
    timeUnit: rARtimeUnit,
    preAllocatedVUs: rARpreAllocatedVUs,
    stages: rARstages,
    maxVUs: rARmaxVUs,
    startTime: rARstartTime,
    gracefulStop: rARgracefulStop,
    env: { SCENARIO: 'ramping-arrival-rate' },
};

const ext_controlled_scenario = {
    executor: 'externally-controlled',
    vus: eCvus,
    maxVUs: eCmaxVUs,
    duration: eCduration,
    startTime: eCstartTime,
    env: { SCENARIO: 'externally-controlled' },
};

export function setScenarios() {
    let scenarios = {
        const_vus_scenario, 
        shared_iter_scenario,
        per_vu_scenario,
        const_arrival_rate_scenario,
        ramp_arrival_rate_scenario,
        ext_controlled_scenario,
    }
    if(constVusScenarioSettings == false){
        delete scenarios.const_vus_scenario;
    }
    if(sharedIterationScenarioSettings == false){
        delete scenarios.shared_iter_scenario;
    }
    if(perVuScenarioSettings == false){
        delete scenarios.per_vu_scenario;
    }
    if(constArrivalRateScenarioSettings == false){
        delete scenarios.const_arrival_rate_scenario;
    }
    if(rampArrivalRateScenarioSettings == false){
        delete scenarios.ramp_arrival_rate_scenario;
    }
    if(extControlledScenarioSettings == false){
        delete scenarios.ext_controlled_scenario;
    }
    return scenarios;
}

export function getScenarioData()
{
    const tag = exec.vu.tags['scenario'];
    let jsonData = JSON.parse(JSON.stringify(exec.test.options.scenarios[`${tag}`]));
    let scenarioData = {
        scenario_executor: `${jsonData['executor']}`,
        scenario_startTime: `${jsonData['startTime']}`,
        scenario_gracefulStop: `${jsonData['gracefulStop']}`,
        scenario_exec: `${jsonData['exec']}`,
        scenario_vus: `${jsonData['vus']}`,
        scenario_duration: `${jsonData['duration']}`,
        scenario_iterations: `${jsonData['iterations']}`,
        scenario_maxDuration: `${jsonData['maxDuration']}`,
        scenario_stages: JSON.stringify(`${jsonData['stages']}`),
        scenario_gracefulRampDown: `${jsonData['gracefulRampDown']}`,
        scenario_startVUs: `${jsonData['startVUs']}`,
        scenario_preAllocatedVUs: `${jsonData['preAllocatedVUs']}`,
        scenario_rate: `${jsonData['rate']}`,
        scenario_maxVUs: `${jsonData['maxVUs']}`,
        scenario_timeUnit: `${jsonData['timeUnit']}`,
        scenario_startRate: `${jsonData['startRate']}`,
    }
    return scenarioData;
}