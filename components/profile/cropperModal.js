import { Component, Fragment } from 'react';
import MaleIcon from 'static/svg/male.svg'
import FemaleIcon from 'static/svg/female.svg'
import EditIcon from 'static/svg/edit.svg'
import RemoveIcon from 'static/svg/garbage.svg'
import { Formik, Form, Field , withFormik } from 'formik';
import { withStyles, Grid, TextField, Divider, Button, Modal, Paper } from '@material-ui/core';
import './style.sass'
import { toggleSnackbar } from '../../actions/snackbar';
import * as Yup from 'yup';
import { signIn } from '../../actions/account';
import { connect } from 'react-redux';
import Router from 'next/router';
import styles from './styles'
import get from 'lodash/get'
import { wrapField } from 'services/materialformik'
import { editProfile } from 'actions/profile'
import { createMember, editMember } from 'actions/member'
import { uploadProfileImage } from 'actions/upload'
import DefaultAvatar from 'static/png/defaultAvatar.png'

import ReactCrop from 'react-image-crop'
import 'react-image-crop/lib/ReactCrop.scss'

const imageMaxSize = 1000000000 // bytes
const acceptedFileTypes = 'image/png, image/jpg, image/jpeg'
const acceptedFileTypesArray = acceptedFileTypes.split(",").map((item) => {return item.trim()})
@connect(
  null,
  { toggleSnackbar }
)
export default class Profile extends Component{
  constructor(props){
    super(props)
    this.fileInputRef = React.createRef()
    this.state = {
      imgSrc: null,
      crop: {
        aspect: 1/1
      },
      pixelCrop:{}
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



  render() {
    const { classes, setFieldValue, handleBlur, handleChange, close, errors, values, isMember } = this.props;

    const {imgSrc} = this.state

    return (
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
            <input
              ref={this.fileInputRef}
              type='file'
              accept={acceptedFileTypes}
              multiple={false}
              style={{display:'none'}}
              onChange={this.handleFileSelect}
            />
          </Paper>
                    ref={this.avatarRef}


    );
  }
}