//奖品
var PrizeSprite = cc.Sprite.extend({
    isHit: false,
    point: 0,
    radius: 0
});
//叶子
var LeafPrize = PrizeSprite.extend({
    ctor: function () {
        this._super();
        this.initWithFile(s_leaf);//赋予图片元素
    },
    initData: function () {
        this.isHit = false;
        this.point = 10; //分数
        this.radius = 15; //碰撞半径
    }
});

var GameScene = cc.Scene.extend({
    mush: null,
    leafList: [],
    onEnter: function () {
        this._super();//调用父类的同名方法，这里是调用cc.Scene的onEnter
        this.schedule(this.update, 0);
        //一般在这里自己写进入场景后的操作
        //添加Layer
        this.gameLayer = new cc.Layer();
        this.addChild(this.gameLayer);
        //添加背景
        var bg = new cc.Sprite(s_forest1);
        this.gameLayer.addChild(bg, 0);
        bg.setAnchorPoint(cc.p(0, 0));
        bg.setPosition(cc.p(0, 0));


        this.mush = new cc.Sprite(s_mushroom);
        this.mush.radius = 40;
        this.mush.setAnchorPoint(cc.p(0.5, 0));
        this.mush.setPosition(cc.p(240, 0));

        var mush = this.mush;
        var mushListener = cc.EventListener.create({
            event: cc.EventListener.TOUCH_ONE_BY_ONE,
            swallowTouches: true,
            onTouchBegan: function (touch, event) {
                cc.log("start...");
                return true;
            },
            onTouchMoved: function (touch, event) {
                cc.log("---");
                var touchPoint = touch.getLocation();
                mush.setPositionX(touchPoint.x);//设置X轴位置等于触摸的x位置
            },
            onTouchEnded: function (touch, event) {
                //return false;
            }
        });

        cc.eventManager.addListener(mushListener, this.mush);
        this.gameLayer.addChild(this.mush, 1);


        this.bear = new cc.Sprite(s_beareyesopen);
        this.bear.setPosition(cc.p(240, 60));
        this.bear.beginRotate = function () {
            var rotate = new cc.RotateBy(1, 360); //旋转角度，第1个参数：时间，第2个参数：在这个时间内旋转的角度
            var rep1 = new cc.RepeatForever(rotate); //循环旋转
            this.runAction(rep1);//执行
        };
        this.bear.stopRotate = function () {
            this.stopAllActions();
        };
        this.bear.update = function (dt) {
            //this.beginRotate();
            this.setPosition(cc.pAdd(this.getPosition(), cc.pMult(this.velocity, dt)));
            this.checkHitEdge();
        };
        this.bear.radius = 25;
        this.bear.velocity = cc.p(100, 100);
        this.bear.checkHitEdge = function () {
            var pos = this.getPosition();
            var winSize = cc.director.getWinSize();
            //熊碰到右边边界
            if (pos.x > winSize.width - this.radius) {
                //假如向右移动
                this.velocity.x *= -1;//改变水平速度方向

            }
            //熊碰到左边边界
            if (pos.x < this.radius) {
                this.velocity.x *= -1;//改变水平速度方向
            }
            //熊碰到下面边界
            if (pos.y <= this.radius) {
                //减少1生命
                //this.curSence.reduceLives();
                this.velocity.y *= -1;
            }
            //熊碰到上边边界
            if (pos.y >= winSize.height - this.radius) {
                this.velocity.y *= -1;
            }
        };
        this.bear.collide = function (gameObject) {
            var hit = false;
            var distance = cc.pDistance(this.getPosition(), gameObject.getPosition());//两者之间的距离
            //计算碰撞角度，往反方向弹回去
            if (distance <= this.radius + gameObject.radius) {
                hit = true;
                //计算碰撞角度，并算出该角度对应的速度
                var hitAngle = cc.pToAngle(cc.pSub(gameObject.getPosition(), this.getPosition()));
                var scalarVelocity = cc.pLength(this.velocity);
                this.velocity = cc.pMult(cc.pForAngle(hitAngle), scalarVelocity);
                //反方向移动
                this.velocity.x *= -1;
                this.velocity.y *= -1;
            }
            cc.log(hit);
            return hit;
        };
        this.bear.beginRotate();
        this.gameLayer.addChild(this.bear, 1);


        //init leaf
        var left = 60;   //左边距离
        var space = 30;   //间距
        for (var i = 0; i <= 11; i++) {
            var prize = new LeafPrize();
            prize.initData();
            prize.setPosition(cc.p(left + i * space, 310));
            this.gameLayer.addChild(prize, 1);
            this.leafList.push(prize);
        }
        //this.bear.beginRotate();
        //this.getDirection()
        //cc.Director._getInstance().getTouchDis
        //cc.Director.getInstance().getTouchDispatcher().addTargetedDelegate(this, 0, true);
    },
    update: function (dt) {
        this.bear.update(dt);
        this.bear.collide(this.mush);

        //判断熊与叶子碰撞
        for (var i = 0; i < this.leafList.length; i++) {
            var prize = this.leafList[i];
            //判断没被碰撞则检测
            if (!prize.isHit) {
                if (this.bear.collide(prize)) {
                    prize.setVisible(false);  //隐藏
                    prize.isHit = true;  //设置已碰撞，下次循环不检测
                    //this.addScore(prize.point); //添加分数
                }
            }
        }
    }
}); 