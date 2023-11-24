import AddToDriveIcon from '@mui/icons-material/AddToDrive';
import BoltIcon from '@mui/icons-material/Bolt';
import DashboardIcon from '@mui/icons-material/Dashboard';
import FilterListIcon from '@mui/icons-material/FilterList';
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import VpnLockIcon from '@mui/icons-material/VpnLock';
import Avatar from '@mui/material/Avatar';
import AvatarGroup from '@mui/material/AvatarGroup';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Chip from '@mui/material/Chip';
import Tooltip from '@mui/material/Tooltip';


const MENU_STYLES = {
    color: 'white',
    bgcolor: 'transparent',
    border: 'none',
    paddingX: '5px',
    borderRadius: '4px',
    '.MuiSvgIcon-root': {
        color: 'white'
    },
    '&:hover': {
        bgcolor: 'primary.50'
    }
};

function BoardBar() {
    return (
        <Box sx={{
            width: '100%',
            height: (theme) => theme.trello.boardBarHeight,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            gap: 2,
            paddingX: 2,
            overFlowX: 'auto',
            bgcolor: (theme) => (theme.palette.mode == 'dark' ? '#565656' : '#0055c5'),
            borderBottom: '1px solid #81ecec'
        }}
        >
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                <Chip
                    sx={MENU_STYLES}
                    icon={<DashboardIcon />}
                    label="Dashboard" clickable />

                <Chip
                    sx={MENU_STYLES}
                    icon={<VpnLockIcon />}
                    label="Public/Private Workspace" clickable />

                <Chip
                    sx={MENU_STYLES}
                    icon={<AddToDriveIcon />}
                    label="Add to Google Drive" clickable />

                <Chip
                    sx={MENU_STYLES}
                    icon={<BoltIcon />}
                    label="Automation" clickable />

                <Chip
                    sx={MENU_STYLES}
                    icon={<FilterListIcon />}
                    label="Filters" clickable />
            </Box>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                <Button
                    variant='outlined'
                    startIcon={<PersonAddIcon />}
                    sx={{
                        color: 'white',
                        borderColor: 'white',
                        '&:hover': {
                            borderColor: 'white',
                        }
                    }}
                >
                    Invite
                </Button>

                <AvatarGroup
                    max={4}
                    sx={{
                        gap: '10px',
                        '& .MuiAvatar-root': {
                            width: 34,
                            height: 34,
                            fontSize: 16,
                            border: 'none'
                        }
                    }}
                >
                    <Tooltip title="Online">
                        <Avatar alt="avatar"
                            src='https://img.docbao.vn/images/uploads/2023/07/01/001rose-1879.jpg'
                        />
                    </Tooltip>
                    <Tooltip title="Online">
                        <Avatar alt="avatar"
                            src='https://img.docbao.vn/images/uploads/2023/07/01/001rose-1879.jpg'
                        />
                    </Tooltip>
                    <Tooltip title="Online">
                        <Avatar alt="avatar"
                            src='https://img.docbao.vn/images/uploads/2023/07/01/001rose-1879.jpg'
                        />
                    </Tooltip>
                    <Tooltip title="Online">
                        <Avatar alt="avatar"
                            src='https://img.docbao.vn/images/uploads/2023/07/01/001rose-1879.jpg'
                        />
                    </Tooltip>
                    <Tooltip title="Online">
                        <Avatar alt="avatar"
                            src='https://img.docbao.vn/images/uploads/2023/07/01/001rose-1879.jpg'
                        />
                    </Tooltip>
                </AvatarGroup>
            </Box>
        </Box>
    )
}

export default BoardBar