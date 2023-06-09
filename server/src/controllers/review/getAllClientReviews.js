const { Review } = require("../../db");

async function getAllClientReviews(id) {
  const allClientReviews = await Review.findAll({
    where: { ClientId: id },
    paranoid: true,
  });

  return allClientReviews;
}

module.exports = getAllClientReviews;
