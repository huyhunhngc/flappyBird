var foreGround = function(game)
{
    this.game = game;
    this.width = 223;
    this.height = 150;
    this.y = 500;
    this.x = 0;
    this.image = null;
    this.loaded = false;
    var self = this;
    this.Init = function()
    {
        this.image = new Image();
        this.image.onload = ()=>{
            self.loaded = true;
        };
        this.image.src = 'src/foreground.png';
        
    }
    this.draw = function()
    {
        if (this.loaded)
        {
            this.game.context.drawImage(this.image, 0, 0, 223, 100, this.x, this.y, this.width, this.height);
            this.game.context.drawImage(this.image, 0, 0, 223, 100, this.x + this.width, this.y, this.width, this.height);
            this.game.context.drawImage(this.image, 0, 0, 223, 100, this.x + this.width*2, this.y, this.width, this.height);
        }
    }
    this.update = function()
    {
        this.x -=3;
        if (this.x < -this.width) this.x = 0;
    }
}