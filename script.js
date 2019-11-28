const container = document.getElementById("jokes");
const jokeContainer = document.getElementById("joke");

function random() {
  fetch(`https://api.chucknorris.io/jokes/random`)
    .then(response => {
      return response.json();
    })
    .then(json => {
      // Insert the joke string into the predifened HTML container
      jokeContainer.innerHTML = "<blockquote>" + json.value + "</blockquote>";
    });
}

// Fetch all the categories via API
fetch(`https://api.chucknorris.io/jokes/categories`)
  .then(response => {
    return response.json();
  })
  .then(json => {
    const categories = json;

    // Creation of buttons dynamically using all the fetched categories
    categories.map(category => {
      const btn = document.createElement("BUTTON"); // Create a <button> element
      btn.innerHTML = category; // Insert text
      btn.addEventListener(
        // Add click event listener to the created button
        "click",
        function() {
          // Fetch a random joke from a specific category
          fetch(`https://api.chucknorris.io/jokes/random?category=${category}`)
            .then(response => {
              return response.json();
            })
            .then(json => {
              // Insert the joke string into the predifened HTML container
              jokeContainer.innerHTML =
                "<blockquote>" + json.value + "</blockquote>";
            });
        },
        false
      );

      // Add the newly created dynamic button into the predifened HTML container
      container.appendChild(btn);
    });
  });
