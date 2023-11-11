import Image from 'next/image'
import Layout from 'antd/es/layout/layout'
import { MainLayout } from './MainLayout'

// 根目录目前废弃
export default function Home() {
  return <MainLayout>
    <p style={{textAlign:'center', fontSize: '32px'}}>你不应当看到此内容！</p>
    <p style={{textAlign:'center', fontSize: '32px'}}>You shouldn&apos;t see this content!</p>
  </MainLayout>
}
