// 模型复用
import { sequelize } from "@/utils/sql";
import { DataTypes, Model } from 'sequelize'

class MyModel extends Model {
  declare ll_id: string;        // 数据ID
  declare ll_userid: string;    // 所有者用户ID
  declare ll_score: number;     // 分数
  declare ll_remark: string;    // 备注
  declare ll_date: Date;        // 日期
  declare ll_createdTime: Date; // 创建时间
  declare ll_updatedTime: Date; // 更新时间
};

MyModel.init({
  ll_id: {
    type: DataTypes.BIGINT,
    primaryKey: true,
    autoIncrement: true,
  },
  ll_userid: {
    type: DataTypes.BIGINT,
    allowNull: false,
  },
  ll_score: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  ll_remark: {
    type: DataTypes.TEXT,
  },
  ll_date: {
    type: DataTypes.DATEONLY,
    allowNull: false
  },
  ll_createdTime: {
    type: DataTypes.DATE,
    allowNull: false,
  },
  ll_updatedTime: {
    type: DataTypes.DATE,
    allowNull: false
  },
}, {
  tableName: 'll_users',
  sequelize
})
MyModel.sync()

export default MyModel;