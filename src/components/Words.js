import wordBank from '../../src/wordle-bank.txt';

export const boardDefault = [
    ["","","","",""],
    ["","","","",""],
    ["","","","",""],
    ["","","","",""],
    ["","","","",""],
    ["","","","",""],
];

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
