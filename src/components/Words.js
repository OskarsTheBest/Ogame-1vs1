import wordBank from '../../src/wordle-bank.txt';

export const boardDefault = [
    ["","","","",""],
    ["","","","",""],
    ["","","","",""],
    ["","","","",""],
    ["","","","",""],
    ["","","","",""],
];

// with generateWordSet it picks out an word randomly from word-bank.txt and passes it to wordle, and it creates an new set so players cannot guess words that do not exist


export const generateWordSet = async () => {
   let wordSet;
   let todaysWords;
   await fetch(wordBank).then((response) => response.text()).then((result) =>{
        const wordArr = result.split("\n");
        todaysWords = wordArr[Math.floor (Math.random() * wordArr.length)]
        wordSet = new Set();
        wordArr.forEach((word) => {
            wordSet.add(word.replace(/\r$/, ""));
        });
   });


   return { wordSet, todaysWords };
};
