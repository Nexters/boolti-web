import { Button, ThemeProvider } from '@boolti/ui';

const App = () => {
  return (
    <ThemeProvider>
      <h1>
        Preview
        <div
          style={{
            display: 'flex',
            width: 600,
            justifyContent: 'space-between',
            marginBottom: 20,
            alignItems: 'flex-end',
          }}
        >
          <Button size="bold" colorTheme="primary">
            BUTTON
          </Button>
          <Button size="medium" colorTheme="primary">
            BUTTON
          </Button>
          <Button size="regular" colorTheme="primary">
            BUTTON
          </Button>
          <Button size="small" colorTheme="primary">
            BUTTON
          </Button>
          <Button size="x-small" colorTheme="primary">
            BUTTON
          </Button>
        </div>
        <div
          style={{
            display: 'flex',
            width: 600,
            justifyContent: 'space-between',
            marginBottom: 20,
            alignItems: 'flex-end',
          }}
        >
          <Button size="bold" colorTheme="netural">
            BUTTON
          </Button>
          <Button size="medium" colorTheme="netural">
            BUTTON
          </Button>
          <Button size="regular" colorTheme="netural">
            BUTTON
          </Button>
          <Button size="small" colorTheme="netural">
            BUTTON
          </Button>
          <Button size="x-small" colorTheme="netural">
            BUTTON
          </Button>
        </div>
        <div
          style={{
            display: 'flex',
            width: 600,
            justifyContent: 'space-between',
            marginBottom: 20,
            alignItems: 'flex-end',
          }}
        >
          <Button size="bold" colorTheme="line">
            BUTTON
          </Button>
          <Button size="medium" colorTheme="line">
            BUTTON
          </Button>
          <Button size="regular" colorTheme="line">
            BUTTON
          </Button>
          <Button size="small" colorTheme="line">
            BUTTON
          </Button>
          <Button size="x-small" colorTheme="line">
            BUTTON
          </Button>
        </div>
      </h1>
    </ThemeProvider>
  );
};

export default App;
