import { SortableContext, horizontalListSortingStrategy } from '@dnd-kit/sortable'
import { toast } from 'react-toastify'
import CloseIcon from '@mui/icons-material/Close'
import NoteAddIcon from '@mui/icons-material/NoteAdd'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import TextField from '@mui/material/TextField'
import { useState } from 'react'
import Column from './Column/Column'


function ListColumn(
    { columns, createNewColumn, createNewCard, deleteColumnDetails,
        updateTitleColumn, updateTitleCard, deleteCardDetails
    }) {

    const [openNewColumnForm, setOpenNewColumnForm] = useState(false);
    const toggleOpenNewColumnForm = () => {
        if (openNewColumnForm) {
            setNewColumnTitle('');
        }
        setOpenNewColumnForm(!openNewColumnForm);
    }
    const [newColumnTitle, setNewColumnTitle] = useState('')

    const addNewColumn = async () => {
        if (!newColumnTitle) {
            toast.error('Please enter title!');
            return;
        }
        const newColumnData = {
            title: newColumnTitle,
        }

        await createNewColumn(newColumnData);

        toggleOpenNewColumnForm();
        setNewColumnTitle('');
    }

    return (
        <SortableContext
            items={columns?.map((column) => column._id)}
            strategy={horizontalListSortingStrategy}>
            <Box
                sx={{
                    bgcolor: 'inherit',
                    width: '100%',
                    height: '100%',
                    display: 'flex',
                    overflowX: 'auto',
                    overflowY: 'hidden',
                    '&::-webkit-scrollbar-track': { m: 2 }
                }}
            >
                {columns?.map((column) => (
                    <Column key={column._id}
                        column={column}
                        createNewCard={createNewCard}
                        deleteColumnDetails={deleteColumnDetails}
                        updateTitleColumn={updateTitleColumn}
                        updateTitleCard={updateTitleCard}
                        deleteCardDetails={deleteCardDetails}
                    />
                ))}

                {!openNewColumnForm ?
                    <Box
                        onClick={toggleOpenNewColumnForm}
                        sx={{
                            minWidth: '250px',
                            maxWidth: '250px',
                            mx: 2,
                            borderRadius: '6px',
                            height: 'fit-content',
                            bgcolor: '#ffffff3d'
                        }}>
                        <Button
                            startIcon={<NoteAddIcon />}
                            sx={{
                                color: 'white',
                                width: '100%',
                                justifyContent: 'flex-start',
                                pl: 2.5,
                                py: 1
                            }}
                        >
                            Add new column
                        </Button>
                    </Box> :
                    <Box sx={{
                        minWidth: '250px',
                        maxWidth: '250px',
                        mx: 2,
                        p: 1,
                        borderRadius: '6px',
                        height: 'fit-content',
                        bgcolor: 'ffffff3d',
                        display: 'flex',
                        flexDirection: 'column',
                        gap: 1
                    }}>
                        <TextField
                            label='Enter column title...'
                            type='text'
                            size='small'
                            variant='outlined'
                            autoFocus
                            value={newColumnTitle}
                            onChange={(e) => setNewColumnTitle(e.target.value)}
                            sx={{
                                '& label': { color: 'white', },
                                '& input': { color: 'white', },
                                '& label.Mui-focused': { color: 'white' },
                                '& .MuiOutlinedInput-root': {
                                    '& fieldset': { borderColor: 'white' },
                                    '&:hover fieldset': { borderColor: 'white' },
                                    '&.Mui-focused fieldset': { borderColor: 'white' }
                                },
                                '& .MuiOutlinedInput-input': { borderRadius: 1 }
                            }}
                        />
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                            <Button
                                onClick={addNewColumn}
                                variant='contained'
                                color='primary'
                                size='small'
                                sx={{
                                    boxShadow: 'none',
                                    border: '0.5 solid',
                                    borderColor: '#0077B6',
                                    '&:hover': { bgcolor: '#599AFC' }
                                }}
                            >
                                Add New Column
                            </Button>

                            <CloseIcon
                                sx={{
                                    color: '#bfbfbf',
                                    cursor: 'pointer',
                                    '&:hover': {
                                        color: '#6f6f6f'
                                    }
                                }}
                                onClick={toggleOpenNewColumnForm}
                            />
                        </Box>
                    </Box>
                }
            </Box>
        </SortableContext>

    )
}

export default ListColumn