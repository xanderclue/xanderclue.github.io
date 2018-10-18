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
  '&nbsp;', 'a', '1', 'b', '&apos;', 'k', '2', 'l',
  '&commat;', 'c', 'i', 'f',  '&sol;', 'm', 's', 'p',
  '&quot;', 'e', '3', 'h',  '9', 'o', '6', 'r',
  '&Hat;', 'd', 'j', 'g',  '&gt;', 'n', 't', 'q',
  '&comma;', '&ast;', '5', '&lt;',  '&#45;', 'u', '8', 'v',
  '&period;', '&percnt;', '&lbrack;', '&dollar;',  '&plus;', 'x', '&excl;', '&amp;',
  '&semi;', '&colon;', '4', '&bsol;', '0', 'z', '7', '&lpar;',
  '&lowbar;', '&quest;', 'w', '&rbrack;',  '&num;', 'y', '&rpar;', '&equals;'
].forEach((chr, idx) => brlasc.set(String.fromCharCode(EMPTY_CELL | idx), chr));
BrailleToAscii = string => string.split('').map(char => brlasc.get(char) || char).join('');

let currChr = 0;
let currStr = '';
let keysDown = new Set();
let inited = false;

function updateText() {
  localStorage.setItem('text', currStr);
  document.getElementById('brailleText').innerHTML = currStr.split('\n').join('<br>');
  document.getElementById('asciiText').innerHTML = BrailleToAscii(currStr).split('\n').join('<br>');
}

document.addEventListener('keydown', ({keyCode}) => {
  if (!inited) {
    return;
  }
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
  if (!inited) {
    return;
  }
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

document.addEventListener('DOMContentLoaded', () => {
  let text = localStorage.getItem('text');
  if (!text) {
    text = '';
  }
  currStr = text;
  updateText();
  inited = true;
});
