export const CONFIG = {
  tries: 6, // This changes how many tries you get to finish the wordle
  language: 'Paiwan', // This changes the display name for your language
  wordLength: 6, // This sets how long each word is based on how many characters (as defined in orthography.ts) are in each word
  author: 'Haowen Jiang', // Put your name here so people know who made this Wordle!
  authorWebsite: 'https://howard-haowen.github.io/', // Put a link to your website or social media here
  wordListSource: 'Dataset of Formosan-Mandarin sentence pairs', // Describe the source material for your words here
  wordListSourceLink: 'https://share.streamlit.io/howard-haowen/formosan-languages/main/app.py', // Put a link to the source material for your words here
  //
  // THESE NEXT SETTINGS ARE FOR ADVANCED USERS
  //
  googleAnalytics: '', // You can use this if you use Google Analytics
  shuffle: false, // whether to shuffle the words in the wordlist each time you load the app (note: you will lose the 'word of the day' functionality if this is true)
  normalization: 'NFC', // whether to apply Unicode normalization to words and orthography - options: 'NFC', 'NFD', 'NKFC', 'NKFD', false
  startDate: 'March 1, 2022 00:00:00', // what date and time to start your game from
  defaultLang: 'zh', // the default interface language
  availableLangs: ['en', 'zh'], // the options available to the user for translation languages
}
