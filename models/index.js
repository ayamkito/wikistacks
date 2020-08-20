const Sequelize = require("sequelize");
const db = new Sequelize("wikistack", "kakwo", "password", {
    dialect: "postgres",
    logging: false,
});


const Page = db.define("page", {
    title: {
        type: Sequelize.STRING,
        allowNull: false
    },
    slug: {
        type: Sequelize.STRING,
        allowNull: false
    },
    content: {
        type: Sequelize.TEXT,
        allowNull: false
    },
    status: {
        type: Sequelize.ENUM("open", "closed")
    }
});
const User = db.define("user", {
    name: {
        type: Sequelize.STRING,
        allowNull: false,
    },
    email: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true,
        validate: {
            isEmail: true,
        }
    }
});
module.exports = { db, Page, User};