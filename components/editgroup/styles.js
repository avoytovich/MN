const styles = theme => ({
  wrapper: {
    backgroundColor: '#e7e7e7',
    minHeight: '700px',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    padding: '44px 0'
  },
  label: {
    fontSize: 15,
    fontWeight: 600,
    color: '#a3abb5',
    letterSpacing: 'normal'
  },
  text: {
    fontSize: 19,
    fontWeight: 400,
    color: '#5f6368'
  },
  paper: {
    width: '100%',
    maxWidth: 600,
    marginBottom: 22,
    backgroundColor: '#fff',
    padding: '45px 30px',
    boxShadow: '0 6px 12px 0 rgba(105, 105, 105, 0.02)'
  },
  title: {
    display: 'inline-block',
    fontSize: 24,
    color: '#224483',
    fontWeight: 'bold'
  },
  addButton: {
    width: 85,
    height: 34,
    padding: 1
  },
  plusIcon: {
    width: 22,
    height: 22,
    backgroundImage: 'url(/static/png/white@2x.png)',
    backgroundSize: 'cover',
    backgroundRepeat: 'no-repeat',
    marginRight: 2
  },
  addText: {
    fontSize: 14,
    color: '#fff',
    fontWeight: 'bold',
    letterSpacing: 'normal'
  },
  actions: {
    display: 'flex',
    width: 600,
    marginBottom: 20
  },
  cancelBtn: {
    boxSizing: 'border-box',
    fontSize: 14,
    color: '#224483',
    marginRight: 17,
    border: '1px solid #224483',
    width: 100,
    height: 34,
    outline: 'none',
    '&:hover': {
      backgroundColor: '#224483',
      color: '#fff',
      border: 'none'
    }
  },
  applyBtn: {
    width: 100,
    height: 34
  },
  link: {
    margin: 0
  },
  iconWrapper: {
    display: 'flex',
    alignItems: 'center',
    marginTop: 30
  },
  icon: {
    width: 80,
    height: 80,
    backgroundSize: 'contain',
    marginRight: 20,
    cursor: 'pointer'
  },
  sgi: {
    cursor: 'pointer',
    fontSize: 19,
    fontWeight: 400,
    color: '#a3abb5'
  },
  eg: {
    fontSize: 20,
    fontWeight: 600,
    color: '#224483'
  }
});

export default styles;
