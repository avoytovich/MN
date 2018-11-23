export default {
  wrap: {
    padding: '15px 40px'
  },
  wrapIcons: {
    marginTop: 10,
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'flex-start',
    alignContent: 'baseline'
  },
  icon: {
    margin: 10,
    width: 80,
    height: 80
  },
  actions: {
    marginTop: 10,
    display: 'flex'
  },
  title: {
    fontSize: 45,
    color: '#224483',
    fontWeight: '500'
  },
  cancel: {
    marginRight: 20
  },
  input: {
    width:'100%',
    height: 60,
    fontSize: 18,
    marginBottom: 18
  },
  forgorPassword:{
    fontWeight:'300',
    lineHeight: '10px',
    fontSize:17,
    color: '#224483',
    cursor: 'pointer',
    '&:hover': {
      color: 'rgba(42, 184, 184, 1)'
    }
  },
  submit:{
    marginTop: 40,
    width:'100%',
    backgroundColor: 'rgba(42, 184, 184, 1)',
    height:60,
    color:'white',
    fontSize: 17,
    textTransform: 'none',
    fontWeight:'bold',
    '&:hover': {
      backgroundColor: 'rgba(32, 67, 133, 1)'
    }
  },
  haveNotAccount:{
    fontSize: 20,
    color: 'rgba(32, 67, 133, 1)',

    marginTop:30,
    lineHeight: '30px'
  },
  signUp:{
    fontSize: '20px',
    color: 'rgba(42, 184, 184, 1)',
    lineHeight: '31.5px',
    fontWeight:'500',
    display:'inline-block',
    marginLeft:'10px',
    cursor: 'pointer',
    marginTop: '-3px'
  },
  changePassword:{
    marginTop: '10px',
    marginBottom: '30px'
  }
}