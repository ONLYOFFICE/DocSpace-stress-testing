
const email = "test@onlyoffice.com ";
const password = "11111111";

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

export const authData = { UserName : `${email}`, Password: `${password}`,};
export const wizardData = { Email : `${email}`, PasswordHash : `${password}`,}
