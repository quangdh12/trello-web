import { experimental_extendTheme as extendTheme, } from '@mui/material/styles/'
import { cyan, deepOrange, deepPurple, teal } from '@mui/material/colors'

// Create a theme instance.
const theme = extendTheme({
    trello: {
        appBarHeight: '48px',
        boardBarHeight: '58px'
    },
    colorSchemes: {
        light: {
            palette: {
                primary: deepOrange,
                secondary: cyan
            },
        },
        dark: {
            palette: {
                primary: teal,
                secondary: deepPurple
            }
        },
    },
});

export default theme