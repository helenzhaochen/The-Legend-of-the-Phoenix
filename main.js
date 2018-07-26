var game = new Phaser.Game(window.innerWidth, window.innerHeight, Phaser.AUTO, 'game-div', { preload: preload, create: create, update: update });

function preload() {

    game.load.image('sky', 'assets/sky.png');
    game.load.image('ground', 'assets/platform.png');
    game.load.image('star', 'assets/star.png');
    game.load.image('Princess3s', 'Images/Princess3s.PNG');
    game.load.spritesheet('Princess', 'assets/Pixel_princesslr.png', 32,40);
    game.load.tilemap('level1', 'Level1Small.json', null, Phaser.Tilemap.TILED_JSON);
    game.load.image('tiles', 'Tileset.png');
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
    
    map.createLayer('Ground');

    // weapon section
    weapon = game.add.weapon(40, 'arrow');
    weapon.bulletSpeed = 150;
    weapon.fireRate = 100;
    cursors = this.input.keyboard.createCursorKeys();

    fireButton = this.input.keyboard.addKey(Phaser.KeyCode.SPACEBAR);
    

    game.add.sprite(300,300,'coin');
    game.add.sprite(300,400,'coin');
    game.add.sprite(300,500,'coin');
    game.add.sprite(500,350,'coin');

    // Ground
    platforms = game.add.group();
    
    //Create the ground
    ground = platforms.create(0,game.world.height - 40,'ground');

    // Double size of the ground
    ground.scale.setTo(2, 2);
    
    //Enable collision
    game.physics.arcade.enable(ground);
    
    //Stops the ground from falling
    ground.body.immovable = true;
    
    //Add dude
    player = game.add.sprite(32, game.world.height - 150, 'Princess');
    coin = game.add.sprite(500,350,'coin');

    game.world.setBounds(0, 0, 1920, 1920);
    game.camera.follow(player);

    

    //Enabling dude to move
    game.physics.arcade.enable(player);
    
    
    
    //Controls
    keys = game.input.keyboard.createCursorKeys();
    
    //Add animations to player
    player.animations.add('left', [0, 1, 2, 3,], 10, true);
    player.animations.add('right', [5, 6], 10, true);
    
    coin.animations.add('spin',[0,1],10, true);
    coin.animations.play('spin');
    weapon.trackSprite(player, 0, 0, true);
    

    // Add ledge
    var ledge1 = platforms.create(400, 400, 'ground');
    var ledge2 = platforms.create(-150, 250, 'ground');
    
   // Enable physics on platforms
    game.physics.arcade.enable(platforms);
    
    // Prevent the ledges from moving
    ledge1.body.immovable = true;
    ledge2.body.immovable = true;
    
    music = game.add.audio('ACTIONMUSIC.mp3');
    game.input.onDown.add(changeVolume, this);
}
<<<<<<< HEAD
=======

>>>>>>> 13814ff1f32e07cac20be5dda915a55c0e96aae9
function update() {
    //Collision between the player and ground
    game.physics.arcade.collide(player, ground);
    
    // Check for collisions between the player and all platforms
    game.physics.arcade.collide(player, platforms);
    
    if (keys.left.isDown) {
        //  Move to the left
        player.body.velocity.x = -150;
        player.animations.play('left');
        
    }
    else if (keys.right.isDown) {
        //  Move to the right
        player.body.velocity.x = 150;
        player.animations.play('right');
    }
    else if (keys.up.isDown) 
    {
        player.body.velocity.y = -250;
    
    }
    
    else if (keys.down.isDown)
    {
        player.body.velocity.y = 250;
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