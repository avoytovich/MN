import { Component, Fragment } from 'react';
import MaleIcon from 'static/svg/male.svg'
import FemaleIcon from 'static/svg/female.svg'
import EditIcon from 'static/svg/edit.svg'
import RemoveIcon from 'static/svg/garbage.svg'
import { Formik, Form, Field , withFormik } from 'formik';
import { withStyles, Grid, TextField, Divider, Button, Modal, Paper } from '@material-ui/core';
import './style.sass'
import { Link } from '../../routes';
import { toggleSnackbar } from '../../actions/snackbar';
import * as Yup from 'yup';
import { signIn } from '../../actions/account';
import { connect } from 'react-redux';
import Router from 'next/router';
import styles from './styles'
import get from 'lodash/get'
import pick from 'lodash/pick'
import { wrapField } from 'services/materialformik'
import { editProfile } from 'actions/profile'
import { createMember, editMember } from 'actions/member'
import { uploadProfileImage } from 'actions/upload'
import DefaultAvatar from 'static/png/defaultAvatar.png'
import { getSingle } from 'actions/groups';

import ReactCrop from 'react-image-crop'
import './cropper.sass'


const inputNames = [
  { name:"firstName", label:"First Name"},
  { name:"city", label:"City"},
  { name:"title", label:"Position"},
  { name:"lastName", label:"Last Name"},
  { name:"email", label:"Email" },
  { name:"phone", label:"Phone Number" },
  { name:"company", label:"Department" },
  { name:"public", label:"About Me" }
]

const imageMaxSize = 5500000000 // bytes
const acceptedFileTypes = 'image/png, image/jpg, image/jpeg'
const acceptedFileTypesArray = acceptedFileTypes.split(",").map((item) => {return item.trim()})
@connect(
  null,
  { toggleSnackbar, getSingle }
)
@withFormik({
  validationSchema: Yup.object().shape({
    email: Yup.string().required('Required'),
    firstName: Yup.string().required('Required'),
    lastName: Yup.string().required('Required')
  }),
  enableReinitialize: true,
  mapPropsToValues: props => {
    const user = get(props, 'user')
    return pick(user,
      ["firstName",
        "lastName",
        "gender",
        "email",
        "phone",
        "city",
        "title",
        "company",
        "public",
        "imageContent",
        "imageContentId"
      ]);
  },
  handleSubmit : async (values, { props }) => {
    try {
      const { groupId, memberId } = props
      let data
      if(groupId){
        data = await createMember({groupId, values})
      } else{
        const user = {...values, id:memberId}
        data = await editMember(user)
        // props.handleEdit(data)
      }
      props.toggleSnackbar('Success', 'success');
      Router.back();
    } catch (e) {
      const { message } = e.response.data.errors[0]
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
      pixelCrop: {}
    }
  }
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
        alert("This file is not allowed. " + currentFileSize + " bytes is too large")
        return false
      }
      if (!acceptedFileTypesArray.includes(currentFileType)){
        alert("This file is not allowed. Only images are allowed.")
        return false
      }
      return true
    }
  }
  uploadImage = async () => {
    const { setFieldValue } = this.props;
    const { pixelCrop } = this.state
    const image = this.imageRef
    const fileName = this.fileInputRef.current.files.item(0).name
    const canvas = document.createElement("canvas");
    // console.log(pixelCrop);
    // return;
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
    this.avatarRef.current.src =  croppedImage;
    
    const res = await fetch(croppedImage)
    const blob = await res.blob()
    const form = new FormData()

    form.append('file', blob, fileName)
    const data = await uploadProfileImage(form)
    setFieldValue('imageContentId', data.id)
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
        aspect: 1/1.25
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
    this.setState({ crop, pixelCrop });
  }



  render() {
    const { classes, setFieldValue, handleBlur, handleChange, close, errors, values, isMember } = this.props;
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
                        <h4 className="profile-action" onClick={()=>{setFieldValue('ImageContentId', 0)}}>
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
                      <Button onClick={() => Router.back()} className="profile-btn profile-btn-cancel">
                        Cancel
                      </Button>
                    <Button type="submit" className="profile-btn profile-btn-add">
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