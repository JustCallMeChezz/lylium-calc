const screen = document.getElementById("screen");
const delBtn = document.getElementById("delBtn");
const historyBox = document.getElementById("history");
const front = document.getElementById("front");
const back = document.getElementById("back");

let expression = "";
let deleteInterval;
let isHistory = false;

function press(val) {
   vibrate();
   if (expression === "0" && val !== ".") expression = "";
   expression += val;
   screen.textContent = expression;
}

function deleteLast() {
   vibrate();
   if (!expression) return;
   const lastChar = expression.slice(-1);
   expression = expression.slice(0, -1);
   screen.textContent = expression || "0";
   const animSpan = document.createElement("span");
   animSpan.textContent = lastChar;
   animSpan.classList.add("fade-char");
   animSpan.style.display = "inline-block";
   screen.appendChild(animSpan);
   setTimeout(() => animSpan.remove(), 200);
}

function clearAll() {
   vibrate();
   expression = "";
   screen.textContent = "0";
}

function calculate() {
   vibrate();
   try {
      let result = eval(expression);
      addHistory(expression, result);
      screen.textContent = result;
      expression = result.toString();
   } catch {
      screen.textContent = "uhh...";
      expression = "";
   }
}

function addHistory(expr, res) {
   const div = document.createElement("div");
   div.className = "history-entry";
   div.innerHTML = `<span>${expr}</span><span>= ${res}</span>`;
   historyBox.appendChild(div);
   historyBox.scrollTop = historyBox.scrollHeight;
}

function toggleHistory() {
   vibrate();
   isHistory = !isHistory;
   if (isHistory) {
      front.classList.add("get-outt");
      front.classList.remove("fade-in");
      back.classList.add("fade-in");
      back.classList.remove("get-outt");
   } else {
      front.classList.add("fade-in");
      front.classList.remove("get-outt");
      back.classList.add("get-outt");
      back.classList.remove("fade-in");
   }
}

function vibrate() {
   if (navigator.vibrate) navigator.vibrate(50);
}

delBtn.addEventListener("mousedown", () => {
   deleteLast();
   deleteInterval = setInterval(deleteLast, 100);
});
delBtn.addEventListener("mouseup", () => clearInterval(deleteInterval));
delBtn.addEventListener("mouseleave", () => clearInterval(deleteInterval));
delBtn.addEventListener("touchstart", () => {
   deleteLast();
   deleteInterval = setInterval(deleteLast, 100);
}, {
   passive: true
});
delBtn.addEventListener("touchend", () => clearInterval(deleteInterval));
// made with ♡ by lily