import express from 'express'
import { redisClient } from './utils/redis';
import { cookieInstance } from './utils/token_util';
const app = express();

import * as path from 'path'
import cors from 'cors'
import tips from './utils/tips';
import errorcode from './utils/errorcode';
import { tokenVerify } from './utils/token';


// Redis服务器
redisClient.connect().catch(error => {
  console.log('Cannot open redis, quiting...');
  process.exit(1);
});
process.on('exit', () => redisClient.quit());

app.use(cookieInstance); // 配置cookie
app.use(express.urlencoded({ extended: false })); // 接受post请求数据
app.use(express.json());

// 资源配置
app.use('/source', express.static(path.resolve(__dirname, '../', 'public')));

// 跨域配置
app.use(cors({
  origin: [
    'http://localhost:3000',
    'http://localhost:8080'
  ],
  credentials: true,
}));

// 白名单（不需要用户登录）
const WHITE_LIST = [
  '/user/login',
  '/user/signup',
  //'/user/logout',
  '/user/delete',
];

// 全局拦截检查Token，白名单中的路由可以直接放行，其余的需要检查登录信息
app.use('*', async (req, resp, next) => {
  const { baseUrl } = req;
  if (WHITE_LIST.includes(baseUrl) || baseUrl.startsWith('/source'))
    return next();
  const { username, token } = req.headers;
  if (username == null || token == null)
    return resp.json({ code: errorcode.TOKEN_FAILED, msg: tips.TOKEN_UNDEFINED });
  try {
    if (token instanceof Array || username instanceof Array) {
      return resp.json({ code: errorcode.TOKEN_FAILED, msg: tips.UNKNOWN_ERROR });
    }
    await tokenVerify(token, username);
    next();
  } catch (e) {
    switch (e.msg) {
      case 'TokenExpiredError':
        return resp.json({ code: errorcode.TOKEN_FAILED, msg: tips.TOKEN_OUTDATE });
      case 'JsonWebTokenError':
        return resp.json({ code: errorcode.TOKEN_FAILED, msg: tips.TOKEN_UNDEFINED });
    }
    return resp.json({ code: errorcode.UNKNOWN, msg: tips.UNKNOWN_ERROR })
  }
});


import userRouter from '@/routes/user'
app.use("/user", userRouter);

app.listen(9001);