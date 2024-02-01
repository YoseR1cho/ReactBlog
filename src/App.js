import { useRoutes} from "react-router-dom";
import  routes from './routes'
import PublicComponent from '@/components/Public'

function App() {
  const outlet = useRoutes(routes);
    return (
          <>
            {outlet}
              <PublicComponent/>
          </>
  );
}

export default App;
