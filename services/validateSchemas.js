import * as Yup from 'yup';

const needUpload= 'please, provide profile picture',
  required = 'required';

const profileInfoSchema = Yup.object().shape({
  email: Yup.string().required(required),
  firstName: Yup.string().required(required),
  lastName: Yup.string().required(required),
  aboutMe: Yup.string().required(required),
  city: Yup.string().required(required),
  gender: Yup.string().required(required),
  imageContentId: Yup.number().moreThan(0, needUpload),
  organization: Yup.string().required(required),
  phoneNumber: Yup.string()
    .matches(/^[+][0-9]*$/, '+09567676767')
    .required(required),
  title: Yup.string().required(required),
});

export {
  profileInfoSchema,
};
