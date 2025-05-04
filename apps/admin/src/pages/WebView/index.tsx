import {
  TOAST_DURATIONS,
  navigateBack,
  navigateToShowDetail,
  requestToken,
  showToast,
} from '@boolti/bridge';

import Styled from './WebView.styles';

const WebView = () => {
  return (
    <Styled.Container>
      <Styled.Button
        size="medium"
        colorTheme="primary"
        onClick={async () => {
          try {
            const response = await requestToken();
            alert('SUCCESS: ' + JSON.stringify(response));
          } catch (e) {
            alert('ERROR: ' + JSON.stringify(e));
          }
        }}
      >
        requestToken
      </Styled.Button>

      <Styled.Button
        size="medium"
        colorTheme="primary"
        onClick={async () => {
          try {
            const response = await navigateBack();
            alert('SUCCESS: ' + JSON.stringify(response));
          } catch (e) {
            alert('ERROR: ' + JSON.stringify(e));
          }
        }}
      >
        navigateBack
      </Styled.Button>

      <Styled.Button
        size="medium"
        colorTheme="primary"
        onClick={async () => {
          try {
            const response = await showToast({
              message: '토스트 테스트',
              duration: TOAST_DURATIONS.LONG,
            });
            alert('SUCCESS: ' + JSON.stringify(response));
          } catch (e) {
            alert('ERROR: ' + JSON.stringify(e));
          }
        }}
      >
        showToast (duration: LONG)
      </Styled.Button>

      <Styled.Button
        size="medium"
        colorTheme="primary"
        onClick={async () => {
          try {
            const response = await showToast({
              message: '토스트 테스트',
              duration: TOAST_DURATIONS.SHORT,
            });
            alert('SUCCESS: ' + JSON.stringify(response));
          } catch (e) {
            alert('ERROR: ' + JSON.stringify(e));
          }
        }}
      >
        showToast (duration: SHORT)
      </Styled.Button>

      <Styled.Button
        size="medium"
        colorTheme="primary"
        onClick={async () => {
          try {
            const response = await navigateToShowDetail({
              showId: 144,
            });
            alert('SUCCESS: ' + JSON.stringify(response));
          } catch (e) {
            alert('ERROR: ' + JSON.stringify(e));
          }
        }}
      >
        navigateToShowDetail (showId: 144)
      </Styled.Button>
    </Styled.Container>
  );
};

export default WebView;
