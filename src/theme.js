import { experimental_extendTheme as extendTheme, } from '@mui/material/styles/'
import { blueGrey, cyan, lightBlue, grey } from '@mui/material/colors'


// Create a theme instance.
const theme = extendTheme({
    trello: {
        appBarHeight: '58px',
        boardBarHeight: '60px'
    },
    colorSchemes: {
        light: {
            palette: {
                primary: cyan,
                secondary: lightBlue
            },
        },
        dark: {
            palette: {
                primary: blueGrey,
                secondary: grey
            }
        },
    },
    components: {
        MuiCssBaseline: {
            styleOverrides: {
                body: {
                    '*::-webkit-scrollbar': {
                        width: '8px',
                        heigh: '8px'
                    },
                    '*::-webkit-scrollbar-thumb': {
                        backgroundColor: '#81ecec',
                        borderRadius: '8px'
                    },
                    '*::-webkit-scrollbar-thumb:hover': {
                        backgroundColor: '#00cec9',
                    }
                }
            }
        },
        MuiButton: {
            styleOverrides: {
                root: {
                    textTransform: 'none'
                }
            }
        },
        MuiInputLabel: {
            styleOverrides: {
                root: ({ theme }) => {
                    return {
                        color: theme.palette.primary.main,
                        fontSize: '0.875rem'
                    }
                }
            }
        },
        MuiOutlinedInput: {
            styleOverrides: {
                root: ({ theme }) => {
                    return {
                        color: theme.palette.primary.main,
                        fontSize: '0.875rem',
                        '.MuiOutlinedInput-notchedOutline': {
                            borderColor: theme.palette.primary.light
                        },
                        '&:hover': {
                            '.MuiOutlinedInput-notchedOutline': {
                                borderColor: theme.palette.primary.main
                            },
                        },
                        '& fieldset': {
                            borderWidth: '1px !important'
                        }
                    }
                }
            }
        }
    }
});

export default theme