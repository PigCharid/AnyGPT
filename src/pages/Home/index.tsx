import { useEffect, useRef } from "react";
import Matter from "matter-js";
import {
  motion,
  useScroll,
  useSpring,
  useTransform,
  useMotionValue,
  useVelocity,
  useAnimationFrame,
} from "framer-motion";
import { wrap } from "@motionone/utils";
import { useNavigate } from "react-router-dom";
interface ParallaxProps {
  children: string;
  baseVelocity: number;
}

const ParallaxText = ({ children, baseVelocity = 100 }: ParallaxProps) => {
  const baseX = useMotionValue(0);
  const { scrollY } = useScroll();
  const scrollVelocity = useVelocity(scrollY);
  const smoothVelocity = useSpring(scrollVelocity, {
    damping: 50,
    stiffness: 400,
  });
  const velocityFactor = useTransform(smoothVelocity, [0, 1000], [0, 5], {
    clamp: false,
  });

  /**
   * This is a magic wrapping for the length of the text - you
   * have to replace for wrapping that works for you or dynamically
   * calculate
   */
  const x = useTransform(baseX, (v) => `${wrap(-20, -45, v)}%`);

  const directionFactor = useRef<number>(1);
  useAnimationFrame((t, delta) => {
    let moveBy = directionFactor.current * baseVelocity * (delta / 1000);

    /**
     * This is what changes the direction of the scroll once we
     * switch scrolling directions.
     */
    if (velocityFactor.get() < 0) {
      directionFactor.current = -1;
    } else if (velocityFactor.get() > 0) {
      directionFactor.current = 1;
    }

    moveBy += directionFactor.current * moveBy * velocityFactor.get();

    baseX.set(baseX.get() + moveBy);
  });
  return (
    <div className="parallax">
      <motion.div className="scroller" style={{ x }}>
        <span>{children} </span>
        <span>{children} </span>
        <span>{children} </span>
        <span>{children} </span>
        <span>{children} </span>
        <span>{children} </span>
        <span>{children} </span>
        <span>{children} </span>
      </motion.div>
    </div>
  );
};
const Home = () => {
  const boxRef = useRef(null);
  const canvasRef = useRef(null);
  const navigator = useNavigate();

  useEffect(() => {
    let Engine = Matter.Engine,
      Render = Matter.Render,
      MouseConstraint = Matter.MouseConstraint,
      Mouse = Matter.Mouse,
      Composite = Matter.Composite,
      Bodies = Matter.Bodies;

    // create engine
    var engine = Engine.create(),
      world = engine.world;

    // create renderer
    var render = Render.create({
      element: boxRef.current,
      engine: engine,
      canvas: canvasRef.current,
      options: {
        width: window.innerWidth / 2,
        height: window.innerHeight,
        background: "transparent",
        wireframes: false,
        showAngleIndicator: false,
      },
    });

    for (let i = 0; i < 15; i++) {
      const circle = Matter.Bodies.circle(window.innerWidth / 2 - 160, 80, 80, {
        // friction: 0.3,
        // frictionAir: 0.00001,
        // restitution: 0.8,
        render: {
          sprite: {
            // 使用精灵
            texture: "./ChatGPT_logo.png", // 图片纹理位置
          },
        },
      });
      Composite.add(world, circle);
    }

    Composite.add(world, [
      // walls
      // Bodies.rectangle(400, 0, 800, 50, { isStatic: true }),
      Bodies.rectangle(
        window.innerWidth / 4,
        window.innerHeight,
        window.innerWidth / 2,
        2,
        {
          isStatic: true,
          render: {
            fillStyle: "#26263D",
          },
        }
      ),
      Bodies.rectangle(window.innerWidth / 2, window.innerHeight / 2, 1, 6400, {
        isStatic: true,
        render: {
          fillStyle: "#26263D",
        },
      }),
      // 左偏移  中心向下    宽度     长度
      Bodies.rectangle(0, window.innerHeight / 2, 1, 6400, {
        isStatic: true,
        render: {
          fillStyle: "#26263D",
        },
      }),
    ]);

    let mouse = Mouse.create(render.canvas),
      mouseConstraint = MouseConstraint.create(engine, {
        mouse: mouse,
        constraint: {
          stiffness: 0.1,
          render: {
            visible: false,
          },
        },
      });

    Composite.add(world, mouseConstraint);
    // allow scroll through the canvas
    mouseConstraint.mouse.element.removeEventListener(
      "mousewheel",
      mouseConstraint.mouse.mousewheel
    );
    mouseConstraint.mouse.element.removeEventListener(
      "DOMMouseScroll",
      mouseConstraint.mouse.mousewheel
    );
    Matter.Runner.run(engine);
    Render.run(render);
  }, []);
  return (
    <div className="w-full h-auto bgModify ">
      <div className="bg-[url('./assets/images/home_bg.png')] bg-no-repeat bg-cover  h-[100vh] relative">
        <div className="flex md:pl-[10vw] justify-center">
          <div className="pt-[140px] font-bold  z-[10]">
            <p className="text-6xl md:text-[4vw]">开始你的</p>
            <p className="text-8xl md:text-[7vw] my-[10px] text-[#602e90]">
              AI创作
            </p>
            <p className="text-6xl md:text-[4vw] mt-[-10px]">之旅</p>
            <div className="text-xl md:text-[1vw] pt-[20px]">
              <p>10+</p>
              <p>适用场景</p>
            </div>
            <div className="text-xl md:text-[1vw] pl-[200px] mt-[-20px]">
              <p className="">1000+</p>
              <p>项目分享</p>
            </div>
            <button
              onClick={() => {
                navigator("/aicenter");
              }}
              className="mt-10 px-10 py-4 bgModify text-xl w-full rounded-2xl hover:bg-none hover:scale-125 "
            >
              进入AI中心
            </button>
            <button className="md:ml-10 mt-10 px-10 py-4 bgModify text-xl w-full rounded-2xl hover:bg-none hover:scale-125">
              浏览项目分享
            </button>
          </div>
          <div className="hidden md:flex pl-[19vw]">
            <div className="bg-transparent" ref={boxRef}>
              <canvas className="bg-transparent" ref={canvasRef} />
            </div>
          </div>
        </div>
      </div>
      <div className="w-full h-[100px] flex flex-col ">
        <div className="my-[30px]">
          <ParallaxText baseVelocity={-5}>更多功能、更好使用</ParallaxText>
        </div>
        <div>
          <ParallaxText baseVelocity={5}>10+途径、1000+作品</ParallaxText>
        </div>
      </div>
      <div className="flex justify-center items-center py-[300px] text-5xl font-bold">
        敬请期待
      </div>
    </div>
  );
};

export default Home;
