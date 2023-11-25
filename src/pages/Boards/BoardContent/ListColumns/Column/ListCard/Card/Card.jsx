import GroupIcon from '@mui/icons-material/Group';
import CommentIcon from '@mui/icons-material/Comment';
import AttachmentIcon from '@mui/icons-material/Attachment';
import CardMedia from '@mui/material/CardMedia';
import CardActions from '@mui/material/CardActions';
import CardActionArea from '@mui/material/CardActionArea';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import CardContent from '@mui/material/CardContent';
import { Card as MuiCard } from '@mui/material';

function Card({ temporaryHideMedia }) {
    if (temporaryHideMedia) {
        return <MuiCard
            sx={{
                cursor: 'pointer',
                boxShadow: '0 1px 1px rgba(0, 0, 0, 0.2)',
                overflow: 'unset'
            }}
        >
            <CardActionArea>
                <CardContent
                    sx={{
                        p: 1.5,
                        '&:last-child': { p: 1.5 }
                    }}>
                    <Typography>
                        Trello Card
                    </Typography>
                </CardContent>
            </CardActionArea>
            <CardActions sx={{ p: '0 4px 8px 4px' }}>
                <Button
                    size="small"
                    startIcon={<GroupIcon />}
                >
                    20
                </Button>
                <Button
                    size="small"
                    startIcon={<CommentIcon />}
                >
                    15
                </Button>
                <Button
                    size="small"
                    startIcon={<AttachmentIcon />}
                >
                    10
                </Button>
            </CardActions>
        </MuiCard>
    } else {
        return (<MuiCard
            sx={{
                cursor: 'pointer',
                boxShadow: '0 1px 1px rgba(0, 0, 0, 0.2)',
                overflow: 'unset'
            }}
        >
            <CardActionArea>
                <CardMedia
                    component="img"
                    height="140"
                    image="https://image.tienphong.vn/w1000/Uploaded/2023/ofh-fdazstgk/2023_11_22/blackpink-3696.jpeg"
                    alt="green iguana"
                />
                <CardContent
                    sx={{
                        p: 1.5,
                        '&:last-child': { p: 1.5 }
                    }}>
                    <Typography>
                        Trello Card
                    </Typography>
                </CardContent>
            </CardActionArea>
            <CardActions sx={{ p: '0 4px 8px 4px' }}>
                <Button
                    size="small"
                    startIcon={<GroupIcon />}
                >
                    20
                </Button>
                <Button
                    size="small"
                    startIcon={<CommentIcon />}
                >
                    15
                </Button>
                <Button
                    size="small"
                    startIcon={<AttachmentIcon />}
                >
                    10
                </Button>
            </CardActions>
        </MuiCard>)
    }
}

export default Card