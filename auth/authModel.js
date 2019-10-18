const db = require("../database/dbConfig");

module.exports = { add };

function add(user) {
  return db("credentials")
    .insert(user, "id")
    .then(ids => {
      const [id] = ids;
      return findById(id);
    });
}
