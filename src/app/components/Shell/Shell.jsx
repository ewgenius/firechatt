import React from 'react';
import Firebase from 'firebase';
import ChatsList from '../ChatsList/ChatsList.jsx';
import UsersList from '../UsersList/UsersList.jsx';
import MainContainer from '../MainContainer/MainContainer.jsx';
import api from '../../lib/firebase.js';
import './Shell.scss';

export default class Shell extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      chats: {},
      users: {},
      chat: null
    };

    api.getUsers().then(users => this.setState({users: users}));

    api.getChats(this.props.user.id).then(chats => {
      if (chats) {
        let collection = {};
        chats.map(chat => collection[chat.id] = chat);
        this.setState({chats: collection});
      }
    });

    api.subscribeChatAdded(this.props.user.id, chat => {
      this.state.chats[chat.id] = chat;
      this.setState({chats: this.state.chats});
    });

    api.subscribeChatRemoved(this.props.user.id, chat => {
      this.state.chats[chat.chatId] = undefined;
      this.setState({chats: this.state.chats});
    });
  }

  openChat(userId) {
    api.createChat(this.props.user.id, userId)
      .then(chat => {
        this.setState({
          chat: chat
        });
    });
  }

  closeChat(chatId) {
    this.setState({
      chat: null
    });
  }

  render() {
    return <div className='shell'>
      <ChatsList
        user={this.props.user}
        chats={this.state.chats}
        selectChat={this.openChat.bind(this)} />

      <MainContainer
        chat={this.state.chat}
        users={this.state.users}
        openChat={this.openChat.bind(this)}
        closeChat={this.closeChat.bind(this)} />
    </div>
  }
}
