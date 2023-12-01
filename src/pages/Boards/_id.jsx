// BOARD DETAILS
import { Box } from '@mui/material';
import CircularProgress from '@mui/material/CircularProgress';
import Container from '@mui/material/Container';
import { isEmpty } from 'lodash';
import { useEffect, useState } from 'react';
import {
    createNewCardAPI,
    createNewColumnAPI,
    fetchBoardDetailsAPI,
    updateBoardDetailsAPI,
    updateColumnDetailsAPI
} from '~/apis';
import AppBar from '~/components/AppBar/AppBar';
import { generatePlaceholderCard } from '~/utils/formatters';
import { mapOrder } from '~/utils/sorts';
import BoardBar from './BoardBar/BoardBar';
import BoardContent from './BoardContent/BoardContent';


function Board() {
    const [board, setBoard] = useState(null);

    useEffect(() => {
        const boardId = '6566fbcbb318e9bc52adeb75';


        fetchBoardDetailsAPI(boardId).then((board) => {
            board.columns = mapOrder(board.columns, board.columnOrderIds, '_id')

            board.columns.forEach(column => {
                if (isEmpty(column.cards)) {
                    column.cards = [generatePlaceholderCard(column)];
                    column.cardOrderIds = [generatePlaceholderCard(column)._id]
                } else {
                    column.cards = mapOrder(column.cards, column.cardOrderIds, '_id');
                }
            })

            setBoard(board);
        }
        )
    }, [])

    const createNewColumn = async (newColumnData) => {
        const createdColumn = await createNewColumnAPI({
            ...newColumnData,
            boardId: board._id
        });

        createdColumn.cards = [generatePlaceholderCard(createdColumn)];
        createdColumn.cardOrderIds = [generatePlaceholderCard(createdColumn)._id];

        const newBoard = { ...board };
        newBoard.columns.push(createdColumn);
        newBoard.columnOrderIds.push(createdColumn._id);
        setBoard(newBoard);
    }

    const createNewCard = async (newCardData) => {
        const createdCard = await createNewCardAPI({
            ...newCardData,
            boardId: board._id
        });

        const newBoard = { ...board };
        const columnToUpdate = newBoard.columns.find(column => column._id === createdCard.columnId);
        if (columnToUpdate) {
            columnToUpdate.cards.push(createdCard);
            columnToUpdate.cardOrderIds.push(createdCard._id);
        }
        setBoard(newBoard);
    }

    // FLow when to call API: Update state -> Call API
    const moveColumns = async (dndOrderedColumns) => {
        // Update state
        const dndOrderedColumnsIds = dndOrderedColumns.map((c => c._id));
        const newBoard = { ...board };
        newBoard.columns = dndOrderedColumns;
        newBoard.columnOrderIds = dndOrderedColumnsIds;
        setBoard(newBoard);

        // call api
        updateBoardDetailsAPI(newBoard._id, { columnOrderIds: dndOrderedColumnsIds });
    }

    const moveCardInTheSameColumn = async (dndOrderedCards, dndOrderedCardIds, columnId) => {
        const newBoard = { ...board };
        const columnToUpdate = newBoard.columns.find(column => column._id === columnId);
        if (columnToUpdate) {
            columnToUpdate.cards = dndOrderedCards;
            columnToUpdate.cardOrderIds = dndOrderedCardIds;
        }
        setBoard(newBoard);

        await updateColumnDetailsAPI(columnId, { cardOrderIds: dndOrderedCardIds });
    }

    if (!board) {
        return (
            <Box sx={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: 2,
                width: '100vw',
                height: '100vh',
            }}>
                <CircularProgress />
            </Box>
        )
    }

    return (
        <Container disableGutters maxWidth={false} sx={{ height: '100vh' }}>
            <AppBar />
            <BoardBar board={board} />
            <BoardContent
                board={board}
                createNewColumn={createNewColumn}
                createNewCard={createNewCard}
                moveColumns={moveColumns}
                moveCardInTheSameColumn={moveCardInTheSameColumn}
            />
        </Container>
    )
}

export default Board