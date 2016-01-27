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
import './ChatsList.scss';

export default class ChatsList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedIndex: -1
    };
  }

  selectChat(index) {
    this.setState({selectedIndex: index});
    this.props.selectChat(index);
  }

  getChatsList(chats) {
    if(chats) {
      return Object.keys(chats).map((key, i) => {
        var chat = chats[key];
        return <ListItem
          value={i}
          key={i}
          primaryText={chat.name}
          secondaryText={chat.message}
          onClick={() => {this.selectChat(i)}}
          leftAvatar={
            <Avatar src={chat.picture}/>
          }/>
      })
    }
  }

  render() {
    console.log(this.props.users);
    return <div className='chats-list'>
      <AppBar title='chat list'/>
      <div className='chats-list-container'>
        <SelectableList valueLink={{
          value: this.state.selectedIndex
        }}>
          {this.getChatsList(this.props.users)}
        </SelectableList>
      </div>
    </div>
  }
}
