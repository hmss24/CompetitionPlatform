'use client'
import axios, { AxiosRequestConfig } from "axios";
import Router from "next/router";
import { message as antd_message } from "antd";

export const CreateAxiosInstance = (config?: AxiosRequestConfig) => {
  const instance = axios.create({
    timeout: 3000,
    baseURL: "http://localhost:9001/",
    ...config
  });

  instance.interceptors.request.use((config) => {
    return config;
  }, (error) => {
    return Promise.reject(error);
  });

  // instance.interceptors.response.use(
  //   function(response) {
  //     const {status, data, message} = response as any;
  //     if (status === 200) {
  //       return Promise.resolve(data);
  //     } else {
  //       antd_message.error(message);
  //       return Promise.reject(data);
  //     }
  //   },
  //   function(error) {
  //     antd_message.error(error?.response?.data?.message || "服务端异常");
  //     return Promise.reject(error);
  //   }
  // );

  return instance;
};

const request = CreateAxiosInstance({});
export default request;

// 从localStorage中读取登录信息并生成Header，如果未登录返回null
export function generateHeader() {
  const username = localStorage.getItem('username');
  const token = localStorage.getItem('token');
  if(username == null || token == null) return null;
  return { username, token };
}