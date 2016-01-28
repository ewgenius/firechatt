import React from 'react';
import ChatContainer from '../ChatContainer/ChatContainer.jsx';
import UsersList from '../UsersList/UsersList.jsx';
import './MainContainer.scss';

export default class MainContainer extends React.Component {
  getContent() {
    if (this.props.chat)
      return <ChatContainer
        user={this.props.user}
        chat={this.props.chat}
        messages={this.props.messages}
        closeChat={this.props.closeChat}/>
    else
      return <UsersList
        users={this.props.users}
        openChat={this.props.openChat}
        />
  }

  render() {
    return <div className='main-container'>
      {this.getContent()}
    </div>
  }
}
