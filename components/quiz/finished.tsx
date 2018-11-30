import { Typography, List, ListItem, ListItemText, ListItemAvatar, Avatar } from "@material-ui/core";
import CircularProgressBar from 'components/CircularProgressBar';
import * as React from 'react';
import { Router } from '../../routes';
import './finished.sass';
import MemberModal from 'components/groups/gallery/memberModal';
import withModal from 'services/decorators/withModal';
import { connect } from 'react-redux';
import { getMember } from 'actions/member'
export interface Recommendation {
    id: number
    name: string
    image: string
}


interface Props {
    correct: number,
    total: number,
    onTryAgain: Function,
    recommended: Recommendation[]
}

const moveToUser = (id: number) => () =>
    Router.push('editmember');


@connect(null, {
    getMember
})
@withModal(MemberModal, {disableStyles: true, withCloseOutside: true, getMember: Function})
class Recommended extends React.Component<{ recommended: Recommendation[], open: Function }> {
    
    openModal = async(id) => () => {
        const member = this.props.getMember(id);
        this.props.open(member);
    }
    render() {
        const { recommended } = this.props;
        return (<>
            {
                recommended.length ?
                    <Typography align="center" className="recommended">
                        Recommended for review
            </Typography> : null
            }
            <List>
                {
                    recommended.map((rd, key) => (
                        <ListItem
                            className="item"
                            // TODO: onclick
                            onClick={this.openModal(rd.id)}
                            key={`rec-${key}`}>
                            <ListItemAvatar>
                                <Avatar src={rd.image} />
                            </ListItemAvatar>
                            <ListItemText>
                                {rd.name}
                            </ListItemText>
                        </ListItem>
                    ))
                }
            </List>
        </>)
    }
}


const Finished: React.SFC<Props> = ({ onTryAgain, correct, total, recommended }) => {
    const text = correct === total ? 'Congratulations' : 'Try again';
    return (
        <div className="finished">
            <p onClick={onTryAgain} className="tryagain">{text}</p>
            <p className="amount">{correct} out of {total} answered correctly</p>
            <CircularProgressBar
                current={correct}
                total={total}
            />
            <Recommended recommended={recommended} />
        </div>
    )
}

export default Finished;