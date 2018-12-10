let player;

function Player(playerType, hp, mp, strength, speed, magic, shield, potion) {
    this.playerType = playerType;
    this.hp = hp;
    this.mp = mp;
    this.strength = strength;
    this.speed = speed;
    this.magic = magic;
    this.shield = shield;
    this.potion = potion

    this.attack = function () {
        const lastAction = document.querySelector('#last-action')
        const enemyHP = document.querySelector('#enemy-hp')

        if (enemy.shield === false) {
            enemy.hp -= 20;
        } else {
            enemy.hp -= 5;
            enemy.shield = false
        }

        myVar = setInterval(weaponFlip, 10)
        let deg = 275;
        let x = 380;

        function weaponFlip () {
            const weapon = document.querySelector('#weapon')
            weapon.style.display = 'block'
            deg+=11
            x+=5
            if (x >= 900) {
                clearInterval(myVar)
                weapon.style.display = 'none'
            }
            
            weapon.style.left = x + 'px'
            weapon.style.transform = `rotate(${deg}deg)`
        }

        enemyHP.style.width = enemy.hp + '%'

        lastAction.innerHTML = 'You attacked the enemy'
        Game.updateFight('enemy')
    };

    this.useShield = function () {
        const lastAction = document.querySelector('#last-action')
        if (this.shield === false) {
            this.shield = !this.shield
            
            myVar = setInterval(showShield, 10)
            let shieldTime = 0;

            function showShield () {
                const shieldImage = document.querySelector('#player-shield')
                shieldImage.style.display = 'block'
                shieldTime+=1
                if (shieldTime >= 50) {
                    clearInterval(myVar)
                    shieldImage.style.display = 'none'
                }
            }
            lastAction.innerHTML = 'You have used your shield'
        } 

        Game.updateFight('enemy')
    };

    this.useMagic = function () {
        const lastAction = document.querySelector('#last-action')
        const enemyHP = document.querySelector('#enemy-hp')
        const playerMP = document.querySelector('#player-mp')

        if (this.mp >= 25) {
            if (enemy.shield === false) {
                enemy.hp -= 30;
            } else {
                enemy.hp -= 10;
                enemy.shield = false
            }
            player.mp -= 25;

            myVar = setInterval(magicFly, 10)
            let height = 25;
            let x = 430;
            let y = 425

            function magicFly () {
                const magicBall = document.querySelector('#player-magic')
                magicBall.style.display = 'block'
                height+=4
                x+=5
                y-=2
                if (x >= 850) {
                    clearInterval(myVar)
                    magicBall.style.display = 'none'
                }
                
                magicBall.style.left = x + 'px'
                magicBall.style.top = y + 'px'
                magicBall.style.height = height + 'px'
            }

            lastAction.innerHTML = 'You have used magic on the enemy'
            enemyHP.style.width = enemy.hp + '%'
            playerMP.style.width = player.mp + '%'

            Game.updateFight('enemy')   
        } else {
            lastAction.innerHTML = 'You do not have enough mp to use magic'
        }
    };

    this.usePotion = function () {
        const lastAction = document.querySelector('#last-action')
        const playerHP = document.querySelector('#player-hp')
        let healAmt

        if (this.potion == 0) {
            lastAction.innerHTML = 'You do not have any more potions'
        } else {
            if (this.hp >= 100) {
                lastAction.innerHTML = 'You already have full health'
                return
            }
            else if (this.hp > 80) {
                healAmt = 100-this.hp
            } else {
                healAmt = 20
            }

            myVar = setInterval(potionSpill, 10)
            let deg = 0;

            function potionSpill () {
                const potionBottle = document.querySelector('#player-potion')
                potionBottle.style.display = 'block'
                deg-=1
                if (deg <= -150) {
                    clearInterval(myVar)
                    potionBottle.style.display = 'none'
                }
                
                potionBottle.style.transform = `rotate(${deg}deg)`
            }

            this.potion -= 1
            this.hp += healAmt

            playerHP.style.width = this.hp + '%'

            lastAction.innerHTML = `You used a potion, ${this.potion} left`
            Game.updateFight('enemy')
        }
    }
}

