const setting = (year, month) => {
  var Year = year;
  var Month = month;
  console.log("in", year, month);
  var TitleYear = document.getElementById("TitleYear");
  TitleYear.innerHTML = Year;
  var TitleMonth = document.getElementById("TitleMonth");
  TitleMonth.innerHTML = Number(Month);

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

  document.querySelector("#Calendar").innerHTML = dates.join(" ");
};

let SetYear, SetMonth;
SetYear = new Date().getFullYear();
SetMonth = new Date().getMonth();
if (Number(SetMonth) > 12) {
  SetMonth = SetMonth % 12;
}
console.log(SetYear, SetMonth + 1);
setting(SetYear, SetMonth);

function left() {
  var y = document.getElementById("TitleYear").innerText;
  var m = document.getElementById("TitleMonth").innerText;
  setting(y, m);
}
