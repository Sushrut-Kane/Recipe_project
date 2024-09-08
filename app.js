document.getElementById("addItemButton").addEventListener("click", function () {
  const itemInput = document.getElementById("itemInput");
  const itemList = document.getElementById("itemList");

  const newItem = itemInput.value.trim();
  if (newItem !== "") {
    const listItem = document.createElement("li");
    listItem.textContent = newItem;
    itemList.appendChild(listItem);
    itemInput.value = "";
  } else {
    alert("Please enter an item");
  }
});

document
  .getElementById("findRecipesButton")
  .addEventListener("click", function () {
    const items = Array.from(
      document.getElementById("itemList").getElementsByTagName("li")
    )
      .map((li) => li.textContent.trim())
      .join(",");

    if (items === "") {
      alert("Please add some ingredients");
      return;
    }

    const apiKey = "a38a8ce83b5845ca90891240973338b4"; // Replace with your Spoonacular API key
    const apiUrl = `https://api.spoonacular.com/recipes/findByIngredients?ingredients=${items}&number=5&apiKey=${apiKey}`;

    fetch(apiUrl)
      .then((response) => response.json())
      .then((data) => {
        const recipesDiv = document.getElementById("recipes");
        recipesDiv.innerHTML = ""; // Clear previous results

        if (data.length === 0) {
          recipesDiv.innerHTML =
            "<p>No recipes found. Try different ingredients!</p>";
        } else {
          data.forEach((recipe) => {
            const recipeDiv = document.createElement("div");
            recipeDiv.classList.add("recipe");

            const recipeTitle = document.createElement("h3");
            recipeTitle.textContent = recipe.title;

            const recipeImage = document.createElement("img");
            recipeImage.src = recipe.image;
            recipeImage.alt = recipe.title;
            recipeImage.style.width = "100%";
            recipeImage.style.borderRadius = "5px";

            recipeDiv.appendChild(recipeTitle);
            recipeDiv.appendChild(recipeImage);

            recipesDiv.appendChild(recipeDiv);
          });
        }
      })
      .catch((error) => {
        console.error("Error fetching recipes:", error);
        alert("Something went wrong. Please try again later.");
      });
  });
