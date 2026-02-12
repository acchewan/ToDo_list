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
      />
      <button type="submit" class="btn">
        ${editId ? "edit item" : "add item"}
      </button>
      ${editId ? '<button type="button" class="btn cancel-btn">cancel</button>' : ""}
    </div>
  `;

  form.addEventListener("submit", (e) => {
    e.preventDefault();
    const input = form.querySelector(".form-input");
    const value = input.value.trim();

    if (!value) {
      alert("please provide value", "error");
      return;
    }

    // added conditions
    if (editId) {
      updateItemName(value);
    } else {
      addItem(value);
    }

    input.value = "";
  });

  // Add cancel button listener
  const cancelBtn = form.querySelector(".cancel-btn");
  if (cancelBtn) {
    cancelBtn.addEventListener("click", () => {
      setEditId(null);
    });
  }

  return form;
}
