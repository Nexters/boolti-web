import { Button, ThemeProvider } from '@boolti/ui';

const App = () => {
  return (
    <ThemeProvider>
      <h1>
        Preview
        <Button size="bold" color="primary">
          BUTTON
        </Button>
        <Button size="bold" color="netural">
          BUTTON
        </Button>
        <Button size="bold" color="line">
          BUTTON
        </Button>
      </h1>
    </ThemeProvider>
  );
};

export default App;
