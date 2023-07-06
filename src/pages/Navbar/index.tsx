import { useEffect, useState } from "react";
import logo from "../../assets/images/openai.svg";
import { useNavigate } from "react-router-dom";
import { navlist } from "../../assets/constant";
import { userStore, modalStore } from "../../store";
import { Layout, Message } from "@arco-design/web-react";
import close from "../../assets/images/close.svg";
import menu from "../../assets/images/menu.svg";

const Navbar = () => {
  const navigator = useNavigate();
  const [scrolled, setScrolled] = useState(false);
  const { user_info, logout } = userStore();
  const { setLogoinModalVisiable, isActive, setIsActive } = modalStore();
  const [infoMoadlVisible, setInfoMoadlVisible] = useState(false);
  const [toggle, setToggle] = useState(false);
  useEffect(() => {
    const onScroll = () => {
      if (window.scrollY > 100) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
  return (
    <div
      className={`${
        scrolled ? "py-0 glass" : "bg-transparent py-2"
      } z-[100] fixed px-8  text-white w-full  border-b-[1px] border-b-[#335] flex justify-between `}
    >
      <div className="flex gap-[100px]">
        <div
          onClick={() => {
            navigator("/");
          }}
          className="flex items-center gap-2 cursor-pointer "
        >
          <img src={logo} alt="logo" className="w-[40px]"></img>
          <p className="text-3xl font-bold ">AnyGPT</p>
        </div>
        <div className="hidden lg:flex gap-6">
          {navlist.map((el, i) => (
            <div
              key={i}
              onClick={() => {
                setIsActive(el.link);
                navigator(el.link);
              }}
              className={`${
                isActive === el.link && "border-[1px] border-white"
              } cursor-pointer hover:bg-minorColor rounded-xl font-bold  p-2 m-2 text-xl `}
            >
              {el.name}
            </div>
          ))}
          <div
            onClick={() => {
              Message.info("即将上线");
            }}
            className={`cursor-pointer hover:bg-minorColor rounded-xl  font-bold p-2 m-2 text-xl `}
          >
            浏览分享
          </div>
          <div
            onClick={() => {
              Message.info("即将上线");
            }}
            className={`cursor-pointer hover:bg-minorColor rounded-xl  font-bold  p-2 m-2 text-xl `}
          >
            个人中心
          </div>
        </div>
      </div>
      <div className="hidden lg:flex justify-center items-center">
        {user_info ? (
          <div className="flex items-center gap-4">
            <div className="font-bold">
              {" "}
              <span>个人积分:</span>
              <span>{user_info.integral.toFixed(2)}</span>
            </div>

            <div
              className="relative "
              onMouseEnter={() => setInfoMoadlVisible(true)}
              onMouseLeave={() => setInfoMoadlVisible(false)}
            >
              <img
                src={user_info.logo === "" ? logo : user_info.logo}
                alt="userlogo"
                className="w-[50px] h-[50px] rounded-full cursor-pointer"
                onClick={() => setInfoMoadlVisible(true)}
              ></img>
              <div
                className={` absolute w-[200px] top-[50px] left-[-140px] glass ${
                  infoMoadlVisible ? "flex flex-col" : "hidden"
                } items-start p-8 rounded-lg gap-3 font-bold `}
              >
                <div className="w-full">
                  <span>邮箱:</span>
                  <span>{user_info.email}</span>
                </div>
                <div>
                  <span>用户名:</span>
                  <span>{user_info.username}</span>
                </div>
                <div>
                  <span>个人积分:</span>
                  <span>{user_info.integral}</span>
                </div>
                <button className="w-full bg-[#4EAC81] hover:scale-110  p-2 rounded-lg">
                  设置个人信息
                </button>
                <button
                  className="w-full bg-[#4EAC81] hover:scale-110 p-2 rounded-lg"
                  onClick={() => {
                    setInfoMoadlVisible(false);
                    logout();
                  }}
                >
                  退出
                </button>
              </div>
            </div>
          </div>
        ) : (
          <div
            onClick={() => {
              setLogoinModalVisiable(true);
            }}
            className="cursor-pointer font-bold rounded-md hover:bg-minorColor text-lg flex justify-center items-center p-2"
          >
            登录/注册
          </div>
        )}
      </div>

      <div className="lg:hidden flex flex-1 justify-end items-center">
        <img
          src={toggle ? close : menu}
          alt="menu"
          className="w-[28px] h-[28px] object-contain cursor-pointer"
          onClick={() => setToggle(!toggle)}
        />

        <div
          className={`${
            !toggle ? "hidden" : "flex glass"
          } p-6 black-gradient absolute top-20 right-0 mx-4 my-2 min-w-[140px] z-10 rounded-xl`}
        >
          <ul className="list-none flex justify-end items-start flex-1 flex-col">
            <div className="lg:hidden flex justify-center items-center">
              {user_info ? (
                <div className="flex items-center gap-4">
                  <div className="font-bold">
                    {" "}
                    <span>个人积分:</span>
                    <span>{user_info.integral.toFixed(2)}</span>
                  </div>

                  <div
                    className="relative "
                    onMouseEnter={() => setInfoMoadlVisible(true)}
                    onMouseLeave={() => setInfoMoadlVisible(false)}
                  >
                    <img
                      src={user_info.logo === "" ? logo : user_info.logo}
                      alt="userlogo"
                      className="w-[50px] h-[50px] rounded-full cursor-pointer"
                      onClick={() => setInfoMoadlVisible(true)}
                    ></img>
                  </div>
                </div>
              ) : (
                <div
                  onClick={() => {
                    setLogoinModalVisiable(true);
                  }}
                  className="cursor-pointer font-bold  hover:bg-minorColor rounded-xl p-2 text-lg flex justify-center items-center"
                >
                  登录/注册
                </div>
              )}
            </div>
            {navlist.map((el, i) => (
              <div
                key={i}
                onClick={() => {
                  setIsActive(el.link);
                  navigator(el.link);
                }}
                className={`${
                  isActive === el.link && "border-[1px] border-white"
                } cursor-pointer hover:bg-minorColor rounded-xl font-bold  p-2 m-2 text-xl `}
              >
                {el.name}
              </div>
            ))}
            <div
              onClick={() => {
                Message.info("即将上线");
              }}
              className={`cursor-pointer hover:bg-minorColor rounded-xl font-bold p-2 m-2 text-xl `}
            >
              浏览分享
            </div>
            <div
              onClick={() => {
                Message.info("即将上线");
              }}
              className={`cursor-pointer hover:bg-minorColor rounded-xl font-bold  p-2 m-2 text-xl `}
            >
              个人中心
            </div>
            {user_info && (
              <div
                onClick={() => {
                  logout();
                }}
                className={`cursor-pointer hover:bg-minorColor rounded-xl font-bold  p-2 m-2 text-xl `}
              >
                退出
              </div>
            )}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
