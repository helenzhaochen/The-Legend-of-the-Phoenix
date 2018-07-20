var game = new Phaser.Game(800, 600, Phaser.AUTO, 'game-div', { preload: preload, create: create, update: update });

function preload() {

    game.load.image('sky', 'assets/sky.png');
    game.load.image('ground', 'assets/platform.png');
    game.load.image('star', 'assets/star.png');
    game.load.image('Princess3s', 'Images/Princess3s.PNG');
    game.load.spritesheet('Princess', 'assets/Pixel_princesslr.png', 32,40);
    game.load.tilemap('level1', 'test2.json', null, Phaser.Tilemap.TILED_JSON);
    game.load.image('tiles', 'Tileset.png');
    game.load.spritesheet('coin', 'assets/coin.png',20,22);
}

//Declare variables outside of functions.

var keys;
var player;
var map;
var ground;
var platform;
var bow;


function create() {

    map = game.add.tilemap('level1');
    map.addTilesetImage('map_02', 'tiles');
    
    map.createLayer('Ground');
    
//    game.add.sprite(0,0,"sky");
    game.add.sprite(300,300,'star');
    game.add.sprite(300,400,'star');
    game.add.sprite(300,500,'star');
    // weapon section
    weapon = game.add.weapon(40, 'bullet');
    weapon.bulletSpeed = 400;
    weapon.fireRate = 50;
    cursors = this.input.keyboard.createCursorKeys();

    fireButton = this.input.keyboard.addKey(Phaser.KeyCode.SPACEBAR);
    
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

    
    

    //Enabling dude to move
    game.physics.arcade.enable(player);
    
    //Player Physics properties
    player.body.gravity.y = 350;
    
    //Controls
    keys = game.input.keyboard.createCursorKeys();
    
    //Add animations to player
    player.animations.add('left', [0, 1, 2, 3,], 10, true);

    
    coin.animations.add('spin',[0,1],10, true);
    coin.animations.play('spin');
    
    

    player.animations.add('right', [5, 6], 10, true);
    

    // Add ledge
    var ledge1 = platforms.create(400, 400, 'ground');
    var ledge2 = platforms.create(-150, 250, 'ground');
    
   // Enable physics on platforms
    game.physics.arcade.enable(platforms);
    
    // Prevent the ledges from moving
    ledge1.body.immovable = true;
    ledge2.body.immovable = true;
}

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
    else {
        //Stop
        player.body.velocity.x = 0;
        
        //Stand Still
        player.animations.stop();
        
        // Reset animation frame
        player.frame = 4;
    }
    
    if (keys.up.isDown && player.body.touching.down) 
    {
        player.body.velocity.y = -350;
    }
    
   

    if (fireButton.isDown)
    {
        weapon.fire();
    }

    

}

