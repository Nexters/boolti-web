import { BooltiDark } from '@boolti/icon';
import { useAnimation, useInView } from 'framer-motion';
import { useEffect, useRef } from 'react';

import { useVisibleSectionAtom } from '../../atoms/visibleSectionAtom';
import Styled from './KeyVisual.styles';

const Union = () => {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 41 41" fill="none">
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M23.4099 14.015L29.3272 0.207581L22.7728 13.6849C20.5699 16.1601 17.227 17.4094 13.9413 16.9868L0.151794 11.0772L13.634 17.6341C16.1089 19.8423 17.3546 23.1915 16.9235 26.4806L11.0214 40.2526L17.59 26.7464C19.7953 24.2869 23.13 23.0484 26.4068 23.4732L40.1968 29.383L26.6955 22.8168C24.2356 20.6168 22.9935 17.2884 23.4099 14.015Z"
        fill="white"
      />
    </svg>
  );
};

const KeyVisual = () => {
  const { ref: sectionRef } = useVisibleSectionAtom('key-visal');
  const hiddenElementRef = useRef(null);
  const isInView = useInView(hiddenElementRef, { amount: 'all' });
  const animation = useAnimation();

  useEffect(() => {
    if (isInView) {
      animation.start('visible');
    }
  }, [isInView, animation]);

  return (
    <Styled.Container ref={sectionRef}>
      <Styled.Title>
        핫한 공연 예매의 시작
        <BooltiDark />
      </Styled.Title>
      <Styled.Description
        initial="hidden"
        animate={animation}
        variants={{
          hidden: {
            opacity: 0,
            x: 100,
          },
          visible: {
            opacity: 1,
            x: 0,
          },
        }}
        transition={{ duration: 0.8, delay: 0.2 }}
      >
        <>음악을 사랑하는 모두가, 공연을 즐기고 싶은 모두가{'\n'}</>
        <>더 쉽게 공연을 주최하고 관람할 수 있도록!{'\n'}</>
        <>
          <Styled.MobileBreak />
          지금 <b>불티</b>에서 당신의 공연을 시작해 보세요
        </>
        <Styled.FloatingUnion position="left">
          <Union />
        </Styled.FloatingUnion>
        <Styled.FloatingUnion position="right">
          <Union />
        </Styled.FloatingUnion>
        <Styled.Hidden ref={hiddenElementRef} />
      </Styled.Description>
    </Styled.Container>
  );
};

export default KeyVisual;
