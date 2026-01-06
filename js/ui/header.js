
export function renderHeader(monthLabel = "January 2026") {
  return `
    <div class="month-header">
      <button class="month-btn">
        ${monthLabel}
        <span class="chevron">▾</span>
      </button>
    </div>
  `;
}
