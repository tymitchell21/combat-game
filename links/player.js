let player;
// player object
function Player({ characterName, strength, speed, magic }, imageElement, prefightNameElement) {
    Character.call(this, { characterName, strength, speed, magic }, imageElement, prefightNameElement)
}

Player.prototype = Object.create(Character.prototype)
Player.prototype.constructor = Player;

document.querySelector('#attack-button').addEventListener('click', () => {
    player.attack(enemy, 'enemy-hp', 'PlayerAttack')
})

document.querySelector('#magic-button').addEventListener('click', () => {
    player.useMagic(enemy, 'enemy-hp', 'player-mp', 'PlayerMagic')
})

document.querySelector('#shield-button').addEventListener('click', () => {
    player.useShield(enemy, 'PlayerShield')
})

document.querySelector('#potion-button').addEventListener('click', () => {
    player.usePotion(enemy, 'player-hp', 'PlayerPotion')
})