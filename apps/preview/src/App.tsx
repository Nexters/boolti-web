import './index.css';
import 'the-new-css-reset/css/reset.css';
import { BooltiUIProvider } from '@boolti/ui';

const App = () => {
  return (
    <BooltiUIProvider>
      <h1>Preview</h1>
    </BooltiUIProvider>
  );
};

export default App;
