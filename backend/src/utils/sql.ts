import Sequelize from 'sequelize';

// 数据库相关API

// 用户名
const sequelize_username = "competiton_root";
// 密码
const sequelize_password = "competiton_root";
// 数据库名
const sequelize_database = 'competition_platform';
// 数据库主机地址
const sequelize_host = 'localhost';
// 数据库主机端口
const sequelize_port = 5432;
// 数据库类型（这里使用PostgreSQL）
const sequelize_dialect = "postgres";

export const sequelize = new Sequelize.Sequelize(
  sequelize_database,
  sequelize_username,
  sequelize_password,
  {
    host: sequelize_host,
    port: sequelize_port,
    dialect: sequelize_dialect,
    pool: { max: 5, min: 0, acquire: 3000, idle: 10000 },
    define: { timestamps: false } // 不自动生成时间
  }
);

export const seqOp = Sequelize.Op;
