


const loreEntries = [
  {
    left: "📖 Chapter 1: The Awakening\n\nIn the beginning, the Sage emerged from the Aether, cloaked in silence and knowledge unspoken.",
    right: "🌌 The world of Eldrath shimmered with ancient runes. Only those who listened beyond the veil could hear the whisper of forgotten gods."
  },
  {
    left: "🔥 Chapter 2: The First Flame\n\nThe sacred pyres burned to cleanse the corruption of forgotten time.",
    right: "🕯️ From the embers rose memories — each spark a life once lived, now recorded in the Sage’s boundless tome."
  },
  // Additional entries can be added here
];

let currentPageIndex = 0;

const leftPage = document.getElementById('lore-entry-left');
const rightPage = document.getElementById('lore-entry-right');
const prevButton = document.getElementById('prev-page');
const nextButton = document.getElementById('next-page');

function renderPage(index) {
  const entry = loreEntries[index];
  leftPage.textContent = entry.left;
  rightPage.textContent = entry.right;

  prevButton.disabled = index === 0;
  nextButton.disabled = index === loreEntries.length - 1;
}

prevButton.addEventListener('click', () => {
  if (currentPageIndex > 0) {
    currentPageIndex--;
    renderPage(currentPageIndex);
  }
});

nextButton.addEventListener('click', () => {
  if (currentPageIndex < loreEntries.length - 1) {
    currentPageIndex++;
    renderPage(currentPageIndex);
  }
});

// Initial render
renderPage(currentPageIndex);