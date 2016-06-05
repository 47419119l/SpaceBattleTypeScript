/**
 * Created by Sandra
 */
module ElMeuJoc {
    export class LoadState extends Phaser.State {
        preload():void {
            super.preload();

            this.stage.backgroundColor = "#edfeff";
            // Add Text
            var etiquetaCargando = this.add.text(this.world.centerX, 150, 'cargando...',
                {font: '30px Arial', fill: '#ffffff'});
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

        }

        create():void {
            super.create();
            //Start game state
            this.game.state.start('game');
        }
    }
}