require("dotenv").config();
const { DB_USER, DB_PASSWORD, DB_HOST, DB_NAME, DB_PORT, POSTGRES_URL } = process.env;
const pg = require('pg');
const { Sequelize } = require("sequelize");

const ClientModel = require("./models/Client");
const ProductModel = require("./models/Product");
const OrderModel = require("./models/Order");
const FacturaModel = require("./models/Factura");
const AdminModel = require("./models/Admin");
const ReviewModel = require("./models/Review");
const FavoriteModel = require("./models/Favorite");
const PageReviewModel = require("./models/PageReview");

const sequelize = new Sequelize(
  //`postgres://${DB_USER}:${DB_PASSWORD}@${DB_HOST}/VeganWorld`,
  // `postgres://${DB_USER}:${DB_PASSWORD}@${DB_HOST}:${DB_PORT}/${DB_NAME}`,
  POSTGRES_URL,
  {
    logging: false, // set to console.log to see the raw SQL queries
    native: false, // lets Sequelize know we can use pg-native for ~30% more speed
    dialectModule: pg,
  }
);

ClientModel(sequelize);
ProductModel(sequelize);
OrderModel(sequelize);
FacturaModel(sequelize);
AdminModel(sequelize);
ReviewModel(sequelize);
FavoriteModel(sequelize);
PageReviewModel(sequelize);

const { Client, Product, Order, Factura, Review, PageReview, Favorite } =
  sequelize.models;

Client.hasMany(Order);
Order.belongsTo(Client);

Product.belongsToMany(Order, {
  through: "product_order",
  foreignKey: "product_id",
  as: "orders",
});
Order.belongsToMany(Product, {
  through: "product_order",
  foreignKey: "order_id",
  as: "products",
});

Order.belongsTo(Factura);
Factura.hasOne(Order);

Client.hasMany(Factura);
Factura.belongsTo(Client);

Product.hasMany(Review);
Review.belongsTo(Product);

Client.hasMany(Review);
Review.belongsTo(Client);

Client.hasMany(Favorite);
Favorite.belongsTo(Client, { foreignKey: "client_id" });

Product.hasMany(Favorite);
Favorite.belongsTo(Product, { foreignKey: "product_id" });

Client.hasMany(PageReview);
PageReview.belongsTo(Client);

module.exports = {
  ...sequelize.models,

  conn: sequelize,
};
