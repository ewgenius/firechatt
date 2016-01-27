import React from 'react';
import Firebase from 'firebase';
import ChatsList from '../ChatsList/ChatsList.jsx';
import UsersList from '../UsersList/UsersList.jsx';
import MainContainer from '../MainContainer/MainContainer.jsx';
import './Shell.scss';

/*<ChatsList users={this.props.users} chats={this.props.chats} selectChat={this.selectChat.bind(this)} logout={this.props.logout}/>*/

export default class Shell extends React.Component {
  constructor(props) {
    super(props);
    this.firebase = new Firebase('https:firechatt.firebaseio.com/items/');
    this.state = {
      chat: null,
      chats: [
        {
          id: 0,
          name: 'Test Testovich',
          message: 'test message'
        },
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

  selectChat(index) {
    if (index !== null && this.state.chats[index])
      this.setState({chat: this.state.chats[index]});
    else
      this.setState({chat: null});
  }

  createChat(userId) {
    console.log(id);
  }

  render() {
    return <div className='shell'>

      <UsersList users={this.props.users} selectUser={this.createChat.bind(this)}/>
      <MainContainer chat={this.state.chat}/>
    </div>
  }
}
