import { IN_DEV, IN_PROD, PORT } from '@/globals';

function App() {
  return (
    <>
      in dev: {IN_DEV.toString()}
      <br />
      in prod: {IN_PROD.toString()}
      <br />
      port: {PORT}
      <br />
      This was a triumph?
    </>
  );
}

export default App;
