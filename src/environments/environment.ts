// The file contents for the current environment will overwrite these during build.
// The build system defaults to the dev environment which uses `environment.ts`, but if you do
// `ng build --env=prod` then `environment.prod.ts` will be used instead.
// The list of which env maps to which file can be found in `.angular-cli.json`.

export const environment = {
  production: false,
  firebase: {
    apiKey: 'AIzaSyAVOLCcOnaPRDa2_QgRKDqdrk9wuCzWS7c',
    authDomain: 'pancretan-forum.firebaseapp.com',
    databaseURL: 'https://pancretan-forum.firebaseio.com',
    projectId: 'pancretan-forum',
    storageBucket: 'pancretan-forum.appspot.com',
    messagingSenderId: '867139335721'
  }
};
