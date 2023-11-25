import Box from '@mui/material/Box'
import ListColumn from './ListColumns/ListColumns'

function BoardContent() {

    return (
        <Box sx={{
            bgcolor: (theme) => (theme.palette.mode === 'dark' ? '#565656' : '#0055c5'),
            width: '100%',
            height: (theme) => theme.trello.boardContentHeight,
            p: '10px 0'
        }}>
            <ListColumn />
        </Box>
    )
}

export default BoardContent