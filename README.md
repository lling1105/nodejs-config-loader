# nodejs-config-loader
Load config settings from remote url when you want share settings between multiple projects as needed,this module can be used in your front-end project(vue.js,react.js,etc.) and back-end project(node.js)

## Module Usage

### Install
 ```
npm install nodejs-config-loader
```

### Usage
> Module Require:
```javascript
var configLoader = require("nodejs-config-loader");
```  
> Options, only need set once, usually set below at front-end or back-end startup phase
```javascript
configLoader.setOptions({
    remoteBaseUrl: "...",//your http request baseUrl,it'srequired
    API:"" //the RESTApi to get config json data, make sure your own api return json object, optional
});
```
> Method Use:
```javascript
configLoader.getConfigValue('configkey'); //this will return the specific config value by property name
```
