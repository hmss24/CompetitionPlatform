import Jwt from 'jsonwebtoken';
import CryptoJS from 'crypto-js';
import COOKIE_SESSION from 'express-session';

// 用于生成token的密钥
const key = 'DHU2023ComputationalThinkingGroup9';
// 用于AES加密的密钥
const secret = 'YouGuessWhatSaltISet,Aha?';

const cookie_secret = 'DHU2023ComputationalThinkingGroup9LoginSecret';

// 生成Token（异步）
export function generateToken(payload: object, expiresIn: string | number): Promise<string> {
  return new Promise((resolve, reject) => {
    Jwt.sign(payload, key, { expiresIn }, (err, hash) => {
      err ? reject(err.message) : resolve(hash)
    });
  });
}

// 验证Token（异步）
export function verifyToken(token: string): Promise<{ code: number, msg: String }> {
  return new Promise((resolve, reject) => {
    Jwt.verify(token, key, (err) => {
      if (err) {
        switch (err.name) {
          case 'JsonWebTokenError':
            reject({ code: -999, msg: 'JsonWebTokenError' }); break;
          case 'TokenExpiredError':
            reject({ code: -888, msg: 'TokenExpiredError' }); break;
          default:
            reject({ code: 0, msg: 'UnknownError' }); break;
        }
      } else {
        resolve({ code: 200, msg: 'Success' });
      }
    })
  });
}

// AES加密
export function encryptAES(target: string): string {
  return CryptoJS.AES.encrypt(target, secret).toString();
}

// AES解密
export function decryptAES(target: string): string {
  return CryptoJS.AES.decrypt(target, secret).toString(CryptoJS.enc.Utf8);
}

// Cookie配置
export const cookieInstance = COOKIE_SESSION({
  name: 'express-app-server',
  secret: cookie_secret,
  resave: false,
  saveUninitialized: true,
  cookie: {
    maxAge: 1000 * 60 * 60 * 24, // 有效期一天
  }
});