import { Typography, List, ListItem, ListItemText, ListItemAvatar, Avatar } from "@material-ui/core";
import CircularProgressBar from 'components/CircularProgressBar';
import { Fragment } from 'react';
import { Router } from '../../routes';
import './finished.sass';


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

const moveToUser = (id:number) => () =>
    Router.push('editmember');

const Recommended: React.SFC<{ recommended: Recommendation[] }> = ({ recommended }) => (
    <Fragment>
        {
            recommended.length?
            <Typography align="center" className="recommended">
                Recommended for review
            </Typography>:null
        }
        <List>
            {
                recommended.map((rd, key) => (
                    <ListItem 
                    className="item"
                    // TODO: onclick
                    // onClick={moveToUser(rd.id)}
                    key={`rec-${key}`}>
                        <ListItemAvatar>
                            <Avatar src={rd.image}/>
                        </ListItemAvatar>
                        <ListItemText>
                            {rd.name}
                        </ListItemText>
                    </ListItem>
                ))
            }
        </List>
    </Fragment>
)

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