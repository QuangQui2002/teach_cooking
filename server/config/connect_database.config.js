
const logger = require('./logger.config');
const dotenv = require('dotenv');
const { Sequelize } = require('sequelize');
const EnumMessage = require('../common/enums/enum_message');
dotenv.config();
class Database {

    constructor() {
        if (!Database.instance) {
            this.sequelize = new Sequelize(process.env.DB_DATABASE, process.env.DB_USER, process.env.DB_PASSWORD, {
                dialect: process.env.DIALECT,
                host: process.env.DB_HOST,
                port: process.env.PORT,
                pool: {
                    max: 15, // số connection tối đa trong pool
                    min: 0, // số connection tối thiểu trong pool
                    acquire: 120000, // thời gian tối đa để lấy được một connection từ pool (đơn vị là milliseconds)
                    idle: 10000 // thời gian tối đa một connection có thể ở trong pool mà không được sử dụng (đơn vị là milliseconds)
                },
                dialectOptions: {
                    connectTimeout: 120000 // 60s - thời gian chờ kết nối tới MySQL
                },
                logging: (msg) => logger.info(msg)
            });
            this.pool = this.sequelize;
            Database.instance = this;
        }
        return Database.instance;
    }
    async connectDatabase() {
        try {
            await this.sequelize.authenticate();
        } catch (error) {
            logger.error(error);
            throw new Error(EnumMessage.UNABLE_CONNECT_DATABASE);
        }
    }
    getPool() {
        return this.sequelize;
    }
}
module.exports = new Database();
