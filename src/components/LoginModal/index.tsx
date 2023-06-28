import { useState } from "react";
import { Modal, Button, Form, Input, Message } from "@arco-design/web-react";
import { Tabs } from "@arco-design/web-react";
import { modalStore } from "../../store";
import { userAsync } from "../../store/async";
import { generateCode } from "../../request";
const TabPane = Tabs.TabPane;
const FormItem = Form.Item;

function LogoinModal() {
  const { logoinModalVisiable, setLogoinModalVisiable } = modalStore();
  const [confirmLoading, setConfirmLoading] = useState(false);
  const [activeTab, setActiveTab] = useState("1");
  const [form] = Form.useForm();
  const [getCodeLoading, setgGtCodeLoading] = useState(false);
  const submitSign = async () => {
    form.validate().then(async (res) => {
      setConfirmLoading(true);

      if (activeTab === "1" || activeTab === "2") {
        const result = await userAsync.fetchLogin(res);
        if (result?.data) {
          Message.success("登录成功 !");
          setLogoinModalVisiable(false);
        } else {
          // 这里要去根据报错判断
          Message.error("登录失败!");
        }
      } else {
        const result = await userAsync.fetchRegister(res);
        if (result?.data) {
          Message.success("注册登录成功 !");
          setLogoinModalVisiable(false);
        } else {
          // 这里要去根据报错判断
          Message.error("注册失败!");
        }
      }
      setConfirmLoading(false);
    });
  };
  const getCode = async () => {
    console.log(form.getFieldValue("email"));
    setgGtCodeLoading(true);
    try {
      const res = await generateCode({ email: form.getFieldValue("email") });
      console.log("res", res);

      Message.success("验证码发送成功 !");
    } catch (error) {
      // 这里要去根据报错判断   
      Message.error("验证码发送失败!");
      console.log("error", error);
    }
    setgGtCodeLoading(false);
  };
  return (
    <Modal
      title="登录注册"
      mountOnEnter={false}
      visible={logoinModalVisiable}
      confirmLoading={confirmLoading}
      onCancel={() => setLogoinModalVisiable(false)}
      footer={
        <>
          <Button loading={confirmLoading} onClick={submitSign} type="primary">
            Submit
          </Button>
        </>
      }
    >
      <Form form={form}>
        <Tabs activeTab={activeTab} onChange={setActiveTab}>
          <TabPane key="1" title="密码登录">
            <FormItem label="邮箱" field="email">
              <Input placeholder="邮箱" />
            </FormItem>
            <FormItem label="密码" field="password">
              <Input placeholder="请输入密码" />
            </FormItem>
          </TabPane>
          <TabPane key="2" title="邮箱登录">
            <FormItem label="邮箱" field="email">
              <Input placeholder="邮箱" />
            </FormItem>
            <FormItem label="验证码" field="code">
              <Input placeholder="请输入验证码" />
            </FormItem>
            <Button
              type="primary"
              loading={getCodeLoading}
              onClick={getCode}
              style={{ margin: 24 }}
            >
              发送验证码
            </Button>
          </TabPane>
          <TabPane key="3" title="邮箱注册">
            <FormItem label="邮箱" field="email">
              <Input placeholder="邮箱" />
            </FormItem>
            <FormItem label="验证码" field="code">
              <Input placeholder="请输入验证码" />
            </FormItem>
            <Button
              type="primary"
              loading={getCodeLoading}
              onClick={getCode}
              style={{ margin: 24 }}
            >
              发送验证码
            </Button>
            <FormItem label="设置密码" field="password">
              <Input placeholder="请输入密码" />
            </FormItem>
          </TabPane>
        </Tabs>
      </Form>
    </Modal>
  );
}

export default LogoinModal;
