const canvas = document.createElement('canvas');
      canvas.height = 580;
      canvas.width = 380;
      document.body.appendChild(canvas);
      const flap = new Audio();
      flap.src = 'audio/flap.wav';
      const hit = new Audio();
      hit.src = 'audio/hit.wav';
      const point = new Audio();
      point.src = 'audio/point.wav';
      const die = new Audio();
      die.src = 'audio/die.wav';
      const flyup = new Audio();
      flyup.src = 'audio/flyup.wav';
      const click = new Audio();
      click.src = 'audio/mouse_click.mp3';

var score = function(game) 
{
    this.game = game;
    this.score = 0;
    this.best = 0;
    this.draw = function()
    {
      this.game.context.fillStyle = "#FFF";
      this.game.context.strokeStyle = "#000";
      this.game.context.lineWidth = 3;

      if (stateGame == 2)
      {
        this.game.context.lineWidth = 2;
        this.game.context.font = "25px Bungee";
        this.game.context.fillText(this.score, 300, 50);
        this.game.context.strokeText(this.score, 300, 50);
        this.game.context.fillText("score : ", 290, 25);
        this.game.context.strokeText("score : ", 290, 25);
      }
      else if (stateGame == 3)
      {
        this.game.context.lineWidth = 2;
        this.game.context.font = "25px Bungee";
        this.game.context.fillText(this.score, 185, 276);
        this.game.context.strokeText(this.score, 185, 276);

        this.game.context.font = "25px Bungee";
        this.game.context.fillText(this.best, 185, 330);
        this.game.context.strokeText(this.best, 185, 330);
      }
    }
    this.update = function()
    {
      var value = this.game.pipe1.score + this.game.pipe2.score +this.game.pipe3.score;
      this.score = value;
      if (value > this.best) this.best = value;
    }
}

var game = function()
{
  this.readyImg = null;
  this.readyX = 85;
  this.readyY = 185 ;
  this.readyWidth = 200 ;
  this.readyHeight = 181;

  this.overImg = null;
  this.overX = 50;
  this.overY = 160 ;
  this.overWidth = 300 ;
  this.overHeight = 250;
 

  this.state;
  this.backgroundLoaded = false;
  var self = this;

  this.bird = null;
  this.pipe = null;
  this.foreground = null;
  this.height = canvas.height;
  this.width = canvas.width;

  this.keyPressed = false;


  this.Init = function()
  {
    
    this.context = canvas.getContext("2d");
    
    this.bg = new bg(this);
    this.foreGround = new foreGround(this);
    this.bird = new bird(this);

    this.pipe1 = new pipe(this, this.bird,384, -660);
    this.pipe2 = new pipe(this, this.bird,684, -360);
    this.pipe3 = new pipe(this, this.bird,984, -60);

    this.score = new score(this);

    this.readyImg = new Image();
    this.readyImg.onload = function(){};
    this.readyImg.src = 'src/ready.png';
    this.overImg = new Image();
    this.overImg.onload = function(){};
    this.overImg.src = 'src/over.png';
    
    this.bg.Init();
    this.bird.reset();

    this.pipe1.Init();
    this.pipe2.Init();
    this.pipe3.Init();

    this.foreGround.Init();
    this.bird.Init();
    
    this.load();
    
  }
  
  this.readyReset = function()
  {
    this.bird.reset();
    this.pipe1.reset();
    this.pipe2.reset();
    this.pipe3.reset();
    this.readyY = 190;

  }
 
  this.load = function()
  {
    self.update();
    self.draw();
    requestAnimationFrame(self.load);
  }

  this.update = function()
  {
  
    if (stateGame == 2) 
    {
      this.readyY -= 20;

      this.pipe1.update();
      this.pipe2.update();
      this.pipe3.update();
    }
    if (stateGame != 3)
    {
      this.bg.update();
      this.foreGround.update();
    }
    this.bird.update();
    this.score.update();
    
  }

  this.draw = function()
  {
    this.bg.draw();
    
    this.pipe1.draw();
    this.pipe2.draw();
    this.pipe3.draw();

    this.foreGround.draw();
    this.context.drawImage(this.readyImg,this.readyX, this.readyY, this.readyWidth, this.readyHeight);
    this.bird.draw();
    if (stateGame == 3) this.context.drawImage(this.overImg,this.overX, this.overY, this.overWidth, this.overHeight);
    this.score.draw();
  }
}

var g = new game();
g.Init();
var stateGame = 1;


canvas.addEventListener("click", function(event)
{
  switch(stateGame)
  {
    case 1:
        //console.log(stateGame);
        flyup.play();
        stateGame = 2;
        break;   
    case 2:
        g.bird.flap();
        flap.play();
        break;
    case 3:
        let rect = canvas.getBoundingClientRect();
        let clickX = event.clientX - rect.left;
        let clickY = event.clientY - rect.top;
        //  console.log(clickX);
        //  console.log(clickY);
        if(clickX > 144 && clickX < 252)
        {
          if(clickY > 372 && clickY < 406)
          {
            click.play();
            g.readyReset();
            stateGame = 1;    
          }
        }
      break;   
  }
})        