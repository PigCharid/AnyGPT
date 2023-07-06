import { Suspense, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Canvas, useFrame } from "@react-three/fiber";
import { Points, PointMaterial, Preload } from "@react-three/drei";
import * as random from "maath/random/dist/maath-random.esm";
import { completeProduct, commingProduct } from "../../assets/constant";
import { Message } from "@arco-design/web-react";
const Stars = (props: any) => {
  const ref: any = useRef(null);
  const [sphere] = useState(() =>
    random.inSphere(new Float32Array(5000), { radius: 1.2 })
  );

  useFrame((state, delta) => {
    ref.current.rotation.x -= delta / 10;
    ref.current.rotation.y -= delta / 15;
  });

  return (
    <group rotation={[0, 0, Math.PI / 4]}>
      <Points ref={ref} positions={sphere} stride={3} frustumCulled {...props}>
        <PointMaterial
          transparent
          color="#f272c8"
          size={0.002}
          sizeAttenuation={true}
          depthWrite={false}
        />
      </Points>
    </group>
  );
};

const AICenter = () => {
  const navgate = useNavigate();
  return (
    <div>
      <div className="w-full h-auto absolute inset-0 z-[-1]">
        <Canvas camera={{ position: [0, 0, 1] }}>
          <Suspense fallback={null}>
            <Stars />
          </Suspense>

          <Preload all />
        </Canvas>
      </div>
      <div className="h-[100vh] pt-[10px] flex flex-col justify-center items-center  ">
        <div className="text-5xl font-bold md:w-full text-center w-[90%]">快选择你想要的使用的AI工具吧</div>
        <div className="w-ful flex justify-center items-center  pt-[120px] gap-10">
          <div className="md:w-[800px] flex gap-10 flex-wrap justify-center">
            {completeProduct.map((item) => (
              <button
                key={item.name}
                onClick={() => {
                  navgate(item.link);
                }}
                className="p-2 border-[1px] border-minorColor  text-xl font-bold rounded-lg hover:scale-[1.2]"
              >
                {item.name}
              </button>
            ))}

            {commingProduct.map((item) => (
              <button
                key={item.name}
                onClick={() => {
                  Message.info("即将上线，敬请期待");
                }}
                className="p-2 border-[1px] border-gray-500 text-xl font-bold rounded-lg hover:scale-[1.2]"
              >
                {item.name}
              </button>
            ))}
          </div>
        </div>
        <div className="text-center text-xl font-bold pt-[50px]">
          找不到您想要的工具？
        </div>
        <div className="flex flex-row items-center h-16 rounded-xl bg-transparent text-black w-[90%] md:w-[800px] px-2 md:px-4 ">
          <div className="flex-grow ">
            <div className="relative w-full">
              <input
                placeholder={"请告诉我们你想要使用的工具类型"}
                onKeyUp={(event) => {
                  if (event.key === "Enter") {
                  }
                }}
                onChange={(e) => {}}
                type="text"
                className="flex w-full border rounded-xl focus:outline-none focus:border-indigo-300 pl-4 h-10"
              />
            </div>
          </div>
          <div className="ml-4">
            <button
              // disabled={chatLoading}
              // onClick={() => {
              //   handleAIChat();
              // }}
              className="flex items-center justify-center bg-indigo-500 hover:bg-indigo-600 rounded-xl text-white px-4 py-1 flex-shrink-0"
            >
              <span>发送</span>
              <span className="ml-2">
                <svg
                  className="w-4 h-4 transform rotate-45 -mt-px"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"
                  ></path>
                </svg>
              </span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AICenter;
