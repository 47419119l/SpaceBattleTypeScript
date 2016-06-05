/**
 * Created by Sandra
 */
/// <reference path="phaser/phaser.d.ts"/>

module  ElMeuJoc{
    export class gameState extends Phaser.State {
        bombership:Phaser.Sprite;
        nextFire = 0;
        fireRate = 100;
        cursor:Phaser.CursorKeys;

        bullets:Phaser.Group;

        /**
         * Configuracion grupo balas
         */
        configBullet(){

            this.bullets = this.game.add.group();
            this.bullets.enableBody = true;
            this.bullets.physicsBodyType = Phaser.Physics.ARCADE;
            // Per cada disparo apareixeran 30 bales.
            this.bullets.createMultiple(30, 'bullet');
            this.bullets.setAll('checkWorldBounds', true);
            this.bullets.setAll('outOfBoundsKill', true);

        }
        /**
         * Configuración de nave
         */
        configBomberShip(){

            this.bombership = this.game.add.sprite(
                this.game.world.centerX-320,
                this.game.world.height-300 ,
                'shipbomber'
            );
            this.bombership.anchor.setTo(0.5, 0.5);
            this.game.physics.enable(this.bombership, Phaser.Physics.ARCADE);
            this.bombership.body.collideWorldBounds = true;
        }


        create():void {
            super.create();
            this.configBullet();
            this.configBomberShip();
            this.cursor = this.game.input.keyboard.createCursorKeys();



        }

        update():void {
            super.update();
            this.moveBomberShip();

            if (this.cursor.right.isDown)
            {
                this.fire();
            }

        }

        /**
         * Función fuego.
         */
        fire(){

            if (this.game.time.now > this.nextFire && this.bullets.countDead() > 0)
            {
                this.nextFire = this.game.time.now + this.fireRate;

                var bullet = this.bullets.getFirstDead();

                bullet.reset(this.bombership.x , this.bombership.y );

                this.game.physics.arcade.moveToPointer(bullet,500);
            }

        }

        /**
         * Movimientos nave
         */
        moveBomberShip():void {
            // Boton arriba pulsado
            if(this.cursor.up.isDown){
                // el jugador va hacia arriba

                this.bombership.body.velocity.y = -200;
            }
            //Boton abajo pulsado
            else if(this.cursor.down.isDown){
                // el jugador va hacia abajo
                this.bombership.body.velocity.y =200;
            }
            // Si no se pulsan ni el cursor arriba ni el cursos abajo
            else {
                // el jugador se para
                this.bombership.body.velocity.x = 0;
                this.bombership.body.velocity.y = 0;
            }
        }

    }


}