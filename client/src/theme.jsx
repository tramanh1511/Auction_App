import { createTheme } from '@mui/material/styles';

export const theme = createTheme({
    palette: {
        mode: 'light', 
        primary: {
            main: '#388e3c',
        },
        secondary: {
            main: '#4caf50',
        },
        background: {
            default: '#ffffff', 
            paper:  '#ffffff',
        },
        text: {
            primary: '#000000', // Black text for better readability
            secondary: '#388e3c', // Dark green for secondary text
        },
    },
    typography: {
        fontFamily: ['Roboto', 'Arial', 'sans-serif'].join(','),
        h1: {
            fontSize: '2rem',
            fontWeight: 'bold',
            color: '#000', // Heading text in black
        },
        h2: {
            fontSize: '1.8rem',
            fontWeight: 'bold',
            color: '#000',
        },
        body1: {
            fontSize: '1rem',
            color: '#000', // Body text in black for clarity
        },
        button: {
            textTransform: 'none', // Prevents uppercase transformation
        },
    },
    props: {
        MuiAppBar: {
            color: 'transparent', // Transparent background for AppBar
        },
        MuiTooltip: {
            arrow: true, // Adds an arrow to tooltips
        },
    },
    components: {
        MuiAppBar: {
            styleOverrides: {
                root: {
                    backgroundColor: '#388e3c', // Dark green header background
                    color: '#ffffff', // White text in the header
                    boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.1)', // Subtle shadow effect
                    display: 'flex', // Flexbox layout
                    justifyContent: 'space-between', // Space out header items
                    padding: '0 2rem', // Padding around the header content
                    alignItems: 'center', // Center the items vertically
                },
            },
        },
        MuiCard: {
            styleOverrides: {
                root: {
                    borderRadius: '8px', // Rounded corners for cards
                    padding: '1.5rem', // Padding inside cards for spacing
                    boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.1)', // Subtle shadow for cards
                    backgroundColor: '#ffffff', // White background for cards
                },
            },
        },
        MuiButton: {
            styleOverrides: {
                root: {
                    borderRadius: '8px', // Rounded button edges
                    fontWeight: 'bold', // Bold text for buttons
                    padding: '8px 16px', // Adequate padding for better click area
                    textTransform: 'none', // Prevents uppercase transformation
                    backgroundColor: '#388e3c', // Green background for buttons
                    color: '#ffffff', // White text on buttons
                    '&:hover': {
                        backgroundColor: '#4caf50', // Lighter green on hover
                    },
                    marginLeft: '1rem', // Spacing between buttons
                },
            },
        },
        MuiTooltip: {
            styleOverrides: {
                tooltip: {
                    backgroundColor: '#388e3c', // Green background for tooltips
                    color: '#ffffff', // White text in tooltips
                },
            },
        },
    },
    spacing: 8,
    shape: {
        borderRadius: 8, // Modern rounded shape for most components
    },
});
