import { Hello, QueryClientProvider, ReactQueryDevtools } from '@boolti/api';

const App = () => {
  return (
    <QueryClientProvider>
      <h1>
        {Hello()}
        <ReactQueryDevtools />
      </h1>
    </QueryClientProvider>
  );
};

export default App;
