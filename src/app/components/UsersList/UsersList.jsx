import React from 'react';
import AppBar from 'material-ui/lib/app-bar';
import Avatar from 'material-ui/lib/avatar';
import IconButton from 'material-ui/lib/icon-button';
import IconMenu from 'material-ui/lib/menus/icon-menu';
import MoreVertIcon from 'material-ui/lib/svg-icons/navigation/more-vert';
import MenuItem from 'material-ui/lib/menus/menu-item';
import List from 'material-ui/lib/lists/list';
import ListItem from 'material-ui/lib/lists/list-item';
import {SelectableContainerEnhance} from 'material-ui/lib/hoc/selectable-enhance';
let SelectableList = SelectableContainerEnhance(List);
import './UsersList.scss';

export default class UsersList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedIndex: -1
    };
  }

  selectUser(index, id) {
    this.setState({selectedIndex: index});
    this.props.openChat(id);
  }

  getUsersList(users) {
    if(users) {
      return Object.keys(users).map((key, i) => {
        var user = users[key];
        return <ListItem
          value={i}
          key={i}
          primaryText={user.name}
          onClick={() => {this.selectUser(i, user.id)}}
          leftAvatar={
            <Avatar src={user.picture}/>
          }/>
      })
    }
  }

  render() {
    return <div className='users-list'>
      <SelectableList valueLink={{
        value: this.state.selectedIndex
      }}>
        {this.getUsersList(this.props.users)}
      </SelectableList>
    </div>
  }
}
