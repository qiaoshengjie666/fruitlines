let moduleMap = {
'src/assets/framework/plugin_boosts/libs/es6-promise.js' () { return require('src/assets/framework/plugin_boosts/libs/es6-promise.js') },
'src/assets/framework/plugin_boosts/libs/flatbuffers.js' () { return require('src/assets/framework/plugin_boosts/libs/flatbuffers.js') },
'src/assets/framework/plugin_boosts/libs/g.js' () { return require('src/assets/framework/plugin_boosts/libs/g.js') },
'assets/internal/index.js' () { return require('assets/internal/index.js') },
'src/scripts/Prefabs/index.js' () { return require('src/scripts/Prefabs/index.js') },
'src/scripts/Sounds/index.js' () { return require('src/scripts/Sounds/index.js') },
'src/scripts/Textures/index.js' () { return require('src/scripts/Textures/index.js') },
'src/scripts/comImages/index.js' () { return require('src/scripts/comImages/index.js') },
'src/scripts/comJson/index.js' () { return require('src/scripts/comJson/index.js') },
'src/scripts/comPrefab/index.js' () { return require('src/scripts/comPrefab/index.js') },
'src/scripts/sound/index.js' () { return require('src/scripts/sound/index.js') },
'src/scripts/resources/index.js' () { return require('src/scripts/resources/index.js') },
'assets/start-scene/index.js' () { return require('assets/start-scene/index.js') },
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