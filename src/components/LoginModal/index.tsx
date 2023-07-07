import { useEffect, useState } from "react";
import {
  Modal,
  Button,
  Form,
  Input,
  Message,
  Divider,
  Space,
} from "@arco-design/web-react";
import { Tabs } from "@arco-design/web-react";
import { modalStore } from "../../store";
import { userAsync } from "../../store/async";
import { generateCode } from "../../request";
import { RequestLoginParams } from "../../types";
import "./index.css";
import { setInterval } from "timers";

const TabPane = Tabs.TabPane;
const FormItem = Form.Item;

function LogoinModal() {
  const { logoinModalVisiable, setLogoinModalVisiable } = modalStore();
  const [confirmLoading, setConfirmLoading] = useState(false);
  const [activeTab, setActiveTab] = useState("1");
  const [formPwdLogoIn] = Form.useForm();
  const [formCodeLogoIn] = Form.useForm();
  const [formRegister] = Form.useForm();
  const [getCodeLoading, setgGtCodeLoading] = useState(false);
  const [seconds, setSeconds] = useState(0);
  const submitSign = async () => {
    setConfirmLoading(true);
    if (activeTab === "1") {
      formPwdLogoIn.validate().then(async (res) => {
        const result: any = await userAsync.fetchLogin(res);
        if (result?.data) {
          Message.success("登录成功 !");
          setLogoinModalVisiable(false);
          setConfirmLoading(false);
        } else {
          // 这里要去根据报错判断
          Message.error(result.response.data.message);
          setConfirmLoading(false);
        }
      });
    } else if (activeTab === "2") {
      formCodeLogoIn.validate().then(async (res) => {
        const result: any = await userAsync.fetchLogin(res);
        if (result?.data) {
          Message.success("登录成功 !");
          setLogoinModalVisiable(false);
          setConfirmLoading(false);
        } else {
          // 这里要去根据报错判断
          Message.error(result.response.data.message);
          setConfirmLoading(false);
        }
      });
    } else {
      formRegister.validate().then(async (res) => {
        const result: any = await userAsync.fetchRegister(res);
        if (result?.data) {
          Message.success("注册登录成功 !");
          setLogoinModalVisiable(false);
          setConfirmLoading(false);
        } else {
          // 这里要去根据报错判断
          Message.error(result.response.data.message);
          setConfirmLoading(false);
        }
      });
    }
  };
  const getCode = async () => {
    setgGtCodeLoading(true);
    let email: string;
    if (activeTab === "2") {
      email = formCodeLogoIn.getFieldValue("email");
    } else {
      email = formRegister.getFieldValue("email");
    }
    if (email === undefined) {
      Message.error("请先输入邮箱");
      setgGtCodeLoading(false);
      return;
    }
    try {
      await generateCode({ email: email });
      setSeconds(60);
      Message.success("验证码发送成功!");
    } catch (error: any) {
      // 这里要去根据报错判断
      Message.error(error.response.data.message);
    }
    setgGtCodeLoading(false);
  };



  useEffect(() => {
    setTimeout(() => {
      if (seconds > 0) {
        setSeconds(seconds - 1);
      }
    }, 1000);
  }, [seconds]);
  console.log("seconds",seconds)

  console.log(confirmLoading);
  return (
    <Modal
      title={<div className="text-white ">登录/注册</div>}
      mountOnEnter={false}
      visible={logoinModalVisiable}
      maskClosable={false}
      simple
      style={{
        background: "rgba(35,41,53,0.9)",
        width: "380px",
      }}
      footer={
        <div className="flex gap-10 justify-center">
          <Button type="primary" onClick={() => setLogoinModalVisiable(false)}>
            关闭
          </Button>
          <Button loading={confirmLoading} onClick={submitSign} type="primary">
            {activeTab === "1" || activeTab === "2" ? "登录" : "注册&登录"}
          </Button>
        </div>
      }
    >
      <Tabs
        activeTab={activeTab}
        onChange={setActiveTab}
        style={{
          color: "white",
        }}
      >
        <TabPane
          key="1"
          title="密码登录"
          style={{
            color: "white",
          }}
        >
          <Form
            form={formPwdLogoIn}
            style={{
              color: "white",
            }}
          >
            <FormItem
              label="邮箱"
              field="email"
              requiredSymbol={false}
              rules={[
                {
                  match: /^[a-zA-Z0-9_-]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/,
                  message: "请输入正确的邮箱格式",
                },
                { required: true, message: "邮箱是必填项" },
              ]}
            >
              <Input placeholder="邮箱" />
            </FormItem>
            <FormItem
              label="密码"
              field="password"
              style={{
                color: "white",
              }}
              requiredSymbol={false}
              rules={[{ required: true, message: "密码是必填项" }]}
            >
              <Input type="password" placeholder="请输入密码" />
            </FormItem>
          </Form>
        </TabPane>
        <TabPane key="2" title="邮箱登录">
          <Form
            form={formCodeLogoIn}
            style={{
              color: "white",
            }}
          >
            <FormItem
              label="邮箱"
              field="email"
              requiredSymbol={false}
              rules={[
                {
                  match: /^[a-zA-Z0-9_-]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/,
                  message: "请输入正确的邮箱格式",
                },
                { required: true, message: "邮箱是必填项" },
              ]}
            >
              <Input placeholder="邮箱" />
            </FormItem>
            <div className="flex">
              <FormItem
                label="验证码"
                field="code"
                labelCol={{ span: 7, offset: 0 }}
                wrapperCol={{ span: 17, offset: 0 }}
                requiredSymbol={false}
                rules={[{ required: true, message: "密码是必填项" }]}
              >
                <Input placeholder="请输入验证码" />
              </FormItem>
              <Button type="primary" loading={getCodeLoading} onClick={getCode}>
                {seconds === 0 ? "发送验证码" : seconds}
              </Button>
            </div>
          </Form>
        </TabPane>
        <TabPane key="3" title="邮箱注册">
          <Form
            form={formRegister}
            style={{
              color: "white",
            }}
          >
            <FormItem
              label="邮箱"
              field="email"
              requiredSymbol={false}
              rules={[
                {
                  match: /^[a-zA-Z0-9_-]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/,
                  message: "请输入正确的邮箱格式",
                },
                { required: true, message: "邮箱是必填项" },
              ]}
            >
              <Input placeholder="邮箱" />
            </FormItem>
            <div className="flex">
              <FormItem
                label="验证码"
                field="code"
                labelCol={{ span: 7, offset: 0 }}
                wrapperCol={{ span: 17, offset: 0 }}
                requiredSymbol={false}
                rules={[{ required: true, message: "密码是必填项" }]}
              >
                <Input placeholder="请输入验证码" />
              </FormItem>
              <Button type="primary" loading={getCodeLoading} onClick={getCode}>
                发送验证码
              </Button>
            </div>

            <FormItem
              label="设置密码"
              field="password"
              requiredSymbol={false}
              rules={[{ required: true, message: "密码是必填项" }]}
            >
              <Input type="password" placeholder="请输入密码" />
            </FormItem>
          </Form>
        </TabPane>
      </Tabs>
    </Modal>
  );
}

export default LogoinModal;
