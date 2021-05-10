
const {ccclass, property,help} = cc._decorator;

@ccclass
export default class LevelSelector extends cc.Component {

    @property(cc.PageView)
    pageview :cc.PageView = null

    @property(cc.Node)
    template:cc.Node = null;

    @property(cc.Component.EventHandler)
    onSelectLevel:cc.Component.EventHandler = new cc.Component.EventHandler();

    @property(cc.Component.EventHandler)
    onRefreshItem:cc.Component.EventHandler = new cc.Component.EventHandler();

    @property
    index :number = 0;

    @property
    max: number = 9;

    itemCountPerPage: number = 0;

    pages:cc.Node[] = [];

    currentLevel:number = 1;

    selectLevel(event,msg)
    {
        if(this.onSelectLevel)
            this.onSelectLevel.emit([event.target,Number(event.target.name)])
        else
            console.warn("LevelSelector: onSelectLevel callback is nil")
    }

    autoScrollToCurrentLevel:boolean = true;

    onLoad()
    {
        this.pages.splice(0,this.pages.length);
        this.itemCountPerPage = this.template.childrenCount;
        let pageCount = Math.floor(this.max/this.itemCountPerPage);
        let mod = this.max%this.itemCountPerPage 
        if (mod > 0)
        {
            pageCount = pageCount + 1;
        }
        for (var i = 0 ;i < pageCount -1 ;i++)
        {
            let page = cc.instantiate(this.template)
            this.pageview.addPage(page); 
            this.pages.push(page);
        }
        this.pages.push(this.template);
        for (var pageIdx = 0 ;pageIdx < pageCount; pageIdx++ )
        {
            let page = this.pages[pageIdx];
            for (var itemIdx = 0; itemIdx < page.childrenCount;itemIdx ++ )
            {
                let item = page.children[itemIdx];
                let label = item.getChildByName("label");
                let level = pageIdx * this.itemCountPerPage + Number(itemIdx) + 1 ;
                
                if (level > this.max)
                {
                    item.active = false;
                }
                item.name = level +"";
                label.getComponent(cc.Label).string = item.name;
            }
        }
    }


    private refreshItem(item,level)
    {
        let lv = this.currentLevel;
        if (level > lv)
        {
            item.opacity = 100;
            item.getComponent(cc.Button).enabled = false;
        }else{
            item.opacity = 255;
            item.getComponent(cc.Button).enabled = true;
        }
    }

    refresh()
    {
        console.log("LevelSelctor: refresh")
        for (var i = 0; i< this.pages.length;i++)
        {
            let page = this.pages[i];
            for (var itemIdx = 0; itemIdx < page.childrenCount;itemIdx ++ )
            {
                let item = page.children[itemIdx];
                let level = i * this.itemCountPerPage + Number(itemIdx) + 1 ;
                this.refreshItem(item,level);
                this.onRefreshItem.emit([item,level])
            }
        }
        if(this.autoScrollToCurrentLevel)
            this.scrollToCurrentLevel()
    }

    start () {
        
    }

    scrollToCurrentLevel()
    {
        let lv = this.currentLevel;
        let curPage = Math.floor(lv/this.itemCountPerPage);
        let mod = lv%this.itemCountPerPage 
        if (mod ==  0)
        {
            curPage = curPage - 1;
        }
        this.pageview.scrollToPage(curPage,0.3);
    }

    nextPage()
    {
        this.pageview.scrollToPage(this.pageview.getCurrentPageIndex()+1,0.3)
    }

    prevPage()
    {
        this.pageview.scrollToPage(this.pageview.getCurrentPageIndex()-1,0.3)
    }



    // update (dt) {}
}
