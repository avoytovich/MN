import searchUser, { FormValues, FormProps, FormType } from 'forms/searchUser';
import SearchField from 'components/searchpanel/searchfield';
import { InjectedFormikProps, Field } from 'formik';

import './style.sass';

const SearchMemberForm:FormType = ({values})  => {
    return (
        <Field
            name="name"
            value={values.search}
            render={
              props => <SearchField
                label="Search..."
                className="search-user-field"
                // onRemove={this.remove}
                {...props}
                />
            } />
    )
}

export default searchUser(SearchMemberForm);