import React from 'react';
import MyTheme from './theme';
import ThemeManager from 'material-ui/lib/styles/theme-manager';
import ThemeDecorator from 'material-ui/lib/styles/theme-decorator';
import Card from 'material-ui/lib/card/card';
import CardActions from 'material-ui/lib/card/card-actions';
import CardHeader from 'material-ui/lib/card/card-header';
import CardText from 'material-ui/lib/card/card-text';
import CardTitle from 'material-ui/lib/card/card-title';
import RaisedButton from 'material-ui/lib/raised-button';
import Shell from './components/Shell/Shell.jsx';
import api from './lib/firebase.js';
import './App.scss';

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
      return <div className='login'>
        <Card className='login-card'>
          <CardHeader title='Welcome to Firechatt!'/>
          <CardText>
            Simple messenger based on firebase, made with react and material-ui.
            <br/>
            <br/>
            Source code: <a href='https://github.com/ewgenius/firechatt' target='_blank'>github.com/ewgenius/firechatt</a>
          </CardText>
          <CardActions>
            <RaisedButton label='login' onClick={this.login.bind(this)}/>
          </CardActions>
        </Card>
        <div className='about'>
          Author: Evgeniy Khramkov
          <br />
          <a href='github.com/ewgenius' target='_blank'>https://github.com/ewgenius</a>
        </div>
      </div>
  }
}
App.childContextTypes = {
  muiTheme: React.PropTypes.object
}
