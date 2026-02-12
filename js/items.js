import { createSingleItem } from "./single-item.js";

// Create Items Container
export function createItems(itemsArray) {
  const container = document.createElement("div");
  container.className = "items-wrapper";

  // Add stats section
  const statsDiv = document.createElement("div");
  statsDiv.className = "items-stats";
  const completedCount = itemsArray.filter((item) => item.completed).length;
  const progress =
    itemsArray.length > 0
      ? Math.round((completedCount / itemsArray.length) * 100)
      : 0;
  statsDiv.innerHTML = `
    <div class="progress-bar-container">
      <div class="progress-bar" style="width: ${progress}%"></div>
    </div>
    <p>${itemsArray.length} total • ${completedCount} completed • ${progress}%</p>
  `;
  container.appendChild(statsDiv);

  const itemsContainer = document.createElement("div");
  itemsContainer.className = "items";

  if (itemsArray.length === 0) {
    itemsContainer.innerHTML =
      '<p class="empty-state">No todos yet. Add one to get started!</p>';
  } else {
    itemsArray.forEach((item) => {
      const itemElement = createSingleItem(item);
      itemsContainer.appendChild(itemElement);
    });
  }

  container.appendChild(itemsContainer);
  return container;
}
