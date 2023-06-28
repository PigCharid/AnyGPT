import { Modal } from "@arco-design/web-react";
import { modalStore } from "../../store";
const CreateProjectChoiceModal = () => {
  const {
    createProjectChoiceModalVisiable,
    setCreateProjectChoiceModalVisiable,
    setCreateProjectModalVisiable,
  } = modalStore();

  return (
    <Modal
      title="分享你的创业项目"
      visible={createProjectChoiceModalVisiable}
      onCancel={() => setCreateProjectChoiceModalVisiable(false)}
      footer={null}
    >
      <div className="flex justify-around">
        <button className="bg-minorColor p-4 rounded-lg">
          从创业画布中选取
        </button>
        <button
          onClick={() => {
            setCreateProjectChoiceModalVisiable(false);
            setCreateProjectModalVisiable(true);
          }}
          className="bg-minorColor p-4 rounded-lg"
        >
          提交项目信息分享
        </button>
      </div>
    </Modal>
  );
};

export default CreateProjectChoiceModal;
