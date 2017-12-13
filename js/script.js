class Player { 
	constructor (name) { 
		this.name = name;
		//this.rollCount = 0;
		this.rolls = [];
		this.score = 0;
		this.max = 500;
		this.steps = 0;
		this.snailPosition = 20;
	} 

	rollDice (player, selector, snail, side) { 
		var firstRoll = createRand();
		var secondRoll = createRand();
		var thirdRoll = createRand();
		this.rolls = [firstRoll, secondRoll, thirdRoll];
		console.log(this.rolls );
		this.displayRolls (selector);
		var dist = this.calcSteps();
		this.moveEl(snail, dist, side);
	} 

	displayRolls (selector) {
		console.log("player rolls:" + this.name);
		for (var i = 0; i < selector.length; i++) {
			selector[i].innerHTML = this.rolls[i];
		}
	}

	calcSteps () {
		for (var i = 0; i < this.rolls.length; i++) {
			if (parseInt(this.rolls[i]) === 1) {
				this.steps += 10;
			} else if (parseInt(this.rolls[i]) === 5) {
				this.steps += 5;
			}
		}
		console.log(this.steps);
		return this.steps;
	}

	moveEl(el, distance, side) {
	    var style = el.style;
		console.log(style);
	    if (side === "left") {
	    	style.marginLeft = Number(this.snailPosition + distance) + "px";
	    } else {
	    	style.marginRight = Number(this.snailPosition + distance) + "px";
	    }
	}
}

var playerOne = new Player("One");
playerOne.hasRolled = false;
var playerTwo = new Player("Two");

// var playerOne = prompt("Player 1, please enter your name:");
// var playerTwo = prompt("Player 2, please enter your name:");
document.getElementById("player-1").textContent = playerOne.name;
document.getElementById("player-2").textContent = playerTwo.name;

var displaysOne = document.getElementsByClassName("display-p1");
var displaysTwo = document.getElementsByClassName("display-p2");

var btnOne = document.getElementById("btn-player-1");
var btnTwo = document.getElementById("btn-player-2");

var snailOne = document.getElementById("snail-1");
var snailTwo = document.getElementById("snail-2");

btnOne.addEventListener("click", () => playerOne.rollDice(playerOne, displaysOne, snailOne, "left"));
btnTwo.addEventListener("click", () => playerTwo.rollDice(playerTwo, displaysTwo, snailTwo, "right"));

//btnTwo.disabled = true; 

function createRand () {
	return Math.floor((Math.random() * 6) + 1);
}

//Dynamic Background
//number.toString(radix) -->
//Which base to use for representing a numeric value. Must be an integer between 2 and 36
/**
 * Returns a random integer between min (inclusive) and max (inclusive)
 * Using Math.round() will give you a non-uniform distribution
 */
// function getRandomInt(min, max) {
//     return Math.floor(Math.random() * (max - min + 1)) + min;
// }
function randomBackground () {
	var red = Math.floor(Math.random() * 256);
	var blue = Math.floor(Math.random() * 256);
	var green = Math.floor(Math.random() * 256);
	document.body.style.backgroundColor = "rgb(" + red + ","  + green + ","  +blue + ")";
	// document.getElementById("color").innerHTML = "rgb(" + red + ","  + green + ","  + blue + ")<br>"
	// + "HEX: #" + red.toString(16) + green.toString(16) + blue.toString(16);
}

window.addEventListener('load', randomBackground);






