import express from 'express'
import tips from '@/utils/tips'
import UserModel from '@/models/UserModel'
import errorcode from '@/utils/errorcode'
import { decryptAES, encryptAES, generateToken } from '@/utils/token_util'
import { tokenAdd, tokenDelete } from '@/utils/token'

const router = express.Router();

// 注册功能[POST]
router.post('/signup', async (request, response) => {
  const { ll_username, ll_nickname, ll_password }: {
    ll_username: string | null,
    ll_nickname: string | null,
    ll_password: string | null,
  } = request.body;

  // 检查字段是否合法
  if (ll_username == null || ll_nickname == null || ll_password == null) {
    return response.json({ code: errorcode.ARGUMENTS_LEAK, msg: tips.ARGUMENTS_LEAK });
  }
  if (ll_username.length < 1
    || ll_username.length > 50
    || ll_username.search(/[\p{C}\p{Z}\p{M}\p{P}\p{S}]/u) != -1) {
    return response.json({ code: errorcode.USER_REGISTER_FAILED, msg: tips.REGISTER_FAILED_USERNAME_ILLEGAL });
  }
  if (ll_password.length < 8
    || ll_password.length > 50
    || /^[ -~]+$/.test(ll_password) == false
    || ll_password.search(/[A-Z]/) == -1
    || ll_password.search(/[a-z]/) == -1
    || ll_password.search(/[0-9]/) == -1
  ) {
    return response.json({ code: errorcode.USER_REGISTER_FAILED, msg: tips.REGISTER_FAILED_PASSWORD_ILLEGAL });
  }
  if (ll_nickname.length < 1 || ll_nickname.length > 50) {
    return response.json({ code: errorcode.USER_REGISTER_FAILED, msg: tips.REGISTER_FAILED_NICKNAME_ILLEGAL });
  }

  try {
    const datavalue = await UserModel.findOne({ where: { ll_username } });
    if (datavalue != null) {
      return response.json({ code: errorcode.USER_REGISTER_EXIST, msg: tips.REGISTER_FAILED_USERNAME_EXISTING });
    }
  } catch (e) {
    return response.json({ code: errorcode.NETWORK_ERROR, msg: tips.NETWORK_ERROR })
  }

  const HASH_STRING = encryptAES(ll_password);
  const ll_id = new Date().getTime();
  try {
    await UserModel.create({
      ll_id,
      ll_username,
      ll_password: HASH_STRING,
      ll_nickname: ll_nickname,
      ll_createdTime: new Date(),
      ll_updatedTime: new Date()
    });
    return response.json({ code: errorcode.SUCCESS, msg: tips.REGISTER_SUCCESS });
  } catch (e) {
    return response.json({ code: errorcode.USER_REGISTER_FAILED, msg: tips.REGISTER_FAILED_UNKNOWN });
  }
});

// 登录功能[POST]
router.post('/login', async (request, response) => {
  const { ll_username, ll_password }: {
    ll_username: string | null,
    ll_password: string | null,
  } = request.body;

  if (ll_username == null || ll_password == null) {
    return response.json({ code: errorcode.ARGUMENTS_LEAK, msg: tips.ARGUMENTS_LEAK });
  }

  try {
    const datavalue = await UserModel.findOne({ where: { ll_username } });
    if (datavalue != null) {
      const stored_password = decryptAES(datavalue.ll_password);
      if (stored_password === ll_password) {
        try {
          const token = await generateToken({ ll_username }, '24h');
          response.setHeader('token', token);
          response.setHeader('username', ll_username);
          response.setHeader('Access-Control-Expose-Headers', `token,username`);
          tokenAdd(token, ll_username);
          return response.json({ code: 200, msg: tips.LOGIN_SUCCESS, nickname: datavalue.ll_nickname });
        } catch (e) {
          console.log(e);
          return response.json({ code: errorcode.USER_LOGIN_ERROR, msg: tips.LOGIN_FAILED_UNKNOWN });
        }
      } else {
        return response.json({ code: errorcode.USER_LOGIN_ERROR, msg: tips.LOGIN_FAILED_PASSWORD_INCORRECT });
      }
    } else {
      return response.json({ code: errorcode.UNKNOWN, msg:tips.UNKNOWN_ERROR });
    }
  } catch (e) {
    return response.json({ code: errorcode.USER_LOGIN_ERROR, msg: tips.LOGIN_FAILED_UNKNOWN });
  }
});

// 注销功能[DELETE]
router.delete("/logout", async (request, response) => {
  try {
    await tokenDelete(request.get('token'), request.get('username'));
    return response.json({ code: errorcode.SUCCESS, msg: tips.LOGOUT_SUCCESS });
  } catch (e) {
    return response.json({ code: errorcode.UNKNOWN, msg: tips.UNKNOWN_ERROR });
  }
});

// 修改密码[POST]
router.post("/passwd", async (request, response) => {
  const { ll_password } = request.body;

  // 检查字段是否合法
  if (ll_password == null) {
    return response.json({ code: errorcode.ARGUMENTS_LEAK, msg: tips.ARGUMENTS_LEAK });
  }
  if (ll_password.length < 8
    || ll_password.length > 50
    || /^[ -~]+$/.test(ll_password) == false
    || ll_password.search(/[A-Z]/) == -1
    || ll_password.search(/[a-z]/) == -1
    || ll_password.search(/[0-9]/) == -1
  ) {
    return response.json({ code: errorcode.USER_PASSWD_ERROR, msg: tips.PASSWD_FAILED_PASSWORD_ILLEGAL });
  }

  const HASH_STRING = encryptAES(ll_password);
  try {
    const datavalue: any = await UserModel.update({ ll_password, ll_updatedTime: new Date() },
      { where: { ll_username: request.get('username') } });
    return response.json({ code: errorcode.SUCCESS, msg: tips.PASSWD_SUCCESS });
  } catch (e) {
    return response.json({ code: errorcode.USER_PASSWD_ERROR, msg: tips.PASSWD_FAILED_UNKNOWN });
  }
});

export default router;
