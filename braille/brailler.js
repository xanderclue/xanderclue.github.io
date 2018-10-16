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
const ascii = " a1b'k2l@cif/msp\"e3h9o6r^djg>ntq,*5<-u8v.%[$+x!&;:4\\0z7(_?w]#y)=".split('');
ascii.forEach((chr, idx) => brlasc.set(String.fromCharCode(EMPTY_CELL | idx), chr));
BrailleToAscii = string => string.split('').map(char => brlasc.get(char) || char).join('');

let currChr = 0;
let currStr = '';
let keysDown = new Set();

function updateText() {
  let htmlText = currStr.split('\n').join('<br>');
  document.getElementById('brailleText').innerHTML = htmlText.split(EMPTY_CELL_STR).join(' ');
  document.getElementById('asciiText').innerHTML = BrailleToAscii(htmlText);
}

function onKeyDown(e) {
  if (dotmap.has(e.keyCode) && !keysDown.has(e.keyCode)) {
    currChr |= dotmap.get(e.keyCode);
    keysDown.add(e.keyCode);
  } else {
    if (keyCode_BCKSP === e.keyCode) {
      if (0 !== currStr.length) {
        currStr = currStr.substr(0, currStr.length - 1);
      }
    } else if (keyCode_CLEAR === e.keyCode) {
      currStr = '';
    }
    updateText();
  }
}

function onKeyUp(e) {
  if (keyCode_ENTER === e.keyCode) {
    currStr = currStr.concat('\n');
  } else if (keyCode_SPACE === e.keyCode) {
    currStr = currStr.concat(EMPTY_CELL_STR);
  } else if (dotmap.has(e.keyCode)) {
    keysDown.delete(e.keyCode);
    if (0 === keysDown.size) {
      currStr = currStr.concat(String.fromCharCode(EMPTY_CELL | currChr));
      currChr = 0;
    }
  } else return;
  updateText();
}

document.addEventListener('keydown', onKeyDown);
document.addEventListener('keyup', onKeyUp);
