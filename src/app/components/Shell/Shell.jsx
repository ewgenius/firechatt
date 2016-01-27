import React from 'react';
import Firebase from 'firebase';
import AppBar from 'material-ui/lib/app-bar';
import IconButton from 'material-ui/lib/icon-button';
import NavigationMenu from 'material-ui/lib/svg-icons/navigation/menu';
import NavigationClose from 'material-ui/lib/svg-icons/navigation/close';
import LeftNav from 'material-ui/lib/left-nav';
import MenuItem from 'material-ui/lib/menus/menu-item';

import './Shell.scss';

import Avatar from 'material-ui/lib/avatar';
import List from 'material-ui/lib/lists/list';
import ListItem from 'material-ui/lib/lists/list-item';
import Divider from 'material-ui/lib/divider';
import {SelectableContainerEnhance} from 'material-ui/lib/hoc/selectable-enhance';
let SelectableList = SelectableContainerEnhance(List);

class Chats extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedIndex: 0
    };
  }

  selectChat(index) {
    this.setState({
      selectedIndex: index
    });
    this.props.selectChat(index);
  }

  render() {
    return <div className='chats'>
      <AppBar title='chat list'/>
      <div className='chats-list'>
        <SelectableList valueLink={{
          value: this.state.selectedIndex
        }}>
          {this.props.chats.map(chat =>
            <ListItem
              value={chat.id}
              key={chat.id}
              primaryText={`${chat.id}: ${chat.name}`}
              secondaryText={chat.message}
              onClick={() => {this.selectChat(chat.id)}}
              leftAvatar={
                <Avatar src={`https://robohash.org/${chat.id}.png?bgset=any`}/>
              }/>)
          }
        </SelectableList>
      </div>
    </div>
  }
}

class ChatContainer extends React.Component {
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

class MainContainer extends React.Component {
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

export default class Shell extends React.Component {
  constructor(props) {
    super(props);
    this.firebase = new Firebase('https:firechatt.firebaseio.com/items/');
    this.state = {
      chat: null,
      chats: [
        {
          id: 1,
          name: 'Test Testovich',
          message: 'test message'
        }, {
          id: 2,
          name: 'Test Testovich',
          message: 'test message'
        }, {
          id: 3,
          name: 'Test Testovich',
          message: 'test message'
        }, {
          id: 4,
          name: 'Test Testovich',
          message: 'test message'
        }, {
          id: 5,
          name: 'Test Testovich',
          message: 'test message'
        }, {
          id: 6,
          name: 'Test Testovich',
          message: 'test message'
        }, {
          id: 7,
          name: 'Test Testovich',
          message: 'test message'
        }, {
          id: 8,
          name: 'Test Testovich',
          message: 'test message'
        }, {
          id: 9,
          name: 'Test Testovich',
          message: 'test message'
        }, {
          id: 10,
          name: 'Test Testovich',
          message: 'test message'
        }, {
          id: 12,
          name: 'Test Testovich',
          message: 'test message'
        }, {
          id: 13,
          name: 'Test Testovich',
          message: 'test message'
        }, {
          id: 14,
          name: 'Test Testovich',
          message: 'test message'
        }, {
          id: 15,
          name: 'Test Testovich',
          message: 'test message'
        }, {
          id: 16,
          name: 'Test Testovich',
          message: 'test message'
        }, {
          id: 17,
          name: 'Test Testovich',
          message: 'test message'
        }, {
          id: 18,
          name: 'Test Testovich',
          message: 'test message'
        }, {
          id: 19,
          name: 'Test Testovich',
          message: 'test message'
        }, {
          id: 21,
          name: 'Test Testovich',
          message: 'test message'
        }, {
          id: 22,
          name: 'Test Testovich',
          message: 'test message'
        }, {
          id: 23,
          name: 'Test Testovich',
          message: 'test message'
        }
      ]
    };
  }

  selectChat(id) {
    if (id && this.state.chats[id])
      this.setState({chat: this.state.chats[id]});
    else
      this.setState({chat: null});
    }

  render() {
    return <div className='shell'>
      <Chats chats={this.state.chats} selectChat={this.selectChat.bind(this)}/>
      <MainContainer chat={this.state.chat}/>
    </div>
  }
}
