import React from 'react';
import AppBar from 'material-ui/lib/app-bar';
import Avatar from 'material-ui/lib/avatar';
import IconButton from 'material-ui/lib/icon-button';
import IconMenu from 'material-ui/lib/menus/icon-menu';
import CloseIcon from 'material-ui/lib/svg-icons/navigation/close';
import SendIcon from 'material-ui/lib/svg-icons/content/send';
import MenuItem from 'material-ui/lib/menus/menu-item';
import api from '../../lib/firebase.js';
import './ChatContainer.scss';

export default class ChatContainer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      message: ''
    };
  }

  onChange(event) {
    this.setState({message: event.target.value});
  }

  sendMessage() {
    api.sendMessage(this.props.chat.id, this.props.user.id, this.state.message);
    this.setState({message: ''});
  }

  renderMessages() {
    if (this.props.messages) {
      return this.props.messages.map((message, i) => {
        var messageClass = message.user === this.props.user.id
          ? 'right'
          : 'left';
        return <div key={i} className={`message ${messageClass}`}>{message.text}</div>
      });
    }
  }

  onKeyPress(event) {
    if(event.charCode === 13)
      this.sendMessage();
  }

  render() {
    return <div className='chat-container'>
      <AppBar title={this.props.chat.opponent.name} iconElementLeft={<Avatar className="chat-avatar" src={this.props.chat.opponent.picture}/>} iconElementRight={<IconButton onClick={() => this.props.closeChat(this.props.chat.id)}><CloseIcon/></IconButton>}/>

      <div className="messages-container">
        <div className="messages-pane">
          {this.renderMessages()}
        </div>
      </div>
      <div className="message-control">
        <input
          value={this.state.message}
          onKeyPress={this.onKeyPress.bind(this)}
          onChange={this.onChange.bind(this)}/>
        <IconButton onClick={this.sendMessage.bind(this)}>
          <SendIcon/>
        </IconButton>
      </div>
    </div>
  }
}
