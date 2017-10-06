var Game = {




  preload:function(){
    game.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
    game.scale.pageAlignHorizontally = true;
    game.scale.pageAlignVertically = true;
    // load game assets
    game.load.image('ball', 'assets/ball.png')
    game.load.image('paddle', 'assets/paddle3.png')
    game.load.image('brick', 'assets/brick.png')
  },



   create:function() {
    game.stage.backgroundColor = "#eee";

    // load phasers physics
    game.physics.startSystem(Phaser.Physics.ARCADE);
    // check for collision with bottom of the screen
    game.physics.arcade.checkCollision.down = false;

    // ball components
    //  and the ball at the x coordinate;
    this.ball = game.add.sprite(game.world.width*0.5, game.world.height-35, 'ball');

    // enable collision with the screen and all game objects
    game.physics.enable(this.ball, Phaser.Physics.ARCADE);
    // balls movement speed
    this.ball.body.velocity.set(150, -150);
    // bounce, y offset
    this.ball.body.collideWorldBounds = true;

    this.ball.body.bounce.set(1);

    this.ball.anchor.set(0.5);

    this.ball.checkWorldBounds = true

    this.ball.events.onOutOfBounds.add(this.restartGame, this);

    this.paddle = game.add.sprite(game.world.width*0.5, game.world.height-10, 'paddle')

    this.paddle.anchor.set(0.5,1);

    game.physics.enable(this.paddle, Phaser.Physics.ARCADE);

    this. paddle.body.collideWorldBounds = true;

    this.paddle.body.immovable = true;

    cursors = game.input.keyboard.createCursorKeys();

    this.score = 10;

    scoreText = game.add.text(0,550, 'Score:', {font: "32px Arial", fill: "#fff"});
    winText = game.add.text(game.world.centerX,game.world.centerY, "You Win!", {font: "32px Arial", fill: "#fff" })
    winText.visible = false;
    this.addBricks();
   },
   addBricks: function(){
    brickInfo = {
        width: 50,
        height: 20,
        count: {
          row: 7,
          col: 3
     },
     offset: {
          top: 50,
          left: 60
     },
     padding: 10
    }

    this.bricks = game.add.group();
    for(c=0; c<brickInfo.count.col; c++) {
      for (r=0; r<brickInfo.count.row; r++) {

        this.brickX = (r* (brickInfo.width+brickInfo.padding))+brickInfo.offset.left;
        this.brickY = (c* (brickInfo.height+brickInfo.padding))+brickInfo.offset.top;

        this.brick = game.add.sprite(this.brickX, this.brickY, 'brick');
        game.physics.enable(this.brick, Phaser.Physics.ARCADE);
        this.brick.body.immovable = true;
        this.brick.anchor.set(0.5);
        this.bricks.add(this.brick);

      }
    }

   },

   killBrick:function(ball, brick) {
      brick.kill();
      score += 100
      // this.scoreText.text = this.scoreText;
   },

   update: function(){
      game.physics.arcade.collide(this.ball, this.paddle);

      game.physics.arcade.collide(this.ball, this.bricks, this.killBrick);

      if (cursors.left.isDown)
      {
        this.paddle.body.velocity.x = -250
      }
      else if (cursors.right.isDown)
      {
        this.paddle.body.velocity.x = 250
      }

    scoreText.text = "Score:" + score;

    if (score == 4000){
      winText.visible = true;
      scoreText.visible = false;
    }

   },



   restartGame:function() {
    game.state.start('game');
   }
};

var game = new Phaser.Game(480, 320, Phaser.AUTHO, null);

game.state.add('game', Game);

game.state.start('game');

// add controls






















