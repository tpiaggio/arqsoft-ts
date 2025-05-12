import { Sequelize } from 'sequelize';

const sequelize = new Sequelize('sys', 'root', 'secret', {
  host: 'localhost',
  port: 3306,
  dialect: 'mysql'
});

export default sequelize;