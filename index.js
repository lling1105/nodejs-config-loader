const _ = require("lodash");
const axios = require("axios");
const to = require('await-to-js').to;
const jsEnv = require('browser-or-node');

// global values
var configs = null; //config data, return from config-center
var version = null; //current config version, return from config-center

// options
var options = {
    remoteBaseUrl:"http://127.0.0.1", //required
    configGroup:null, //required
    API:"",
    body:{}, //optional


};


var loader = {};
loader.getConfigValue =async function(configKey){
    var _that=this;
    if(version) return configs[configKey];
    await loadConfigs();
    return configs[configKey];
};

loader.setOptions = function(ops){
    options = _.assign(options,ops);
};
loader.getOptions = function(){
    return options;
};
loader.getConfigs = function(){
    return configs;
};

//request config data from remote url
async function loadConfigs(){
    var axiosOps = {
        method: "get",
        url: options.API,
        baseURL:options.remoteBaseUrl,
        params: _.assign(options.body,{
            configGroup:this.options.configGroup, //config group name
        }),
        responseType: 'json',
        responseEncoding: 'utf8',
        timeout: 10000,
        withCredentials: true
    };

    try{
        let response;
        response = await axios(axiosOps);
        let configs_data =  response.data;
        if(configs_data.version==null){
            configs = null;
            version = null;
            throw new Error("No available config version, you can set from Config-Center.");
        }else{
            configs = configs_data.configs;
            version = configs_data.version;
            console.log("Config reloaded: version "+version);
        }
    }catch(error){
        throw new Error(error.message);
    }
}

var schedule = require('node-schedule');
// auto refresh, only for server side node
if(jsEnv.isNode){
    var _that = this;
    //start schedule to refresh configs every minutes
    var job = schedule.scheduleJob('1 * * * * *',async function(){
        console.log('jsEnv is node, refresh configs every minutes');
        await loadConfigs();
    });
}

module.exports = loader;