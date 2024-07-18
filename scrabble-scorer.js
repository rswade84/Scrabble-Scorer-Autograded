// This assignment is inspired by a problem on Exercism (https://exercism.org/tracks/javascript/exercises/etl) that demonstrates Extract-Transform-Load using Scrabble's scoring system.

const input = require('readline-sync');

const oldPointStructure = {
  1: ['A', 'E', 'I', 'O', 'U', 'L', 'N', 'R', 'S', 'T'],
  2: ['D', 'G'],
  3: ['B', 'C', 'M', 'P'],
  4: ['F', 'H', 'V', 'W', 'Y'],
  5: ['K'],
  8: ['J', 'X'],
  10: ['Q', 'Z'],
};

function oldScrabbleScorer(word) {
  word = word.toUpperCase();
  let eachPoint = '';

  for (let i = 0; i < word.length; i++) {
    for (const pointValue in oldPointStructure) {
      if (oldPointStructure[pointValue].includes(word[i])) {
        eachPoint += `Points for '${word[i]}': ${pointValue}\n`;
      }
    }
  }
  return eachPoint;
}

// your job is to finish writing these functions and variables that we've named //
// don't change the names or your program won't work as expected. //

function initialPrompt() {
  let word = input.question('Enter a word to score: ');
  return word;
}

let newPointStructure = transform(oldPointStructure);

let simpleScorer = function (word) {
  word = word.toLowerCase();
  return word.length;
};

let vowelBonusScorer = function (word) {
  word = word.toLowerCase();
  let score = 0;
  let vowel = ['a', 'e', 'i', 'o', 'u'];

  for (let i = 0; i < word.length; i++) {
    let letter = word[i].toLowerCase();

    if (vowel.includes(letter)) {
      score += 3;
    } else {
      score += 1;
    }
  }
  return score;
};

let scrabbleScorer = function (word) {
  let score = 0;
  word = word.toLowerCase();

  for (let i = 0; i < word.length; i++) {
    score += newPointStructure[word[i]];
  }
  return score;
};

const scoringAlgorithms = [
  {
    name: 'Simple Score',
    description: 'Each letter is worth 1 point.',
    scorerFunction: simpleScorer,
  },
  {
    name: 'Bonus Vowels',
    description: 'Vowels are 3 pts, consonants are 1 pt.',
    scorerFunction: vowelBonusScorer,
  },
  {
    name: 'Scrabble',
    description: 'The traditional scoring algorithm.',
    scorerFunction: scrabbleScorer,
  },
];

function scorerPrompt() {
  console.log(`Which scoring algorithm would you like to use?`);

  for (let i = 0; i < scoringAlgorithms.length; i++) {
    console.log(
      `${i} - ${scoringAlgorithms[i].name}: ${scoringAlgorithms[i].description}`,
    );
  }
  while (true) {
    let selection = input.question(`Enter 0, 1, or 2: `);
    if (selection === '0') {
      return scoringAlgorithms[0];
    } else if (selection === '1') {
      return scoringAlgorithms[1];
    } else if (selection === '2') {
      return scoringAlgorithms[2];
    } else {
      console.log(`${selection} is not a valid input!`);
    }
  }
}

function transform(oldPointStructure) {
  let newPointStructure = {};
  for (let pointValue in oldPointStructure) {
    let letters = oldPointStructure[pointValue];
    for (let i = 0; i < letters.length; i++) {
      newPointStructure[letters[i].toLowerCase()] = Number(pointValue);
    }
  }
  return newPointStructure;
}

function runProgram() {
  let word = initialPrompt();
  let selectedAlgorithm = scorerPrompt();
  let score = selectedAlgorithm.scorerFunction(word);
  console.log(`Score for '${word}': ${score}`);
}

// Don't write any code below this line //
// And don't change these or your program will not run as expected //
module.exports = {
  initialPrompt: initialPrompt,
  transform: transform,
  oldPointStructure: oldPointStructure,
  simpleScorer: simpleScorer,
  vowelBonusScorer: vowelBonusScorer,
  scrabbleScorer: scrabbleScorer,
  scoringAlgorithms: scoringAlgorithms,
  newPointStructure: newPointStructure,
  runProgram: runProgram,
  scorerPrompt: scorerPrompt,
};
