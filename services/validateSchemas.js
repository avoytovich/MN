import * as Yup from 'yup';

const needUpload= 'please, provide profile picture',
  required = 'required';

const profileInfoSchema = Yup.object().shape({
  email: Yup.string().required(required).nullable(),
  firstName: Yup.string().required(required).nullable(),
  lastName: Yup.string().required(required).nullable(),
  aboutMe: Yup.string().required(required).nullable(),
  city: Yup.string().required(required).nullable(),
  gender: Yup.string().required(required).nullable(),
  imageContentId: Yup.number().moreThan(0, needUpload).nullable(),
  organization: Yup.string().required(required).nullable(),
  phoneNumber: Yup.string()
    .matches(/^[0-9]*$/, '+09567676767')
    .required(required).nullable(),
  title: Yup.string().required(required).nullable(),
});

const memberInfoSchema = Yup.object().shape({
  email: Yup.string().required(required).nullable(),
  firstName: Yup.string().required(required).nullable(),
  lastName: Yup.string().required(required).nullable(),
  public: Yup.string().nullable(),
  city: Yup.string().nullable(),
  gender: Yup.string().nullable(),
  imageContentId: Yup.number().moreThan(0, needUpload).nullable(),
  company: Yup.string().nullable(),
  phone: Yup.string()
    .matches(/^[0-9]*$/, '+09567676767').nullable(),
  title: Yup.string().nullable(),
});

export {
  profileInfoSchema,
  memberInfoSchema
};
