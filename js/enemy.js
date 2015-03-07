var enemy = function(scene, sprite)
{
	var self = this;
	
	if(typeof(sprite) == "undefined")
	{
		return;
	}
	
	this.scene = scene;
	this.game = this.scene.game;
	
    this.speed = 200/1000;
	this.x = 0;
	this.y = 0;
	
	this.scale = 0.1;
	
	this.dest = null;
	this.sprite = sprite;
	
	self.loadSprite(this.sprite);
};

enemy.prototype.placement = function(x,y)
{
	this.x = x;
	this.y = y;
};

enemy.prototype.moveTo = function(X,Y)
{
	this.startX = this.x;
	this.startY = this.y;
	this.targetX = X;
	this.targetY = Y;
	this.moveTime = this.game.timeData.local;
	
	var dis = Math.sqrt(Math.pow(this.targetX - this.startX, 2)+Math.pow(this.targetY - this.startY, 2)) //algorithm de la distance
	this.moveDuration = dis / (this.speed * this.scale);
	this.isMoving = true;
};


enemy.prototype.loadSprite = function(srcImg)
{
	var self = this;
	var image = new Image();
	image.src = srcImg;
	this.currentSprite = image;
};

enemy.prototype.update = function(timeData)
{
	if(this.moveTime && timeData.local < this.moveTime + this.moveDuration){
		var f = (timeData.local - this.moveTime)/this.moveDuration;
		
		/* easeIn>1 , 0>easeOut>1 */
		//f = Math.pow(f,0.6);
		
		this.placement(
			f * (this.targetX - this.startX) + this.startX,
			f * (this.targetY - this.startY) + this.startY);
		
	}
	else if (this.isMoving)
	{
		this.isMoving = false;
		this.placement(this.targetX, this.targetY);
	}
};

enemy.prototype.render = function(g)
{
	g.save();
		g.translate(this.x, this.y);
		if(this.currentSprite)
		{
		    g.scale(1, 1);
		    g.drawImage(this.currentSprite, -this.currentSprite.width / 2, -this.currentSprite.height / 2);
		}
	g.restore();
};