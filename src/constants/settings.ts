/**
 * allowedSites: map of id/label for loading sites
 * tries: changes how many tries you get to finish the wordle
 * shuffle: shuffle the words in the wordlist each time you load the app (note: you will lose the 'word of the day' functionality if this is true)
 * unicode: whether to apply Unicode normalization to words and orthography - options: 'NFC', 'NFD', 'NKFC', 'NKFD', false
 */ 
export const SETTINGS = {
  allowedSites: [{
    id: "sencoten",
    label: "SENCOTEN"
  },{
    id: "nisgaa",
    label: "Nisga'a"
  }],
  tries: 6,
  shuffle: false,
  normalization: 'NFC',
}
