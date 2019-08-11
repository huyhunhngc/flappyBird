var bg =function(game){
    this.height = 510;
    this.width = 450; 
    this.x = 0;
    this.y = 0;
    this.random = Math.random();
    this.game = game;
    this.loaded = false;
    var self = this;
    this.background = new Image();
    this.Init = function()
    {
        this.background.onload = function()
        {
            self.loaded=true;
        }

        this.background.src = 'src/background.png';
       
    }
    this.update = function()
    {
        this.x -= 0.3;
        if (this.x < -this.width) this.x = 0;
    }
    this.draw = function()
    {
        if(this.loaded)
        {
            this.game.context.save();
            this.game.context.drawImage(this.background, this.x, this.y, this.width, this.height);
            this.game.context.drawImage(this.background, this.x + this.width -1, this.y, this.width, this.height);
            this.game.context.restore();
        }
    }

}