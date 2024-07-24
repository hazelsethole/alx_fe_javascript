let quotes = [
    { text: "The best way to predict the future is to invent it.", category: "Inspiration" },
    { text: "Life is 10% what happens to us and 90% how we react to it.", category: "Motivation" }
  ];
  
  document.getElementById('newQuote').addEventListener('click', showRandomQuote);
  
  function showRandomQuote() {
    const randomIndex = Math.floor(Math.random() * quotes.length);
    const quote = quotes[randomIndex];
    document.getElementById('quoteDisplay').innerText = `"${quote.text}" - ${quote.category}`;
  }
  
  function addQuote() {
    const newQuoteText = document.getElementById('newQuoteText').value;
    const newQuoteCategory = document.getElementById('newQuoteCategory').value;
    
    if (newQuoteText && newQuoteCategory) {
      quotes.push({ text: newQuoteText, category: newQuoteCategory });
      document.getElementById('newQuoteText').value = '';
      document.getElementById('newQuoteCategory').value = '';
      alert('New quote added!');
    } else {
      alert('Please enter both quote and category.');
    }
  }
  window.onload = function() {
    loadQuotes();
    showRandomQuote();
  };
  
  function saveQuotes() {
    localStorage.setItem('quotes', JSON.stringify(quotes));
  }
  
  function loadQuotes() {
    const storedQuotes = localStorage.getItem('quotes');
    if (storedQuotes) {
      quotes = JSON.parse(storedQuotes);
    }
  }
  
  function addQuote() {
    const newQuoteText = document.getElementById('newQuoteText').value;
    const newQuoteCategory = document.getElementById('newQuoteCategory').value;
    
    if (newQuoteText && newQuoteCategory) {
      quotes.push({ text: newQuoteText, category: newQuoteCategory });
      saveQuotes();
      document.getElementById('newQuoteText').value = '';
      document.getElementById('newQuoteCategory').value = '';
      alert('New quote added!');
    } else {
      alert('Please enter both quote and category.');
    }
  }
  const serverUrl = 'https://jsonplaceholder.typicode.com/posts'; // Example API endpoint

  function fetchFromServer() {
    fetch(serverUrl)
      .then(response => response.json())
      .then(data => {
        // Simulate merging server data with local data
        const serverQuotes = data.map(item => ({ text: item.body, category: 'Server' }));
        quotes = [...quotes, ...serverQuotes];
        saveQuotes();
      });
  }
  
  setInterval(fetchFromServer, 10000); // Fetch new data every 10 seconds
  function resolveConflicts(serverQuotes) {
    const localQuotesMap = new Map(quotes.map(quote => [quote.text, quote]));
    serverQuotes.forEach(quote => {
      if (!localQuotesMap.has(quote.text)) {
        quotes.push(quote);
      }
    });
    saveQuotes();
  }
  
  function fetchFromServer() {
    fetch(serverUrl)
      .then(response => response.json())
      .then(data => {
        const serverQuotes = data.map(item => ({ text: item.body, category: 'Server' }));
        resolveConflicts(serverQuotes);
      });
  }
    