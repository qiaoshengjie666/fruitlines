


module.exports = {
    subscribeService: function () {
        if(cc.sys.platform == cc.sys.BAIDU_GAME){
            swan.subscribeService({
                templateId: '7519c8966fdd442d93cec1e0a30c3521',
                subscribeId: '1234',
                type: 'query',
                success(res) {
                    swan.showModal({
                        title: 'success',
                        content: JSON.stringify(res)
                    });
                },
                fail(err) {
                    swan.showModal({
                        title: 'fail',
                        content: JSON.stringify(err)
                    });
                }
            })
        }
    },
}