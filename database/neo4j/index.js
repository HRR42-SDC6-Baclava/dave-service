const neo4j = require('neo4j-driver');
const faker = require('faker');

const driver = neo4j.driver(
  'bolt://localhost:7687',
  neo4j.auth.basic('neo4j','hrr42')
)

module.exports = driver;
process.on('exit', function(code) {
  driver.close()
  process.exit()
});
