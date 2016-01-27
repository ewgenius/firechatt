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
          let chats = null;
          // if there is no such id in users, create one
          if (snapshot.val() === null) {
            this.self.set(user.cachedUserProfile);
            chats = this.self.child('chats');
            chats.set({});
          } else {
            let user = snapshot.val();
            chats = this.self.child('chats');
          }

          chats.on('value', snapshot => {
            let chats = snapshot.val();
            if(chats) this.setState({chats: chats});
          });
        });

        // get all users
        this.users.on('value', snapshot => {
          this.setState({users: snapshot.val()});
        });
      });
    });
  }

  logout() {
    this.setState({
      user: null,
      chats: null
    });
  }

  render() {
    if (this.state.user)
      return <div>
        <Shell
          user={this.state.user}
          users={this.state.users}
          chats={this.state.chats}
          onLogout={this.logout.bind(this)}/>
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
