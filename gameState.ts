/**
 * Created by Sandra
 */
/// <reference path="phaser/phaser.d.ts"/>

module  ElMeuJoc{
    export class gameState extends Phaser.State {
        bombership:Phaser.Sprite;
        nextFire = 0;
        fireRate = 100;
        bullets:Phaser.Group;

        /**
         * Configuracion grupo balas
         */
        configBullet(){
            this.bullets = this.game.add.group();
            this.bullets.enableBody = true;
            this.bullets.physicsBodyType = Phaser.Physics.ARCADE;

            this.bullets.createMultiple(3, 'bullet');
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
        }


        create():void {
            super.create();
            this.configBullet();
            this.configBomberShip();


        }

        update():void {
            super.update();
            this.bombership.rotation = this.game.physics.arcade.angleToPointer(this.bombership);

            if (this.game.input.activePointer.isDown)
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

                bullet.reset(this.bombership.x - 8, this.bombership.y - 8);

                this.game.physics.arcade.moveToPointer(bullet, 300);
            }

        }

    }


}