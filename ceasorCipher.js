function caesarCipherEncryptor(string, key) {
    key = key % 26;
    const alphabet = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z']

    let newLetters = [];

    for (let i = 0; i < string.length; i++) newLetters.push(helper(alphabet, string[i], key));

    return newLetters.join('');
  }

function helper(alphabet, letter, key) {
    let newindex = alphabet.indexOf(letter) + key;

    if (newindex > 25) newindex = newindex % 25 - 1;

    return alphabet[newindex];
}

  console.log(caesarCipherEncryptor('abc', 2)) // cde
  console.log(caesarCipherEncryptor('xyz', 2)) // zab
  console.log(caesarCipherEncryptor('abc', 3)) // def
  console.log(caesarCipherEncryptor('xyz', 5)) // cde
  console.log(caesarCipherEncryptor('abc', 52)) // abc
