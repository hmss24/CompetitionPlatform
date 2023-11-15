'use client';

import Image from 'next/image'
import Layout from 'antd/es/layout/layout'
import { MainLayout } from '@/MainLayout'
import { Button, DatePicker, Form, Select, Space } from 'antd'
import TextArea from 'antd/es/input/TextArea';
import { useRouter } from 'next/navigation';
import styles from './page.module.css'

const OPTIONS = [
  { label: 'Codeforces', value: 'codeforces' },
];

export default function Home() {
  const router = useRouter();
  const [form] = Form.useForm();

  const handleSumbit = (s: any) => {
    console.log(s);
  };
  const remarkRule = [
    {
      validator(_: any, remark: string) {
        if (remark.length > 200) return Promise.reject(new Error('备注的长度不得超过200字符'));
        return Promise.resolve();
      }
    },
  ];

  return <MainLayout>
    <Form form={form} onFinish={handleSumbit}>
      <Form.Item label='比赛类别' name='categort' rules={[{ required: true, message: '请选择比赛类别' }]}>
        <Select
          showSearch
          placeholder="Select a person"
          optionFilterProp="label"
          options={OPTIONS}
        />
      </Form.Item>
      <Form.Item label='比赛日期' name='date' rules={[{ required: true, message: '请选择比赛日期' }]}>
        <DatePicker />
      </Form.Item>
      <Form.Item label='备注' name='remark' >
        <TextArea showCount>
        </TextArea>
      </Form.Item>
      <Form.Item>
        <Space className={styles.btns}>
          <Button size='large' onClick={() => router.push('/login')}>
            取消
          </Button>
          <Button type='primary' htmlType='submit' size='large'>
            提交
          </Button>
        </Space>
      </Form.Item>
    </Form>
  </MainLayout>
}
