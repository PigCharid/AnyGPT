import { useEffect, useLayoutEffect, useMemo, useRef, useState } from "react";
import { aiChat } from "../../request";
import { chatStore } from "../../store";
import { generateUUID, formatTime } from "../../utils";
import { Message } from "@arco-design/web-react";
import { useScroll } from "../../hooks/useScroll";
const AIChat = () => {
  const scrollRef = useRef<HTMLDivElement>(null);
  const { scrollToBottomIfAtBottom, scrollToBottom } = useScroll(
    scrollRef.current
  );
  const [prompt, setPrompt] = useState("");
  const [chatLoading, setChatLoading] = useState(false);
  const {
    chats,
    addChat,
    clearChats,
    changeSelectChatId,
    delChat,
    selectChatId,
    setChatInfo,
    setChatDataInfo,
  } = chatStore();

  const handleAIChatToServer = (prompt: string, id: string) => {
    console.log("prompt", prompt);
    console.log("id", id);

    const req = async () => {
      try {
        const result = await aiChat({ prompt });
        console.log("回复的内容", result.data.result?.content);
        if (result.data.result) {
          setChatDataInfo(selectChatId, id, {
            status: "pass",
            text: result.data.result?.content,
          });
        } else {
          // 错误的处理
        }
      } catch (error) {
        console.log(error);
      }
      setChatLoading(false);
    };
    req();
  };

  const handleAIChat = () => {
    if (prompt === "") return Message.error("请输入正确的信息");
    setChatLoading(true);
    console.log("prompt", prompt);
    let userMessageId = generateUUID();
    const assistantMessageId = generateUUID();
    setChatInfo(selectChatId, {
      id: userMessageId,
      text: prompt,
      dateTime: formatTime(),
      status: "pass",
      role: "user",
      // requestOptions,
    });
    setChatInfo(selectChatId, {
      id: assistantMessageId,
      text: "",
      dateTime: formatTime(),
      status: "loading",
      role: "assistant",
      // requestOptions,
    });
    handleAIChatToServer(prompt, assistantMessageId);
    scrollToBottomIfAtBottom();
    setPrompt("");
  };
  useEffect(() => {
    if (chats.length <= 0) {
      addChat();
    } else {
      const id = chats[0].id;
      changeSelectChatId(id);
    }
  }, [addChat, changeSelectChatId, chats]);

  // 当前聊天记录
  const chatMessages = useMemo(() => {
    const chatList = chats.filter((c) => c.id === selectChatId);
    if (chatList.length <= 0) {
      return [];
    }
    return chatList[0].data;
  }, [selectChatId, chats]);
  useLayoutEffect(() => {
    if (scrollRef) {
      scrollToBottom();
    }
  }, [selectChatId, chats, scrollToBottom]);
  // // 更改对话信息
  // const handleChangeChat = (id: string) => {
  //   changeSelectChatId(id);
  // };

  console.log("chatMessages", chatMessages);

  console.log("chats", chats);

  //   const
  return (
    <div className="flex h-screen antialiased text-white">
      <div className="flex flex-row h-[90vh] w-full overflow-x-hidden mt-[82px] fixed">
        <div className="flex flex-col py-8 pl-6 pr-2 w-64 h-full bg-transparent flex-shrink-0 border-r-[1px]">
          <div className="flex flex-row items-center justify-center h-12 w-full border-[1px]">
            <div className="flex items-center justify-center rounded-2xl text-indigo-700 bg-indigo-100 h-10 w-10">
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z"
                ></path>
              </svg>
            </div>
            <div onClick={() => addChat()} className="ml-2 font-bold text-2xl">
              新建对话
            </div>
          </div>
          {chats.map((item) => (
            <div
              key={item.id}
              className="flex flex-row items-center justify-center h-12 w-full border-[1px]"
              onClick={() => {
                changeSelectChatId(item.id);
              }}
            >
              <div className="flex items-center  rounded-2xl text-indigo-700  h-4 w-4">
                <svg
                  className="w-6 h-6"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z"
                  ></path>
                </svg>
              </div>
              <div className="ml-2 font-bold text-2xl">新的对话</div>
              <div
                onClick={(event) => {
                  event.stopPropagation();
                  delChat(item.id);
                }}
                className="font-bold text-lg cursor-pointer"
              >
                删除
              </div>
            </div>
          ))}

          <div
            onClick={() => {
              clearChats();
            }}
            className="flex flex-row items-center justify-center h-12 w-full border-[1px]"
          >
            <div className="flex items-center  rounded-2xl text-indigo-700  h-4 w-4">
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z"
                ></path>
              </svg>
            </div>
            <div className="ml-2 font-bold text-2xl">清除所有对话</div>
          </div>
        </div>
        <div className=" flex flex-col flex-auto h-full ">
          <div className="flex flex-col flex-auto flex-shrink-0  bg-transparent h-full p-4">
            <div
              ref={scrollRef}
              className="  flex flex-col h-full overflow-x-auto mb-4"
            >
              <div className="flex flex-col h-full">
                <div className="grid grid-cols-12 gap-y-2">
                  {chatMessages.map((item) => {
                    return item.role === "user" ? (
                      <div
                        key={item.id}
                        className="col-start-6 col-end-13 p-3 rounded-lg"
                      >
                        <div className="flex items-center justify-start flex-row-reverse">
                          <div className="flex items-center justify-center h-10 w-10 rounded-full bg-indigo-500 flex-shrink-0">
                            Me
                          </div>
                          <div className="relative mr-3 text-sm bg-white text-black py-2 px-4 shadow rounded-xl">
                            <div>{item.text}</div>
                          </div>
                        </div>
                      </div>
                    ) : (
                      <div
                        key={item.id}
                        className="col-start-1 col-end-8 p-3 rounded-lg"
                      >
                        <div className="flex flex-row items-center">
                          <div className="flex items-center justify-center h-10 w-10 rounded-full bg-indigo-500 flex-shrink-0">
                            GPT
                          </div>
                          {item.status === "loading" ? (
                            <div className="loading ml-[10px]"></div>
                          ) : (
                            <div className="relative ml-3 text-sm bg-white text-black py-2 px-4 shadow rounded-xl">
                              <div>{item.text}</div>
                            </div>
                          )}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
            <div className="flex flex-row items-center h-16 rounded-xl bg-white text-black w-full px-4">
              <div className="flex-grow ml-4">
                <div className="relative w-full">
                  <input
                    disabled={chatLoading}
                    placeholder={chatLoading ? "1.0版本请先等上一条回复" : ""}
                    onKeyUp={(event) => {
                      if (event.key === "Enter") {
                        scrollToBottomIfAtBottom();
                        handleAIChat();
                      }
                    }}
                    value={prompt}
                    onChange={(e) => {
                      scrollToBottomIfAtBottom();
                      setPrompt(e.target.value);
                    }}
                    type="text"
                    className="flex w-full border rounded-xl focus:outline-none focus:border-indigo-300 pl-4 h-10"
                  />
                </div>
              </div>
              <div className="ml-4">
                <button
                  disabled={chatLoading}
                  onClick={() => {
                    handleAIChat();
                  }}
                  className="flex items-center justify-center bg-indigo-500 hover:bg-indigo-600 rounded-xl text-white px-4 py-1 flex-shrink-0"
                >
                  {chatLoading ? (
                    <div className="sendLoading">
                      <div></div>
                      <div></div>
                      <div></div>
                      <div></div>
                    </div>
                  ) : (
                    <>
                      <span>Send</span>
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
                    </>
                  )}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AIChat;
