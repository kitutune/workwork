import 'tailwindcss/tailwind.css';
import { ChakraProvider } from '@chakra-ui/react';
import { Auth } from '@supabase/ui';
import { supabase } from 'utils/supabaseClient';
function MyApp({ Component, pageProps }) {
  return (
    <ChakraProvider>
      <Auth.UserContextProvider supabaseClient={supabase}>
        <Component {...pageProps} />
      </Auth.UserContextProvider>
    </ChakraProvider>
  );
}

export default MyApp;
