import { useHelloQuery, QueryClientProvider } from '@boolti/api';

const App = () => {
  // const { data } = useHelloQuery();
  // console.log(data?.hello)
  return (
    <QueryClientProvider>
      <h1>Hello World</h1>
    </QueryClientProvider>
  );
};

export default App;
