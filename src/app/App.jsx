import React from 'react';
import MyTheme from './theme';
import ThemeManager from 'material-ui/lib/styles/theme-manager';
import ThemeDecorator from 'material-ui/lib/styles/theme-decorator';
import Shell from './components/Shell/Shell.jsx';

export default class App extends React.Component {
  constructor() {
    super();
    this.firebase = new Firebase('https://firechatt.firebaseio.com/items/');
    this.self = null;
    this.users = this.firebase.child('users');
    this.allchats = this.firebase.child('chats');
    this.chats = null;
    this.state = {
      user: null,
      users: null,
      chats: null
    }
  }

  getChildContext() {
    return {muiTheme: ThemeManager.getMuiTheme(MyTheme)};
  }

  login() {
    return new Promise((resolve, reject) => {
      this.firebase.authWithOAuthPopup('google', function(error, authData) {
        if (error)
          reject(error);
        else
          resolve(authData);
        }
      ).then(auth => {
        var user = auth.google;
        //localStorage.setItem('user', user.id);
        this.setState({user: user});

        this.self = this.users.child(user.id);
        this.self.on('value', snapshot => {
          // if there is no such id in users, create one
          if (snapshot.val() === null) {
            this.self.set(user.cachedUserProfile);
            this.chats = this.self.child('chats');
            chats.set({});
          } else {
            let user = snapshot.val();
            this.chats = this.self.child('chats');
          }

          this.chats.on('value', snapshot => {
            let chats = snapshot.val();
            if (chats)
              this.setState({chats: chats});
            }
          );
        });

        // get all users
        this.users.on('value', snapshot => {
          this.setState({users: snapshot.val()});
        });
      });
    });
  }

  logout() {
    this.setState({user: null, chats: null});
  }

  createChat(userId) {
    if (this.chats) {
      var chatId = `${this.state.user.id}_${userId}`;
      if (this.state.chats[chatId])
        this.openChat();
      else
        this.users.child(userId).on('value', snapshot => {
          let user = snapshot.val();
          if (user) {
            this.allchats.child(chatId).set({
              user1: {
                id: this.state.user.cachedUserProfile.id,
                name: this.state.user.cachedUserProfile.name,
                picture: this.state.user.cachedUserProfile.picture
              },
              user2: {
                id: user.id,
                name: user.name,
                picture: user.picture
              }
            });
            this.chats.child(chatId).set({chatId: chatId});
          }
        });
      }
    }

  openChat(chatId) {
    
  }

  deleteChat() {}

  render() {
    if (this.state.user)
      return <div>
        <Shell user={this.state.user} users={this.state.users} chats={this.state.chats} createChat={this.createChat.bind(this)} deleteChat={this.deleteChat.bind(this)} onLogout={this.logout.bind(this)}/>
      </div>
    else
      return <div>
        <button onClick={this.login.bind(this)}>authorize</button>
      </div>
  }
}

App.childContextTypes = {
  muiTheme: React.PropTypes.object
};
