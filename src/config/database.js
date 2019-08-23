require('dotenv/config');

function dbConfig() {
  if (process.env.NODE_ENV === 'development') {
    return {
      dialect: 'postgres',
      host: process.env.DB_HOST,
      username: process.env.DB_USER,
      password: process.env.DB_PASS,
      database: process.env.DB_NAME,
      define: {
        timestamps: true,
        underscored: true,
        underscoredAll: true,
      },
    };
  }
  return {
    dialect: 'postgres',
    url: process.env.DATABASE_URL,
    define: {
      timestamps: true,
      underscored: true,
      underscoredAll: true,
    },
  };
}
module.exports = dbConfig();
