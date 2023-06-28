import { useEffect } from "react";
import Project from "./Project";
import { modalStore, projectStore } from "../../store";
import { projectAsync } from "../../store/async";

const Projects = () => {
  const { setCreateProjectChoiceModalVisiable } = modalStore();
  const { project_info } = projectStore();
  console.log("project_info", project_info);
  useEffect(() => {
    const loadProjects = async () => {
      const result = await projectAsync.fetchGetProject();
      console.log(result);
    };
    if (!project_info) {
      loadProjects();
    }
  }, [project_info]);
  return (
    <div className="pt-[100px]">
      <div className="flex gap-[200px]">
        <div>左边 相关介绍</div>
        <div>
          <button
            onClick={() => {
              setCreateProjectChoiceModalVisiable(true);
            }}
            className="bg-minorColor p-4 rounded-lg"
          >
            创建
          </button>
        </div>
      </div>
      <div>搜索设置</div>
      <div className="flex gap-3 justify-start items-center flex-wrap px-4">
        {project_info?.map(() => (
          <Project />
        ))}
      </div>
    </div>
  );
};

export default Projects;
