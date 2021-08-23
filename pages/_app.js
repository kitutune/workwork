import 'tailwindcss/tailwind.css';
import { ChakraProvider } from '@chakra-ui/react';
import { Auth } from '@supabase/ui';
import { supabase } from 'utils/supabaseClient';
import { LayoutWrapper } from 'components/LayoutWrapper/layoutWrapper';
function MyApp({ Component, pageProps }) {
  // console.log('MyApp-------------------');
  return (
    <ChakraProvider>
      <Auth.UserContextProvider supabaseClient={supabase}>
        <LayoutWrapper>
          <Component {...pageProps} />
        </LayoutWrapper>
      </Auth.UserContextProvider>
    </ChakraProvider>
  );
}

export default MyApp;
