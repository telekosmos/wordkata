var Dictionary = require('oxford-dictionary-api');
var app_id = '5126e325';
var app_key = '990296d99e60fc4ff2b159226c291493';
var dict = new Dictionary(app_id, app_key);

// Target: cat --> cot --> cog --> dog
/*
dict.find('cot', function(error, data) {
  if (error) return console.log(`ERR: ${error}`);
  console.log(`Result: ${JSON.stringify(data)}`);
});
*/


const isValid = (word, cb) => {
  console.log(`[isValid] ${word}`);
  dict.find(word, (err, data) => {
    if (err)
      cb(false)
    else {
      // console.log('*** '+JSON.stringify(data.results[0].id));
      cb(true);
    }
  });
};

// swap the char in w at position i by newChar
const setCharAt = (w, i, newChar) => {
  return i == 0? newChar + w.substring(1): w.substring(0, i) + newChar + w.substring(i+1)
}

// get a word from o
const getTarget = (o, t, i) => {
  return setCharAt(o, i, t.charAt(i));
}

const validWord = (o, t, next) => {
  const l = t.length;

  const getValidWord = (pos) => {
    if (pos >= l)
      next(new Error('No valid word found'));

    if (o.charAt(pos) === t.charAt(pos))
      getValidWord(pos+1);

    let word = getTarget(o, t, pos);
    isValid(word, (res) => {
      if (!res)
        getValidWord(pos+1);
      else
        next(null, word);
    });
  }
  getValidWord(0);
}

// kata('cat', 'dog') = [cat --> cot --> cog --> dog]
let list = [];
const kata = (wini, wend) => {
  const l = wend.length;

  list.push(wini);

  console.log("Ready!!");
  // validWord('cat', 'dog', (err, val) => console.log(`AGHHHHHH -> 'cat', 'dog' => ${val} should be dat`));
  // validWord('dat', 'dog', (err, val) => console.log(`AGHHHHHH -> 'dat', 'dog' => ${val} should be dot`));
  validWord('dot', 'dog', (err, val) => console.log(`AGHHHHHH -> 'dot', 'dog' => ${val} should be dog`));

  // validWord(wini, wend)
}

kata('cat', 'dog');
