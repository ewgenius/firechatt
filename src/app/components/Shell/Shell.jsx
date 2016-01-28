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
  }

  openChat(userId) {
    api.createChat(this.props.user.id, userId).then(chat => {
      console.log(chat);
    });
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
      {this.props.user.name}
      users:<br/>
      {Object.keys(this.state.users).map((key, i) => <p key={i}>
        {this.state.users[key].name}
        <button onClick={(() => this.openChat(this.state.users[key].id))}>start chat</button>
      </p>)}
      chats:<br/>
    {Object.keys(this.state.chats).map((key, i) => <p key={i}>{this.state.chats[key].id}</p>)}
    </div>
  }
}
