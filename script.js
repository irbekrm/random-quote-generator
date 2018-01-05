
//TODO: provide a default quote if promise is rejected
const request = url => new Promise(res => {
  const xhr = new XMLHttpRequest();
  xhr.open('get', url, true);
  xhr.onreadystatechange = _ =>
    xhr.readyState === XMLHttpRequest.DONE && xhr.status === 200 && res(xhr.response);
  xhr.send();
});
  
async function printStuff() {
  console.log("WORKING");
  const quote = await request("http://quotes.stormconsultancy.co.uk/random.json");
  console.log("Random quote is ", quote);
}

const makeBackground = _ => 
    d3.select("svg")
      .selectAll("g")
      .data([...Array(1000)])
      .enter()
      .append("g")
        .append("text")
        .text( _ => getRandomLetter())
        .attr("x", _ => getRandInt(900))
        .attr("y", _ => getRandInt(900))
        .style("fill", _ => getRandomColor())
        .style("font-size", _ => getRandomFSize());

let charsArray,
    colors = ["red", "green", "blue","yellow", "orange", "pink"];

const getRandInt = (max,min=0) => ~~(Math.random() * (max -min) + min);

const makeCharsArray = _ => { charsArray = makeArray(97,123).concat(makeArray(65, 91)); }

const makeArray = (f,s) => [...Array(s-f)].map((_,i) => String.fromCharCode(f+i));

const getRandomLetter = _ => charsArray[getRandInt(charsArray.length)]

const getRandomFSize = _ => `${getRandInt(60,10)}px`;

const getRandomColor = _ => colors[getRandInt(colors.length)];

const doStuff = _ => { printStuff(); makeCharsArray(); makeBackground(); }

window.onload = doStuff; 
