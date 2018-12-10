const Game = {
    startGame: function(playerType) {
        this.createPlayer(playerType);
        this.preFight();
    },
    createPlayer: function(playerType) {
        const playerImage = document.querySelector('#character-one-image')
        switch (playerType) {
            case 'Cloud': 
                player = new Player (playerType, 100, 100, 70, 60, 30, false, 3)
                playerImage.src = 'links/img/cloud.png'
                playerImage.height = '100px'
                break;
            case 'Tidus':
                player = new Player (playerType, 100, 100, 60, 80, 40, false, 3)
                playerImage.src = 'links/img/tidus.png'
                break;
            case 'Gunner':
                player = new Player (playerType, 100, 100, 30, 50, 90, false, 3)
                break;
        }
        const playerSelect = document.querySelector('#player-selection')
        playerSelect.style.display = 'none';
        const enemyImage = document.querySelector('#enemy-image')
        enemyImage.src = 'links/img/sephiroth.png'
    },
    preFight: function() {
        const preFight = document.querySelector('#pre-fight')
        preFight.style.display = 'flex'
    },
    startFight: function() {
        const menu = document.querySelector('#menu')
        const fightMenu = document.querySelector('#fight-menu')
        const actionSequence = document.querySelector('#action-sequence')
        const playerStats = document.querySelector('#player-stats')
        const enemyStats = document.querySelector('#enemy-stats')
        menu.style.display = 'none'
        fightMenu.style.display = 'flex'
        actionSequence.style.display = 'flex'
        playerStats.style.display = 'block'
        enemyStats.style.display = 'block'

        const goblin = new Enemy('Goblin', 100, 100, 30, 50, 90, false, 3)
        const troll = new Enemy('Goblin', 100, 100, 30, 50, 90, false, 3)
        const vampire = new Enemy('Goblin', 100, 100, 30, 50, 90, false, 3)

        const random = Math.floor(Math.random() * Math.floor(3));

        switch (random) {
            case 0:
                enemy = goblin
                break;
            case 1: 
                enemy = troll
                break;
            case 2:
                enemy = vampire
                break;
        }
    },
    updateFight: function(nextPerson) {
        const nextTurn = document.querySelector('#next-turn')
        const fightMenu = document.querySelector('#fight-menu')
 
        nextTurn.innerHTML = `It is now the ${nextPerson}'s turn`

        if (nextPerson === 'enemy') {
            const continueBtn = document.querySelector('#continue')
            continueBtn.style.display = 'block'
            fightMenu.style.display = 'none'
        }

        this.checkWin()
    },
    checkWin: function() {
        const menu = document.querySelector('#menu')
        const fightMenu = document.querySelector('#fight-menu')
        const actionSequence = document.querySelector('#action-sequence')

        if(enemy.hp <= 0) {
            menu.innerHTML = '<h1>You Win!</h1>'
            menu.style.display = 'flex'
            fightMenu.style.display = 'none'
            actionSequence.style.display = 'none'
        } else if (player.hp <=0) {
            menu.innerHTML = '<h1>You Lose!</h1>'
            menu.style.display = 'flex'
            fightMenu.style.display = 'none'
            actionSequence.style.display = 'none'
        }
    }
}