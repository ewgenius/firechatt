import React from 'react';
import MyTheme from './theme';
import ThemeManager from 'material-ui/lib/styles/theme-manager';
import ThemeDecorator from 'material-ui/lib/styles/theme-decorator';
import Card from 'material-ui/lib/card/card';
import CardActions from 'material-ui/lib/card/card-actions';
import CardHeader from 'material-ui/lib/card/card-header';
import CardMedia from 'material-ui/lib/card/card-media';
import CardTitle from 'material-ui/lib/card/card-title';
import FlatButton from 'material-ui/lib/flat-button';
import Shell from './components/Shell/Shell.jsx';
import api from './lib/firebase.js';

const styles = {
  login: {
    position: 'fixed',
    top: 0,
    bottom: 0,
    right: 0,
    left: 0,
    width: '100%',
    height: '100%'
  },
  loginCard: {
    width: '320px',
    margin: '64px auto 0',
    padding: '16px'
  },
  loginButton: {
    margin: '0 auto'
  }
}

export default class App extends React.Component {
  constructor() {
    super();
    this.state = {
      user: null
    }
  }

  getChildContext() {
    return {muiTheme: ThemeManager.getMuiTheme(MyTheme)};
  }

  login() {
    api.authorize().then(auth => {
      var profile = auth.google;
      api.getUser(profile.id).then(user => {
        this.setState({user: user});
      }).catch(err => {
        api.setUser(profile.id, profile.cachedUserProfile);
        this.setState({user: profile});
      });
    });
  }

  logout() {
    this.setState({user: null});
  }

  render() {
    if (this.state.user)
      return <Shell user={this.state.user}/>
    else
      return <div className='login' style={styles.login}>
        <Card style={styles.loginCard}>
          <CardHeader title={<b>Welcome in Firechatt!</b>}/>
          <FlatButton style={styles.loginButton} label="LOGIN" onClick={this.login.bind(this)}/>
        </Card>
      </div>
  }
}
App.childContextTypes = {
  muiTheme: React.PropTypes.object
}
