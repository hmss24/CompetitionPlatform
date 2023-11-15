'use client'
import { Button, Form, Input, Layout, Space, message } from "antd";
import styles from "./page.module.css";
import { useRouter } from "next/navigation";
import { saveLogin, userLogin, userSignup } from "@/api/user";

interface SignupInterface {
  username: string,
  nickname: string,
  password: string,
};

export default function LoginPage() {
  const router = useRouter();
  const [form] = Form.useForm();

  const handleLogin = async (table: SignupInterface) => {
    const nickname: string = table.nickname ?? '';
    const username: string = table.username ?? '';
    const password: string = table.password ?? '';

    if (username.length < 1
      || username.length > 50
      || username.search(/[\p{C}\p{Z}\p{M}\p{P}\p{S}]/u) != -1) {
      message.error('请输入合法的账号名');
      return;
    }
    if (nickname.length < 1 || nickname.length > 50) {
      message.error('请输入合法的昵称');
      return;
    }
    if (password.length < 8
      || password.length > 50
      || /^[ -~]+$/.test(password) == false
      || password.search(/[A-Z]/) == -1
      || password.search(/[a-z]/) == -1
      || password.search(/[0-9]/) == -1) {
      message.error('请输入合法的密码');
      return;
    }

    try {
      const response = await userSignup({ ll_username: username, ll_password: password, ll_nickname: nickname });
      if(response.status != 200) message.error('网络错误');
      else if(response.data.code != 200) message.error(response.data.msg as string);
      else {
        saveLogin(response);
        message.success('注册成功');
        router.push('/login');
      }
    } catch (e) {
      message.error('未知错误');
    }
  };

  const nicknameRule = [
    {required: true, message: '请输入昵称'},
    {
      validator(_: any, nickname: string) {
        if (nickname.length > 200)
          return Promise.reject(new Error('昵称需要在200字符以内'));
        return Promise.resolve();
      }
    }
  ]

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
    {
      validator(_: any, password: string) {
        if (password.length < 8)
          return Promise.reject(new Error('密码不得少于8位'));
        if (password.length > 200)
          return Promise.reject(new Error('密码不得超过200位'));
        return Promise.resolve();
      }
    }, {
      validator(_: any, password: string) {
        if (password.length > 0 && /^[ -~]+$/.test(password) == false)
          return Promise.reject(new Error('密码不得含有大小写字母、数字、英文符号、空格以外的字符'));
        return Promise.resolve();
      }
    }, {
      validator(_: any, password: string) {
        if (password.search(/[A-Z]/) == -1)
          return Promise.reject(new Error('密码需要至少含有一个大写字母'));
        return Promise.resolve();
      }
    }, {
      validator(_: any, password: string) {
        if (password.search(/[a-z]/) == -1)
          return Promise.reject(new Error('密码需要至少含有一个小写字母'));
        return Promise.resolve();
      }
    }, {
      validator(_: any, password: string) {
        if (password.search(/[0-9]/) == -1)
          return Promise.reject(new Error('密码需要至少含有一个数字'));
        return Promise.resolve();
      }
    }
  ];

  return <Layout className={styles.layout}>
    <h1 className={styles.title}>
      注册界面
    </h1>
    <Form labelCol={{ span: 5 }} form={form} onFinish={handleLogin}>
      <Form.Item<SignupInterface> label='用户名' name='username' rules={usernameRule}>
        <Input />
      </Form.Item>
      <Form.Item<SignupInterface> label='昵称' name='nickname' rules={usernameRule}>
        <Input />
      </Form.Item>
      <Form.Item<SignupInterface> label='密码' name='password' rules={passwordRule}>
        <Input.Password />
      </Form.Item>
      <Form.Item>
        <Space className={styles.btns}>
          <Button size='large' onClick={() => router.push('/login')}>
            登录
          </Button>
          <Button type='primary' htmlType='submit' size='large'>
            注册
          </Button>
        </Space>
      </Form.Item>
    </Form>
  </Layout>
}