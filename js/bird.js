var bird = function(game)
{
    this.game = game;
    this.reset=function()
    {
        this.change = 1;
        this.setTime = 0;
        this.setTimeReady = 0;
        this.per = 20;

        this.x = 185;
        this.y = 260;
        this.dY = 0.3;

        

        this.rotation = 0;
        this.jump = 6;
        this.speed = -5;
        this.gravity = 0.3;
    }
    this.loaded = false;
    var self = this;

    this.Init = function()
    {
        this.birdImage = new Image();
        this.birdImage.onload = function()
        {
            self.loaded = true;
        }
        this.birdImage.src = 'src/bird.png';
    }
    
    this.update = function()
    {
        this.readyBird();
        if(stateGame == 1)
        {
           this.rotation = 0;
        }
        else 
        {    
            this.speed += this.gravity;
            this.y += this.speed;

            if(this.speed >= this.jump -1)
            {
                this.rotation = 1.4;
                this.change = 1;
            }
            else
            {
                this.rotation = -0.3;
            }
            if (this.y > 480) 
            {
                this.y = 480;
                stateGame = 3;
            }
        }
        
    }
    
    this.flap = function()
    {
        this.speed = -this.jump;
    }
    this.readyBird = function()
    {
        this.setTimeReady++;
        this.y += this.dY;
        if (this.setTimeReady % 28 == 0)
        { 
            this.dY = -this.dY;  
        }    
        if (this.setTimeReady > 10000) this.setTimeReady = 1;

        this.setTime++;
        if (stateGame == 2) this.per = 10;
        if (this.setTime % this.per == 0)
        {
            this.change++;
            if (this.change >= 3) this.change = 0;    
        }
            

    }
    
    this.draw = function()
    {
        if (this.loaded)
        {
            this.game.context.save();
            this.game.context.translate(this.x, this.y);
            this.game.context.rotate(this.rotation);
            this.game.context.drawImage(this.birdImage, 92*this.change, 0, 92, 64, -23, -16, 46, 32 );
            this.game.context.restore();
        }
    }
}
