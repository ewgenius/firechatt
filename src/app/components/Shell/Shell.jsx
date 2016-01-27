import React from 'react';
import Firebase from 'firebase';
import AppBar from 'material-ui/lib/app-bar';
import IconButton from 'material-ui/lib/icon-button';
import NavigationMenu from 'material-ui/lib/svg-icons/navigation/menu';
import LeftNav from 'material-ui/lib/left-nav';
import MenuItem from 'material-ui/lib/menus/menu-item';

import './Shell.scss';

import Avatar from 'material-ui/lib/avatar';
import List from 'material-ui/lib/lists/list';
import ListItem from 'material-ui/lib/lists/list-item';
import Divider from 'material-ui/lib/divider';
import CommunicationChatBubble from 'material-ui/lib/svg-icons/communication/chat-bubble';

class Chats extends React.Component {
  render() {
    return <div className="chats">
      <AppBar/>
      <div className="chats-list">
        <List>
          { this.props.chats.map(chat =>
            <ListItem
              key={chat.id}
              primaryText={chat.name}
              secondaryText={chat.message}
              leftAvatar={
                <Avatar src={`https://robohash.org/${chat.id}.png?bgset=any`}/>
              }/>
          ) }
        </List>
      </div>
    </div>
  }
}

class ChatContainer extends React.Component {
  render() {
    return <div className="chat-container">
      container
    </div>
  }
}

export default class Shell extends React.Component {
  constructor(props) {
    super(props);
    this.firebase = new Firebase("https:firechatt.firebaseio.com/items/");
    this.state = {
      chats: [
        {id: 1, name: 'Test Testovich', message: 'test message'},
        {id: 2, name: 'Test Testovich', message: 'test message'},
        {id: 3, name: 'Test Testovich', message: 'test message'},
        {id: 4, name: 'Test Testovich', message: 'test message'},
        {id: 5, name: 'Test Testovich', message: 'test message'},
        {id: 6, name: 'Test Testovich', message: 'test message'},
        {id: 7, name: 'Test Testovich', message: 'test message'},
        {id: 8, name: 'Test Testovich', message: 'test message'},
        {id: 9, name: 'Test Testovich', message: 'test message'},
        {id: 10, name: 'Test Testovich', message: 'test message'},
        {id: 12, name: 'Test Testovich', message: 'test message'},
        {id: 13, name: 'Test Testovich', message: 'test message'},
        {id: 14, name: 'Test Testovich', message: 'test message'},
        {id: 15, name: 'Test Testovich', message: 'test message'},
        {id: 16, name: 'Test Testovich', message: 'test message'},
        {id: 17, name: 'Test Testovich', message: 'test message'},
        {id: 18, name: 'Test Testovich', message: 'test message'},
        {id: 19, name: 'Test Testovich', message: 'test message'},
        {id: 21, name: 'Test Testovich', message: 'test message'},
        {id: 22, name: 'Test Testovich', message: 'test message'},
        {id: 23, name: 'Test Testovich', message: 'test message'},
      ]
    };
  }

  render() {
    return <div className="shell">
      <Chats chats={this.state.chats}/>
      <ChatContainer/>
    </div>
  }
}
