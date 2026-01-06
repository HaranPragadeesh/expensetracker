// js/ui/categories.js
import { CATEGORIES } from "../config/categories.js";

export function renderCategoryPills(expenses, activeTag) {
  const totals = {};

  expenses.forEach(exp => {
    totals[exp.tag] = (totals[exp.tag] || 0) + exp.amount;
  });

  return `
    <div class="category-pills">
      <div
        class="category-pill ${activeTag === null ? "active" : ""}"
        data-tag="__all__"
      >
        All
      </div>

      ${CATEGORIES.filter(c => totals[c.name])
        .map(
          c => `
          <div
            class="category-pill ${activeTag === c.name ? "active" : ""}"
            data-tag="${c.name}"
          >
            <span class="category-dot" style="background:${c.color}"></span>
            ${c.name}
            <span class="category-amount">₹${totals[c.name]}</span>
          </div>
        `
        )
        .join("")}
    </div>
  `;
}
