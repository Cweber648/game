// var game = new Phaser.Game(800, 600, Phaser.AUTO, '', { preload: preload, create: create, update: update });

var game = new Phaser.Game(1600, 600, Phaser.CANVAS, 'gamediv')

var scrollingBackground;

var backgroundSpeed;

var player;

var cursors;

var bullets;
var fireButton;
var bulletTime = 0;

var enemies;

var score = 0;
var scoreText;
var winText;


var mainState = {
  preload:function(){

    game.load.image("scrollingBackground", "assets/scrollingBackground.png");
    game.load.image("player", "assets/player.png");
    game.load.image("bullet", "assets/bullet.png");
    game.load.image("enemy", "assets/enemy.png")
  },

  create:function(){


    scrollingBackground = game.add.tileSprite(0,0,1600,600,'scrollingBackground');
    backgroundSpeed = 5
    player = game.add.sprite(game.world.centerX,game.world.centerY + 200, 'player')
    game.physics.enable(player, Phaser.Physics.ARCADE);

    cursors = game.input.keyboard.createCursorKeys();

    bullets = game.add.group();
    bullets.enableBody = true
    bullets.physicsBodyType = Phaser.Physics.ARCADE;
    bullets.createMultiple(30, "bullet" );
    bullets.setAll('anchor.x', 0.5);
    bullets.setAll('anchor.y', 1);
    bullets.setAll('outOfBoundsKill', true)
    bullets.setAll('checkWorldBounds', true);

    fireButton = game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);

    enemies = game.add.group();
    enemies.enableBody = true;
    enemies.physicsBodyType = Phaser.Physics.ARCADE;

    createEnemies();

    scoreText = game.add.text(0,550, 'Score:', {font: "32px Arial", fill: "#fff"});
    winText = game.add.text(game.world.centerX,game.world.centerY, "You Win!", {font: "32px Arial", fill: "#fff" })
    winText.visible = false;

  },

  update:function(){

    game.physics.arcade.overlap(bullets,enemies,collisionHandler,null,this);

    player.body.velocity.x = 0

    scrollingBackground.tilePosition. x += backgroundSpeed;

    if (cursors.left.isDown) {
      player.body.velocity.x = -200;
    }

    if (cursors.right.isDown) {
      player.body.velocity.x = 200;
    }


    if (fireButton.isDown ) {
      fireBullet();
    }


    scoreText.text = "Score:" + score;

    if (score == 4000){
      winText.visible = true;
      scoreText.visible = false;
    }
 },
};

  function fireBullet(){
    if(game.time.now > bulletTime){
      bullet = bullets.getFirstExists(false);

      if(bullet){
        bullet.reset(player.x + 14,player.y);
        bullet.body.velocity.y = -400;
        bulletTime = game.time.now + 200;
      }
    }
  };

  function createEnemies(){
    for(var y = 0; y < 4; y++){
      for(var x = 0; x < 10; x++){
        var enemy = enemies.create(x*100,y*50,'enemy');
        enemy.anchor.setTo(0.5,0.5);
      }
    }
    enemies.x = 1200;
    enemies.y = 40;

    var tween = game.add.tween(enemies).to({x:0}, 2000, Phaser.Easing.Linear.None,true,0,1000,true);

    tween.onLoop.add(descend,this);
  }

function descend(){
  enemies.x += 500;
}

function collisionHandler(bullet,enemy){
  bullet.kill();
  enemy.kill();

  score += 100;
}




game.state.add('mainState', mainState);
game.state.start('mainState');

