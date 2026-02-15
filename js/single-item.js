import { editCompleted, removeItem, setEditId } from "./app.js";
function getDueStatus(dueDate) {
  if (!dueDate) return "";

  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const selected = new Date(dueDate);
  selected.setHours(0, 0, 0, 0);

  const diffTime = selected - today;
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

  if (diffDays < 0) {
    return `Overdue by ${Math.abs(diffDays)} day${Math.abs(diffDays) > 1 ? "s" : ""}`;
  }

  if (diffDays === 0) {
    return "Due today";
  }

  return `Due in ${diffDays} day${diffDays > 1 ? "s" : ""}`;
}
function getStatusClass(dueDate) {
  if (!dueDate) return "";

  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const selected = new Date(dueDate);
  selected.setHours(0, 0, 0, 0);

  const diffTime = selected - today;
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

  if (diffDays < 0) return "overdue";
  if (diffDays === 0) return "today";
  return "upcoming";
}
// Create SingleItem Element
export function createSingleItem(item) {
  const div = document.createElement("div");
  div.className = "single-item";

  div.innerHTML = `
    <input type="checkbox" ${item.completed ? "checked" : ""} />
    <div class="item-text">
      <span class="item-name" style="text-decoration: ${item.completed ? "line-through" : "none"}">
      ${item.name}</span>
      ${
        item.dueDate
          ? `<span class="item-date ${getStatusClass(item.dueDate)}">${getDueStatus(item.dueDate)}</span>`
          : ""
      }
    </div>
    <button class="btn icon-btn edit-btn" type="button">
      <i class="fa-regular fa-pen-to-square"></i>
    </button>
    <button class="btn icon-btn remove-btn" type="button">
      <i class="fa-regular fa-trash-can"></i>
    </button>
  `;

  // Add event listener for checkbox
  const checkbox = div.querySelector('input[type="checkbox"]');
  checkbox.addEventListener("change", () => editCompleted(item.id));

  const removeBtn = div.querySelector(".remove-btn");
  removeBtn.addEventListener("click", () => removeItem(item.id));

  // Add event listener for edit button
  const editBtn = div.querySelector(".edit-btn");
  editBtn.addEventListener("click", () => setEditId(item.id));

  return div;
}
