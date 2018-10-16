const keyCode_DOTS = [70, 68, 83, 74, 75, 76]; // FDSJKL
const keyCode_ENTER = 13;
const keyCode_SPACE = 32;
const keyCode_BCKSP = 8;
const keyCode_CLEAR = 81; // Q
const EMPTY_CELL = 0x2800;
const EMPTY_CELL_STR = String.fromCharCode(EMPTY_CELL);
const dotmap = new Map([
  [keyCode_DOTS[0], 0x01],
  [keyCode_DOTS[1], 0x02],
  [keyCode_DOTS[2], 0x04],
  [keyCode_DOTS[3], 0x08],
  [keyCode_DOTS[4], 0x10],
  [keyCode_DOTS[5], 0x20]
]);

let brlasc = new Map();
[
  ' ', 'a', '1', 'b', '\'', 'k', '2', 'l',
  '@', 'c', 'i', 'f',  '/', 'm', 's', 'p',
  '"', 'e', '3', 'h',  '9', 'o', '6', 'r',
  '^', 'd', 'j', 'g',  '>', 'n', 't', 'q',
  ',', '*', '5', '<',  '-', 'u', '8', 'v',
  '.', '%', '[', '$',  '+', 'x', '!', '&',
  ';', ':', '4', '\\', '0', 'z', '7', '(',
  '_', '?', 'w', ']',  '#', 'y', ')', '='
].forEach((chr, idx) => brlasc.set(String.fromCharCode(EMPTY_CELL | idx), chr));
BrailleToAscii = string => string.split('').map(char => brlasc.get(char) || char).join('');

let currChr = 0;
let currStr = '';
let keysDown = new Set();

function updateText() {
  let htmlText = currStr.split('\n').join('<br>');
  document.getElementById('brailleText').innerHTML = htmlText.split(EMPTY_CELL_STR).join(' ');
  document.getElementById('asciiText').innerHTML = BrailleToAscii(htmlText);
}

document.addEventListener('keydown', ({keyCode}) => {
  if (dotmap.has(keyCode) && !keysDown.has(keyCode)) {
    currChr |= dotmap.get(keyCode);
    keysDown.add(keyCode);
  } else {
    if (keyCode_BCKSP === keyCode) {
      if (0 !== currStr.length) {
        currStr = currStr.substr(0, currStr.length - 1);
      }
    } else if (keyCode_CLEAR === keyCode) {
      currStr = '';
    }
    updateText();
  }
});

document.addEventListener('keyup', ({keyCode}) => {
  if (keyCode_ENTER === keyCode) {
    currStr = currStr.concat('\n');
  } else if (keyCode_SPACE === keyCode) {
    currStr = currStr.concat(EMPTY_CELL_STR);
  } else if (dotmap.has(keyCode)) {
    keysDown.delete(keyCode);
    if (0 === keysDown.size) {
      currStr = currStr.concat(String.fromCharCode(EMPTY_CELL | currChr));
      currChr = 0;
    }
  } else return;
  updateText();
});
