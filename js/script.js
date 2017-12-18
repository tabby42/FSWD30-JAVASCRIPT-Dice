//next -->
//snail should only move when visible rolling is over --> DONE
//after each roll --> display message, how far the snail will move --> DONE
//display score
//tell, which player's turn it is, enable/disable button respectively --> DONE
//declare winner, when one player's score has reached max --> DONE
//random color for each player on load
//identical numbers check not working yet

class Player { 
	constructor (name, dice, msgBox, scoreBox) { 
		this.name = name;
		this.dice = dice;
		this.rolls = [];
		this.msgBox = msgBox;
		this.msg = "";
		this.score = 0;
		this.scoreBox = scoreBox;
		this.max = 250;
		this.steps = 0;
		//this.snailPosition = 20;
	} 

	rollDice (player, snail, side) { 
		//save rolled numbers
		var firstRoll = createRand();
		var secondRoll = createRand();
		var thirdRoll = createRand();
		this.rolls = [firstRoll, secondRoll, thirdRoll];
		console.log(this.rolls );
		//roll visible dice and show rolled numbers
		this.rollUIDice(this, snail, side);
	} 

	displayRolls (selector) {
		for (var i = 0; i < selector.length; i++) {
			//console.log("selbefore" + selector[i].className);
			//console.log("should turn to " + this.rolls[i] );
			selector[i].className = 'show' + this.rolls[i];
			//console.log("selafter" + selector[i].className);
		}
	}

	calcSteps () {
		//var testarr = [5,5,5];
		for (var i = 0; i < this.rolls.length; i++) {
			if (parseInt(this.rolls[i]) === 1) {
				this.steps += 15;
				this.msg += "You rolled a One!<br>";
			} else if (parseInt(this.rolls[i]) === 5) {
				this.steps += 10;
				this.msg += "You rolled a Five!<br>";
			} 
		}
		if (allIdentical(this.dice)) {
			this.steps += 50;
			this.msg += "You rolled three identical numbers!<br>";
		}
		console.log(this.dice);
		if (this.steps > 0) {
			this.msg += "Your snail can move " + this.steps + " steps!<br>";
		} else {
			this.msg += "Sorry, no luck!<br>";
		}
		//increase score
		this.score += this.steps;
		console.log("Steps: " + this.steps);
		return this.steps;
	}

	moveEl(el, distance, side) {
	    var style = el.style;
		//console.log(style);
	    if (side === "left") {
	    	style.marginLeft = Number(this.score) + "px";
			console.log("margin: " + style.marginLeft);
	    } else {
	    	style.marginRight = Number(this.score) + "px";
			console.log("margin: " + style.marginRight);
	    }
	}

	show() {
		for (var i = 0; i < this.dice.length; i++) {
			this.dice[i].setAttribute('class', 'show'+face);
			 if(face == 6) {
			    face = 1;
			  } else {
			    face++; 
			  }
		}
		if(face == 6) {
	    	face = 1;
	  	} else {
	    	face++; 
	  	}
	}

	insertMsg(message) {
		this.msgBox.innerHTML = message;
	}

	updateScore() {
		this.scoreBox.innerHTML = this.score;
		if (this.score >= this.max) {
			this.msgBox.innerHTML = "You WON!";
			btnOne.disabled = true;
			btnTwo.disabled = true;
		}
	}

	rollUIDice(playerobj, snail, side) {
    	var counter = 1;
    	var end = createRandTwo();
    	(function repeat() {
	        console.log('Run No. ' + counter);
	        if (counter < end) {
	            counter++;
	            setTimeout(repeat, 200);
				setTimeout(playerobj.show(), 200);
				//on the last run, stop at rolled number
				if (counter === end) {
        			setTimeout(function () {
        				playerobj.displayRolls(playerobj.dice);
        			}, 800);
        			//calculate how far he snail can move based on the numbers rolled
					var dist = playerobj.calcSteps();
					//display message
					setTimeout(function () {
        				playerobj.insertMsg(playerobj.msg);
        				//reset message
						playerobj.msg = "";
        			}, 2200);
					//move snail
					setTimeout(function () {
						playerobj.moveEl(snail, dist, side);
						//update score display
						playerobj.updateScore();
						//reset steps
						playerobj.steps = 0;
        			}, 3200);
				}
	        }
    	})();
	}
}

