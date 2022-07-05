const environmentList = [
  'https://reqres.in/', //local       = 0
  'https://staging-api..in', // develop    = 1
  '', //production  = 2
];

export const env = 1; // Place your environment number here

// if idle for this much time go to idle screen
export const idleTime = 1000 * 60 * 15; // millisec * sec * min * hr * days

// after idle wait this much time before logout
// const waitTimeInTimeOutScreen = 1000 * 60 * 10;

export const hostConfig = {
  CURRENT_URL: environmentList[env],
  WEB_URL: process.env.url,
  API_URL: `${environmentList[env]}`,
};
