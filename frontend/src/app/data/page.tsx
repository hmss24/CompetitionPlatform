'use client'

import { useRouter } from "next/navigation";
import { MainLayout } from "@/MainLayout";
import { Table } from "antd";

export default function Home() {
  const router = useRouter();

  return <MainLayout>
    <Table>
      
    </Table>
  </MainLayout>
}