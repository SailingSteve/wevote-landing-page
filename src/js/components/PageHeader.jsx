import React from 'react';
import { useHistory } from 'react-router-dom';
import { AppBar, Tab, Tabs, Toolbar } from '@material-ui/core';
import { createMuiTheme, makeStyles, ThemeProvider } from '@material-ui/core/styles';
import { startsWith, stringContains } from '../utils/textFormat';


const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.paper,
  },
}));


export default function PageHeader () {
  const [value, setValue] = React.useState(0);
  const classes = useStyles();
  const history = useHistory();
  // const { location: { pathname } } = window;
  // if (value === undefined) {
  //   if (typeof pathname !== 'undefined' && pathname) {
  //     console.log('PageHeader initialization at path ', pathname);
  //     if (startsWith('/details', pathname.toLowerCase()) && value !== 0) {
  //       value = 0;
  //     } else if (startsWith('/comments', pathname.toLowerCase()) && value !== 1) {
  //       value = 1;
  //     } else if (startsWith('/updates', pathname.toLowerCase()) && value !== 2) {
  //       value = 2;
  //     }
  //   }
  // }

  const theme = createMuiTheme({
    typography: {
      button: {
        textTransform: 'none',
      },
    },
  });

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const { location: { pathname } } = window;
  if (startsWith('/details', pathname) && value !== 0) {
    console.log('Render PageHeader, initial value set to 0');
    setValue(0);
  } else if (startsWith('/comments', pathname) && value !== 1) {
    console.log('Render PageHeader, initial value set to 1');
    setValue(1);
  } else if (startsWith('/updates', pathname) && value !== 2) {
    console.log('Render PageHeader, initial value set to 2');
    setValue(2);
  }


  console.log('Render PageHeader.jsx');

  return (
    <div className={classes.root}>
      <AppBar position="relative"
              color="default"
              className=""
      >
        <ThemeProvider theme={theme}>
          <Toolbar className="header-toolbar" disableGutters>
            <Tabs value={value} onChange={handleChange} aria-label="Tab menu">
              <Tab id="weTarget-0" label="Details" onClick={() => history.push('/details')} />
              <Tab id="weTarget-1" label="Comments" onClick={() => history.push('/comments')} />
              <Tab id="weTarget-2" label="Updates" onClick={() => history.push('/updates')} />
            </Tabs>
          </Toolbar>
        </ThemeProvider>
      </AppBar>
    </div>
  );
}
