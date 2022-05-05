import { AuthProvider } from "../components/context/auth-context";

import '../styles/globals.scss';
import 'tailwindcss/tailwind.css';
import "../components/table/table.scss";

function MyApp({ Component, pageProps }) {
  return (
    <AuthProvider>
      <Component {...pageProps} />
    </AuthProvider>
  );
}

export default MyApp;
