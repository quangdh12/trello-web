import { useEffect, useState } from 'react';
import Box from '@mui/material/Box'
import ListColumn from './ListColumns/ListColumn'
import { mapOrder } from '~/utils/sorts'
import {
    DndContext,
    PointerSensor,
    MouseSensor,
    TouchSensor,
    useSensor,
    useSensors
} from '@dnd-kit/core';
import { arrayMove } from '@dnd-kit/sortable';

function BoardContent({ board }) {

    const [orderedColumns, setOrderedColumns] = useState([]);

    // const pointerSensor = useSensor(PointerSensor, { activationConstraint: { distance: 10 } })
    const mouseSensor = useSensor(MouseSensor, { activationConstraint: { distance: 10 } })
    const touchSensor = useSensor(TouchSensor, { activationConstraint: { delay: 250, tolerance: 500 } })
    const sensors = useSensors(mouseSensor, touchSensor);

    useEffect(() => {
        setOrderedColumns(mapOrder(board?.columns, board?.columnOrderIds, '_id'));
    }, [board])

    const handleDragEnd = (event) => {
        const { active, over } = event;
        if (!over) return;

        if (active.id !== over.id) {
            const oldIndex = orderedColumns.findIndex(c => c._id == active.id);
            const newIndex = orderedColumns.findIndex(c => c._id === over.id);
            const dndOrderedColumns = arrayMove(orderedColumns, oldIndex, newIndex);
            const dndOrderedColumnsIds = dndOrderedColumns.map((c => c._id));
            setOrderedColumns(dndOrderedColumns);
        }
    }

    return (
        <DndContext
            onDragEnd={handleDragEnd}
            sensors={sensors}>
            <Box sx={{
                bgcolor: (theme) => (theme.palette.mode === 'dark' ? '#565656' : '#0055c5'),
                width: '100%',
                height: (theme) => theme.trello.boardContentHeight,
                p: '10px 0'
            }}>
                <ListColumn columns={orderedColumns} />
            </Box>
        </DndContext>

    )
}

export default BoardContent