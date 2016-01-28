import React from 'react';
import ChatContainer from '../ChatContainer/ChatContainer.jsx';
import './MainContainer.scss';

export default class MainContainer extends React.Component {
  getContent() {
    if (this.props.chat)
      return <ChatContainer chat={this.props.chat} closeChat={this.props.closeChat}/>
    else
      return Object.keys(this.props.users).map((key, i) => <p key={i}>
        {this.props.users[key].name}
        <button onClick={(() => this.props.openChat(this.props.users[key].id))}>start chat</button>
      </p>);
  }

  render() {
    return <div className='main-container'>
      {this.getContent()}
    </div>
  }
}
