let moduleMap = {
'src/assets/framework/plugin_boosts/libs/es6-promise.js' () { return require('src/assets/framework/plugin_boosts/libs/es6-promise.js') },
'src/assets/framework/plugin_boosts/libs/flatbuffers.js' () { return require('src/assets/framework/plugin_boosts/libs/flatbuffers.js') },
'src/assets/framework/plugin_boosts/libs/g.js' () { return require('src/assets/framework/plugin_boosts/libs/g.js') },
'src/scripts/comImage/index.js' () { return require('src/scripts/comImage/index.js') },
'src/scripts/comItem/index.js' () { return require('src/scripts/comItem/index.js') },
'src/scripts/comLucky/index.js' () { return require('src/scripts/comLucky/index.js') },
'src/scripts/comResult/index.js' () { return require('src/scripts/comResult/index.js') },
'src/scripts/comSign/index.js' () { return require('src/scripts/comSign/index.js') },
'assets/comJson/index.js' () { return require('assets/comJson/index.js') },
'src/scripts/sound/index.js' () { return require('src/scripts/sound/index.js') },
'assets/resources/index.js' () { return require('assets/resources/index.js') },
'assets/internal/index.js' () { return require('assets/internal/index.js') },
'src/scripts/main/index.js' () { return require('src/scripts/main/index.js') },
// tail
};

window.__cocos_require__ = function (moduleName) {
    let func = moduleMap[moduleName];
    if (!func) {
        throw new Error(`cannot find module ${moduleName}`);
    }
    return func();
};