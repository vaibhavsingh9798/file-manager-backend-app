const {Sequelize} = require('sequelize')


const {PGDATABASE,PGUSER,PGPASSWORD,PGHOST,ENDPOINT_ID } = process.env
const sequelize = new Sequelize(PGDATABASE,PGUSER,PGPASSWORD,{
    host : PGHOST,
    dialect: 'postgres',
    port: 5432, 
    ssl: 'require',
    dialectOptions: {
        ssl: {
          require: process.env.DB_SSL === 'true',
          rejectUnauthorized: false 
        }
    }
})



sequelize.sync()
  .then(() => {
    console.log('Database & tables created!');
  })
  .catch((err) => console.log('db connection error',err))

module.exports = {
sequelize
};
