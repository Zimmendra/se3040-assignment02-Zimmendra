import React, { useContext } from 'react';
import { Box, Stack, ChakraProvider, extendTheme } from '@chakra-ui/react';
import { BiHome, BiRocket, BiCamera,BiLogOut} from 'react-icons/bi';
import { CgProfile } from 'react-icons/cg';
import AuthContext from '../context/AuthContext';
import NavItem from './NavItem';

const customTheme = extendTheme({
  colors: {
    primary: {
      50: 'rgba(63, 94, 153, 0.1)', // Transparent blue
      100: 'rgba(63, 94, 153, 0.2)',
      200: 'rgba(63, 94, 153, 0.3)',
      300: 'rgba(63, 94, 153, 0.4)',
      400: 'rgba(63, 94, 153, 0.5)',
      500: 'rgba(63, 94, 153, 0.6)',
      600: 'rgba(63, 94, 153, 0.7)',
      700: 'rgba(63, 94, 153, 0.8)',
      800: 'rgba(63, 94, 153, 0.9)',
      900: 'rgba(63, 94, 153, 1)', // Solid blue
    },
  },
});

function Nav() {
  const { user } = useContext(AuthContext);
  return (
    <ChakraProvider theme={customTheme}>
      <Box top={{ lg: 4 }} zIndex={1} w={{ sm: '100%', lg: '50vh' }} position={{ sm: 'sticky', lg: 'fixed' }} px={5}>
        <Stack
          bg={'primary.500'} // Use the custom transparent primary color from the theme
          color={'white'} // Set text color to white for better visibility
          borderRadius={'2xl'}
          spacing={10}
          p={'15px'}
          pt={{ lg: '10vh' }}
          h={{ sm: '25', lg: '150vh' }}
          direction={{ sm: 'row', lg: 'column' }}
          boxShadow={'2xl'}
        >
          <NavItem description={'Home'} icon={<BiHome />} path={'/home'} />
          <NavItem description={'Image Wizard'} icon={<BiCamera />} path={'/APOD'} />
          <NavItem description={'Mars Exploration'} icon={<BiRocket />} path={'/mars-exploration'} />
          <NavItem description={'Space facts'} icon={<BiRocket />} path={'/fact_wizard'} />
          <br></br>
          <br></br>
          <br></br>
          <br></br>
          <br></br>
          <NavItem description={'log out'} icon={<BiLogOut />} path={'/login'} />
        </Stack>
      </Box>
    </ChakraProvider>
  );
}

export default Nav;
