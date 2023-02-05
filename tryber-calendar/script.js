const createDaysOfTheWeek = () => {
  const weekDays = [
    "Domingo",
    "Segunda",
    "Terça",
    "Quarta",
    "Quinta",
    "Sexta",
    "Sábado"
  ];
  const weekDaysList = document.querySelector(".week-days");

  for (let index = 0; index < weekDays.length; index += 1) {
    const days = weekDays[index];
    const dayListItem = document.createElement("li");
    dayListItem.innerHTML = days;

    weekDaysList.appendChild(dayListItem);
  }
};

createDaysOfTheWeek();

const decemberDaysList = [
  29,
  30,
  1,
  2,
  3,
  4,
  5,
  6,
  7,
  8,
  9,
  10,
  11,
  12,
  13,
  14,
  15,
  16,
  17,
  18,
  19,
  20,
  21,
  22,
  23,
  24,
  25,
  26,
  27,
  28,
  29,
  30,
  31
];
const holidays = [24, 25, 31];
const fridays = [4, 11, 18, 25];
// Escreva seu código abaixo.
// Meu código ficará aqui :-)

const createDaysOfTheMonth = () => {
  const ulDays = document.querySelector("#days");
  for (const decDay of decemberDaysList) {
    const liDecDay = document.createElement("li");
    liDecDay.innerHTML = decDay;
    liDecDay.classList.add("day");
    if (fridays.includes(decDay)) liDecDay.classList.add("friday");
    if (holidays.includes(decDay)) liDecDay.classList.add("holiday");

    ulDays.appendChild(liDecDay);
  }
};
createDaysOfTheMonth();

const btnHoliday = document.querySelector("#btn-holiday");
btnHoliday.addEventListener("click", event => {
  let liHolidays = document.querySelectorAll(".holiday");
  for (const li of liHolidays) {
    li.style.backgroundColor =
      li.style.backgroundColor === "red" ? "rgb(238,238,238)" : "red";
  }
});

const btnFriday = document.querySelector("#btn-friday");
btnFriday.addEventListener("click", event => {
  const liFridays = document.querySelectorAll(".friday");
  for (const li of liFridays) {
    li.innerHTML =
      li.innerHTML === "LET'S GO ALREADY!"
        ? parseInt(li.nextElementSibling.innerHTML) - 1
        : "LET'S GO ALREADY!";
  }
});

const liDays = document.querySelectorAll(".day");
for (const li of liDays) {
  li.addEventListener("mouseover", event => {
    event.target.style.fontSize = "30px";
  });
  li.addEventListener("mouseout", event => {
    event.target.style.fontSize = "20px";
  });
  li.addEventListener("click", event => {
    const taskSelected = document.querySelector(".selected");
    if (taskSelected !== null) {
      console.log(event.target.style.color);
      event.target.style.color =
        event.target.style.color === taskSelected.style.backgroundColor
          ? "rgb(119,119,119)"
          : taskSelected.style.backgroundColor;
    }
  });
}

const btnTasks = document.querySelectorAll(".task");
for (const btn of btnTasks) {
  btn.addEventListener("click", event => {
    if (btn.classList.contains("selected")) {
      btn.classList.remove("selected");
    } else {
      btn.classList.add("selected");
    }
  });
}
const inputTask = document.querySelector("#task-input");
const btnAdd = document.querySelector("#btn-add");

const addTask = event => {
  if (event.key === "Enter" || event.target === btnAdd) {
    if (inputTask.value.length < 1) {
      alert("Informe um texto primeiro!");
    } else {
      const ulTaskList = document.querySelector("#task-list");
      const liTask = document.createElement("li");
      liTask.innerHTML = inputTask.value;
      ulTaskList.appendChild(liTask);
    }
  }
};

btnAdd.addEventListener("click", addTask);
inputTask.addEventListener("keyup", addTask);
