$(document).ready(function() {

	$('form').on('submit', function(event) {
		event.preventDefault();
	});

	var searchTerm = "";

	$('#search-button').on('click', function() {

		$('#search-field').addClass('fade');
		$('#results').show(500);
		$('#search-button').addClass('hidden');
		$('#search-again-button').removeClass('hidden');

		searchTerm = $('#search-field').val();
		$.get('https://www.thecocktaildb.com/api/json/v1/1/search.php?s=' + searchTerm, function(drinksObj) {

			if(!drinksObj.drinks) {
				$('#results').append('<div class="drink">No drinks found.</div>');
				return;
			}

			console.log(drinksObj);

			for (i = 0; i < drinksObj.drinks.length; i++) {

				var currDrink = drinksObj.drinks[i];

				var drinkTile = '<div class="drink">';

				drinkTile += '<h4>' + currDrink['strCategory'] + '</h4>';
				drinkTile += '<h1>' + currDrink['strDrink'] + '</h1>';
				drinkTile += '<img src="' + currDrink['strDrinkThumb'] + '">';
				drinkTile += '<h2>Instructions:</h2>';
				drinkTile += '<p>' + currDrink['strInstructions'] + '</p>';
				drinkTile += '<h2>Ingredients:</h2>';
				drinkTile += '<div class="ingredients">';

				var listMeasures = '<div class="list"><ul>';
				var listIngredients = '<div class="list"><ul>';

				for (var key in currDrink) {

					var value = currDrink[key];

					if (key.includes("strMeasure") && value != null && value.trim() != "") {
						listMeasures += '<li>' + value + '</li>';
					}
					if (key.includes("strIngredient") && value != null && value.trim() != "") {
						listIngredients += '<li>' + value + '</li>';
					}
				}

				listMeasures += '</div></ul>';
				listIngredients += '</div></ul>';

				drinkTile += listMeasures + listIngredients;
				drinkTile += '</div></div>';

				$('#results').append(drinkTile);
			}
		})
	});

	$('#search-again-button').on('click', function() {

		$('#search-field').removeClass('fade');
		$('#search-field').val("");

		$('#results').hide(500);
		$('#results').html("");

		$('#search-button').removeClass('hidden');
		$('#search-again-button').addClass('hidden');
	});
});
