const setting = (year, month) => {
  let resetCss = document.querySelectorAll("#InCalendar > span");
  resetCss.forEach((ele) => {
    ele.style.backgroundColor = "white";
  }); // 월 바뀔때마다 배경 초기화
  console.log(year);
  const requestData = {
    'year': year,
    'month': month,
  };
  var x = new XMLHttpRequest();
  x.open("POST", "http://127.0.0.1:3003/todo", false);
  x.setRequestHeader("Content-Type", "application/json");
  x.send(JSON.stringify(requestData));

  // fetch("http://localhost:3003/todo", {
  //   method: "POST",
  //   body: JSON.stringify(requestData),
  // })
  //   .then(console.log("2314123434"))
  //   .then(console.log(requestData))
  //   .then((response) => response.json())
  //   .then((html) => console.log(html));

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
      LastDates.unshift(LastDate - i); //  전 달 마지막 주가 7일이면 한줄 더 출력할 필요 없음
    }
  }

  for (let i = 1; i < 7 - ThisDay; i++) NextDates.push(i); // 다음달 첫 주 추가

  const Now = document.getElementById("NowDate");
  Now.innerHTML = `${year}년 ${month + 1}월`;

  LastDates.forEach((date, i) => {
    LastDates[
      i
    ] = `<span style="border: 0px solid; float : left;" class="lastMonthDay" onClick="clickDay(${year},${month},${date})">${date}</span>`;
  });
  //   LastDates에 전 달 엘리먼트 입력.
  ThisDates.forEach((date, i) => {
    ThisDates[
      i
    ] = `<span style="border: 0px solid; float : left;" name="mainMonth" class="thisMonthDay ${i}" onClick="clickDay(${year},${month},${date})">${date}</span>`;
  });
  //   ThisDates에 현재 달 엘리먼트 입력

  NextDates.forEach((date, i) => {
    NextDates[
      i
    ] = `<span style="border: 0px solid; float : left;" class="thisMonthDay" onClick="clickDay(${year},${month},${date})">${date}</span>`;
  });

  //  NextDates에 다음 달 엘리먼트 입력
  document.querySelector("#InCalendar").innerHTML =
    LastDates.join(" ") + ThisDates.join(" ") + NextDates.join(" ");
  //모든 엘리먼트 삽입
  let todoData = JSON.parse(x.responseText);
  for (let i = 0; i < todoData.length; i++) {
    for (let j = 0; j < ThisDates.length; j++) {
      if (
        todoData[i].date == j &&
        document.getElementsByClassName("thisMonthDay[j]")
      ) {
        // 일정의 date와 index가 겹치는 day가 있으면 배경 색 변경
        document.querySelectorAll("#InCalendar > span.thisMonthDay")[
          j - 1
        ].style.backgroundColor = "pink";
      }
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
  SetMonth < 0 ? ((SetMonth = 11), SetYear--) : (SetMonth = SetMonth);
  setting(SetYear, SetMonth);
}

function right() {
  SetMonth++;
  SetMonth > 11 ? ((SetMonth = 0), SetYear++) : (SetMonth = SetMonth);
  setting(SetYear, SetMonth);
}

function clickDay(year, month, parm) {
  console.log(year, month);
  let day = document.getElementById("bigDay");
  day.innerText = parm;
  console.log;
}
