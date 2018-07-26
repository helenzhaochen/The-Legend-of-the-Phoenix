var game = new Phaser.Game(window.innerWidth, window.innerHeight, Phaser.AUTO, 'game-div', { preload: preload, create: create, update: update });

function preload() {

    game.load.image('sky', 'assets/sky.png');
    game.load.image('ground', 'assets/platform.png');
    game.load.image('star', 'assets/star.png');
    game.load.image('Princess3s', 'Images/Princess3s.PNG');
    game.load.spritesheet('Princess', 'assets/Pixel_Princesslr.png', 32,40);
    game.load.tilemap('level1', 'Level1Small.json', null, Phaser.Tilemap.TILED_JSON);
    game.load.image('tiles', 'TileSet.png');;
    game.load.spritesheet('coin', 'assets/coin.png',20,22);
    game.load.spritesheet('arrow','assets/arrow.png')
    game.load.audio('boden', ['assets/ACTIONMUSIC.mp3', 'assets/ACTIONMUSIC.mp3']);
}

//Declare variables outside of functions.

var keys;
var player;
var map;
var ground;
var bow;



function create() {

    map = game.add.tilemap('level1');
    map.addTilesetImage('TileSet', 'tiles');
    
    var groundLayer = map.createLayer('Ground');
    groundLayer.setScale(4);
    var ground2Layer = map.createLayer('Ground 2');
    ground2Layer.setScale(4);
    var waterLayer = map.createLayer('water');
    waterLayer.setScale(4);
    var buildingLater = map.createLayer('Building');
    buildingLater.setScale(4);
    
    
    game.camera.follow(player);
    

    // weapon section
    weapon = game.add.weapon(40, 'arrow');
    weapon.bulletSpeed = 150;
    weapon.fireRate = 100;
    cursors = this.input.keyboard.createCursorKeys();

    fireButton = this.input.keyboard.addKey(Phaser.KeyCode.SPACEBAR);


    //Add dude
    player = game.add.sprite(32, game.world.height - 150, 'Princess');

    coins = game.add.group();
    coins.create(200,200,'coin');
    coins.create(300,300,'coin');
    coins.create(300,400,'coin');
    coins.create(300,500,'coin');
    coins.create(500,350,'coin');
    
        

    //Enabling dude to move
    game.physics.arcade.enable(player);
    game.physics.arcade.enable(coins);
    
    game.world.setBounds(0, 0, 5000, 5000);
    game.camera.follow(player);
    
    
    
    //Controls
    keys = game.input.keyboard.createCursorKeys();
    
    //Add animations to player
    player.animations.add('left', [0, 1, 2, 3,], 10, true);
    player.animations.add('right', [5, 6], 10, true);
    coins.callAll('animations.add','animations','spin',[0,1],4, true)
    coins.callAll('play', null, 'spin')
    
    weapon.trackSprite(player, 0, 0, true);
    
    
 
    music = game.add.audio('ACTIONMUSIC.mp3');
}


var collectCoin = function(player, coin) {
  console.log('im on the coin');
coin.kill()
};

function update() {
    //Collision between the player and ground
    game.physics.arcade.collide(player, ground);
    
    // Check for collisions between the player and all platforms
    game.physics.arcade.collide(player, ground);
    game.physics.arcade.overlap(coins, player, collectCoin);
    
    if (keys.left.isDown) {
        //  Move to the left
        player.body.velocity.x = -225;
        player.animations.play('left');
        player.body.velocity.y = 0;
    }
    else if (keys.right.isDown) {
        //  Move to the right
        player.body.velocity.x = 225;
        player.animations.play('right');
        player.body.velocity.y = 0;
    }
    else if (keys.up.isDown) 
    {
        player.body.velocity.y = -225;
        player.body.velocity.x = 0;
 
    }
    
    else if (keys.down.isDown)
    {
        player.body.velocity.y = 225;
        player.body.velocity.x = 0;

    }
    else {
        //Stop
        player.body.velocity.x = 0;
        player.body.velocity.y = 0;
        
        //Stand Still
        player.animations.stop();
        
        // Reset animation frame
        player.frame = 4;
    }
   
    if (fireButton.isDown)
    {
        weapon.fire();
    }

}