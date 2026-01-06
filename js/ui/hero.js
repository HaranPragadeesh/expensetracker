export function renderHeroTotal(amount = 0) {
  return `
    <div class="hero-total">
      <div class="amount">₹ ${amount.toLocaleString()}</div>
      <div class="label">total spent</div>
    </div>
  `;
}
