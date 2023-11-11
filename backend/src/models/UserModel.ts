import { sequelize } from "@/utils/sql";
import { Model, DataTypes } from "sequelize"

// 用户表模型
class UserModel extends Model {
  declare ll_id : string;          // 用户ID（自增）
  declare ll_username: string;     // 用户名（唯一）
  declare ll_nickname: string;     // 用户昵称
  declare ll_password: string;     // 密码
  declare ll_email?: string;       // 邮箱
  declare ll_description?: string; // 描述
  declare ll_permission?: string;  // 权限
  declare ll_createdTime: Date;    // 创建时间
  declare ll_updatedTime: Date;    // 修改时间
}

UserModel.init({
  ll_id: {
    type: DataTypes.BIGINT,
    primaryKey: true,
    autoIncrement: true,
  },
  ll_username: {
    type: DataTypes.STRING,
    primaryKey: true,
    autoIncrement: false,
  },
  ll_nickname: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  ll_password: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
  ll_email: {
    type: DataTypes.STRING,
  },
  ll_description: {
    type: DataTypes.TEXT,
  },
  ll_permission: {
    type: DataTypes.TEXT,
  },
  ll_createdTime: {
    type: DataTypes.DATE,
    allowNull: false,
  },
  ll_updatedTime: {
    type: DataTypes.DATE,
    allowNull: false,
  }
}, {
  tableName: 'll_users',
  sequelize
});

UserModel.sync();

export default UserModel;