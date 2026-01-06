// js/ui/timeline.js

function toDate(value) {
  if (value && typeof value.toDate === "function") {
    return value.toDate(); // Firestore Timestamp
  }
  if (value instanceof Date) {
    return value;
  }
  return new Date(value);
}

function isToday(date) {
  const d = toDate(date);
  const today = new Date();
  return d.toDateString() === today.toDateString();
}

function formatDayHeader(date) {
  const d = toDate(date);
  const today = new Date();
  const yesterday = new Date();
  yesterday.setDate(today.getDate() - 1);

  if (d.toDateString() === today.toDateString()) {
    return "Today";
  }

  if (d.toDateString() === yesterday.toDateString()) {
    return "Yesterday";
  }

  return d.toLocaleDateString("en-IN", {
    weekday: "short",
    day: "numeric",
    month: "short"
  });
}

function formatMeta(date) {
  const d = toDate(date);

  // Show time ONLY for today
  if (isToday(d)) {
    return d.toLocaleTimeString("en-IN", {
      hour: "numeric",
      minute: "2-digit"
    });
  }

  // Older than today → show date
  return d.toLocaleDateString("en-IN", {
    day: "numeric",
    month: "short"
  });
}

function renderExpenseCard(exp) {
  return `
    <div class="expense-card">
      <div class="expense-row">
        <div class="expense-tag">
          <span class="tag-dot" style="background:${exp.color}"></span>
          ${exp.tag}
        </div>

        <div class="expense-amount">
          ₹ ${exp.amount}
        </div>
      </div>

      <div class="expense-meta">
        ${
          exp.note
            ? `<span class="expense-note">${exp.note}</span>`
            : `<span></span>`
        }
        <span class="expense-time">
          ${formatMeta(exp.date)}
        </span>
      </div>
    </div>
  `;
}

export function renderTimeline(expenses = []) {
  if (!expenses.length) {
    return `
      <div class="timeline">
        <div class="empty-state">
          No expenses yet.<br />
          Tap + to add one.
        </div>
      </div>
    `;
  }

  const groups = {};

  expenses.forEach(exp => {
    const key = formatDayHeader(exp.date);
    if (!groups[key]) groups[key] = [];
    groups[key].push(exp);
  });

  return `
    <div class="timeline">
      ${Object.entries(groups)
        .map(
          ([day, items]) => `
          <div class="day-group">
            <div class="day-label">${day}</div>
            ${items.map(renderExpenseCard).join("")}
          </div>
        `
        )
        .join("")}
    </div>
  `;
}
