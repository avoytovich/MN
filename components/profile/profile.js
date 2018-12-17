import { Component, Fragment } from 'react';
import MaleIcon from 'static/svg/male.svg'
import FemaleIcon from 'static/svg/female.svg'
import EditIcon from 'static/svg/edit.svg'
import RemoveIcon from 'static/svg/garbage.svg'
import { Form, Field , withFormik } from 'formik';
import { withStyles, Grid, TextField, Divider, Button, Modal, Paper } from '@material-ui/core';
import Router from 'next/router';
import './style.sass'
import { toggleSnackbar } from '../../actions/snackbar';
import { connect } from 'react-redux';
import styles from './styles'
import get from 'lodash/get'
import pick from 'lodash/pick'
import { wrapField } from 'services/materialformik'
import { uploadProfileImage } from 'actions/upload'
import DefaultAvatar from 'static/png/defaultAvatar.png'
import * as Yup from 'yup';
import ReactCrop from 'react-image-crop'
import './cropper.sass'


const imageMaxSize = 5550000 // bytes
const acceptedFileTypes = 'image/png, image/jpg, image/jpeg'
const acceptedFileTypesArray = acceptedFileTypes.split(",").map((item) => {return item.trim()})
@connect(
  null,
  { toggleSnackbar }
)
@withFormik({
  validationSchema: props => Yup.lazy(prop => props.schema),
  enableReinitialize: true,
  mapPropsToValues: props => {
    const user = get(props, 'user')
    const names = props.inputNames.map(input => input.name)
    return pick(user, [ ...names, "gender", "imageContent", "imageContentId"]);
  },
  handleSubmit : async (values, { props }) => {
    try {
      console.log(values)
      const data = await props.sumbmitRequest(values)
      props.toggleSnackbar('Success', 'success')
      props.handleSuccessRequest(data)
    } catch (e) {
      const { message} = e.response.data.errors[0]
      props.toggleSnackbar(message, 'error')
    }
  }
})
@withStyles(styles)
export default class Profile extends Component{
  constructor(props){
    super(props)
    this.fileInputRef = React.createRef()
    this.avatarRef = React.createRef()
    this.state = {
      open:false,
      imgSrc: null,
      crop: {
        aspect: 1/1.25
      },
      pixelCrop:{}
    }
  }

  componentDidUpdate(prevProps, prevState) {
    const { errors, toggleSnackbar } = this.props;
    if(prevProps.values.imageContentId == 0 &&
        errors.imageContentId !=
          prevProps.errors.imageContentId &&
            errors.imageContentId) {
              return toggleSnackbar(`${this.props.errors.imageContentId}`);
            }
  }

  /*componentDidMount() {
    const { errors, toggleSnackbar } = this.props;
    if(prevProps.values.imageContentId == 0 &&
      errors.imageContentId !=
      prevProps.errors.imageContentId &&
      errors.imageContentId) {
      return toggleSnackbar(`${this.props.errors.imageContentId}`);
    }
  }*/

  handleOpen = () => {
    this.setState({ open: true });
  };
  handleClose = () => {
    this.setState({ open: false });
  };
  handleChangeImgage = () =>{
    this.fileInputRef.current.click()
  }
  verifyFile = (files) => {
    if (files && files.length > 0){
      const currentFile = files[0]
      const currentFileType = currentFile.type
      const currentFileSize = currentFile.size
      if(currentFileSize > imageMaxSize) {
        const message = "Size of photo must be less than 5 mb."
        this.props.toggleSnackbar(message, 'error')
        return false
      }
      if (!acceptedFileTypesArray.includes(currentFileType)){
        const message = "This file is not allowed. Only images are allowed."
        this.props.toggleSnackbar(message, 'error')

        return false
      }
      return true
    }
  }
  uploadImage = async () =>{
    const { setFieldValue } = this.props;
    const { pixelCrop } = this.state
    const image = this.imageRef
    const fileName = this.fileInputRef.current.files.item(0).name
    const canvas = document.createElement("canvas");
    canvas.width = pixelCrop.width;
    canvas.height = pixelCrop.height;
    const ctx = canvas.getContext("2d");

    ctx.drawImage(
      image,
      pixelCrop.x,
      pixelCrop.y,
      pixelCrop.width,
      pixelCrop.height,
      0,
      0,
      pixelCrop.width,
      pixelCrop.height
    );

    let croppedImage = canvas.toDataURL();
    this.avatarRef.current.src =  croppedImage
    const res = await fetch(croppedImage)
    const blob = await res.blob()
    const form = new FormData()

    form.append('file', blob, fileName)
    try {
      const data = await uploadProfileImage(form)
      setFieldValue('imageContentId', data.id)
    }
    catch (e) {
      const { message} = e.response.data.errors[0]
      this.props.toggleSnackbar(message, 'error')
    }
    this.handleClose()
}

  handleFileSelect = event => {
    const files = event.target.files
    if (files && files.length > 0){
      const isVerified = this.verifyFile(files)
      if (isVerified){
        // imageBase64Data
        const currentFile = files[0]
        const myFileItemReader = new FileReader()
        myFileItemReader.addEventListener("load", ()=>{
          // console.log(myFileItemReader.result)
          const myResult = myFileItemReader.result
          this.setState({
            imgSrc: myResult,
            open: true
          })
        }, false)

        myFileItemReader.readAsDataURL(currentFile)

      }
    }
  }
  handleClearToDefault = event =>{
    if (event) event.preventDefault()
    this.setState({
      open:false,
      imgSrc: null,
      imgSrcExt: null,
      crop: {
        aspect: 1/1
      },
      pixelCrop:{}

    })
    this.fileInputRef.current.value = null
  }

