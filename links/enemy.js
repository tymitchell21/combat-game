let enemy;

function Enemy(enemyType, hp, mp, strength, speed, magic, shield, potion) {
    this.enemyType = enemyType;
    this.hp = hp;
    this.mp = mp;
    this.strength = strength;
    this.speed = speed;
    this.magic = magic;
    this.shield = shield;
    this.potion = potion;

    this.actionChoice = function () {
        let choice = [0,0,0,0,1,1,1,2,2,3]
        let choiceUnder50HP = [0,0,1,1,2,2,2,3,3,3]
        let random
        let action

        if (parseInt(this.potion) <= 0) {
            random = Math.floor(Math.random() * Math.floor(7));
        } else {
            random = Math.floor(Math.random() * Math.floor(10));
        }

        if (this.hp >= 50) {
            action = choice[random]
        } else {
            action = choiceUnder50HP[random]
        }

        console.log(action)
        switch (action) {
            case 0:
                this.attack()
                break;
            case 1:
                if (this.mp >= 25) {
                    this.useMagic()
                } else {
                    this.attack()
                }
                break;
            case 2:
                this.useShield()
                break;
            case 3:
                if (this.hp < 100) {
                    this.usePotion()
                } else {
                    this.attack()
                }
                break;
            default:
                this.attack()
                break;
        }

        const continueBtn = document.querySelector('#continue')
        continueBtn.style.display = 'none'
    };

    this.attack = function () {
        const lastAction = document.querySelector('#last-action')
        const fightMenu = document.querySelector('#fight-menu')
        const playerHP = document.querySelector('#player-hp')

        if (player.shield === false) {
            player.hp -= 20;
        } else {
            player.hp -= 5;
            player.shield = false
        }
        playerHP.style.width = player.hp + '%'

        fightMenu.style.display = 'flex'
        lastAction.innerHTML = 'The enemy has attacked you'
        Game.updateFight('player')
    };

    this.useMagic = function () {
        const lastAction = document.querySelector('#last-action')
        const fightMenu = document.querySelector('#fight-menu')
        const playerHP = document.querySelector('#player-hp')
        const enemyMP = document.querySelector('#enemy-mp')

        if (player.shield === false) {
            player.hp -= 30;
        } else {
            player.hp -= 10;
            player.shield = false
        }
        this.mp -= 25;

        playerHP.style.width = player.hp + '%'
        enemyMP.style.width = this.mp + '%'

        fightMenu.style.display = 'flex'
        lastAction.innerHTML = 'The enemy has used magic on you'
        Game.updateFight('player')
    };

    this.useShield = function () {
        const lastAction = document.querySelector('#last-action')
        const fightMenu = document.querySelector('#fight-menu')
        if (this.shield === false) this.shield = !this.shield

        fightMenu.style.display = 'flex'
        lastAction.innerHTML = 'The enemy has shielded'
        Game.updateFight('player')
    };

    this.usePotion = function () {
        const lastAction = document.querySelector('#last-action')
        const fightMenu = document.querySelector('#fight-menu')
        const enemyHP = document.querySelector('#enemy-hp')
        let healAmt

        if (this.hp > 80) {
            healAmt = 100-this.hp
        } else {
            healAmt = 20
        }

        this.potion -= 1
        this.hp += healAmt

        enemyHP.style.width = this.hp + '%'

        fightMenu.style.display = 'flex'
        lastAction.innerHTML = `The enemy has used a potion, ${this.potion} left`
        Game.updateFight('player')
    };
}