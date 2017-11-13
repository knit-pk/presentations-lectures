
module.exports = {
  mongodb: {
    // if a connection string options such as server/port/etc are ignored
    connectionString: 'mongodb://localhost/db',

    // autoReconnect: automatically reconnect if connection is lost
    autoReconnect: true,

    // poolSize: size of connection pool (number of connections to use)
    poolSize: 4,
    adminUsername: 'admin',
    adminPassword: 'admin'
  },
  site: {
    baseUrl: '/admin-mongo',
    host: 'localhost',
    port: process.env.VCAP_APP_PORT || 8081,
    sessionSecret: 'sessionsecret'
  },
  options: {
    // Display startup text on console
    console: true,

    // documentsPerPage: how many documents you want to see at once in collection view
    documentsPerPage: 10,

    // editorTheme: Name of the theme you want to use for displaying documents
    // See http://codemirror.net/demo/theme.html for all examples
    editorTheme: process.env.ME_CONFIG_OPTIONS_EDITORTHEME || 'rubyblue',

    // Maximum size of a single property & single row
    // Reduces the risk of sending a huge amount of data when viewing collections
    maxPropSize: (100 * 1000), // default 100KB
    maxRowSize: (1000 * 1000), // default 1MB

    // The options below aren't being used yet

    // cmdType: the type of command line you want mongo express to run
    // values: eval, subprocess
    //  eval - uses db.eval. commands block, so only use this if you have to
    //  subprocess - spawns a mongo command line as a subprocess and pipes output to mongo express
    cmdType: 'eval',

    // subprocessTimeout: number of seconds of non-interaction before a subprocess is shut down
    subprocessTimeout: 300,

    // readOnly: if readOnly is true, components of writing are not visible.
    readOnly: false,

    // collapsibleJSON: if set to true, jsons will be displayed collapsible
    collapsibleJSON: true,

    // collapsibleJSONDefaultUnfold: if collapsibleJSON is set to `true`, this defines default level
    //  to which JSONs are displayed unfolded; use number or "all" to unfold all levels
    collapsibleJSONDefaultUnfold: 1,

    // gridFSEnabled: if gridFSEnabled is set to 'true', you will be able to manage uploaded files ( ak. grids, gridFS )
    gridFSEnabled: process.env.ME_CONFIG_SITE_GRIDFS_ENABLED || false,

    // logger: this object will be used to initialize router logger (morgan)
    logger: {},

    // confirmDelete: if confirmDelete is set to 'true', a modal for confirming deletion is displayed before deleting a document/collection
    confirmDelete: false
  },
  defaultKeyNames: {}
}
