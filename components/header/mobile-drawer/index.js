import React from 'react';
import {  Menu, MenuItem, Badge,
  IconButton,
  Drawer,
  Button,
  List,
  Divider,
  ListItem,
  ListItemIcon,
  ListItemText,
  ListItemAvatar,
  Avatar
} from '@material-ui/core';
import ExpandMore from '@material-ui/icons/ExpandMore';
import MenuIcon from '@material-ui/icons/Menu';
import ClearIcon from '@material-ui/icons/Clear';
import { signOut } from 'actions/account';
import { getNewQuestions } from 'actions/questions';
import Link from 'next/link';
import withModal from 'services/decorators/withModal';
import ChangePasswordModal from 'components/landing/changePasswordModal';
import Router from 'next/router';
import { myRoleIs } from '../../../services/accountService';


@withModal(ChangePasswordModal)
class LongMenu extends React.Component {
  state = {
    open: false,
    newQuestions: 0,
    isAdmin: false
  };

  componentDidMount() {
    this.setState({
      isAdmin: myRoleIs(),
    })
  }

  openDrawer = async () => {

    this.setState({
      open: !this.state.open
    });
    try {
      const newQuestions = await getNewQuestions()
      this.setState({ newQuestions });
    } catch(e){
      console.log(e)
    }

  };

  closeDrawer = async () => {
    this.setState({
      open: false
    });
  };


  handleClose = () => {
    this.setState({ open: false });
  };

  handleChangePassword = () => {
    const { open } = this.props
    open(true)
  };

  handleLogout = async () => {
    this.handleClose()
    await signOut()
    Router.push({ pathname: '/' })
  }

  render() {
    const { open, newQuestions, isAdmin } = this.state;
    const { links, previewImage } = this.props
    return (
      <>
        {open
          ? (
            <IconButton className="app-bar-icon-button">
              <ClearIcon className="app-bar-icon" onClick={this.closeDrawer} />
            </IconButton>
          )
          : (
            <IconButton className="app-bar-icon-button">
              <MenuIcon className="app-bar-icon" onClick={this.openDrawer} />
            </IconButton>
          )

        }

        <Drawer
          anchor="top"
          open={open}
          onClose={this.toggleDrawer}
          elevation={60}
          BackdropProps={{invisible:true}}
          PaperProps={{
            elevation : 0,
            className: "app-bar-drawer app-bar-drawer-container app-bar-drawer-paper"
          }}
          ModalProps={{
            className: "app-bar-drawer app-bar-drawer-container"
          }}

        >
          <div
            tabIndex={0}
            role="button"
            onClick={this.toggleDrawer}
            onKeyDown={this.toggleDrawer}

          >
            <div>
              <List
                disablePadding
                className="app-bar-drawer-list"
              >
                {links.map((item, id) => {
                  const { route, title} = item;

                  return (

                      <ListItem
                        disableGutters
                        button
                        key={id}
                        className="app-bar-drawer-list-item"
                        onClick={() => { Router.push(route) }}
                      >
                        <ListItemText
                          disableTypography
                          className="app-bar-drawer-list-item-text"
                          primary={title}
                        />
                      </ListItem>

                  );
                })}
              </List>
              <Divider className="app-bar-drawer-list-divider" />
              <List
                disablePadding
                className="app-bar-drawer-list app-bar-drawer-action-links"
              >
                {!isAdmin && (
                  <>
                    <Link href={{ pathname: '/edit-profile'}}>
                      <ListItem
                        disableGutters
                        className="app-bar-drawer-list-item"
                        button
                      >
                        <ListItemAvatar>
                          <Avatar className="app-bar-drawer-list-item-avatar" src={previewImage} />
                        </ListItemAvatar>
                        <ListItemText
                          disableTypography
                          className="app-bar-drawer-list-item-text"
                          primary="EDIT PROFILE"
                        />
                      </ListItem>
                    </Link>
                    <Link href={{ pathname: '/questions'}}>
                      <ListItem
                        disableGutters
                        className="app-bar-drawer-list-item"
                        button
                      >
                        {newQuestions
                          ? (
                            <Badge
                              badgeContent={newQuestions}
                              color="error"
                              invisible={true}
                            >
                              <ListItemText
                                disableTypography
                                className="app-bar-drawer-list-item-text"
                                primary="QUESTIONS"
                              />
                            </Badge>
                          )
                          : (
                            <ListItemText
                              disableTypography
                              className="app-bar-drawer-list-item-text"
                              primary="QUESTIONS"
                            />
                          )
                        }

                      </ListItem>
                    </Link>
                    <ListItem
                      disableGutters
                      className="app-bar-drawer-list-item"
                      button
                      onClick={this.handleChangePassword}
                    >
                      <ListItemText
                        disableTypography
                        className="app-bar-drawer-list-item-text"
                        primary="CHANGE PASSWORD"
                      />
                    </ListItem>
                  </>
                  )}
                <ListItem
                  disableGutters
                  className="app-bar-drawer-list-item"
                  button
                  onClick={this.handleLogout}
                >
                  <ListItemText
                    disableTypography
                    className="app-bar-drawer-list-item-text"
                    primary="LOG OUT"
                  />
                </ListItem>
              </List>
            </div>
          </div>
        </Drawer>
      </>
    );
  }
}

export default LongMenu;
