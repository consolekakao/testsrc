const setting = (year, month) => {
  var x = new XMLHttpRequest();
  x.open("GET","http://localhost:3003/todo",false)
  x.send()


  const LastMonth = new Date(year, month, 0);
  const ThisMonth = new Date(year, month + 1, 0);
  const LastDate = LastMonth.getDate();
  const LastDay = LastMonth.getDay();
  const ThisDate = ThisMonth.getDate();
  const ThisDay = ThisMonth.getDay();

  const LastDates = [];
  const ThisDates = [...Array(ThisDate + 1).keys()].slice(1);
  const NextDates = [];


  

  if (LastDay !== 6) {
    for (let i = 0; i < LastDay + 1; i++) {
      LastDates.unshift(LastDate - i);
    }
  }
  for (let i = 1; i < 7 - ThisDay; i++) NextDates.push(i);

  const dates = LastDates.concat(ThisDates, NextDates);







  dates.forEach((date, i) => {
    dates[
      i
    ] = `<span style="border: 0px solid; float : left;" class="ad ${i}" onClick="clickDay(${year},${month},${date})">${date}</span>`;
  });
  const Now = document.getElementById("NowDate");
  Now.innerHTML = `${year}년 ${month + 1}월`;
  document.querySelector("#InCalendar").innerHTML = dates.join(" ");
 


console.log(dates)

  let todoData = JSON.parse(x.responseText)
  console.log(todoData[0])
  console.log(todoData[0].date)
  for(let i = 0; i<todoData.length;i++){
    for(let j=0;j<dates.length;j++){
        if(todoData[i].date && document.getElementsByClassName("ad[j]")){
          document.querySelector("#InCalendar > span.ad21")
        }break;
    }
  }



};





let SetYear, SetMonth;
var testdate = new Date();
SetYear = new Date().getFullYear();
SetMonth = new Date().getMonth();

console.log(SetYear, SetMonth + 1);
setting(SetYear, SetMonth);

function left() {
  SetMonth--;
  SetMonth < 0 ?(SetMonth = 11,SetYear--): SetMonth = SetMonth
  setting(SetYear,SetMonth )

}

function right() {
  SetMonth++;
  SetMonth>11?(SetMonth = 0,SetYear++) : SetMonth = SetMonth
  setting(SetYear,SetMonth)
}

function clickDay(year,month,parm) {
  console.log(year,month)
  let day = document.getElementById("bigDay");
  day.innerText = parm
  console.log
}
