var GameScene = cc.Scene.extend({
    onEnter:function () {
        this._super();//���ø����ͬ�������������ǵ���cc.Scene��onEnter
        //һ���������Լ�д���볡����Ĳ���
        //���Layer
        this.gameLayer = cc.Layer.create();
        this.addChild(this.gameLayer);
        //��ӱ���
        var bg = cc.Sprite.create(s_forest1);
        this.gameLayer.addChild(bg,0);

        bg.setAnchorPoint(cc.p(0,0));
        bg.setPosition(cc.p(0,0));
    }
}); 