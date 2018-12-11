const Game = {
    // starts the game
    startGame: function(playerType) {
        this.createPlayer(playerType);
        this.preFight();
    },
    // creates the player
    createPlayer: function(playerType) {
        const playerImage = document.querySelector('#character-one-image')
        const prePlayerName = document.querySelector('#pre-player-name')
    
        switch (playerType) {
            case 'Cloud': 
                player = new Player (playerType, 100, 100, 20, 60, 30, false, 3)
                playerImage.src = 'links/img/cloud.png'
                playerImage.id = 'cloud'
                prePlayerName.innerHTML = 'Cloud'
                break;
            case 'Auron':
                player = new Player (playerType, 100, 100, 30, 30, 40, false, 3)
                playerImage.src = 'links/img/auron.png'
                playerImage.id = 'auron'
                prePlayerName.innerHTML = 'Auron'
                break;
            case 'Tifa':
                player = new Player (playerType, 100, 100, 15, 80, 90, false, 3)
                playerImage.src = 'links/img/tifa.png'
                playerImage.id = 'tifa'
                prePlayerName.innerHTML = 'Tifa'
                break;
        }
        const playerSelect = document.querySelector('#player-selection')
        playerSelect.style.display = 'none';
    },
    // sets prefight menu
    preFight: function() {
        const preFight = document.querySelector('#pre-fight')
        const enemyImage = document.querySelector('#enemy-image')
        const preEnemyName = document.querySelector('#pre-enemy-name')

        preFight.style.display = 'flex'

        const sephiroth = new Enemy('Sephiroth', 100, 100, 30, 40, 90, false, 3)
        const kefka = new Enemy('Kefka', 100, 100, 20, 60, 90, false, 3)
        const kuja = new Enemy('kuja', 100, 100, 15, 50, 90, false, 3)

        const random = Math.floor(Math.random() * Math.floor(3));
        // switch case for enemy selection
        switch (random) {
            case 0:
                enemy = sephiroth
                enemyImage.src = 'links/img/sephiroth.png'
                enemyImage.id = 'sephiroth'
                preEnemyName.innerHTML = 'Sephiroth'
                break;
            case 1: 
                enemy = kefka
                enemyImage.src = 'links/img/kefka.png'
                enemyImage.id = 'kefka'
                preEnemyName.innerHTML = 'Kefka'
                break;
            case 2:
                enemy = kuja
                enemyImage.src = 'links/img/kuja.png'
                enemyImage.id = 'kuja'
                preEnemyName.innerHTML = 'Kuja'
                break;
        }
    },
    // starts the fight
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
    },
    // updates fight after each action
    updateFight: function(nextPerson) {
        const nextTurn = document.querySelector('#next-turn')
        const fightMenu = document.querySelector('#fight-menu')
 
        nextTurn.innerHTML = `It is now the ${nextPerson}'s turn`

        if (nextPerson === 'enemy') {
            fightMenu.style.display = 'none'
        }

        this.checkWin()
    },
    // checks for a win
    checkWin: function() {
        const menu = document.querySelector('#menu')
        const fightMenu = document.querySelector('#fight-menu')
        const actionSequence = document.querySelector('#action-sequence')

        if(enemy.hp <= 0) {
            menu.innerHTML = '<h1>You Win!</h1><button onclick="reset()" style="height: 25px;">Play Again?</button>'
            menu.style.display = 'flex'
            fightMenu.style.display = 'none'
            actionSequence.style.display = 'none'
            var audio = new Audio('links/audio/victory.mp3');
            audio.play();
        } else if (player.hp <=0) {
            menu.innerHTML = '<h1>Game Over</h1><button onclick="reset()" style="height: 25px;">Play Again?</button>'
            menu.style.display = 'flex'
            fightMenu.style.display = 'none'
            actionSequence.style.display = 'none'
            var audio = new Audio('links/audio/lose.mp3');
            audio.play();
        }
    }
}

function reset () {
    location.reload()
}