//variables for dice
var face = 1,
	dice1 = document.getElementById("dice-1"),
	dice2 = document.getElementById("dice-2"),
	dice3 = document.getElementById("dice-3"),
	dice4 = document.getElementById("dice-4"),
	dice5 = document.getElementById("dice-5"),
	dice6 = document.getElementById("dice-6"),
	diceOne = [dice1, dice2, dice3],
	diceTwo = [dice4, dice5, dice6];
var msgOne = document.getElementById("msg-1");
var msgTwo = document.getElementById("msg-2");
//variables for player
var scoreOne = document.getElementById("score-1");
var scoreTwo = document.getElementById("score-2");
// var playerOne = prompt("Player 1, please enter your name:");
// var playerTwo = prompt("Player 2, please enter your name:");
var playerOne = new Player("One", diceOne, msgOne, scoreOne);
var playerTwo = new Player("Two", diceTwo, msgTwo, scoreTwo);
document.getElementById("player-1").textContent = playerOne.name;
document.getElementById("player-2").textContent = playerTwo.name;

//variables for UI elements
var btnOne = document.getElementById("btn-player-1");
var btnTwo = document.getElementById("btn-player-2");

var snailOne = document.getElementById("snail-1");
var snailTwo = document.getElementById("snail-2");

var turnMsg = document.getElementById("turn-msg");

//Event Listeners
btnOne.addEventListener("click", () => playerOne.rollDice(playerOne, snailOne, "left"));
btnTwo.addEventListener("click", () => playerTwo.rollDice(playerTwo, snailTwo, "right"));

btnOne.disabled = false;
btnTwo.disabled = true; 

btnOne.addEventListener("click", checkTurn);
btnTwo.addEventListener("click", checkTurn);

//enable/disable buttons depending on which player's turn it is
function checkTurn() {
	if (!btnOne.disabled && btnTwo.disabled) {
		btnTwo.disabled = false;
		btnOne.disabled = true;
		setTimeout(function () {
			turnMsg.innerHTML = "Hey, <strong class='color-2'>" + playerTwo.name + "!</strong> It's your turn!";
		}, 3200);
	} else if (btnOne.disabled && !btnTwo.disabled) {
		btnTwo.disabled = true;
		btnOne.disabled = false;
		setTimeout(function () {
			turnMsg.innerHTML = "Hey, <strong class='color-1'>" + playerOne.name + "!</strong> It's your turn!";
		}, 3200);
	} else {
		btnTwo.disabled = true;
		btnOne.disabled = true;
	}
}

//helper functions
 
/** getRandomInt -->
 * Returns a random integer between min (inclusive) and max (inclusive)
 * Using Math.round() will give you a non-uniform distribution
 */
// function getRandomInt(min, max) {
//     return Math.floor(Math.random() * (max - min + 1)) + min;
// }
function createRand () {
	return Math.floor((Math.random() * 6) + 1);
}

function createRandTwo () {
	return Math.floor((Math.random() * 5) + 4);
}

function allIdentical( arr ) {
    for(var i = 1; i < arr.length; i++) {
        if(arr[i] !== arr[0])
            return false;
    }
    return true;
}

//Dynamic Background
//number.toString(radix) -->
//Which base to use for representing a numeric value. Must be an integer between 2 and 36
function randomBackground () {
	var red = Math.floor(Math.random() * 256);
	var blue = Math.floor(Math.random() * 256);
	var green = Math.floor(Math.random() * 256);
	document.body.style.backgroundColor = "rgb(" + red + ","  + green + ","  +blue + ")";
	// document.getElementById("color").innerHTML = "rgb(" + red + ","  + green + ","  + blue + ")<br>"
	// + "HEX: #" + red.toString(16) + green.toString(16) + blue.toString(16);
}

window.addEventListener('load', randomBackground);










