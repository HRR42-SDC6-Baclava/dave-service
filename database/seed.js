const faker = require('faker');
const driver = require('./index.js');
const neo4j = require('neo4j-driver');

const addNode = (tx, query, params) => {
  return tx.run(query, params);
}
const createConstraints = async tx => {
  await tx.run('CREATE CONSTRAINT ON (r:Restaurant) ASSERT r.id IS UNIQUE ');
  await tx.run('CREATE CONSTRAINT ON (a:Article) ASSERT a.id IS UNIQUE');
}
const generateRestaurants = async amount => {
  console.log('Generating Restaurants');

  const params = {
    restaurants: [],
  };
  const query = 'UNWIND $restaurants AS res ' +
                'CREATE (r:Restaurant {id: res.id}) ' +
                'WITH r, res.articles AS arts ' +
                'UNWIND arts AS art ' +
                'MERGE (a:Article {id: art.id}) ' +
                'SET a = art ' +
                'WITH a, r ' +
                'MERGE (a)-[m:mentions]->(r) ';

  for (let i = 9400001; i <= amount; i++) {
    let artNum = Math.floor(Math.random() * 3 + 3)
    params.restaurants.push({id: neo4j.int(i), articles: generateArticles(artNum)})
    if (i % batch === 0 || i === amount) {
      await session.writeTransaction(tx => addNode(tx, query, params));
      params.restaurants = [];
      params.articles = [];
    }
  }
}

const generateArticles = amount => {

  const articles = []

  // const query = 'UNWIND $articles AS map ' +
  //               'CREATE (a:Article) ' +
  //               'SET a = map';

  for (let i = 1; i <= amount; i++) {
    const imgId = Math.floor(Math.random() * 1000 + 1);
    articles.push({
      id: neo4j.int(Math.floor(Math.random() * (records * .75))),
      image: `https://picsum.photos/seed/${imgId}/400/600`,
      title: faker.lorem.word(),
      body: faker.lorem.sentence()
    });
  }
  return articles;
}

const records = 10000000;
const batch = 100000;
const arts = Math.floor(records);

const session = driver.session();
session.writeTransaction(tx => createConstraints(tx))
  .then(ignore => {
  let promiseRestaurants = generateRestaurants(records)
  promiseRestaurants.then((ignore) => {
    console.log("Restaurants Created");
    session.close()
    .then(ignore => {
      process.exit();
    })
    .catch(err => {
      console.log(err);
      session.close();
    })
  })
  .catch(err => {
    console.log(err);
  });
});