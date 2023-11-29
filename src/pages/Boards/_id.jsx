// BOARD DETAILS
import Container from '@mui/material/Container';
import AppBar from '~/components/AppBar/AppBar';
import BoardBar from './BoardBar/BoardBar';
import BoardContent from './BoardContent/BoardContent';
import { mockData } from '~/apis/mock-data';
import { useState, useEffect } from 'react'
import { fetchBoardDetailsAPI, createNewColumnAPI, createNewCardAPI } from '~/apis';

function Board() {
    const [board, setBoard] = useState(null);

    useEffect(() => {
        const boardId = '6566fbcbb318e9bc52adeb75';
        fetchBoardDetailsAPI(boardId).then((board) => setBoard(board))
    }, [])

    const createNewColumn = async (newColumnData) => {
        const createColumn = await createNewColumnAPI({
            ...newColumnData,
            boardId: board._id
        });
    }

    const createNewCard = async (newCardData) => {
        const createCard = await createNewCardAPI({
            ...newCardData,
            boardId: board._id
        });
    }

    return (
        <Container disableGutters maxWidth={false} sx={{ height: '100vh' }}>
            <AppBar />
            <BoardBar board={board} />
            <BoardContent
                board={board}
                createNewColumn={createNewColumn}
                createNewCard={createNewCard}
            />
        </Container>
    )
}

export default Board