const {ccclass, property} = cc._decorator;

export var R:Res = null;
@ccclass
export default class Res extends cc.Component {
    
    @property(cc.JsonAsset)
    levelJson:cc.JsonAsset = null;

    @property(cc.Prefab)
    TilePrefab:cc.Prefab  = null;

    @property(cc.Prefab)
    TileShadow:cc.Prefab = null;

    @property(cc.Prefab)
    Line46:cc.Prefab = null;

    @property(cc.Prefab)
    Line37:cc.Prefab = null;

    @property(cc.Prefab)
    Line19:cc.Prefab = null;

    @property({type: cc.AudioClip})
    audio_bgm:cc.AudioClip = null;

    @property({type: cc.AudioClip})
    audio_unlock:cc.AudioClip = null;

    @property({type: cc.AudioClip})
    audio_invalid:cc.AudioClip = null;

    @property({type: cc.AudioClip})
    audio_draw:cc.AudioClip = null;

    @property({type: cc.AudioClip})
    audio_down:cc.AudioClip = null;

    @property({type: cc.AudioClip})
    audio_win:cc.AudioClip = null;

    @property({type: cc.AudioClip})
    audio_link:cc.AudioClip = null;

    @property({type: cc.AudioClip})
    audio_get_diamond:cc.AudioClip = null;

    @property([cc.SpriteFrame])
    tileTextures:cc.SpriteFrame[] = []
    
    @property([cc.Prefab])
    animalPrefabs:cc.Prefab[] = []

    @property(cc.JsonAsset)
    skinConfig:cc.JsonAsset =  null;

    @property(cc.JsonAsset)
    luckyConfig: cc.JsonAsset =  null;

    @property([cc.Color])
    colors: cc.Color [] = []
    
    onLoad () {
        R = this;
    }

    start () {

    }

}