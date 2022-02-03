export const CONFIG = {
  tries: 5, // This changes how many tries you get to finish the wordle
  language: 'Japanese 48G members', // This changes the display name for your language
  wordLength: 6, // This sets how long each word is based on how many characters (as defined in orthography.ts) are in each word
  author: '@fronoske', // Put your name here so people know who made this Wordle!
  authorWebsite: 'http://twitter.com/fronoske/', // Put a link to your website or social media here
  wordListSource: '48pedia.org', // Describe the source material for your words here
  wordListSourceLink: 'http://48pedia.org/', // Put a link to the source material for your words here
  //
  // THESE NEXT SETTINGS ARE FOR ADVANCED USERS
  //
  googleAnalytics: 'G-WXXNQ6GPSN', // You can use this if you use Google Analytics
  shuffle: false, // whether to shuffle the words in the wordlist each time you load the app (note: you will lose the 'word of the day' functionality if this is true)
  normalization: 'NFC', // whether t6o apply Unicode normalization to words and orthography - options: 'NFC', 'NFD', 'NKFC', 'NKFD', false
  hint: 0.3,
  hintForGroup: 0.1,
}
