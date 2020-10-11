const dropdown = document.getElementById("my-dropdown");
const company = document.getElementById("company");
const textError = document.querySelector(".textError");
const employeeLinks = document.querySelectorAll(".employee-container");
const employeeDropdown = document.getElementById("dropdown-btn");
const task = document.getElementById("task");
const taskLabel = document.getElementById("task-label");
const taskError = document.getElementById("task-error");
const employeeLabel = document.getElementById("employee-label");
const companyLabel = document.getElementById("company-label");
const addBtn = document.getElementById("addbtn");
const amount = document.getElementById("pln_amount");
const amountError = document.getElementById("amount-error");
const amountLabel = document.getElementById("amount-label");
const tableBody = document.querySelector("tbody");
const tableHead = document.querySelector("thead");
const exrate = document.getElementById("exrate-amount").innerText;
const deleteRow = document.querySelectorAll(".delete-row");
let plnSumText = document.getElementById("pln-sum");
let eurSumText = document.getElementById("eur-sum");

const resetArrows = function (table) {
  const arrows = table.querySelectorAll("thead i");
  arrows.forEach(element => {
    element.classList = "fas fa-sort";
  });
};

function dropdownToggle() {
  dropdown.classList.toggle("show");
}

function filterFunction() {
  var input, filter, a, i;
  input = document.getElementById("my-input");
  filter = input.value.toUpperCase();
  a = dropdown.getElementsByTagName("a");
  for (i = 0; i < a.length; i++) {
    txtValue = a[i].textContent || a[i].innerText;
    if (txtValue.toUpperCase().indexOf(filter) > -1) {
      a[i].style.display = "";
    } else {
      a[i].style.display = "none";
    }
  }
}

const employeePicked = function (e) {
  employeeLinks.forEach(link => {
    link.classList.remove("selected-employee");
  });
  const text = e.currentTarget.children[1].innerText;
  employeeDropdown.innerText = text;
  e.currentTarget.classList.add("selected-employee");
  dropdown.classList.remove("show");
  showElement(employeeLabel);
};

const showElement = function (el) {
  el.classList.remove("hide");
};
const companyValidator = function (e) {
  const companyText = e.target.value;
  if (companyText === "") {
    showElement(textError);
    company.classList.add("textErrorBorder");
    companyLabel.classList.add("hide");
  } else {
    textError.classList.add("hide");
    company.classList.remove("textErrorBorder");
    showElement(companyLabel);
  }
};

const taskValidator = function () {
  if (taskNameCorrect(task.value)) {
    taskError.classList.add("hide");
    task.classList.remove("textErrorBorder");
    showElement(taskLabel);
    const section = task.parentElement;
    const amount = section.querySelector("#pln_amount").value;
    if (amountCorrect(amount)) {
      addBtn.disabled = false;
    }
  } else {
    addBtn.disabled = true;
    showElement(taskError);
    task.classList.add("textErrorBorder");
  }
};

const amountValidator = function (e) {
  console.log(amountCorrect(e.target.value));
  if (amountCorrect(e.target.value)) {
    amountError.classList.add("hide");
    amount.classList.remove("textErrorBorder");
    showElement(amountLabel);
    if (taskNameCorrect(task.value)) {
      addBtn.disabled = false;
    }
  } else {
    addBtn.disabled = true;
    showElement(amountError);
    amount.classList.add("textErrorBorder");
    amountLabel.classList.add("hide");
  }
};

const amountCorrect = function (amount) {
  const pattern = new RegExp("^[0-9]+$");
  console.log(amount)
  return pattern.test(amount)
};
const taskNameCorrect = function (taskName) {
  return taskName.length > 4;
};

const updateSum = function () {
  const plnAmounts = document.querySelectorAll(".pln-amount");
  let plnSum = 0;
  plnAmounts.forEach(item => {
    plnSum = plnSum + parseFloat(item.innerText);
  });
  plnSumText.innerHTML = plnSum;
  eurSumText.innerHTML = (plnSum / exrate).toFixed(2);
};

const addRow = function () {
  const taskValue = task.value;
  const amountValue = parseFloat(amount.value);
  const eurAmount = (amountValue / exrate).toFixed(2);
  const newRow = `
   <tr>
      <td>${taskValue}</td>
      <td class="pln-amount">${amountValue}</td>
      <td class="eur-amount">${eurAmount}</td>
      <td>
         <a class="delete-row"><i class="fas fa-trash"></i> Usuń</a>
      </td>
   </tr>
   `;
  tableBody.innerHTML += newRow;
  tableBody.querySelectorAll(".delete-row").forEach(element => {
    element.addEventListener("click", removeRow);
  });
  resetArrows(tableBody.parentElement);
  updateSum();
};

const removeRow = function (e) {
  const currentRow = e.currentTarget.parentElement.parentElement;
  currentRow.parentElement.removeChild(currentRow);
  updateSum();
};

const getCellValue = (tr, idx) =>
  tr.children[idx].innerText || tr.children[idx].textContent;

const comparer = (idx, asc) => (a, b) =>
  ((v1, v2) =>
    v1 !== "" && v2 !== "" && !isNaN(v1) && !isNaN(v2)
      ? v1 - v2
      : v1.toString().localeCompare(v2))(
    getCellValue(asc ? a : b, idx),
    getCellValue(asc ? b : a, idx)
  );

document.querySelectorAll(".sortable").forEach(th =>
  th.addEventListener("click", e => {
    const table = th.closest("table");
    const tbody = table.querySelector("tbody");
    const arrow = th.querySelector("i");
    resetArrows(table);
    if (this.asc) {
      arrow.classList = "fas fa-sort-down";
    } else {
      arrow.classList = "fas fa-sort-up";
    }

    Array.from(tbody.querySelectorAll("tr"))
      .sort(
        comparer(
          Array.from(th.parentNode.children).indexOf(th),
          (this.asc = !this.asc)
        )
      )
      .forEach(tr => tbody.appendChild(tr));
  })
);

updateSum();
company.addEventListener("keyup", companyValidator);
company.addEventListener("blur", companyValidator);
employeeDropdown.addEventListener("click", dropdownToggle);
employeeLinks.forEach(item => {
  item.addEventListener("click", employeePicked);
});
task.addEventListener("keyup", taskValidator);
task.addEventListener("blur", taskValidator);
amount.addEventListener("keyup", amountValidator);
amount.addEventListener("blur", amountValidator);
addBtn.addEventListener("click", addRow);
deleteRow.forEach(element => {
  element.addEventListener("click", removeRow);
});
