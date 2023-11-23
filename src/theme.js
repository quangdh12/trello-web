import { experimental_extendTheme as extendTheme, } from '@mui/material/styles/'
import { cyan, deepOrange, lime, orange, teal } from '@mui/material/colors'

// Create a theme instance.
const theme = extendTheme({
    colorSchemes: {
        light: {
            palette: {
                primary: teal,
                secondary: lime
            },
        },
        dark: {
            palette: {
                primary: cyan,
                secondary: deepOrange
            }
        },
    },
});

export default theme