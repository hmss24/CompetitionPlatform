'use client'

import Router from "next/router";
import request, { generateHeader } from "./request"
import { AxiosHeaders, AxiosResponse } from "axios";

export interface UserSignupConfig {
  ll_username: string,
  ll_nickname: string,
  ll_password: string,
}

export interface UserLoginConfig {
  ll_username: string,
  ll_password: string,
};

// 检查是否登录
export function isLogin() {
  return localStorage.getItem('username') != null
    && localStorage.getItem('token') != null;
}

// 退出登录
export function quitLogin() {
  localStorage.removeItem('username');
  localStorage.removeItem('token');
  localStorage.removeItem('nickname');
}

// 确认登录，保存登录信息
export function saveLogin(response: AxiosResponse) {
  const header = response.headers;
  if (header instanceof AxiosHeaders
    && header.has('username')
    && header.has('token')
    && response.data.nickname != null
  ) {
    if (isLogin()) return false;
    else {
      localStorage.setItem('username', header.get('username') as string);
      localStorage.setItem('token', header.get('token') as string);
      localStorage.setItem('nickname', response.data.nickname as string);
      return true;
    }
  } else return false;
}



// 跳转至登录界面
export async function suggestLogin() {
  await Router.push('/login');
  return Promise.reject({ msg: '未登录' });
}

export function userSignup(data: UserSignupConfig) {
  return request.post('/user/signup', data);
}

export function userLogin(data: UserLoginConfig) {
  return request.post('/user/login', data);
}

export function userLogout() {
  const header = generateHeader();
  if (header == null) return suggestLogin();
  return request.delete('/user/logout', { headers: header });
}

export function userPasswd(ll_password: string) {
  const header = generateHeader();
  if (header == null) return suggestLogin();
  return request.post('/user/passwd', { ll_password }, { headers: header });
}
