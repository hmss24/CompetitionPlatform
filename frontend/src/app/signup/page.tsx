'use client'
import { Button, Col, Form, Grid, Input, Layout, Row, Space, message } from "antd";
import styles from "./page.module.css";
import { useRouter } from "next/navigation";
import { saveLogin, userLogin } from "../api/user";

interface LoginInterface {
  username: string,
  password: string
};

export default function SignupPage() {
  return <p>
    Todo
  </p>
}