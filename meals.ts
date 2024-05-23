
console.log("hello world")

const axios = require('axios');

async function getMealsByFirstLetter(letter) {
    try {
        const response = await axios.get(`https://www.themealdb.com/api/json/v1/1/search.php?f=${letter}`);//fetching the API "list all meals by first letter"
        return response.data.meals; // Showing the list of meals
    } catch (error) {
        console.error('Error fetching meal data:', error);
        return null;
    }
}

// Restructuring function
async function restructureData(letter) {
    const meals = await getMealsByFirstLetter(letter);
    if (!meals) return null;

    const restructuredData = meals.map(meal => {
        // get the title of meal
        const title = meal.strMeal;

        // Creating a list of ingredients
        const ingredientsList = [];
        // loop through the lists
        for (let i = 1; i <= 20; i++) {
            const ingredient = meal[`strIngredient${i}`];
            const measure = meal[`strMeasure${i}`];
            // if there is ingredient and measurments, put them in the list
            if (ingredient && measure) {
                ingredientsList.push(`${measure.trim()} ${ingredient.trim()}`);
            }
        }

        // Get the title and the ingredient list
        return { title, ingredients: ingredientsList };
    });

    return restructuredData;
}

// restructuring the data and getting the meals starting with "g" and the ingredients
restructureData('g')
    .then(data => {
        if (data) {
            data.forEach(item => {
                console.log(item.title);
                console.log("Ingredients:");
                item.ingredients.forEach(ingredient => {
                    console.log("- " + ingredient);
                });
                console.log("\n");
            });
        }
    });









