
export const vus1 = 1;
export const duration1 = '10s';

/*
Spike test
When the system prepares for seasonal events or receives frequent traffic peaks
Short (a few minutes)
*/
export const spikeTest = {
    stages: [
        { duration: '5s', target: 50 },
        { duration: '5s', target: 10 },
    ],
};

/*
Stress test
When system may receive above-average loads to check how it manages
Mid (5-60 minutes)
*/
export const stressTest = {
    stages: [
        { duration: '10m', target: 200 },
        { duration: '30m', target: 200 },
        { duration: '5m', target: 0 },
    ],
};

/*
Soak test
After changes to check system under prolonged continuous use
Long (hours)
*/
export const soakTest = {
    stages: [
        { duration: '5m', target: 100 },
        { duration: '8h', target: 100 },
        { duration: '5m', target: 0 },
    ],
};

/*
Load test
Often to check system maintains performance with average use
Mid (5-60 minutes)
*/
export const loadTest = {
    stages: [
        { duration: '5m', target: 100 },
        { duration: '30m', target: 100 },
        { duration: '5m', target: 0 },
    ],
};

/*
Smoke test
When the relevant system or application code changes. It checks functional logic, baseline metrics, and deviations
Short (seconds or minutes)
*/
export const smokeTest = {
    vus: 3, // Key for smoke Test. Keep it at 2, 3, max 5vus
    duration: '1m', //This can be s
};

/*
Breakpoint Test
A few times to find the upper limits of the system
As long as necessary
*/
export const breakpointTest = {
    executor: 'ramping-arrival-rate', 
    stages: [
      { duration: '2h', target: 20000 }, 
    ],
};

/*
Fast test 
Checks whether methods work
*/
export const fastTest = {
    vus: 1,
    iterations: 1,
};
