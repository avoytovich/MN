import { Fragment } from 'react';
import { Avatar, Typography, Grid } from '@material-ui/core';
import './modal.sass';
import { Member } from 'actions/members';

interface MemberProps {
    modalProps: Member
}

const MemberModal: React.SFC<MemberProps> = ({ modalProps }) => (
    <div className="wrapper-modal">
        <Grid container className="grid" spacing={0}>
            <Grid item sm={8} xs={12}>
                <Avatar className="avatar" src={modalProps.imageContent.mediumImage} />
            </Grid>
            <Grid item sm={4} xs={12}>
                <Typography className="text fname">
                    {modalProps.firstName}
                </Typography>
                <Typography className="text" >
                    Email: {modalProps.email}
                </Typography>
            </Grid>
        </Grid>

    </div>
)

export default MemberModal;