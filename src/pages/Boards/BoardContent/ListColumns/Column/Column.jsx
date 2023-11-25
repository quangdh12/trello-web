import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Divider from '@mui/material/Divider';
import ListItemText from '@mui/material/ListItemText';
import ListItemIcon from '@mui/material/ListItemIcon';
import ContentCut from '@mui/icons-material/ContentCut';
import ContentCopy from '@mui/icons-material/ContentCopy';
import ContentPaste from '@mui/icons-material/ContentPaste';
import Cloud from '@mui/icons-material/Cloud';
import Tooltip from '@mui/material/Tooltip';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import AddCardIcon from '@mui/icons-material/AddCard';
import DragHandleIcon from '@mui/icons-material/DragHandle';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import Box from '@mui/material/Box'
import { useState } from 'react';
import ListCard from './ListCard/ListCard';

function Column() {

    const [anchorEl, setAnchorEl] = useState(null);
    const open = Boolean(anchorEl);
    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };

    return (

        <Box
            sx={{
                minWidth: '300px',
                maxWidth: '300px',
                bgcolor: (theme) => (theme.palette.mode === 'dark' ? '#333643' : '#ebecf0'),
                ml: 2,
                borderRadius: '6px',
                maxHeight: (theme) => `calc(${theme.trello.boardContentHeight} - ${theme.spacing(5)})`,
                height: 'fit-content',
            }}
        >
            {/* Box Column Header*/}
            <Box
                sx={{
                    height: (theme) => theme.trello.columnHeaderHeight,
                    p: 2,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between'
                }}
            >
                <Typography
                    variant='h6'
                    sx={{
                        fontSize: '1rem',
                        fontWeight: 'bold',
                        cursor: 'pointer',
                    }}
                >
                    Column Title
                </Typography>
                <Box>
                    <Tooltip title="More options">
                        <MoreHorizIcon
                            id="basic-button-dropdown"
                            aria-controls={open ? 'basic-menu-dropdown' : undefined}
                            aria-haspopup="true"
                            aria-expanded={open ? 'true' : undefined}
                            onClick={handleClick}
                            sx={{ cursor: 'pointer' }}
                        />
                    </Tooltip>
                    <Menu
                        id="basic-menu-dropdown"
                        anchorEl={anchorEl}
                        open={open}
                        onClose={handleClose}
                        MenuListProps={{
                            'aria-labelledby': 'basic-button-dropdown',
                        }}
                    >
                        <MenuItem>
                            <ListItemIcon>
                                <AddCardIcon fontSize="small" />
                            </ListItemIcon>
                            <ListItemText>Add new card</ListItemText>
                        </MenuItem>

                        <MenuItem>
                            <ListItemIcon>
                                <ContentCut fontSize="small" />
                            </ListItemIcon>
                            <ListItemText>Cut</ListItemText>
                        </MenuItem>

                        <MenuItem>
                            <ListItemIcon>
                                <ContentCopy fontSize="small" />
                            </ListItemIcon>
                            <ListItemText>Copy</ListItemText>
                        </MenuItem>

                        <MenuItem>
                            <ListItemIcon>
                                <ContentPaste fontSize="small" />
                            </ListItemIcon>
                            <ListItemText>Paste</ListItemText>
                        </MenuItem>

                        <Divider />

                        <MenuItem>
                            <ListItemIcon>
                                <DeleteForeverIcon fontSize="small" />
                            </ListItemIcon>
                            <ListItemText>Remove this column</ListItemText>
                        </MenuItem>
                        <MenuItem>
                            <ListItemIcon>
                                <Cloud fontSize="small" />
                            </ListItemIcon>
                            <ListItemText>Archive this column</ListItemText>
                        </MenuItem>
                    </Menu>
                </Box>
            </Box>

            <ListCard />

            {/* Box Column Footer*/}
            <Box
                sx={{
                    height: (theme) => theme.trello.columnHeaderHeight,
                    p: 2,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between'
                }}
            >
                <Button startIcon={<AddCardIcon />}>Add new card</Button>
                <Tooltip title="Drag to move">
                    <DragHandleIcon sx={{ cursor: 'pointer' }} />
                </Tooltip>
            </Box>
        </Box>
    )
}

export default Column