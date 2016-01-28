import React from 'react';
import AppBar from 'material-ui/lib/app-bar';
import Avatar from 'material-ui/lib/avatar';
import IconButton from 'material-ui/lib/icon-button';
import IconMenu from 'material-ui/lib/menus/icon-menu';
import CloseIcon from 'material-ui/lib/svg-icons/navigation/close';
import MenuItem from 'material-ui/lib/menus/menu-item';
import './ChatContainer.scss';

export default class ChatContainer extends React.Component {
  render() {
    return <div className='chat-container'>
      <AppBar
        title={this.props.chat.opponent.name}
        iconElementLeft={
          <Avatar
            className="chat-avatar"
            src={this.props.chat.opponent.picture}/>
        }
        iconElementRight={
          <IconButton onClick={() => this.props.closeChat(this.props.chat.id)}><CloseIcon/></IconButton>}/>

      <div className="messages-pane">
        <div className="message">message</div>
        <div className="message">message</div>
        <div className="message">message</div>
        <div className="message">message</div>
        <div className="message">message</div>
        <div className="message">message</div>
        <div className="message">message</div>
        <div className="message">message</div>
        <div className="message">message</div>
      </div>
      <div className="message-control">

      </div>
    </div>
  }
}
