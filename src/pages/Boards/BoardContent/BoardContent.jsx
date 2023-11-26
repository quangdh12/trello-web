import { useEffect, useRef, useState } from 'react';
import Box from '@mui/material/Box'
import ListColumn from './ListColumns/ListColumn'
import { mapOrder } from '~/utils/sorts'
import {
    DndContext,
    // PointerSensor,
    MouseSensor,
    TouchSensor,
    useSensor,
    useSensors,
    DragOverlay,
    defaultDropAnimationSideEffects,
    closestCorners
} from '@dnd-kit/core';
import { arrayMove } from '@dnd-kit/sortable';
import Column from './ListColumns/Column/Column';
import Card from './ListColumns/Column/ListCard/Card/Card';
import { cloneDeep } from 'lodash'

const ACTIVE_DRAG_ITEM_TYPE = {
    COLUMN: 'column',
    CARD: 'card'
}

function BoardContent({ board }) {

    const [orderedColumns, setOrderedColumns] = useState([]);
    const [activeDragItemId, setActiveDragItemId] = useState(null);
    const [activeDragItemType, setActiveDragItemType] = useState(null);
    const [activeDragItemData, setActiveDragItemData] = useState(null);
    const [oldColumnWhenDraggingCard, setOldColumnWhenDraggingCard] = useState(null);

    // const pointerSensor = useSensor(PointerSensor, { activationConstraint: { distance: 10 } })
    const mouseSensor = useSensor(MouseSensor, { activationConstraint: { distance: 10 } })
    const touchSensor = useSensor(TouchSensor, { activationConstraint: { delay: 250, tolerance: 500 } })
    const sensors = useSensors(mouseSensor, touchSensor);

    useEffect(() => {
        setOrderedColumns(mapOrder(board?.columns, board?.columnOrderIds, '_id'));
    }, [board])

    const findColumnByCardId = (cardId) => {
        return orderedColumns.find(column => (column?.cards?.find(card => card._id === cardId)))
    }

    const handleMoveCardBetweenDifferentColumns = (
        overColumn,
        overCardId,
        active,
        over,
        activeColumn,
        activeDraggingCardData
    ) => {
        setOrderedColumns((prevColumns) => {
            const overCardIndex = overColumn?.cards?.findIndex(card => card._id === overCardId);

            let newCardIndex;
            const isBelowOverItem = active.rect.current.translated &&
                active.rect.current.translated.top > over.rect.top + over.rect.height;
            const modifier = isBelowOverItem ? 1 : 0;
            newCardIndex = overCardIndex >= 0 ? overCardIndex + modifier : overColumn?.cards?.length + 1;

            const nextColumns = cloneDeep(prevColumns);
            const nextActiveColumn = nextColumns.find(column => column._id === activeColumn._id);
            const nextOverColumn = nextColumns.find(column => column._id === overColumn._id);

            if (nextActiveColumn) {
                // remove card from active column (drag column) and update cardOrderIds
                nextActiveColumn.cards = nextActiveColumn.cards.filter(card => card._id !== activeDragItemId);
                nextActiveColumn.cardOrderIds = nextActiveColumn.cards.map(card => card._id);
            }

            if (nextOverColumn) {
                // check if dragging card is exist in overColumn, remove it
                nextOverColumn.cards = nextOverColumn.cards.filter(card => card._id !== activeDragItemId);

                // update columnId in activeDraggingCardData
                const update_activeDraggingCardData = {
                    ...activeDraggingCardData,
                    columnId: nextOverColumn._id
                };

                // update overColumn and cardOrderIds
                nextOverColumn.cards = nextOverColumn.cards.toSpliced(newCardIndex, 0, update_activeDraggingCardData)
                nextOverColumn.cardOrderIds = nextOverColumn.cards.map(card => card._id);
            }
            return nextColumns;
        })
    }

    const handleDragStart = (event) => {
        setActiveDragItemId(event?.active?.id);
        setActiveDragItemType(event?.active?.data?.current?.columnId ? ACTIVE_DRAG_ITEM_TYPE.CARD : ACTIVE_DRAG_ITEM_TYPE.COLUMN);
        setActiveDragItemData(event?.active?.data?.current);

        if (event?.active?.data?.current?.columnId) {
            setOldColumnWhenDraggingCard(findColumnByCardId(event?.active?.id));
        }
    }

    const handleDragOver = (event) => {
        if (activeDragItemType === ACTIVE_DRAG_ITEM_TYPE.COLUMN) {
            return;
        }

        const { active, over } = event;
        if (!active || !over) return;

        const { id: activeDraggingCardId, data: { current: activeDraggingCardData } } = active;
        const { id: overCardId } = over;

        const activeColumn = findColumnByCardId(activeDraggingCardId);
        const overColumn = findColumnByCardId(overCardId);

        if (!activeColumn || !overColumn) return;

        // handle drag card in different column
        if (activeColumn._id !== overColumn._id) {
            handleMoveCardBetweenDifferentColumns(overColumn, overCardId, active, over, activeColumn, activeDraggingCardData);
        }
    }

    const handleDragEnd = (event) => {
        const { active, over } = event;
        if (!active || !over) return;

        if (activeDragItemType === ACTIVE_DRAG_ITEM_TYPE.CARD) {
            const { id: activeDraggingCardId, data: { current: activeDraggingCardData } } = active;
            const { id: overCardId } = over;

            const activeColumn = findColumnByCardId(activeDraggingCardId);
            const overColumn = findColumnByCardId(overCardId);

            if (!activeColumn || !overColumn) return;

            // handle drag card in different column
            if (oldColumnWhenDraggingCard._id !== overColumn._id) {
                handleMoveCardBetweenDifferentColumns(overColumn, overCardId, active, over, activeColumn, activeDraggingCardData);
            } else { // handle drag card in same column
                const oldCardIndex = oldColumnWhenDraggingCard?.cards?.findIndex(card => card._id === activeDragItemId);
                const newCardIndex = overColumn?.cards?.findIndex(card => card._id === overCardId);

                const dndOrderedCards = arrayMove(oldColumnWhenDraggingCard?.cards, oldCardIndex, newCardIndex);
                setOrderedColumns((prevColumns) => {
                    const nextColumns = cloneDeep(prevColumns);

                    const targetColumn = nextColumns.find(column => column._id === overColumn._id)

                    // update card and cardOrderIds in targetColumn
                    targetColumn.cards = dndOrderedCards;
                    targetColumn.cardOrderIds = dndOrderedCards.map(card => card._id);
                    return nextColumns;
                })
            }
        }

        if (activeDragItemType === ACTIVE_DRAG_ITEM_TYPE.COLUMN) {
            if (active.id !== over.id) {
                const oldColumnIndex = orderedColumns.findIndex(c => c._id == active.id);
                const newColumnIndex = orderedColumns.findIndex(c => c._id === over.id);
                const dndOrderedColumns = arrayMove(orderedColumns, oldColumnIndex, newColumnIndex);
                // const dndOrderedColumnsIds = dndOrderedColumns.map((c => c._id));
                setOrderedColumns(dndOrderedColumns);
            }
        }

        setActiveDragItemId(null);
        setActiveDragItemType(null);
        setActiveDragItemData(null);
        setOldColumnWhenDraggingCard(null);
    }

    const dropAnimation = {
        sideEffects: defaultDropAnimationSideEffects({ styles: { active: { opacity: '0.5' } } })
    }

    return (
        <DndContext
            onDragStart={handleDragStart}
            onDragOver={handleDragOver}
            onDragEnd={handleDragEnd}
            sensors={sensors}
            collisionDetection={closestCorners}
        >
            <Box sx={{
                bgcolor: (theme) => (theme.palette.mode === 'dark' ? '#565656' : '#0055c5'),
                width: '100%',
                height: (theme) => theme.trello.boardContentHeight,
                p: '10px 0'
            }}>
                <ListColumn columns={orderedColumns} />
                <DragOverlay dropAnimation={dropAnimation}>
                    {!activeDragItemType && null}
                    {(activeDragItemType === ACTIVE_DRAG_ITEM_TYPE.COLUMN) && <Column column={activeDragItemData} />}
                    {(activeDragItemType === ACTIVE_DRAG_ITEM_TYPE.CARD) && <Card card={activeDragItemData} />}
                </DragOverlay>
            </Box>
        </DndContext>

    )
}

export default BoardContent