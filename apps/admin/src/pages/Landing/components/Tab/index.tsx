import { useAtom } from 'jotai';

import { visibleSectionAtom } from '../../atoms/visibleSectionAtom';
import Styled from './Tab.styles';

const items = [
  { key: 'organizer', children: '주최자용 웹' },
  { key: 'user', children: '방문자용 앱' },
] as const;

const Tab = () => {
  const [currentVisibleSection, setCurrentVisibleSection] = useAtom(visibleSectionAtom);
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
        {items.map((item) => (
          <Styled.Button
            key={item.key}
            isActive={currentVisibleSection === item.key}
            disabled={currentVisibleSection === item.key}
            onClick={() => {
              const element = document.getElementById(item.key);
              if (element) {
                setCurrentVisibleSection(item.key);
                const top = window.scrollY + element.getBoundingClientRect().top - 60;
                setTimeout(() => {
                  window.scrollTo({ top, behavior: 'smooth' });
                }, 0);
              }
            }}
          >
            {item.children}
          </Styled.Button>
        ))}
      </Styled.List>
    </Styled.Container>
  );
};

export default Tab;
