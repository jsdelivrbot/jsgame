//��Ʒ
var PrizeSprite = cc.Sprite.extend({
    isHit: false,
    point: 0,
    radius: 0
});
//Ҷ��
var LeafPrize = PrizeSprite.extend({
    ctor: function () {
        this._super();
        this.initWithFile(s_leaf);//����ͼƬԪ��
    },
    initData: function () {
        this.isHit = false;
        this.point = 10; //����
        this.radius = 15; //��ײ�뾶
    }
});

var GameScene = cc.Scene.extend({
    mush: null,
    leafList: [],
    onEnter: function () {
        this._super();//���ø����ͬ�������������ǵ���cc.Scene��onEnter
        this.schedule(this.update, 0);
        //һ���������Լ�д���볡����Ĳ���
        //���Layer
        this.gameLayer = new cc.Layer();
        this.addChild(this.gameLayer);
        //��ӱ���
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
                mush.setPositionX(touchPoint.x);//����X��λ�õ��ڴ�����xλ��
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
            var rotate = new cc.RotateBy(1, 360); //��ת�Ƕȣ���1��������ʱ�䣬��2�������������ʱ������ת�ĽǶ�
            var rep1 = new cc.RepeatForever(rotate); //ѭ����ת
            this.runAction(rep1);//ִ��
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
            //�������ұ߽߱�
            if (pos.x > winSize.width - this.radius) {
                //���������ƶ�
                this.velocity.x *= -1;//�ı�ˮƽ�ٶȷ���

            }
            //��������߽߱�
            if (pos.x < this.radius) {
                this.velocity.x *= -1;//�ı�ˮƽ�ٶȷ���
            }
            //����������߽�
            if (pos.y <= this.radius) {
                //����1����
                //this.curSence.reduceLives();
                this.velocity.y *= -1;
            }
            //�������ϱ߽߱�
            if (pos.y >= winSize.height - this.radius) {
                this.velocity.y *= -1;
            }
        };
        this.bear.collide = function (gameObject) {
            var hit = false;
            var distance = cc.pDistance(this.getPosition(), gameObject.getPosition());//����֮��ľ���
            //������ײ�Ƕȣ��������򵯻�ȥ
            if (distance <= this.radius + gameObject.radius) {
                hit = true;
                //������ײ�Ƕȣ�������ýǶȶ�Ӧ���ٶ�
                var hitAngle = cc.pToAngle(cc.pSub(gameObject.getPosition(), this.getPosition()));
                var scalarVelocity = cc.pLength(this.velocity);
                this.velocity = cc.pMult(cc.pForAngle(hitAngle), scalarVelocity);
                //�������ƶ�
                this.velocity.x *= -1;
                this.velocity.y *= -1;
            }
            cc.log(hit);
            return hit;
        };
        this.bear.beginRotate();
        this.gameLayer.addChild(this.bear, 1);


        //init leaf
        var left = 60;   //��߾���
        var space = 30;   //���
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

        //�ж�����Ҷ����ײ
        for (var i = 0; i < this.leafList.length; i++) {
            var prize = this.leafList[i];
            //�ж�û����ײ����
            if (!prize.isHit) {
                if (this.bear.collide(prize)) {
                    prize.setVisible(false);  //����
                    prize.isHit = true;  //��������ײ���´�ѭ�������
                    //this.addScore(prize.point); //��ӷ���
                }
            }
        }
    }
}); 