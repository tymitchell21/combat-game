const Game = {
    characterOptions: {
        Cloud: {
            characterName: 'Cloud', 
            strength: 20, 
            speed: 60, 
            magic: 30, 
        },
        Auron: {
            characterName: 'Auron', 
            strength: 30, 
            speed: 30, 
            magic: 40, 
        },
        Tifa: {
            characterName: 'Tifa', 
            strength: 15, 
            speed: 80, 
            magic: 90, 
        },
    },
    enemyOptions: {
        Sephiroth: {
            characterName: 'Sephiroth', 
            strength: 30, 
            speed: 40, 
            magic: 90, 
        },
        Kefka: {
            characterName: 'Kefka', 
            strength: 20, 
            speed: 60, 
            magic: 90, 
        },
        Kuja: {
            characterName: 'Kuja', 
            strength: 15, 
            speed: 50, 
            magic: 90, 
        },
    },
    animatedObjectOptions: {
        PlayerAttack: {
            xPos: 380,
            xChange: 5,
            yPos: 325,
            yChange: undefined,
            height: 160,
            heightChange: undefined,
            deg: 275,
            degChange: 11,
            totalTime: 104,
            image: 'weapon',
            nextButton: 'continue'
        },
        PlayerShield: {
            xPos: 360,
            xChange: undefined,
            yPos: 330,
            yChange: undefined,
            height: 250,
            heightChange: undefined,
            deg: 0,
            degChange: undefined,
            totalTime: 60,
            image: 'player-shield',
            nextButton: 'continue'
        },
        PlayerMagic: {
            xPos: 430,
            xChange: 5,
            yPos: 425,
            yChange: -2,
            height: 25,
            heightChange: 4,
            deg: 0,
            degChange: 10,
            totalTime: 90,
            image: 'player-magic',
            nextButton: 'continue'
        },
        PlayerPotion: {
            xPos: 440,
            xChange: undefined,
            yPos: 310,
            yChange: undefined,
            height: 50,
            heightChange: undefined,
            deg: 0,
            degChange: -1,
            totalTime: 150,
            image: 'player-potion',
            nextButton: 'continue'
        },
        EnemyAttack: {
            xPos: 1000,
            xChange: -5,
            yPos: 350,
            yChange: undefined,
            height: 120,
            heightChange: undefined,
            deg: 100,
            degChange: -11,
            totalTime: 120,
            image: 'enemy-weapon',
            nextButton: 'fight-menu'
        },
        EnemyShield: {
            xPos: 960,
            xChange: undefined,
            yPos: 310,
            yChange: undefined,
            height: 250,
            heightChange: undefined,
            deg: 0,
            degChange: undefined,
            totalTime: 60,
            image: 'enemy-shield',
            nextButton: 'fight-menu'
        },
        EnemyMagic: {
            xPos: 1040,
            xChange: -10,
            yPos: 425,
            yChange: -1.5,
            height: 35,
            heightChange: 3,
            deg: 0,
            degChange: -10,
            totalTime: 80,
            image: 'enemy-magic',
            nextButton: 'fight-menu'
        },
        EnemyPotion: {
            xPos: 1050,
            xChange: undefined,
            yPos: 310,
            yChange: undefined,
            height: 50,
            heightChange: undefined,
            deg: 0,
            degChange: -1,
            totalTime: 150,
            image: 'enemy-potion',
            nextButton: 'fight-menu'
        }
    },
    getRandomNumber: (max = 10) => Math.floor(Math.random() * Math.floor(max)),
    // starts the game
    startGame: function(chosenCharacterName) {
        this.createPlayer(chosenCharacterName);
        this.preFight();
    },
    // creates the player
    createPlayer: function(chosenCharacterName) {
        const imageElement = document.querySelector('#character-one-image')
        const prefightNameElement = document.querySelector('#pre-player-name')

        player = new Player(Game.characterOptions[chosenCharacterName], imageElement, prefightNameElement)
    
        const playerSelectMenu = document.querySelector('#player-selection')
        playerSelectMenu.style.display = 'none';
    },
    // sets prefight menu
    preFight: function() {
        const enemyImage = document.querySelector('#enemy-image')
        const prefightEnemyNameElement = document.querySelector('#pre-enemy-name')
        
        const availableEnemyOptions = Object.keys(Game.enemyOptions)
        const randomEnemyName = availableEnemyOptions[Game.getRandomNumber(availableEnemyOptions.length)]
        enemy = new Enemy(Game.enemyOptions[randomEnemyName], enemyImage, prefightEnemyNameElement)

        const preFight = document.querySelector('#pre-fight')
        preFight.style.display = 'flex'
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

        nextTurn.innerHTML = `It is now ${nextPerson.characterName}'s turn`

        if (nextPerson == enemy) {
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

document.querySelector('#cloud-select').addEventListener('click', () => {
    Game.startGame("Cloud")
})
document.querySelector('#auron-select').addEventListener('click', () => {
    Game.startGame("Auron")
})
document.querySelector('#tifa-select').addEventListener('click', () => {
    Game.startGame("Tifa")
})
document.querySelector('#start-button').addEventListener('click', () => {
    Game.startFight()
})