let moduleMap = {
'src/assets/framework/plugin_boosts/libs/es6-promise.js' () { return require('src/assets/framework/plugin_boosts/libs/es6-promise.js') },
'src/assets/framework/plugin_boosts/libs/flatbuffers.js' () { return require('src/assets/framework/plugin_boosts/libs/flatbuffers.js') },
'src/assets/framework/plugin_boosts/libs/g.js' () { return require('src/assets/framework/plugin_boosts/libs/g.js') },
'assets/internal/index.js' () { return require('assets/internal/index.js') },
'assets/resources/index.js' () { return require('assets/resources/index.js') },
'assets/main/index.js' () { return require('assets/main/index.js') },
// tail
};

window.__cocos_require__ = function (moduleName) {
    let func = moduleMap[moduleName];
    if (!func) {
        throw new Error(`cannot find module ${moduleName}`);
    }
    return func();
};