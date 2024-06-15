import { useAtomValue } from 'jotai';

import { visibleSectionAtom } from '../../atoms/visibleSectionAtom';
import Styled from './Tab.styles';

const Tab = () => {
  const currentVisibleSection = useAtomValue(visibleSectionAtom);

  return (
    <Styled.Container
      initial={false}
      animate={currentVisibleSection === 'key-visal' ? 'hidden' : 'visible'}
      transition={{ duration: 0.4 }}
      variants={{
        hidden: {
          maxHeight: 0,
          opacity: 0,
        },
        visible: {
          maxHeight: 100,
          opacity: 1,
        },
      }}
    >
      <Styled.List>
        <Styled.Button
          isActive={currentVisibleSection === 'organizer'}
          disabled={currentVisibleSection === 'organizer'}
          onClick={() => {
            document
              .querySelector(`#${currentVisibleSection}`)
              ?.scrollIntoView({ inline: 'start', behavior: 'smooth' });
          }}
        >
          주최자용 웹
        </Styled.Button>
        <Styled.Button>예매자용 웹</Styled.Button>
      </Styled.List>
    </Styled.Container>
  );
};

export default Tab;
