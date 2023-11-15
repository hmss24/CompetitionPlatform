// 返回信息提示表，之后可以考虑i18n

export default {
  UNKNOWN_ERROR: '未知错误',
  NETWORK_ERROR: '网络错误',
  ARGUMENTS_LEAK: '参数确实',

  TOKEN_UNDEFINED: '您无权限操作此区域',
  TOKEN_OUTDATE: '登录信息已过期，请重新登录',

  REGISTER_SUCCESS: '注册成功',
  REGISTER_FAILED_USERNAME_EXISTING: '注册失败，用户名已存在',
  REGISTER_FAILED_PASSWORD_ILLEGAL: '注册失败，密码非法', 
  REGISTER_FAILED_USERNAME_ILLEGAL: '注册失败，用户名非法',
  REGISTER_FAILED_NICKNAME_ILLEGAL: '注册失败，昵称非法',
  REGISTER_FAILED_NULL_ARGUMENT: '注册失败，参数缺失',
  REGISTER_FAILED_UNKNOWN: '注册失败，未知原因',

  LOGIN_SUCCESS: '登录成功',
  LOGIN_FAILED_USERNAME_NONEXIST: '登录失败，用户名不存在',
  LOGIN_FAILED_PASSWORD_INVALID: '登录失败，密码无效',
  LOGIN_FAILED_PASSWORD_INCORRECT: '登录失败，密码错误',
  LOGIN_FAILED_UNKNOWN: '登录失败，未知原因',

  LOGOUT_SUCCESS: '注销成功',

  PASSWD_SUCCESS: '修改密码成功',
  PASSWD_FAILED_PASSWORD_ILLEGAL: '修改密码失败，密码非法',
  PASSWD_FAILED_UNKNOWN: '修改密码失败，未知原因',

  DATA_CATEGORY_UNKNOWN: '数据类别未知',
  DATA_BAD_FORMAT: '数据格式错误',
  DATA_USER_NO_PERMISSION: '用户无权操作数据',
  DATA_USER_NO_EXIST: '用户不存在',
  DATA_FAILED_UNKNOWN: '数据操作失败，未知原因',
  DATA_ADD_SUCCESS: '数据添加成功',
};