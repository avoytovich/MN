import { createStyles } from '@material-ui/core';

const styles = () =>
  createStyles({
    wrapper: {
      display: 'flex',
      flexDirection: 'column',
      minHeight: 'calc(100vh - 300px)',
      backgroundColor: '#f3f5f7',
      alignItems: 'center',
      position: 'relative',
      paddingBottom: 20
    },
    avatar: {
      margin: 'auto auto',
      width: '100%',
      height: '100%'
    },
    line: {
      display: 'block',
      marginTop: 40,
      maxWidth: 700,
      width: '100%',
      marginBottom: 40
    },
    circleWrapper: {
      marginTop: 40,
      width: 230,
      display: 'block',
      height: 230,
      boxShadow: '-4.7px 3.8px 6px 0 rgba(105, 105, 105, 0.08)',
      padding: 10,
      borderRadius: '50%',
      backgroundColor: '#fff'
    },
    buttons: {
        maxWidth: 700,
        width: '100%'
    }
  });

export default styles;