
let limit=100;
const url = `https://api.coinstats.app/public/v1/coins?skip=0&limit=${limit}&currency=EUR`;

let coin_data={};
let fprice="true";
let fmarket="true";
async function Main() {
 coin_data = await getCoinData(url).catch(catchError);
  console.log(coin_data.coins.length);
  tofill(coin_data);
}

function catchError(err) {
  console.log('Error ', err);
}



async function getCoinData(_url) {
  const response = await fetch(_url);
  return await response.json();
}

Main();

function sortprice(){
  
  coin_data.coins.sort( (a, b) => {
        return a.price - b.price;
      });
      tofill(coin_data);
}

function sortmarket()
{
  let market=document.getElementById("market");
  if(fmarket=="true")
  {
   market.classList="fa-sharp fa-solid fa-arrow-down";
  coin_data.coins.sort( (a, b) => {
    console.log(fmarket,"balajidd");
    return a.marketCap - b.marketCap;
  });
  fmarket="false";
  tofill(coin_data);
}
else{
   market.classList="fa-sharp fa-solid fa-arrow-up";
  console.log(fmarket,"balaji");
  coin_data.coins.sort( (a, b) => {
    return b.marketCap - a.marketCap;
  });
  fmarket="true";
  tofill(coin_data);
}
}

function sorthour(){
  coin_data.coins.sort( (a, b) => {
    return a.priceChange1h - b.priceChange1h;
  });
  tofill(coin_data);
}

function sortday(){
  coin_data.coins.sort( (a, b) => {
    return a.priceChange1d - b.priceChange1d;
  });
  tofill(coin_data);

}

async function tofill(coin_data)
{
  let table=document.getElementById("table");
for(let i=0;i<coin_data.coins.length;i++)
{
  let coin=coin_data.coins[i];
  var row = table.insertRow(i);
var cell1 = row.insertCell();

cell1.innerHTML = coin.rank;

var x=row.insertCell();
  x.innerHTML="";

  var img = document.createElement('img');
  img.src = coin.icon;
  x.appendChild(img);
  var cell2 = row.insertCell();
  cell2.innerHTML = coin.id;
  var cell3=row.insertCell(3);
  cell3.innerHTML=`${"$"} ${coin.price.toFixed(2) }`;
  var cell4=row.insertCell(4);
  cell4.innerHTML=`${"$"} ${coin.marketCap.toFixed(2)}`;
  var cell5=row.insertCell();
  cell5.innerHTML=coin.totalSupply;
  cell5.classList.add("suplly")
  row.classList.add("mystyle")
  var cell6=row.insertCell();
  cell6.innerHTML=`${coin.volume?.toFixed(2)}`;
  var cell7=row.insertCell();
  cell7.innerHTML=`${coin.priceChange1h}%`;
  var cell9=row.insertCell();
  cell9.innerHTML=`${coin.priceChange1d}%`;
  var cell10=row.insertCell();
  cell10.innerHTML=`${coin.priceChange1w}%`;
  var cell8=row.insertCell();
  cell8.addEventListener('click',(e)=>{
    e.target.classList.toggle("fill");
    console.log("hello");
  })
  cell8.innerHTML="&#9733";


//   console.log(day_change.chart[0][1]);
  cell6.classList.add("suplly");
  cell4.classList.add("suplly");
  cell3.classList.add("suplly");
  cell7.classList.add("suplly");
  cell8.classList.add("star");
  
}
}


let favs= Array.from(document.getElementsByClassName("star"));
favs.map((ele)=>{
    ele.addEventListener("click", (e) => {
      console.log("heyyyy");
         e.target.classList.toggle("fill");
    })
})