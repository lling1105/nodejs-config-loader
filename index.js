const _ = require("lodash");
const axios = require("axios");
const to = require('await-to-js').to;
var loader = {};
var configs = null;
var options = {
    remoteBaseUrl:"http://127.0.0.1", //required
    API:"",
    body:{}, //optional
    configName:null, //optional

};

loader.getConfigValue =async function(configKey){

    if(configs) return configs[configKey];

    var axiosOps = {
        method: "get",
        url: options.API,
        baseURL:options.remoteBaseUrl,
        params: _.assign(options.body,{configName:options.configName}),
        responseType: 'json',
        responseEncoding: 'utf8',
        timeout: 10000,
        withCredentials: true
    };

    try{
        let response;
        response = await axios(axiosOps);
        configs =  response.data;
    }catch(error){
        throw new Error(error.message);
    }

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

module.exports = loader;