const db = require("../data/dbConfig.js");
const config = require("../config.json");
module.exports = {
  find,
  findAll,
  findBy,
  add
};

function find(id) {
  return db
    .select()
    .table("users")
    .where({ id })
    .first();
}
function findBy(user) {
  return db
    .select()
    .table("users")
    .where(user)
    .first();
}
function findAll() {
  return db.select().table("users");
}
async function add(user) {
  let [id] = await db.table("users").insert(user);
  let data = await find(id);
  return data;
}
