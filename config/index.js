/*------------------------------------------------------AUTH settings------------------------------------------------------*/
const email = "test@onlyoffice.com ";
const password = "11111111";

export const authData = { UserName : `${email}`, Password: `${password}`,};
export const wizardData = { Email : `${email}`, PasswordHash : `${password}`,}


/*--------------------------------------------------------Base URL's--------------------------------------------------------*/
export const basePath = 'http://localhost:8092/api/2.0/';

export const folderMy = `${basePath}files/@my`;
export const folderCommon = `${basePath}files/@common`;
export const folderRecent = `${basePath}files/@recent`;
export const folderTrash = `${basePath}files/@trash`;
export const privateRoom = `${basePath}files/@privacy`;
export const folderTemplates = `${basePath}files/@templates`;
export const folderShared = `${basePath}files/@share`;
export const wizardComplete = `${basePath}settings/wizard/complete`;
export const authentication = `${basePath}authentication`;
export const rooms = `${basePath}files/rooms`;


/*------------------------------------------------Starting data for the test------------------------------------------------*/
export const filesCountFolderMy = 10;
export const foldersCountFolderMy = 10;


/*-------------------------------------------------------TEST SETTINGS-------------------------------------------------------*/
export function setParams(authToken){
    let params = {};
    if(authToken)
    {
        params = {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `${authToken}`,
            }
        }
        return params;
    }
    else
    {
        params = { 
            headers: {
                'Content-Type': 'application/json',
            }
        }
        return params;
    }
};

export const thresholdsSet = 'avg < 2000';

/*------------SHARED ITERATIONS SCENARIO------------*/

//Enable scenario true or false
export const sharedIterationScenarioSettings = true;

//How many times should your test execute? / Default = 1
export const sISIterations = 10;
//Number of virtual users to run concurrently / Default = 1
export const sISVUs = 10;
//Forcibly stop your test if not finished within this timeframe / Default = "10m"
export const sISmaxDuration = null;
//Time when scenrio is started / Default = '0s'
export const sISstartTime = '10s';
//It specifies a duration that k6 will wait before forcefully interrupting an iteration / Default = '30s'
export const sISgracefulStop = null;


/*----------------PER VU ITERATIONS----------------*/

//Enable scenario true or false
export const perVuScenarioSettings = true;

//How many times should your test execute? / Default = 1
export const pVUIterations = 20;
//Number of virtual users to run concurrently / Default = 1
export const pVUVUs = 100;
//Forcibly stop your test if not finished within this timeframe / Default = "10m"
export const pVUmaxDuration = '5m';
//Time when scenrio is started / Default = '0s'
export const pVUstartTime = '10s';
//It specifies a duration that k6 will wait before forcefully interrupting an iteration / Default = '30s'
export const pVUgracefulStop = null;


/*------------------CONSTANT VUs------------------*/

//Enable scenario true or false
export const constVusScenarioSettings = true;

//Overall scenario duration / Default - (required)
export const cVUDuration = '10s';
//Number of virtual users to run concurrently / Default = 1
export const cVUVUs = 10;
//Time when scenrio is started / Default = '0s'
export const cVUstartTime = null;
//It specifies a duration that k6 will wait before forcefully interrupting an iteration / Default = '30s'
export const cVUgracefulStop = null;


/*-------------CONSTANT ARRIVAL RATE-------------*/

//Enable scenario true or false
export const constArrivalRateScenarioSettings = false;

//Overall scenario duration / Default - (required)
export const cARDuration = '30s';
//Number of virtual users at the beginning of test / Default - (required)
export const cARpreAllocatedVUs = 50;
//Desired iterations per timeUnit to be achieved and maintained / Default - (required)
export const cARrate = 30;
//Maximum number of virtual users allowed to scale / Default - (no scaling)
export const cARmaxVUs = null;
//Duration to which the desired rate applies / Default - "1s"
export const cARtimeUnit = '1s';
//Time when scenrio is started / Default = '0s'
export const cARstartTime = null;
//It specifies a duration that k6 will wait before forcefully interrupting an iteration / Default = '30s'
export const cARgracefulStop = null;


/*-------------RAMPING ARRIVAL RATE-------------*/

//Enable scenario true or false
export const rampArrivalRateScenarioSettings = false;

//Number of virtual users at the beginning of test / Default - (required)
export const rARpreAllocatedVUs = 50;
//Consists of a time duration and target for the desired iterations per timeUnit / Default - (required)
export const rARstages = [
    // Start 300 iterations per `timeUnit` for the first minute.
    { target: 300, duration: '1m' },
    // Linearly ramp-up to starting 600 iterations per `timeUnit` over the following two minutes.
    { target: 600, duration: '2m' },
    // Continue starting 600 iterations per `timeUnit` for the following four minutes.
    { target: 600, duration: '4m' },
    // Linearly ramp-down to starting 60 iterations per `timeUnit` over the last two minutes.
    { target: 60, duration: '2m' },
];
//Maximum number of virtual users allowed to scale / Default - (no scaling)
export const rARmaxVUs = null;
//Desired iterations per timeUnit to be achieved and maintained / Default - 0
export const rARstartRate = 300;
//Duration to which the desired rate applies / Default - "1s"
export const rARtimeUnit = '1m';
//Time when scenrio is started / Default = '0s'
export const rARstartTime = null;
//It specifies a duration that k6 will wait before forcefully interrupting an iteration / Default = '30s'
export const rARgracefulStop = null;


/*-------------EXTERNALLY CONTROLLED-------------*/

//Enable scenario true or false
export const extControlledScenarioSettings = false;

//Overall scenario duration / Default - (required)
export const eCduration	 = '3m';
//Maximum number of virtual users allowed to be utilized / Default - 0
export const eCmaxVUs = 50;
//Number of virtual users to run concurrently / Default - 0
export const eCvus = 10;
//Time when scenrio is started / Default = '0s'
export const eCstartTime = null;