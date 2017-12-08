class Player { 
	constructor (name) { 
		this.name = name;
		this.rollCount = 0;
		this.rolls = [];
	} 

	rollDice ( player, selector ) { 
		var firstRoll = createRand();
		var secondRoll = createRand();
		var thirdRoll = createRand();
		this.rolls = [firstRoll, secondRoll, thirdRoll];
		console.log(this.rolls );
		this.displayRolls (selector);
	} 

	displayRolls (selector) {
		console.log("player rolls:" + this.name);
		for (var i = 0; i < selector.length; i++) {
			selector[i].innerHTML = this.rolls[i];
		}
	}
}

var playerOne = new Player("One");
console.log("One = " + playerOne.name);
//playerOne.hasRolled = false;
var playerTwo = new Player("Two");
console.log("One = " + playerOne.name);
console.log("Two = " + playerTwo.name);

// var playerOne = prompt("Player 1, please enter your name:");
// var playerTwo = prompt("Player 2, please enter your name:");
// //console.log(document.getElementById("player-1"));
document.getElementById("player-1").textContent = playerOne.name;
document.getElementById("player-2").textContent = playerTwo.name;

var displaysOne = document.getElementsByClassName("display-p1");
var displaysTwo = document.getElementsByClassName("display-p2");

var btnOne = document.getElementById("btn-player-1");
var btnTwo = document.getElementById("btn-player-2");

btnOne.addEventListener("click", () => playerOne.rollDice(playerOne, displaysOne));
btnTwo.addEventListener("click", () => playerTwo.rollDice(playerTwo, displaysTwo));

//btnTwo.disabled = true; 

function createRand () {
	return Math.floor((Math.random() * 6) + 1);
}



