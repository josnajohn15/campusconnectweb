import React from 'react';

class ActionProvider { // it is the set of rules
  constructor(createChatBotMessage, setStateFunc, createClientMessage) {
    this.createChatBotMessage = createChatBotMessage;
    this.setState = setStateFunc;
    this.createClientMessage = createClientMessage;
  }

  // Add message to bot queue
  addMessageToBotQueue(message) {
    const botMessage = this.createChatBotMessage(message);
    this.setState((prevState) => ({
      ...prevState,
      messages: [...prevState.messages, botMessage],
    }));
  }
}

const ActionProviderComponent = ({ createChatBotMessage, setState, children }) => { //connect actionprovider to all other components
  const actions = new ActionProvider(createChatBotMessage, setState);

  return (
    <div>
      {React.Children.map(children, (child) => {
        return React.cloneElement(child, {
          actions: actions,  // Passing actual actions object
        });
      })}
    </div>
  );
};

export default ActionProviderComponent;
