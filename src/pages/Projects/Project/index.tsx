const Project = () => {
  return (
    <div className="flex flex-col w-[360px] relative border-[1px] rounded-lg">
      <div className="flex  items-center absolute top-[16px] left-[16px] gap-4">
        <img
          className="w-[50px] rounded-full"
          src="https://test.gate-3.io/_next/image/?url=https%3A%2F%2Fgate3.s3.ap-northeast-1.amazonaws.com%2Fuserportrait%2FMaskgroup-6.png&w=96&q=75"
          alt="logo"
        ></img>
        <p className="text-white text-xl font-bold">用户名</p>
      </div>
      <img
        className="rounded-lg"
        src="https://test.gate-3.io/_next/image/?url=https%3A%2F%2Fgate3s3.s3.ap-southeast-1.amazonaws.com%2Ffrontend-gate3%2F1685602205127f32e74b3-155a-49ec-b087-1f42e4301848.png&w=384&q=75"
        alt="logo"
      ></img>
      <p className="p-4 text-white text-2xl">项目名称</p>
      <p className="px-4  text-white text-sm">这是一个好玩的AI项目</p>
      <div className="flex px-4 gap-2">
        <div className="p-2 border-[1px]">aaa</div>
        <div className="p-2 border-[1px]">aaa</div>
        <div className="p-2 border-[1px]">aaa</div>
        <div className="p-2 border-[1px]">aaa</div>
      </div>
      <div className="p-4 flex justify-between text-white">
        <div>点赞人数</div>
        <div>浏览详情</div>
      </div>
    </div>
  );
};

export default Project;
