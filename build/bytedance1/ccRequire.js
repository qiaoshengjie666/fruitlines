let moduleMap = {
'src/assets/framework/plugin_boosts/libs/es6-promise.js' () { return require('src/assets/framework/plugin_boosts/libs/es6-promise.js') },
'src/assets/framework/plugin_boosts/libs/flatbuffers.js' () { return require('src/assets/framework/plugin_boosts/libs/flatbuffers.js') },
'src/assets/framework/plugin_boosts/libs/g.js' () { return require('src/assets/framework/plugin_boosts/libs/g.js') },
'assets/internal/index.js' () { return require('assets/internal/index.js') },
'src/scripts/Prefabs/index.js' () { return require('src/scripts/Prefabs/index.js') },
'src/scripts/Sounds/index.js' () { return require('src/scripts/Sounds/index.js') },
'src/scripts/Textures/index.js' () { return require('src/scripts/Textures/index.js') },
'assets/comImage/index.js' () { return require('assets/comImage/index.js') },
'assets/comItem/index.js' () { return require('assets/comItem/index.js') },
'assets/comJson/index.js' () { return require('assets/comJson/index.js') },
'assets/comPrefab/index.js' () { return require('assets/comPrefab/index.js') },
'assets/comSound/index.js' () { return require('assets/comSound/index.js') },
'assets/comLucky/index.js' () { return require('assets/comLucky/index.js') },
'assets/luckyPrefab/index.js' () { return require('assets/luckyPrefab/index.js') },
'assets/comResult/index.js' () { return require('assets/comResult/index.js') },
'assets/resultPrefab/index.js' () { return require('assets/resultPrefab/index.js') },
'assets/signPrefab/index.js' () { return require('assets/signPrefab/index.js') },
'src/scripts/resources/index.js' () { return require('src/scripts/resources/index.js') },
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