import { useState } from "react";
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
  const submitSign = async () => {
    setConfirmLoading(true);
    let requestLoginParams!: RequestLoginParams;
    if (activeTab === "1") {
      formPwdLogoIn.validate().then(async (res) => {
        requestLoginParams = res;
      });
    } else if (activeTab === "2") {
      formCodeLogoIn.validate().then(async (res) => {
        requestLoginParams = res;
      });
    } else {
      formRegister.validate().then(async (res) => {
        requestLoginParams = res;
      });
    }
    if (activeTab === "1" || activeTab === "2") {
      const result = await userAsync.fetchLogin(requestLoginParams);
      if (result?.data) {
        Message.success("登录成功 !");
        setLogoinModalVisiable(false);
      } else {
        // 这里要去根据报错判断
        Message.error("登录失败!");
      }
    } else {
      const result = await userAsync.fetchRegister(requestLoginParams);
      if (result?.data) {
        Message.success("注册登录成功 !");
        setLogoinModalVisiable(false);
      } else {
        // 这里要去根据报错判断
        Message.error("注册失败!");
      }
    }
    setConfirmLoading(false);
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
      Message.success("验证码发送成功!");
    } catch (error: any) {
      // 这里要去根据报错判断
      Message.error(error.response.data.message);
    }
    setgGtCodeLoading(false);
  };
  return (
    <Modal
      title={<div className="text-white ">登录/注册</div>}
      mountOnEnter={false}
      visible={logoinModalVisiable}
      confirmLoading={confirmLoading}
      onCancel={() => setLogoinModalVisiable(false)}
      maskClosable={false}
      simple
      style={{
        background: "rgba(35,41,53,0.9)",
        width: "380px",
      }}
      footer={
        <div className="flex gap-10 justify-center">
          <Button
            loading={confirmLoading}
            onClick={() => setLogoinModalVisiable(false)}
            type="primary"
          >
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
                发送验证码
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
