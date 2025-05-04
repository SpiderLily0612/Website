class ComprehensiveCartManager {
  constructor() {
    this.premiumItems = ['BC12341', 'BC12234', 'BC67322'];
    this.init();
  }

  init() {
    this.setupQuantityControls();
    this.setupDragAndDrop();
    this.updateAllTotals();
  }

  setupQuantityControls() {
    // Plus button
    document.querySelectorAll('.quantity-increase').forEach(btn => {
      btn.addEventListener('click', (e) => {
        const qtyElement = e.target.closest('.quantity-controls').querySelector('.quantity-number');
        qtyElement.textContent = parseInt(qtyElement.textContent) + 1;
        this.updateItemTotal(e.target.closest('.product-item'));
      });
    });

    // Minus button
    document.querySelectorAll('.quantity-decrease').forEach(btn => {
      btn.addEventListener('click', (e) => {
        const qtyElement = e.target.closest('.quantity-controls').querySelector('.quantity-number');
        const currentQty = parseInt(qtyElement.textContent);
        if (currentQty > 1) {
          qtyElement.textContent = currentQty - 1;
          this.updateItemTotal(e.target.closest('.product-item'));
        }
      });
    });
  }

  setupDragAndDrop() {
    const removeZone = document.getElementById("remove-zone");
    if (!removeZone) return;

    this.premiumItems.forEach(id => {
      const item = document.querySelector(`[data-item-id="${id}"]`);
      if (!item) return;

      item.setAttribute("draggable", "true");

      item.addEventListener("dragstart", (e) => {
        item.classList.add("dragging");
        removeZone.classList.add("visible");
        
        const dragImage = item.cloneNode(true);
        dragImage.style.cssText = `
          width: ${item.offsetWidth}px;
          opacity: 0.9;
          position: fixed;
          pointer-events: none;
          z-index: 1000;
          transform: scale(1.05);
          box-shadow: 0 5px 15px rgba(0,0,0,0.2);
          background: white;
        `;
        document.body.appendChild(dragImage);
        e.dataTransfer.setDragImage(dragImage, 0, 0);
        setTimeout(() => dragImage.remove(), 0);
      });

      item.addEventListener("dragend", () => {
        item.classList.remove("dragging");
        removeZone.classList.remove("visible");
      });
    });

    removeZone.addEventListener("dragover", (e) => e.preventDefault());
    removeZone.addEventListener("drop", (e) => this.handleItemRemoval(e));
  }

  handleItemRemoval(e) {
    e.preventDefault();
    const draggedItem = document.querySelector(".dragging");
    if (!draggedItem) return;

    const container = draggedItem.closest('.product-item');
    const qtyElement = container.querySelector('.quantity-number');
    const currentQty = parseInt(qtyElement.textContent);
    
    if (currentQty > 1) {
      qtyElement.textContent = currentQty - 1;
      this.updateItemTotal(container);
    } else {
      draggedItem.remove();
    }
    
    this.updateCartTotal();
    document.getElementById("remove-zone").classList.remove("visible");
  }

  updateItemTotal(container) {
    const price = parseFloat(container.querySelector('.price').textContent.replace(/[^\d.]/g, ''));
    const quantity = parseInt(container.querySelector('.quantity-number').textContent);
    container.querySelector('.total').textContent = `PHP ${(price * quantity).toFixed(2)}`;
    this.updateCartTotal();
  }

  updateCartTotal() {
    let total = 0;
    document.querySelectorAll(".product-item").forEach(container => {
      const totalText = container.querySelector('.total')?.textContent;
      if (totalText) total += parseFloat(totalText.replace(/[^\d.]/g, ''));
    });
    document.querySelector(".summary-total").textContent = `PHP ${total.toFixed(2)}`;
  }

  updateAllTotals() {
    document.querySelectorAll(".product-item").forEach(container => {
      this.updateItemTotal(container);
    });
  }
}
