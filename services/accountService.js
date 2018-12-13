import { getLocale } from './serverService';

const myRoleIs = () => (getLocale('isOrganizationAdmin') || false);

export {
  myRoleIs,
};