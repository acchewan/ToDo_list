import { addItem, updateItemName, setEditId } from "./app.js";

// Create Form Element
export function createForm(editId, itemToEdit) {
  const form = document.createElement("form");

  // added value and dynamic button name
  form.innerHTML = `
    <h2 style="font-weight: 500">TODO LIST</h2>
    <div class="form-control">
      <input
        type="text"
        class="form-input"
        placeholder="e.g. make presentation"
        value="${itemToEdit ? itemToEdit.name : ""}"
        maxlength="100"
        required
      />
      <input 
    type="date" 
    class="form-date"
    value="${itemToEdit ? itemToEdit.dueDate || "" : ""}"
  />
     <div class="btn-container">
    ${
      editId
        ? `
          <button type="button" class="cancel-btn">Cancel</button>
          <button type="submit" class="edit-btn">Edit Item</button>
        `
        : `
          <button type="submit" class="add-btn">Add Item</button>
        `
    }
  </div>
  `;
  const dateInput = form.querySelector(".form-date");
  const today = new Date().toISOString().split("T")[0];
  dateInput.setAttribute("min", today);

  form.addEventListener("submit", (e) => {
    e.preventDefault();
    const input = form.querySelector(".form-input");
    const dateInput = form.querySelector(".form-date");
    const value = input.value.trim();
    const dateValue = dateInput.value;

    if (!value) {
      input.classList.add("error");
      setTimeout(() => input.classList.remove("error"), 600);
      return;
    }
    if (dateValue) {
      const selectedDate = new Date(dateValue);
      const today = new Date();

      today.setHours(0, 0, 0, 0);
    }
    // added conditions
    if (editId) {
      updateItemName(value, dateValue);
    } else {
      addItem(value, dateValue);
    }
    input.value = "";
    dateInput.value = "";
  });

  // Add cancel button listener
  const cancelBtn = form.querySelector(".cancel-btn");
  if (cancelBtn) {
    cancelBtn.addEventListener("click", () => {
      setEditId(null);
    });
  }

  // Add keyboard shortcut for escape
  form.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && editId) {
      setEditId(null);
    }
  });

  return form;
}