  handleImageLoaded = (image) => {
    this.imageRef = image
  }
  handleOnCropChange = (crop) => {
    this.setState({crop:crop})
  }
  handleOnCropComplete = async (crop, pixelCrop) =>{
    this.setState({crop,pixelCrop });
  }

  handleSpecialErrorValidation = () => {
    const { values, errors, toggleSnackbar } = this.props;
    values.imageContentId == 0 && errors.imageContentId &&
      toggleSnackbar(`${this.props.errors.imageContentId}`);
  }

  handleCancel = () => {
    Router.back()
  }


  render() {
    const { classes, setFieldValue, handleBlur, handleChange, close, errors, values, isMember, inputNames } = this.props;
    const { imageContent } = values
    const { imgSrc } = this.state
    const inputs = inputNames.map(input => {
      return(
        <Field
          className={classes.input}
          value={values[input.name]}
          type="text"
          name={input.name}
          label={input.label}
          fullWidth
          component={wrapField}
          inputProps={{
            className: classes.innerInput
          }}
          InputLabelProps={{
            className: classes.label
          }}
        />
      )
    })
    const leftTopInputs = inputs.slice(0,1)
    const leftBottomInputs = inputs.slice(1,3)
    const rightInputs = inputs.slice(3,7)
    const bottomInput = inputs.slice(7)
    return (

     <Fragment>
       <Modal
         open={this.state.open}
         onClose={this.handleClose}
       >
         <Paper className="profile-modal-wrapper">
             <h1 className="profile-modal-title">Choose Profile Photo</h1>
             <p className="profile-modal-description">To crop this image,drag the region below and click “Save”</p>
           <Divider className="profile-modal-divider"/>
           <div className="profile-modal-crop-container">
             <ReactCrop
                 src={imgSrc}
                 crop={this.state.crop}
                 onImageLoaded={this.handleImageLoaded}
                 onComplete = {this.handleOnCropComplete}
                 onChange={this.handleOnCropChange}
             />
           </div>
             <div className="profile-modal-btns-container">
               <Button className="profile-modal-btn profile-modal-btn-back" onClick={this.handleClearToDefault}>
                 Back
               </Button>
               <Button
                 className="profile-modal-btn profile-modal-btn-save"
                 onClick={this.uploadImage}
               >
                 Save
               </Button>
             </div>
         </Paper>
       </Modal>
        <Divider />
        <Grid container justify="center">
          <Grid className={classes.wrap}>
            <Form >
              <Grid container>
                  <Grid container justify="center">
                    <img
                      src={imageContent ? imageContent.mediumImage : DefaultAvatar}
                      className="profile-img"
                      ref={this.avatarRef}
                    />
                    <Grid>
                      <Grid container direction="column">
                        <h3 className="profile-title">Profile Picture</h3>
                        <h4 onClick={this.handleChangeImgage} className="profile-action">
                          <img src={EditIcon} className="profile-action-img profile-action-edit-img"/>
                          { imageContent ? 'Change' : 'Add' }
                        </h4>
                        {imageContent && (
                          <h4 className="profile-action"
                              onClick={()=>{
                                setFieldValue('imageContentId', 0)
                                this.avatarRef.current.src =  DefaultAvatar
                              }}>
                            <img src={RemoveIcon} className="profile-action-img profile-action-remove-img"/>
                            Remove
                          </h4>
                        )}
                        <input
                          ref={this.fileInputRef}
                          type='file'
                          accept={acceptedFileTypes}
                          multiple={false}
                          style={{display:'none'}}
                          onChange={this.handleFileSelect}
                        />
                      </Grid>
                    </Grid>
                  </Grid>
                  <Grid className={classes.wrapInputs} container justify="center">
                    <Grid item xs={6} className={classes.leftInputs}>
                      <Grid container direction="column">
                        {leftTopInputs}
                        <h1 className="profile-input-title">Your Gender</h1>
                        <div className="profile-genders-container">
                          <p
                            className="profile-gender"
                            onClick={()=>{setFieldValue('gender', 'Male')}}
                            style={ { opacity: values.gender === 'Male' ? '1' : '0.5' } }
                          >
                            <img src={MaleIcon} />
                            Male
                          </p>
                          <p
                            className="profile-gender"
                            onClick={()=>{setFieldValue('gender', 'Female')}}
                            style={ { opacity: values.gender === 'Female' ? '1' : '0.5' } }
                          >
                            <img src={FemaleIcon} />
                            Female
                          </p>
                        </div>
                        {leftBottomInputs}
                      </Grid>
                    </Grid>
                    <Grid item xs={6} className={classes.rightInputs}>
                      <Grid container direction="column">
                        {rightInputs}
                      </Grid>
                    </Grid>
                    {bottomInput}
                    <div className="profile-btns-container">
                      <Button
                        className="profile-btn profile-btn-cancel"
                        onClick={this.handleCancel}
                      >
                        Cancel
                      </Button>
                      <Button
                        type="submit"
                        className="profile-btn profile-btn-add"
                        onClick={() => this.handleSpecialErrorValidation()}
                      >
                        Save
                      </Button>
                    </div>
                  </Grid>
              </Grid>
            </Form>
          </Grid>
        </Grid>
     </Fragment>
    );
  }
}
