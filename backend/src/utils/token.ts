import { redisClient } from "./redis"
import { verifyToken } from "./token_util";

// 验证token
export function tokenVerify(token: string, username: string) {
  return (async () => {
    try {
      const reply = await redisClient.get(`${username}\t${token}`);
      if (reply == null) {
        return Promise.reject({msg: "Not found"});
      } else {
        try {
          await verifyToken(token);
          return Promise.resolve(true);
        } catch(e) {
          Promise.reject(e);
        }
      }
    } catch (error) {
      return Promise.reject({ msg: "Error for Redis" });
    }
  })();
}

// 添加token
export function tokenAdd(token: string, username: string) {
  return redisClient.set(`${username}\t${token}`, 1);
}

// 删除token
export function tokenDelete(token: string, username: string) {
  return redisClient.del(`${username}\t${token}`);
}