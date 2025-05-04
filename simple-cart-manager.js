class SimpleCartManager {
  constructor() {
    this.init();
  }

  init() {
    this.setupQuantityButtons();
    this.updateAllTotals();
  }

  setupQuantityButtons() {

    document.querySelectorAll('.quantity-increase').forEach(btn => {
      btn.addEventListener('click', (e) => {
        const quantityDiv = e.target.closest('.quantity');
        const qtyElement = quantityDiv.querySelector('.quantity-number');
        qtyElement.textContent = parseInt(qtyElement.textContent) + 1;
        this.updateItemTotal(quantityDiv.closest('.product-item'));
      });
    });


    document.querySelectorAll('.quantity-decrease').forEach(btn => {
      btn.addEventListener('click', (e) => {
        const quantityDiv = e.target.closest('.quantity');
        const qtyElement = quantityDiv.querySelector('.quantity-number');
        const currentQty = parseInt(qtyElement.textContent);
        if (currentQty > 1) {
          qtyElement.textContent = currentQty - 1;
          this.updateItemTotal(quantityDiv.closest('.product-item'));
        }
      });
    });
  }

  updateItemTotal(container) {
    const price = parseFloat(container.querySelector('.price').textContent.replace(/[^\d.]/g, ''));
    const quantity = parseInt(container.querySelector('.quantity-number').textContent);
    const total = (price * quantity).toFixed(2);
    container.querySelector('.total').textContent = `PHP ${total}`;
    this.updateCartTotal();
  }

  updateCartTotal() {
    let total = 0;
    document.querySelectorAll(".product-item").forEach(container => {
      const totalText = container.querySelector('.total').textContent;
      total += parseFloat(totalText.replace(/[^\d.]/g, ''));
    });
    document.querySelector(".summary-total").textContent = `PHP ${total.toFixed(2)}`;
  }

  updateAllTotals() {
    document.querySelectorAll(".product-item").forEach(container => {
      this.updateItemTotal(container);
    });
  }
}

document.addEventListener("DOMContentLoaded", () => {
  new SimpleCartManager();
});
