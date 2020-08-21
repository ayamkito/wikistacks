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
        allowNull: false,
        defaultValue: "No Content"

    },
    status: {
        type: Sequelize.ENUM("open", "closed")
    }
});
Page.beforeValidate((page)=>{
    page.slug = page.title.replace(/\s+/g, "_").replace(/\W/g, "")
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
Page.belongsTo (User, {as: "author"});
module.exports = { db, Page, User};