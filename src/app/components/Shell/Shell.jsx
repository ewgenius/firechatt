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
      users: {}
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
      console.log(chat);
      this.state.chats[chat.chatId] = undefined;
      this.setState({chats: this.state.chats});
    });
  }

  openChat(userId) {
    api.createChat(this.props.user.id, userId).then(chat => {});
  }

  render() {
    /*var old = <div className='shell'>
      <ChatsList
        user={this.props.user}
        chats={this.props.chats}
        selectChat={this.selectChat.bind(this)}
        logout={this.props.logout}/>
      <UsersList
        users={this.props.users}
        selectUser={this.createChat.bind(this)}/>
      <MainContainer chat={null}/>
    </div>
*/
    return <div className='shell'>
      users:<br/>
      {Object.keys(this.state.users).map((key, i) => <p key={i}>
        {this.state.users[key].name}
        <button onClick={(() => this.openChat(this.state.users[key].id))}>start chat</button>
      </p>)}

      chats:<br/>
      {Object.keys(this.state.chats).map((key, i) => <p key={i}>
        {this.state.chats[key].opponent.name}
      </p>)}
    </div>
  }
}
