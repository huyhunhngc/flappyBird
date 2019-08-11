
var i =0;
var pipe = function(game, bird, x, move){
    
    this.game = game;
    this.bird = bird;
    this.score = 0;

    this.distance = 100;
    this.x = x;
    this.yTop = -200;
    this.yBott = this.yTop + 380 + this.distance;
    
    this.width = 70;
    this.height = 380;
 
   this.reset = function()
    {
       this.score = 0; 
       this.distance = 110;
       this.x = x;
       this.yTop = -200;
       this.yBott = this.yTop + 400 + this.distance;
    }
    var self = this;

    this.Init = function()
    {
        this.pipeImgTop = new Image();
        this.pipeImgTop.onload = function(){}
        this.pipeImgTop.src = 'src/pipeTop.png';

        this.pipeImgBott = new Image();
        this.pipeImgBott.onload = function(){};
        this.pipeImgBott.src = 'src/pipeBottom.png';
    }
    this.update = function()
    {
        var pos = Math.floor(Math.random() * 200) + 1;
        this.x -= 3;
        if (this.x == 108)
        { 
            this.score++;
            point.play();
        }    
        if (this.x <  move) 
        {       
            this.x = x;
            this.yTop =  pos - 250;
            this.yBott = this.yTop + this.height + this.distance;
        }

        if((this.x >= this.bird.x-70  && this.x <= this.bird.x + 15  && this.bird.y -10 < this.yTop +this.height)||(this.x >= this.bird.x-70  && this.x <= this.bird.x + 15 && this.bird.y+10 > this.yBott )) 
        { 
            stateGame = 3;
            hit.play();
            die.play();
        }
       
    }
    this.draw = function()
    {
        this.game.context.drawImage(this.pipeImgTop,this.x,this.yTop,this.width, this.height);
        this.game.context.drawImage(this.pipeImgBott,this.x,this.yBott,this.width, this.height);          
    }
        
    
}
