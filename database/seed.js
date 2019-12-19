const faker = require('faker');
const Restaurant = require('./schema.js');
const db = require('./index.js');


var generateRestaurants = function(numR) {
  var restaurants = [];

  var generateArticles = function(numA) {
    var arts = [];
    for (var i = 0; i<numA; i++) {
      var imgId = Math.floor(Math.random() * 20 + 1);
      var objA = {
        image: `https://creidfecimages.s3-us-west-1.amazonaws.com/photo${imgId}.jpeg`,
        title: faker.lorem.words(),
        body: faker.lorem.paragraphs()
      }
      arts.push(objA);
    }
    return arts;
  }

  for (var j = 0; j<numR; j++) {
    var numArticles = Math.floor(Math.random() * 3) + 3;
    var objR = {
      id: (j + 1),
      articles: null
    }
    objR.articles = generateArticles(numArticles);
    restaurants.push(objR);
  }

  Restaurant.insertMany(restaurants)
    .then(()=> {
      console.log('Restaurants successfully inserted.')
    })
    .catch((err) => {
      console.log(err);
    })
}

generateRestaurants(100);