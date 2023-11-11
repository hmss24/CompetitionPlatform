// 错误代码表，这张表应当与后端同步
const errorcode = {
  SUCCESS: 200,
  UNKNOWN: -1,
  NETWORK_ERROR: -2,
  ARGUMENTS_LEAK: -3,

  TOKEN_FAILED: -101,
  TOKEN_OUTDATE: -201,

  USER_REGISTER_EXIST: -201,
  USER_REGISTER_FAILED: -202,
  USER_LOGIN_ERROR: -221,
  USER_PASSWD_ERROR: -241,
};

export default errorcode;