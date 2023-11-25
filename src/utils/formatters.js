export const capitalizeFirstLetter = (val) => {
    if (typeof (val) == 'string') {
        return `${val.charAt(0).toUpperCase()}${val.slice(1)}`
    } else {
        return '';
    }
}