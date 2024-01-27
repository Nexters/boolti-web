import { Button, TextButton, ThemeProvider } from '@boolti/ui';

const Icon = () => (
  <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path
      fill-rule="evenodd"
      clip-rule="evenodd"
      d="M10 18C14.4183 18 18 14.4183 18 10C18 5.58172 14.4183 2 10 2C5.58172 2 2 5.58172 2 10C2 14.4183 5.58172 18 10 18ZM10 17C6.13401 17 3 13.866 3 10C3 6.13401 6.13401 3 10 3C13.866 3 17 6.13401 17 10C17 13.866 13.866 17 10 17Z"
      fill="currentColor"
    />
  </svg>
);

const App = () => {
  return (
    <ThemeProvider>
      <h1>
        Preview
        <div
          style={{
            display: 'flex',
            width: 1200,
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
          <Button size="x-small" colorTheme="primary" disabled>
            BUTTON
          </Button>
        </div>
        <div
          style={{
            display: 'flex',
            width: 1200,
            justifyContent: 'space-between',
            marginBottom: 20,
            alignItems: 'flex-end',
          }}
        >
          <Button icon={<Icon />} size="bold" colorTheme="primary">
            BUTTON
          </Button>
          <Button icon={<Icon />} size="medium" colorTheme="primary">
            BUTTON
          </Button>
          <Button icon={<Icon />} size="regular" colorTheme="primary">
            BUTTON
          </Button>
          <Button icon={<Icon />} size="small" colorTheme="primary">
            BUTTON
          </Button>
          <Button icon={<Icon />} size="x-small" colorTheme="primary">
            BUTTON
          </Button>
          <Button icon={<Icon />} size="x-small" colorTheme="primary" disabled>
            BUTTON
          </Button>
        </div>
        <div
          style={{
            display: 'flex',
            width: 1200,
            justifyContent: 'space-between',
            marginBottom: 20,
            alignItems: 'flex-end',
          }}
        >
          <Button icon={<Icon />} size="bold" colorTheme="netural">
            BUTTON
          </Button>
          <Button icon={<Icon />} size="medium" colorTheme="netural">
            BUTTON
          </Button>
          <Button icon={<Icon />} size="regular" colorTheme="netural">
            BUTTON
          </Button>
          <Button icon={<Icon />} size="small" colorTheme="netural">
            BUTTON
          </Button>
          <Button icon={<Icon />} size="x-small" colorTheme="netural">
            BUTTON
          </Button>
          <Button icon={<Icon />} size="x-small" colorTheme="netural" disabled>
            BUTTON
          </Button>
        </div>
        <div
          style={{
            display: 'flex',
            width: 1200,
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
          <Button size="x-small" colorTheme="netural" disabled>
            BUTTON
          </Button>
        </div>
        <div
          style={{
            display: 'flex',
            width: 1200,
            justifyContent: 'space-between',
            marginBottom: 20,
            alignItems: 'flex-end',
          }}
        >
          <Button icon={<Icon />} size="bold" colorTheme="line">
            BUTTON
          </Button>
          <Button icon={<Icon />} size="medium" colorTheme="line">
            BUTTON
          </Button>
          <Button icon={<Icon />} size="regular" colorTheme="line">
            BUTTON
          </Button>
          <Button icon={<Icon />} size="small" colorTheme="line">
            BUTTON
          </Button>
          <Button icon={<Icon />} size="x-small" colorTheme="line">
            BUTTON
          </Button>
          <Button icon={<Icon />} size="x-small" colorTheme="line" disabled>
            BUTTON
          </Button>
        </div>
        <div
          style={{
            display: 'flex',
            width: 1200,
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
          <Button size="x-small" colorTheme="line" disabled>
            BUTTON
          </Button>
        </div>
        <TextButton>TEXT BUTTON</TextButton>
        <TextButton icon={<Icon />}>TEXT BUTTON</TextButton>
        <TextButton disabled>TEXT BUTTON</TextButton>
        <TextButton icon={<Icon />} disabled>
          TEXT BUTTON
        </TextButton>
      </h1>
    </ThemeProvider>
  );
};

export default App;
