
import CardContent from '@mui/material/CardContent';
import Box from '@mui/material/Box';
import Card from './Card/Card';

function ListCard() {
    return (
        <Box
            sx={{
                p: '0 5px',
                m: '0 5px',
                display: 'flex',
                flexDirection: 'column',
                gap: 1,
                overflowX: 'hidden',
                overflowY: 'auto',
                maxHeight: (theme) => `calc(
      ${theme.trello.boardContentHeight} - 
      ${theme.spacing(5)} - 
      ${theme.trello.columnHeaderHeight} -
      ${theme.trello.columnFooterHeight})`,
                '&::-webkit-scrollbar-thumb': {
                    backgroundColor: '#ced0da',
                },
                '&::-webkit-scrollbar-thumb:hover': {
                    backgroundColor: '#bfc2cf',
                },
                '&::-webkit-scrollbar-track': { m: 2 }
            }
            }
        >
            <Card />
            <Card temporaryHideMedia={true} />
            <Card temporaryHideMedia={true} />
        </Box >
    )
}

export default ListCard