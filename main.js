var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
/// <reference path="phaser/phaser.d.ts"/>
var Point = Phaser.Point;
var ElMeuJoc;
(function (ElMeuJoc) {
    var SimpleGame = (function (_super) {
        __extends(SimpleGame, _super);
        function SimpleGame() {
            _super.call(this, 800, 600, Phaser.AUTO, "gameDiv");
            this.scorePun = 0;
            this.state.add("load", ElMeuJoc.LoadState);
            this.state.add("menu", ElMeuJoc.menuStartGame);
            this.state.add("game", ElMeuJoc.gameState);
            this.state.start("load");
        }
        return SimpleGame;
    })(Phaser.Game);
    ElMeuJoc.SimpleGame = SimpleGame;
})(ElMeuJoc || (ElMeuJoc = {}));
window.onload = function () {
    var game = new ElMeuJoc.SimpleGame();
};
/**
 * Created by Sandra
 */
/// <reference path="phaser/phaser.d.ts"/>
var ElMeuJoc;
(function (ElMeuJoc) {
    var menuStartGame = (function (_super) {
        __extends(menuStartGame, _super);
        function menuStartGame() {
            _super.apply(this, arguments);
        }
        menuStartGame.prototype.create = function () {
            _super.prototype.create.call(this);
        };
        menuStartGame.prototype.update = function () {
            _super.prototype.update.call(this);
        };
        return menuStartGame;
    })(Phaser.State);
    ElMeuJoc.menuStartGame = menuStartGame;
})(ElMeuJoc || (ElMeuJoc = {}));
/**
 * Created by Sandra
 */
var ElMeuJoc;
(function (ElMeuJoc) {
    var LoadState = (function (_super) {
        __extends(LoadState, _super);
        function LoadState() {
            _super.apply(this, arguments);
        }
        LoadState.prototype.preload = function () {
            _super.prototype.preload.call(this);
            this.stage.backgroundColor = "#edfeff";
            // Add Text
            var etiquetaCargando = this.add.text(this.world.centerX, 150, 'cargando...', { font: '30px Arial', fill: '#ffffff' });
            etiquetaCargando.anchor.setTo(0.5, 0.5);
            // Show process bar
            var progressBar = this.add.sprite(this.world.centerX, 200, 'progressBar');
            progressBar.anchor.setTo(0.5, 0.5);
            this.load.setPreloadSprite(progressBar);
            //Load Font
            this.load.bitmapFont('carrier_command', 'assets/fonts/bitmapFonts/carrier_command.png', 'assets/fonts/bitmapFonts/carrier_command.xml');
            //Load Image
            this.game.load.image('shipbomber', 'assets/ship_bomber.png');
            this.game.load.image('enemy1', 'assets/enemy00.png');
            this.game.load.image('enemy2', 'assets/enemy01.png');
            this.game.load.image('bullet', 'assets/purple_ball.png');
            // Load Audios
            this.load.audio('audio', 'assets/audio/SoundEffects/p-ping.mp3');
            //Start physics.
            this.physics.startSystem(Phaser.Physics.ARCADE);
        };
        LoadState.prototype.create = function () {
            _super.prototype.create.call(this);
            //Start game state
            this.game.state.start('game');
        };
        return LoadState;
    })(Phaser.State);
    ElMeuJoc.LoadState = LoadState;
})(ElMeuJoc || (ElMeuJoc = {}));
/**
 * Created by Sandra
 */
/// <reference path="phaser/phaser.d.ts"/>
var ElMeuJoc;
(function (ElMeuJoc) {
    var gameState = (function (_super) {
        __extends(gameState, _super);
        function gameState() {
            _super.apply(this, arguments);
            this.nextFire = 0;
            this.fireRate = 100;
        }
        /**
         * Configuracion grupo balas
         */
        gameState.prototype.configBullet = function () {
            this.bullets = this.game.add.group();
            this.bullets.enableBody = true;
            this.bullets.physicsBodyType = Phaser.Physics.ARCADE;
            this.bullets.createMultiple(3, 'bullet');
            this.bullets.setAll('checkWorldBounds', true);
            this.bullets.setAll('outOfBoundsKill', true);
        };
        /**
         * Configuración de nave
         */
        gameState.prototype.configBomberShip = function () {
            this.bombership = this.game.add.sprite(this.game.world.centerX - 320, this.game.world.height - 300, 'shipbomber');
            this.bombership.anchor.setTo(0.5, 0.5);
            this.game.physics.enable(this.bombership, Phaser.Physics.ARCADE);
        };
        gameState.prototype.create = function () {
            _super.prototype.create.call(this);
            this.configBullet();
            this.configBomberShip();
        };
        gameState.prototype.update = function () {
            _super.prototype.update.call(this);
            this.bombership.rotation = this.game.physics.arcade.angleToPointer(this.bombership);
            if (this.game.input.activePointer.isDown) {
                this.fire();
            }
        };
        /**
         * Función fuego.
         */
        gameState.prototype.fire = function () {
            if (this.game.time.now > this.nextFire && this.bullets.countDead() > 0) {
                this.nextFire = this.game.time.now + this.fireRate;
                var bullet = this.bullets.getFirstDead();
                bullet.reset(this.bombership.x - 8, this.bombership.y - 8);
                this.game.physics.arcade.moveToPointer(bullet, 300);
            }
        };
        return gameState;
    })(Phaser.State);
    ElMeuJoc.gameState = gameState;
})(ElMeuJoc || (ElMeuJoc = {}));
//# sourceMappingURL=main.js.map