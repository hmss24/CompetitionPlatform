// 错误代码表，这部分应当与前端同步
const errorcode = {
  SUCCESS: 200, // 成功
  UNKNOWN: -1, // 未知错误
  NETWORK_ERROR: -2, // 网路错误
  ARGUMENTS_LEAK: -3, // 参数缺失

  TOKEN_FAILED: -101, // Token不存在
  TOKEN_OUTDATE: -201, // Token过期

  USER_REGISTER_EXIST: -201, // 注册时用户已经存在
  USER_REGISTER_FAILED: -202, // 注册失败
  USER_LOGIN_ERROR: -221, // 登录失败
  USER_PASSWD_ERROR: -241, // 登录密码失败

  DATA_CATEGORY_ERROR: -301, // 数据类别失败
  DATA_BAD_FORMAT: -302, // 数据类别格式错误
};

export default errorcode;