import Box from '@mui/material/Box'
import ListColumn from './ListColumns/ListColumn'
import { mapOrder } from '~/utils/sorts'

function BoardContent({ board }) {

    const orderedColumns = mapOrder(board?.columns, board?.columnOrderIds, '_id');

    return (
        <Box sx={{
            bgcolor: (theme) => (theme.palette.mode === 'dark' ? '#565656' : '#0055c5'),
            width: '100%',
            height: (theme) => theme.trello.boardContentHeight,
            p: '10px 0'
        }}>
            <ListColumn columns={orderedColumns} />
        </Box>
    )
}

export default BoardContent