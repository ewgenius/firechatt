import React from 'react';
import AppBar from 'material-ui/lib/app-bar';
import Avatar from 'material-ui/lib/avatar';

export default class ChatContainer extends React.Component {
  render() {
    return <div className='chat-container'>
      <AppBar
        title={this.props.chat.name}
        iconElementLeft={
          <Avatar className="chat-avatar" src={`https://robohash.org/${this.props.chat.id}.png?bgset=any`}/>
        }/>
    </div>
  }
}
