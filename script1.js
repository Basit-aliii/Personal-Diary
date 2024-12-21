// Select elements
const journalInput = document.getElementById('journalInput');
const saveButton = document.getElementById('saveButton');
const entriesList = document.getElementById('entriesList');

// Load previous entries from localStorage
document.addEventListener('DOMContentLoaded', loadEntries);

// Function to save the entry to localStorage
saveButton.addEventListener('click', () => {
  const entryText = journalInput.value.trim();
  if (entryText) {
    const currentDate = getCurrentDate();  // Get the current date and day
    saveEntry(entryText, currentDate);
    journalInput.value = '';  // Clear the textarea
    displayEntry(entryText, currentDate);  // Display the entry with date and day
  }
});

// Function to load previous entries
function loadEntries() {
  const savedEntries = JSON.parse(localStorage.getItem('entries')) || [];
  savedEntries.forEach(entry => {
    displayEntry(entry.text, entry.date);  // Load both text and date
  });
}

// Function to save the entry to localStorage
function saveEntry(entryText, currentDate) {
  const savedEntries = JSON.parse(localStorage.getItem('entries')) || [];
  savedEntries.push({ text: entryText, date: currentDate });  // Save both text and date
  localStorage.setItem('entries', JSON.stringify(savedEntries));
}

// Function to display a single entry in the list (added to the top)
function displayEntry(entryText, currentDate) {
  const li = document.createElement('li');
  
  // Create a div for the entry text
  const textDiv = document.createElement('div');
  textDiv.textContent = entryText;
  
  // Create a div for the date and day
  const dateDiv = document.createElement('div');
  dateDiv.classList.add('entryDate');
  dateDiv.textContent = currentDate;  // Display the date and day

  // Create a delete button
  const deleteButton = document.createElement('button');
  deleteButton.textContent = 'Delete';
  deleteButton.classList.add('deleteButton');
  
  // When the delete button is clicked, remove the entry from the list and localStorage
  deleteButton.addEventListener('click', () => {
    li.remove();  // Remove the entry from the display
    deleteEntry(entryText, currentDate);  // Remove the entry from localStorage
  });

  // Append the text, date, and delete button to the list item
  li.appendChild(textDiv);
  li.appendChild(dateDiv);
  li.appendChild(deleteButton);
  
  // Add the list item to the beginning of the entries list (prepending)
  entriesList.insertBefore(li, entriesList.firstChild); // Insert at the top
}

// Function to remove an entry from localStorage
function deleteEntry(entryText, currentDate) {
  let savedEntries = JSON.parse(localStorage.getItem('entries')) || [];
  savedEntries = savedEntries.filter(entry => !(entry.text === entryText && entry.date === currentDate));  // Remove the entry
  localStorage.setItem('entries', JSON.stringify(savedEntries));  // Save the updated list back to localStorage
}

// Function to get the current date and day
function getCurrentDate() {
  const now = new Date();
  const daysOfWeek = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
  const dayName = daysOfWeek[now.getDay()];
  const date = now.toLocaleDateString();
  return `${dayName}, ${date}`;
}
