
/*
The shared-iterations executor shares iterations between the number of VUs. The test ends once k6 executes all iterations.
maxDuration - Maximum scenario duration before it's forcibly stopped (excluding gracefulStop).
*/
export const shared_iter_scenario = {
    executor: "shared-iterations",
    vus: 1000,
    iterations: 1000,
    startTime: "3m",
};

/*
With the per-vu-iterations executor, each VU executes an exact number of iterations. The total number of completed iterations equals vus * iterations.
*/
export const per_vu_scenario = {
    executor: 'per-vu-iterations',
    vus: 100,
    iterations: 20,
    maxDuration: '5m',
    startTime: "30s",
};

/*
With the constant-vus executor, a fixed number of VUs execute as many iterations as possible for a specified amount of time.
*/
export const const_vus_scenario = {
    executor: 'constant-vus', 
    vus: 10,
    duration: '30s',
};

/*
With the constant-arrival-rate executor, k6 starts a fixed number of iterations over a specified period of time. It is an open-model executor, meaning iterations start independently of system response 
*/
export const const_arrival_rate_scenario = {
    executor: 'constant-arrival-rate',

    // How long the test lasts
    duration: '30s',
      
    // How many iterations per timeUnit
    rate: 30,
      
    // Start `rate` iterations per second
    timeUnit: '1s',
      
    // Pre-allocate VUs
    preAllocatedVUs: 50,
};

/*
With the ramping-arrival-rate executor, k6 starts iterations at a variable rate. It is an open-model executor, meaning iterations start independently of system response
*/
export const ramp_arrival_rate_scenario = {
    executor: 'ramping-arrival-rate',
    // Start iterations per `timeUnit`
    startRate: 300,
    // Start `startRate` iterations per minute
    timeUnit: '1m',
    // Pre-allocate necessary VUs.
    preAllocatedVUs: 50,
    stages: [
        // Start 300 iterations per `timeUnit` for the first minute.
        { target: 300, duration: '1m' },
        // Linearly ramp-up to starting 600 iterations per `timeUnit` over the following two minutes.
        { target: 600, duration: '2m' },
        // Continue starting 600 iterations per `timeUnit` for the following four minutes.
        { target: 600, duration: '4m' },
        // Linearly ramp-down to starting 60 iterations per `timeUnit` over the last two minutes.
        { target: 60, duration: '2m' },
    ],
};

/*
Externally controlled - control and scale execution at runtime
*/
export const ext_controlled_scenario = {
    executor: 'externally-controlled',
    vus: 10,
    maxVUs: 50,
    duration: '10m',
};