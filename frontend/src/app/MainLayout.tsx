'use client';

import { Button, Layout, Menu, MenuProps, Space } from "antd";
import { Footer, Header } from "antd/es/layout/layout";
import { usePathname, useRouter } from "next/navigation";
import React, { ReactNode, useEffect, useState } from "react";
import { isLogin, quitLogin } from "./api/user";
import { Dropdown } from 'antd';

export const MENUS = [
  { label: '首页', key: 'homepage' },
  { label: '数据', key: 'data' },
  { label: '排行榜', key: 'ranking' },
];


// 绝大部分网页的主框架
export function MainLayout({ children }: { children: ReactNode }) {
  const router = useRouter();
  const pathname = usePathname();
  let selectedKey = pathname.split('/')[1] ?? '';
  const [nickname, setNickname] = useState<string | null>();

  useEffect(() => {
    setNickname(localStorage.getItem('nickname'));
  }, [nickname]);

  useEffect(() => {
    if (selectedKey == '') {
      router.push('/homepage');
    }
  }, [router, selectedKey]);

  const DROPITEMS : MenuProps['items'] = [
    {
      key: 'manage',
      label: (<a>用户管理</a>)
    },
    {
      key: 'logout',
      label: (<a onClick={()=>{ quitLogin(); location.reload(); }}>退出登录</a>)
    },
  ];

  const DROPITEMS_UNLOGIN: MenuProps['items'] = [
    {
      key: 'login',
      label: (<a onClick={()=> { router.push('/login'); }}>用户登录</a>)
    },
  ];

  return <Layout style={{}}>
    <Header style={{ display: 'flex' }}>
      <Menu
        theme='dark'
        mode='horizontal'
        selectedKeys={[selectedKey]}
        items={MENUS}
        onClick={info => router.push(info.key)}
      />
      <Space align='center' style={{ marginLeft: 'auto', color: 'white' }}>
        <Dropdown menu={nickname?{items:DROPITEMS}:{items:DROPITEMS_UNLOGIN}}>
          <a onClick={(e)=>e.preventDefault()}>{nickname ?? "未登录"}</a>
        </Dropdown>
      </Space>
    </Header>
    <Layout style={{ padding: '36px', overflow: 'auto' }}>
      {children}
    </Layout>
    <Footer style={{ textAlign: 'center' }}>
      由东华大学“计算思维”第9组创建
    </Footer>
  </Layout>
}