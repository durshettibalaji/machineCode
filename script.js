let limit=20;
let skip=0;
let url = `https://api.coinstats.app/public/v1/coins?skip=${skip}&limit=${limit}&currency=EUR`;
let coin_data={};
let fprice="true";
let fmarket="true";
let fhour="true";
let fday="true";
let favArry=[];
async function viewmore(){
limit+=20;
url = `https://api.coinstats.app/public/v1/coins?skip=${skip}&limit=${limit}&currency=EUR`;
coin_data = await getCoinData(url).catch(catchError);
  console.log(coin_data.coins.length);
  tofill(coin_data);
}
async function Main() {
 coin_data = await getCoinData(url).catch(catchError); 
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
  let price=document.getElementById("price");
  if(fprice=="true")
  {
    price.classList="fa-sharp fa-solid fa-arrow-down";
  coin_data.coins.sort( (a, b) => {
        return a.price - b.price;
      });
      fprice="false";
      tofill(coin_data);
    }
    else
    {
      price.classList="fa-sharp fa-solid fa-arrow-up";
    coin_data.coins.sort( (a, b) => {
          return b.price - a.price;
        });
        fprice="true";
        tofill(coin_data);
      }
}
function sortmarket()
{
  let market=document.getElementById("market");
  if(fmarket=="true")
  {
   market.classList="fa-sharp fa-solid fa-arrow-down";
  coin_data.coins.sort( (a, b) => {
    return a.marketCap - b.marketCap;
  });
  fmarket="false";
  tofill(coin_data);
}
else{
   market.classList="fa-sharp fa-solid fa-arrow-up";
  coin_data.coins.sort( (a, b) => {
    return b.marketCap - a.marketCap;
  });
  fmarket="true";
  tofill(coin_data);
}
}
function sorthour(){
  let hour=document.getElementById("hour");
  if(fhour=="true")
  {
    hour.classList="fa-sharp fa-solid fa-arrow-down";
  coin_data.coins.sort( (a, b) => {
    return a.priceChange1h - b.priceChange1h;
  });
  fhour="false";
  tofill(coin_data);
}
else{
  hour.classList="fa-sharp fa-solid fa-arrow-up";
  coin_data.coins.sort( (a, b) => {
    return b.priceChange1h - a.priceChange1h;
  });
  fhour="true";
  tofill(coin_data);
}
}
function sortday(){
  let day=document.getElementById("day");
  if(fday=="true")
  {
    day.classList="fa-sharp fa-solid fa-arrow-down";
  coin_data.coins.sort( (a, b) => {
    return a.priceChange1d - b.priceChange1d;
  });
  fday="false";
  tofill(coin_data);
}
else{
  day.classList="fa-sharp fa-solid fa-arrow-up";
  coin_data.coins.sort( (a, b) => {
    return b.priceChange1d - a.priceChange1d;
  });
  fday="true";
  tofill(coin_data);
}
}
async function tofill(coin_data)
{
  let table=document.getElementById("table");
  table.innerHTML="";
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
  if(iscontains(favArry,coin.id))
  cell8.classList.add("fill");

  cell8.addEventListener('click',(e)=>{ 
    console.log(iscontains(favArry,coin.id));   
    if(favArry.length>=3 && !iscontains(favArry,coin.id))
    {
      window.alert("you already choose three coins") 
    }
   else if(favArry.includes(coin))
    {
      e.target.classList.remove("fill");
   
     favArry= favArry.filter((ele)=>
      {
        if(ele.id!==coin.id)
        return ele;
      }
      );  
    }
    else{
      e.target.classList.add("fill");
   
      favArry.push(coin);
    }
   tofill1(); 
  })
  cell8.innerHTML="&#9733";
  cell6.classList.add("suplly");
  cell4.classList.add("suplly");
  cell3.classList.add("suplly");
  cell7.classList.add("suplly");
  cell8.classList.add("star");
}
}
function tofill1()
{
  let table2=document.getElementById("table2");
  table2.innerHTML="";
  for(let i=0;i<favArry.length;i++)
  {
    var row=table2.insertRow(i);
    var no=row.insertCell(0);
    no.innerHTML=i+1;
    var x=row.insertCell(1);
  x.innerHTML="";
  var img = document.createElement('img');
  img.src = favArry[i].icon;
  x.appendChild(img);
    var name=row.insertCell(2);
    name.innerHTML=favArry[i].id;
    no.classList.add("tab2");
    name.classList.add("tab2");
  }
}
function clearAll()
{
  favArry=[];
  tofill1();
}

function iscontains(arr,a)
{
//  console.log(arr.length);
  for(var i=0;i<favArry.length;i++)
  {
    // console.log(a,arr[i].id);
  if(arr[i].id==a)
  {
    // console.log(arr[i].id);
    // cell8.classList.add("fill");
    return true;
  }
  
  
}
return false;
}