import { responsiveFontSizes } from '@mui/material';
import { createTheme } from '@mui/material/styles';
import shadows from './shadows';
import { light, dark } from './palette';

const getTheme = (mode, themeToggler) =>
  responsiveFontSizes(
    createTheme({
      palette: mode === 'light' ? light : dark,
      shadows: shadows(mode),
      typography: {
        fontFamily: '"Lato", sans-serif',
        button: {
          textTransform: 'none',
          fontWeight: 'medium',
        },
      },
      zIndex: {
        appBar: 1200,
        drawer: 1300,
      },
      components: {
        MuiAppBar: {
          backgroundColor: mode === 'navbar' ? light : dark,
        },
        MuiButton: {
          styleOverrides: {
            root: {
              fontWeight: 600,
              borderRadius: 8,
              backgroundColor: '#4aa521',
              color: '#fff',
              '&:hover': {
                backgroundColor: '#4aa521',
              }
            },
            containedSecondary: mode === 'light' ? { color: 'white' } : {},
          },
        },
        MuiInputBase: {
          styleOverrides: {
            root: {
              borderRadius: 8,
            },
          },
        },
        MuiOutlinedInput: {
          styleOverrides: {
            root: {
              borderRadius: 8,
            },
            input: {
              borderRadius: 8,
            },
          },
        },
        MuiCard: {
          styleOverrides: {
            root: {
              background: 'rgba(0, 0, 0, 0.25)',
              boxSizing: 'border-box',
              boxShadow: 'none',
              borderRadius: 10,
            },
          },
        },
        MuiTabs: {
          styleOverrides: {
            root: {
              color: '#000'
            },
            indicator: {
              backgroundColor: '#4aa521',
            }
          },
        },
        MuiTab: {
          styleOverrides: {
            root: {
              '&.Mui-selected': {
                //color: '#FFA300',
                color: '#4aa521',
              }
            },
          },
        },
        MuiToolbar: {
          styleOverrides: {
            root: {
              background: '#000',
              color: '#43B02A'
            }
          }
        }
      },
      themeToggler,
    }),
  );

export default getTheme;
