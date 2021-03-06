
// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
    production: false,
    firebase: {
      apiKey: "AIzaSyDOrsXLUDEYMh6teL5Rc3wEcbjzMJZY23E",
      authDomain: "angular-algolia.firebaseapp.com",
      databaseURL: "https://angular-algolia.firebaseio.com",
      projectId: "angular-algolia",
      storageBucket: "angular-algolia.appspot.com",
      messagingSenderId: "340560174518",
      appId: "1:340560174518:web:b88fe2342da07ff4517517"
    },
    Algolia_Application_ID: 'TDH1HFPX5P',
    Algolia_Admin_API_Key: 'c3227e6d3ffe36e1d3cdeefa6e290f0f',
    Algolia_Socket_Port: 8181
  };

  // If this file has no import/export statements (i.e. is a script)
  // convert it into a module by adding an empty export statement.
  export {}
  
  /*
   * For easier debugging in development mode, you can import the following file
   * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
   *
   * This import should be commented out in production mode because it will have a negative impact
   * on performance if an error is thrown.
   */
  // import 'zone.js/dist/zone-error';  // Included with Angular CLI.
  