import React from 'react';
import Firebase from 'firebase';
import ChatsList from '../ChatsList/ChatsList.jsx';
import UsersList from '../UsersList/UsersList.jsx';
import MainContainer from '../MainContainer/MainContainer.jsx';
import './Shell.scss';

/*<ChatsList
  chats={this.props.chats}
  selectChat={this.selectChat.bind(this)}
  logout={this.props.logout}/>*/

export default class Shell extends React.Component {
  constructor(props) {
    super(props);
  }

  selectChat(index) {
    if (index !== null && this.state.chats[index])
      this.setState({chat: this.state.chats[index]});
    else
      this.setState({chat: null});
  }

  createChat(id) {

  }

  render() {
    return <div className='shell'>
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
  }
}
