const driver = require('./index.js')

const db = {
  get: (id, done) => {
    let query = 'Match(:Restaurant {id: $id})--(article:Article) ' +
                'RETURN {articles: collect(article{.id, .image, .title, .body})}'
    const session = driver.session()
    session.run(query, {id})
      .then(results => {
        session.close();
        results = results.records[0]._fields[0].articles
        for (let i = 0; i < results.length; i++) {
          results[i].id = results[i].id.low;
        }
        done(null, results);
      })
      .catch(err => {
        done(err);
      })
      .finally(ignore => {
        session.close();
      });

  },

}

module.exports = db;