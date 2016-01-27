import React from 'react';
import ChatContainer from '../ChatContainer/ChatContainer.jsx';
import './MainContainer.scss';

export default class MainContainer extends React.Component {
  getContent() {
    if (this.props.chat)
      return <ChatContainer chat={this.props.chat}/>
  }

  render() {
    return <div className='main-container'>
      {this.getContent()}
    </div>
  }
}
