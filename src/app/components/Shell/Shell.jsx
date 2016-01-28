import React from 'react';
import Firebase from 'firebase';
import ChatsList from '../ChatsList/ChatsList.jsx';
import UsersList from '../UsersList/UsersList.jsx';
import MainContainer from '../MainContainer/MainContainer.jsx';
import './Shell.scss';

export default class Shell extends React.Component {
  constructor(props) {
    super(props);
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
    </div>
  }
}
