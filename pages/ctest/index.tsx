import * as React from 'react'
import withModal from 'services/decorators/withModal';
import Modal from 'components/groups/gallery/memberModal';
import Member from 'pages/edit-member';

const member:Member = {
    city: 'Lviv',
    department: 'Somedepartment',
    aboutme: 'Fuckthepigeons',
    questions: [
        {question: 'How old are you?', answer: '19 years old'},
        {question: 'Name of your favourite pet', answer: 'Isliam'},
        {question: 'Favourite language', answer: 'Javascript'}
    ],
    email: 'some@gmail.com',
    firstName: 'Alice Cooper',
    imageContent: {
    mediumImage: 'http://s3.amazonaws.com/ogden_images/www.mauinews.com/images/2018/06/04055153/nf-Joseph-Bell-600x840.jpg'
}
}

class CTest extends React.Component {
    render() {
        return (
            <div>
                <button onClick={() => this.props.open(member)}>Click to open modal</button>
            </div>
        )
    }
}

export default withModal(Modal, {disableStyles: true, withCloseOutside: true})(CTest);
