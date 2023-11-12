'use client'
import { Button, Col, Form, Grid, Input, Layout, Row, Space, message } from "antd";
import styles from "./page.module.css";
import { useRouter } from "next/navigation";
import { saveLogin, userLogin } from "../api/user";

interface LoginInterface {
  username: string,
  password: string
};

export default function LoginPage() {
  const router = useRouter();
  const [form] = Form.useForm();

  const handleLogin = async (table: LoginInterface) => {
    const username: string = table.username ?? '';
    const password: string = table.password ?? '';
    if (username.length < 1
      || username.length > 200
      || username.search(/[\p{C}\p{Z}\p{M}\p{P}\p{S}]/u) != -1) {
      message.error('请输入合法的账号名');
      return;
    }
    if (password.length < 8
      || password.length > 100
      || /^[ -~]+$/.test(password) == false
      || password.search(/[A-Z]/) == -1
      || password.search(/[a-z]/) == -1
      || password.search(/[0-9]/) == -1) {
      message.error('登录失败，密码无效');
      return;
    }

    try {
      const response = await userLogin({ ll_username: username, ll_password: password });
      if(response.status != 200) message.error('网络错误');
      else if(response.data.code != 200) message.error(response.data.msg as string);
      else {
        saveLogin(response);
        message.success('登录成功');
        router.push('/homepage');
      }
    } catch (e) {
      message.error('未知错误');
    }
  };

  const usernameRule = [
    { required: true, message: '请输入用户名' },
    {
      validator(_: any, username: string) {
        if (username.length > 200)
          return Promise.reject(new Error('用户名需要在200字符以内'));
        return Promise.resolve();
      }
    },
    {
      validator(_: any, username: string) {
        if (username.search(/[\p{C}\p{Z}\p{M}\p{P}\p{S}]/u) != -1)
          return Promise.reject(new Error('用户名不能含有空白符'));
        return Promise.resolve();
      }
    },
  ];

  const passwordRule = [
    { required: true, message: '请输入密码' },
  ];

  return <Layout className={styles.layout}>
    <h1 className={styles.title}>
      登录界面
    </h1>
    <Form labelCol={{ span: 5 }} form={form} onFinish={handleLogin}>
      <Form.Item<LoginInterface> label='用户名' name='username' rules={usernameRule}>
        <Input />
      </Form.Item>
      <Form.Item<LoginInterface> label='密码' name='password' rules={passwordRule}>
        <Input.Password />
      </Form.Item>
      <Form.Item>
        <Space className={styles.btns}>
          <Button size='large' onClick={() => router.push('/signup')}>
            注册
          </Button>
          <Button type='primary' htmlType='submit' size='large'>
            登录
          </Button>
        </Space>
      </Form.Item>
    </Form>
  </Layout>
}