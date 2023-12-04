let CF = new Object();
let FF = new Object();
CF['a'] = 8.17; CF['b'] = 1.49; CF['c'] = 2.78;
CF['d'] = 4.25; CF['e'] = 12.70; CF['f'] = 2.29;
CF['g'] = 2.02; CF['h'] = 6.09; CF['i'] = 6.97;
CF['j'] = 0.15; CF['k'] = 0.77; CF['l'] = 4.03;
CF['m'] = 2.49; CF['n'] = 6.75; CF['o'] = 7.51;
CF['p'] = 1.93; CF['q'] = 0.10; CF['r'] = 5.99;
CF['s'] = 6.33; CF['t'] = 9.06; CF['u'] = 2.76;
CF['v'] = 0.98; CF['w'] = 2.36; CF['x'] = 0.15;
CF['y'] = 1.97;  CF['z'] = 0.07;
let args = process.argv
let inputFile = "text.txt";
let outputFile ="out.txt";
let fs = require('fs')
var encoded = fs.readFileSync(inputFile).toString();
encoded = encoded.toLowerCase();
let shift = 1;
for (i = 0; i < encoded.length;i++)
{
    let ch = encoded.charAt(i);
    if (!(ch in CF))
        continue;
    if (!(ch in FF))
        FF[ch] = 0;
    FF[ch]++;
}
for (i = 0; i < 26;i++)
{
    ch = String.fromCharCode(i + 97);
    if (ch in FF)
        FF[ch] = (FF[ch] / encoded.length) * 100;
}
var minDiff = 100500;
for (b = 1; b < 26;b++)
{
    var sum = 0;
    for (i = 0; i < 26;i++)
    {
        var ch = String.fromCharCode(i + 97);
        var chShifted = String.fromCharCode((i + b) % (26) + 97);
        if (chShifted in FF)
            sum += (FF[chShifted] - CF[ch]) * (FF[chShifted] - CF[ch]);
    }
    if (sum < minDiff)
    {
        minDiff = sum;
        shift = b;
    }
}
var alph = new Object();
let decoded = "";
for (i = 0;i < 26;i++)
{
    var chShifted = String.fromCharCode((i + shift) % 26 + 97);
    var ch = String.fromCharCode(i + 97);
    alph[chShifted] = ch;
}
for (i = 0; i < encoded.length;i++)
{
    if (encoded[i] in CF)
        decoded += alph[encoded[i]];
    else decoded += encoded[i];
}

console.log(decoded);
