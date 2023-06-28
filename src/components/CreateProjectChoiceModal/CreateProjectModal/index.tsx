import { Modal, Form, Input, Tag } from "@arco-design/web-react";
import { IconPlus } from "@arco-design/web-react/icon";
import { RequestCreateProjectParams } from "../../../types";
import { projectAsync } from "../../../store/async";
import { useState } from "react";
import { modalStore, userStore } from "../../../store";
import FileBase from "react-file-base64";
const FormItem = Form.Item;
const CreateProjectModal = () => {
  const { createProjectModalVisiable, setCreateProjectModalVisiable } =
    modalStore();
  const { user_info } = userStore();
  const [confirmLoading, setConfirmLoading] = useState(false);
  const [form] = Form.useForm();
  const [tags, setTags] = useState(Array<string>);
  const [showInput, setShowInput] = useState(false);
  const [inputValue, setInputValue] = useState("");
  function onOk() {
    form.validate().then(async (res) => {
      setConfirmLoading(true);
      const params: RequestCreateProjectParams = {
        ...res,
        tags: tags,
        creator: user_info?.username,
        createdAt: new Date(),
      };
      console.log("params", params);
      const result = await projectAsync.fetchCreateProject(params);

      console.log(result);
      setConfirmLoading(false);

      // setTimeout(() => {
      //   Message.success("Success !");
      //   setCreateProjectModalVisiable(false);
      //   setConfirmLoading(false);
      // }, 1500);
    });
  }
  function addTag() {
    if (inputValue) {
      tags.push(inputValue);
      setTags(tags);
      setInputValue("");
    }

    setShowInput(false);
  }

  function removeTag(removeTag: any) {
    const newTags = tags.filter((tag) => tag !== removeTag);
    setTags(newTags);
  }

  return (
    <Modal
      title="分享你的创业项目"
      visible={createProjectModalVisiable}
      onOk={onOk}
      confirmLoading={confirmLoading}
      onCancel={() => setCreateProjectModalVisiable(false)}
    >
      <Form form={form}>
        <FormItem label="项目名称" field="name">
          <Input placeholder="" />
        </FormItem>
        <FormItem label="项目标题" field="title">
          <Input placeholder="" />
        </FormItem>
        <FormItem label="详细介绍" field="message">
          <Input placeholder="" />
        </FormItem>
        <FormItem label="项目官网" field="website">
          <Input placeholder="" />
        </FormItem>
        <FormItem label="标签" field="tags">
          {tags.map((tag, index) => {
            return (
              <Tag
                key={tag}
                closable={index !== 0}
                onClose={() => removeTag(tag)}
              >
                {tag}
              </Tag>
            );
          })}
          {showInput ? (
            <Input
              autoFocus
              size="mini"
              value={inputValue}
              style={{ width: 84 }}
              onPressEnter={addTag}
              onBlur={addTag}
              onChange={setInputValue}
            />
          ) : (
            <Tag
              icon={<IconPlus />}
              style={{
                width: 84,
                backgroundColor: "var(--color-fill-2)",
                border: "1px dashed var(--color-fill-3)",
                cursor: "pointer",
              }}
              className="add-tag"
              tabIndex={0}
              onClick={() => setShowInput(true)}
              onKeyDown={(e) => {
                const keyCode = e.keyCode || e.which;
                if (keyCode === 13) {
                  // enter
                  setShowInput(true);
                }
              }}
            >
              Add Tag
            </Tag>
          )}
        </FormItem>
        <FormItem label="小展示图" field="smallBanner">
          <FileBase
            type="file"
            multiple={false}
            onDone={({ base64 }: any) => {
              // setLogofile(base64);
              form.setFieldValue("smallBanner", base64);
            }}
          />
        </FormItem>
        <FormItem label="大展示图" field="lagerBanner">
          <FileBase
            type="file"
            multiple={false}
            onDone={({ base64 }: any) => {
              // setLogofile(base64);
              form.setFieldValue("lagerBanner", base64);
            }}
          />
        </FormItem>
      </Form>
    </Modal>
  );
};

export default CreateProjectModal;
