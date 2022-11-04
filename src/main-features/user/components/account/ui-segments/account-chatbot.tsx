import React from "react";
import Chatbot, { createChatBotMessage } from "react-chatbot-kit";
import "react-chatbot-kit/build/main.css";

const config = {
  initialMessages: [createChatBotMessage(`Welcome in platform SrfGroup`, {})],
};

const MessageParser = ({
  children,
  actions,
}: {
  children: any;
  actions: any;
}) => {
  const parse = (message: any) => {
    console.log("message ", message);
  };

  return (
    <div>
      {React.Children.map(children, (child) => {
        return React.cloneElement(child, {
          parse: parse,
          actions: {},
        });
      })}
    </div>
  );
};

const ActionProvider = ({
  createChatBotMessage,
  setState,
  children,
}: {
  createChatBotMessage: any;
  setState: any;
  children: any;
}) => {
  return (
    <div>
      {React.Children.map(children, (child) => {
        return React.cloneElement(child, {
          actions: {},
        });
      })}
    </div>
  );
};

export const AccountChatBot = () => {
  return (
    <div>
      <Chatbot
        config={config}
        messageParser={MessageParser}
        actionProvider={ActionProvider}
      />
    </div>
  );
};
