const SchemaUser = {
  name: String,
  email: String,
  password: String,
  updated_at: Date,
  created_at: Date,
};

export default SchemaUser;

// import { Sequelize, DataTypes } from "sequelize";
// const sequelize = new Sequelize({
//   host: process.env.DB_HOST || "localhost",
//   dialect: "mysql" || "mysql2",
// });

// const SchemaUser = sequelize.define(
//   "SchemaUser",
//   {
//     name: {
//       type: DataTypes.STRING,
//       allowNull: false,
//     },
//     email: {
//       type: DataTypes.STRING,
//       allowNull: false,
//     },
//     password: {
//       type: DataTypes.STRING,
//       allowNull: false,
//     },
//   },
//   {
//     timestamps: true,
//   }
// );

// module.exports = SchemaUser;
// export default SchemaUser;
