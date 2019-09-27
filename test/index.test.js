const configLoader = require("../index");
beforeEach(done => {
    configLoader.setOptions({remoteBaseUrl:"http://jsonplaceholder.typicode.com/todos/1"});
    done();
});
test('hello should be world',async ()=>{
    var configValue = await configLoader.getConfigValue("title");
    expect(configValue).toBe("delectus aut autem");
});