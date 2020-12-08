const setting = (year, month) => {
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
    ] = `<span style="border: 1px solid; float : left;" id="ad" >${date}</span>`;
  });
  const Now = document.getElementById("NowDate");
  Now.innerHTML = `${year}년 ${month + 1}월`;
  document.querySelector("#InCalendar").innerHTML = dates.join(" ");
};

let SetYear, SetMonth;
var testdate = new Date();
SetYear = new Date().getFullYear();
SetMonth = new Date().getMonth();

console.log(SetYear, SetMonth + 1);
setting(SetYear, SetMonth);

function left() {
  --SetMonth;
  setting(SetYear,SetMonth )
  console.log("현재달 인덱스",SetMonth)

}

function right() {}