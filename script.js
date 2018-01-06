
//TODO: provide a default quote if promise is rejected
const request = url => new Promise((res,rej) => {
  const xhr = new XMLHttpRequest();
  xhr.open('get', url, true);
  xhr.onreadystatechange = _ =>
    xhr.readyState === XMLHttpRequest.DONE && xhr.status === 200 && res(xhr.response);
  xhr.send();
});
  
async function printStuff() {
  console.log("WORKING");
  const quote = await request("http://quotes.stormconsultancy.co.uk/random.json");
  
  
}

const makeBackground = _ => 
    d3.select("svg")
      .selectAll("g")
      .data([...Array(1000)])
      .enter()
      .append("g")
        .attr("transform", _ => `translate(${getRandInt(900)}, ${getRandInt(900)})`)
        .append("text")
        .text( _ => getRandomLetter())
        .style("fill", _ => getRandomColor())
        .style("font-size", _ => getRandomFSize())
        .attr("transform", _ => `rotate(${getRandInt(360)})`)

let charsArray,
    colors = ["red", "green", "blue","yellow", "orange", "pink"];

const getRandInt = (max,min=0) => ~~(Math.random() * (max -min) + min);

const makeCharsArray = _ => { charsArray = makeArray(97,123).concat(makeArray(65, 91)); }

const makeArray = (f,s) => [...Array(s-f)].map((_,i) => String.fromCharCode(f+i));

const getRandomLetter = _ => charsArray[getRandInt(charsArray.length)]

const getRandomFSize = _ => `${getRandInt(60,10)}px`;

const getRandomColor = _ => colors[getRandInt(colors.length)];

const randomRotation = _ => {let y=getRandInt(0,360); d3.selectAll("text")
                              .attr("transform", _ => `rotate(${getRandInt(360)})`); }
const animate = _ => setInterval(randomRotation, 1000);

const addBox = _ => d3.select("svg")
                      .append("foreignObject")
                      .attr("x", "100")
                      .attr("y", "100")
                      .attr("width", "200")
                      .append("xhtml:div")
                      .append("div")
                      .attr("class", "quoteBox")

const doStuff = _ => { makeCharsArray(); makeBackground(); printStuff(); addBox(); }


window.onload = doStuff; 
