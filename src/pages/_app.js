import './_app.scss';
import { AuthProvider } from '../contexts/auth';

const App = ({ Component, pageProps }) => (
  <AuthProvider>
    <Component {...pageProps} />
  </AuthProvider>
);
export default App;
