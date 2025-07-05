
require("dotenv").config();

module.exports = {
  app: {
    port: process.env.PORT || 4000,
  },
  mysql: {
    host: process.env.MYSQL_HOST || "localhost",
    user: process.env.MYSQL_USER || "root",
    password: process.env.MYSQL_PASSWORD || "Colombia2025+...",
    db: process.env.MYSQL_DB || "laruta",
  },
  emailHost: "smtp.gmail.com",
  emailPort: 587,
  emailUser: "jhohantma@gmail.com",
  emailPass: "ojzarzmoxuokvjhv",
  claveSecreta: "larutaJKYCSCRUM2",
  dominio: "http://localhost:4000"
};


//   nwzwbafdqbwqtbcb laruta
// ojzarzmoxuokvjhv actividades