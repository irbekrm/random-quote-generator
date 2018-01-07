
//TODO: provide a default quote if promise is rejected
const request = url => new Promise((res,rej) => {
  const xhr = new XMLHttpRequest();
  xhr.open('get', url, true);
  xhr.onreadystatechange = _ =>
    xhr.readyState === XMLHttpRequest.DONE && xhr.status === 200 && res(xhr.response);
  xhr.send();
});

async function printStuff() {
  let json = await request("http://quotes.stormconsultancy.co.uk/random.json");
  let quote = JSON.parse(json)["quote"];
  let author = JSON.parse(json)["author"];
  let quoteBox = d3.select(".quoteBox");
  quoteBox.selectAll("p")
          .remove();
  quoteBox.append("p")
          .attr("class", "quote")
          .html(quote);
  quoteBox.append("p")
          .attr("class", "author")
          .html(`'${author}'`);
  d3.select(".twitter-share-button")
    .attr("href", `https://twitter.com/intent/tweet?text=${quote}~~${author}`)
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

const addBox = _ => {
 let fo = d3.select("svg")
            .append("foreignObject")
            .attr("x", "100")
            .attr("y", "100")
            .attr("width", "200");

  fo.append("xhtml:div")
    .append("div")
    .attr("class", "quoteBox");

  let tBox = fo.append("xhtml:div")
               .append("div")
               .attr("class", "toolBox");
  tBox.append("button")
      .html("new random quote")
      .on("click", printStuff);

  tBox.append("a")
      .attr("class", "twitter-share-button")
      .attr("href", "https://twitter.com/intent/tweet")
      .html("<img src='data/twitter.png'/>")
}

const doStuff = _ => { makeCharsArray(); makeBackground(); addBox(); printStuff();}


window.onload = doStuff; 
