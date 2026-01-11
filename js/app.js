// js/app.js

import { renderTimeline } from "./ui/timeline.js";
import { renderCategoryPills } from "./ui/categories.js";
import { initAddExpense } from "./ui/addExpense.js";
import { showToast } from "./ui/toast.js";

import { listenToExpenses, addExpense } from "./data/expenses.js";

/* ======================
   APP STATE
====================== */

let expenses = [];
let activeTag = null;

/* ======================
   RENDER
====================== */

function render() {
  const filteredExpenses = activeTag
    ? expenses.filter(e => e.tag === activeTag)
    : expenses;

  document.getElementById("category-pills").innerHTML =
    renderCategoryPills(expenses, activeTag);

  document.getElementById("timeline").innerHTML =
    renderTimeline(filteredExpenses);

  attachCategoryHandlers();
}

/* ======================
   CATEGORY FILTER HANDLERS
====================== */

function attachCategoryHandlers() {
  document.querySelectorAll(".category-pill").forEach(pill => {
    pill.onclick = () => {
      const tag = pill.dataset.tag;

      if (tag === "__all__") {
        activeTag = null;
      } else {
        activeTag = activeTag === tag ? null : tag;
      }

      render();
    };
  });
}

/* ======================
   FIRESTORE LISTENER
====================== */

listenToExpenses(firestoreExpenses => {
  expenses = firestoreExpenses;
  render();
});

import { initAddExpense } from "./ui/addExpense.js";

initAddExpense({
  onAdd: async expense => {
    await addExpense(expense);
    showToast(`Added ₹${expense.amount}`);
  }
});
