const setting = (year, month) => {
  let resetCss = document.querySelectorAll("#InCalendar > span");
  resetCss.forEach((ele) => {
    ele.style.backgroundColor = "white";
  }); // 월 바뀔때마다 배경 초기화
  const requestData = {
    year: year,
    month: month,
  };
  let requstApi = new XMLHttpRequest();
  requstApi.open("POST", "http://consolekakaoapi.duckdns.org", false);
  //배포용 주소
  //requstApi.open("POST", "http://localhost:3003/todo", false);
  requstApi.setRequestHeader("Content-Type", "application/json");
  requstApi.send(JSON.stringify(requestData));

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
    ] = `<span style="border: 0px solid; float : left;" class="nextMonthDay" onClick="clickDay(${year},${month},${date})">${date}</span>`;
  });

  //  NextDates에 다음 달 엘리먼트 입력
  document.querySelector("#InCalendar").innerHTML =
    LastDates.join(" ") + ThisDates.join(" ") + NextDates.join(" ");
  //모든 엘리먼트 삽입
  let todoData = JSON.parse(requstApi.responseText);
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
SetYear = new Date().getFullYear();
SetMonth = new Date().getMonth();
setting(SetYear, SetMonth);

function left() {
  //이전달로 이동
  SetMonth--;
  SetMonth < 0 ? ((SetMonth = 11), SetYear--) : (SetMonth = SetMonth);
  setting(SetYear, SetMonth);
}

function right() {
  //다음달로 이동
  SetMonth++;
  SetMonth > 11 ? ((SetMonth = 0), SetYear++) : (SetMonth = SetMonth);
  setting(SetYear, SetMonth);
}

function clickDay(year, month, parm) {
  //일자 클릭시
  let day = document.getElementById("bigDay");
  day.innerText = parm;
  const data = {
    year: year,
    month: month,
    day: parm,
  };
  let callData = new XMLHttpRequest();
  //callData.open("POST", "http://localhost:3003/clickday", false);
  callData.open("POST", "http://consolekakaoclickday.duckdns.org", false);
  //배포용 주소
  callData.setRequestHeader("Content-Type", "application/json");
  callData.send(JSON.stringify(data));
  document.getElementById("dayContents").innerHTML = "";
  for (let i = 0; i < JSON.parse(callData.responseText).length; i++) {
    document.getElementById(
      "dayContents"
    ).innerHTML += `<div id="dayContents[${i}]">${decodeURI(
      JSON.parse(callData.responseText)[i].contents
    )}
    <span id="dayContents[${
      JSON.parse(callData.responseText)[i].idx
    }]" onclick="deleteContents(${
      JSON.parse(callData.responseText)[i].idx
    },${SetYear}
    ,${SetMonth}
    ,${decodeURI(JSON.parse(callData.responseText)[i].date)})">x</span>
    </div>`;
    //`<div id="addContents" onclick="addContents(${year},${month},${parm})">일정 등록하기</div>`;
  }
  if (JSON.parse(callData.responseText).length == 0)
    document.getElementById("dayContents").innerHTML = `오늘은 일정이 없네요. `;
  //  `<div id="addContents" onclick="addContents(${year},${month},${parm})">일정 등록하기</div>`;

  document.getElementById(
    "dayContents"
  ).innerHTML += `<div onclick="addContents(${year},${month},${parm})">일정추가하기</div>`;
}

const deleteContents = async (idx, year, month, date) => {
  let data = {
    idx: idx,
  };
  let deleteRequest = new XMLHttpRequest();
  //deleteRequest.open("POST", "http://localhost:3003/delete");
  deleteRequest.open("POST", "http://consolecalendardelete.duckdns.org");
  //배포용 주소
  deleteRequest.setRequestHeader("Content-Type", "application/json");
  deleteRequest.send(JSON.stringify(data));
  await sleep(100);
  setting(SetYear, SetMonth);
  await sleep(100);
  clickDay(year, month, date);
};

const addContents = async (year, month, day) => {
  let contents = prompt("일정입력:");
  if (contents) {
    let data = {
      year: year,
      month: month + 1,
      date: day,
      contents: contents,
    };
    if (String(data.date).length == 1) data.date = "0" + data.date;
    if (String(data.month).length == 1) data.month = "0" + data.month;
    let addtodo = new XMLHttpRequest();
    addtodo.open("POST", "http://consoleaddtodo.duckdns.org");
    addtodo.setRequestHeader("Content-Type", "application/json");
    addtodo.send(JSON.stringify(data));
    await sleep(200);
    setting(SetYear, SetMonth);
    await sleep(200);
    clickDay(year, month, day);
  }
};

function sleep(ms) {
  //딜레이함수
  return new Promise((resolve) => setTimeout(resolve, ms));
}
