import { getLocale } from './serverService';

const myRoleIs = () => (getLocale('isOrganizationAdmin') || false);
const isNewUser = () => (getLocale('newUser') || false);

export {
  myRoleIs,
  isNewUser
};