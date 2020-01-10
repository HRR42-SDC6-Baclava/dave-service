const neo4j = require('neo4j-driver');
const faker = require('faker');
const un = process.env.DB_USER;
const pw = process.env.DB_PASS
const host = process.env.DB_HOST
const driver = neo4j.driver(
  host,
  neo4j.auth.basic(un,pw)
)

module.exports = driver;
process.on('exit', function(code) {
  driver.close()
  process.exit()
});
