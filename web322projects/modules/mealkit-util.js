const mealkits = [

{
title: "Signature Malatang Broth",
includes: "Sichuan Peppercorn Broth",
description: "Spicy customizable Chinese hotpot.",
category: "Classic Meals",
price: 19.99,
cookingTime: 10,
servings: 1,
imageUrl: "/images/malatang.jpg",
featuredMealKit: true
},

{
title: "Tom Yum Broth",
includes: "Thai Tom Yum Broth",
description: "Spicy and sour Thai hotpot.",
category: "Classic Meals",
price: 20.99,
cookingTime: 10,
servings: 1,
imageUrl: "/images/tom yom.jpg",
featuredMealKit: true
},

{
title: "Miso broth",
includes: "Japanese Miso Broth",
description: "Rich and savory Japanese miso hotpot.",
category: "Classic Meals",
price: 18.99,
cookingTime: 12,
servings: 1,
imageUrl: "/images/miso.jpg",
featuredMealKit: false
},

{
title: "Sukiyaki broth",
includes: "Sweet Soy Broth",
description: "Traditional Japanese sukiyaki experience.",
category: "Sweet Soup",
price: 22.99,
cookingTime: 7,
servings: 2,
imageUrl: "/images/sukiyaki.jpg",
featuredMealKit: true
},

{
title: "Mushroom Vegan Broth",
includes: "Mushroom Vegetable Broth",
description: "Healthy vegan mushroom hotpot.",
category: "Vegan Meals",
price: 17.99,
cookingTime: 10,
servings: 1,
imageUrl: "/images/mushroomvegan.jpg",
featuredMealKit: false
},

{
title: "Tomato broth",
includes: "Tomato seasoning",
description: "Tangy and comforting tomato hotpot.",
category: "Vegan Meals",
price: 17.99,
cookingTime: 10,
servings: 1,
imageUrl: "/images/tomato.png",
featuredMealKit: false
}

];



// FUNCTIONS

function getAllMealKits() {

return mealkits;

}


function getFeaturedMealKits(mealkits) {

return mealkits.filter(meal => meal.featuredMealKit);

}


function getMealKitsByCategory(mealkits) {

const categories = [];

mealkits.forEach(meal => {

let category = categories.find(cat =>
cat.categoryName === meal.category
);

if (!category) {

category = {
categoryName: meal.category,
mealKits: []
};

categories.push(category);

}

category.mealKits.push(meal);

});

return categories;

}


module.exports = {

getAllMealKits,
getFeaturedMealKits,
getMealKitsByCategory

};
