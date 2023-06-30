import { useEffect, useState } from "react";
import logo from "../../assets/images/openai.svg";
import { useNavigate } from "react-router-dom";
import { navlist } from "../../assets/constant";
import { userStore, modalStore } from "../../store";

const Navbar = () => {
  const navigator = useNavigate();
  const [scrolled, setScrolled] = useState(false);
  const { user_info, logout } = userStore();
  const { setLogoinModalVisiable, isActive, setIsActive } = modalStore();
  const [infoMoadlVisible, setInfoMoadlVisible] = useState(false);
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
      } z-10 fixed px-8  text-white   w-full  border-b-[1px] border-b-[#335] flex justify-between`}
    >
      <div className="flex gap-[100px]">
        <div className="flex items-center gap-2 ">
          <img src={logo} alt="logo" className="w-[40px]"></img>
          <p className="text-3xl font-bold">AnyGPT</p>
        </div>
        <div className="flex gap-6">
          {navlist.map((el, i) => (
            <div
              key={i}
              onClick={() => {
                setIsActive(el.link);
                navigator(el.link);
              }}
              className={`${
                isActive === el.link && "border-[1px] border-white"
              } cursor-pointer hover:bg-slate-700 font-bold   rounded-md hover:rounded-xl  p-2 m-2 text-xl `}
            >
              {el.name}
            </div>
          ))}
        </div>
      </div>
      {user_info ? (
        <div className="flex items-center gap-4">
          <div>
            {" "}
            <span>个人积分:</span>
            <span>1000.00</span>
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
              className={` absolute w-[200px] top-[50px] left-[-140px] bg-[#335] ${
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
              <button className="w-full bg-[#4EAC81] p-2 rounded-lg">
                设置个人信息
              </button>
              <button
                className="w-full bg-[#4EAC81] p-2 rounded-lg"
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
          className="cursor-pointer bg-minorColor hover:bg-slate-700 font-bold rounded-md hover:rounded-xl text-xl flex justify-center items-center"
        >
          登录/注册
        </div>
      )}
    </div>
  );
};

export default Navbar;
