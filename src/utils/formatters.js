export const capitalizeFirstLetter = (val) => {
    if (typeof (val) == 'string') {
        return `${val.charAt(0).toUpperCase()}${val.slice(1)}`
    } else {
        return '';
    }
}

export const generatePlaceholderCard = (column) => {
    return {
        _id: `${column._id}-placeholder-card`,
        boardId: column.boardId,
        columnId: column._id,
        FE_PlaceholderCard: true
    };
}