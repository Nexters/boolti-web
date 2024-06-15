import { atom, useSetAtom } from 'jotai';
import { useEffect } from 'react';
import { useInView } from 'react-intersection-observer';

type VisibleSection = 'key-visal' | 'organizer';

export const visibleSectionAtom = atom<VisibleSection>('key-visal');

export const useVisibleSectionAtom = (section: VisibleSection) => {
  const { ref, inView, entry } = useInView({ threshold: 0.51 });
  const setVisibleSection = useSetAtom(visibleSectionAtom);

  useEffect(() => {
    if (inView) {
      setVisibleSection(section);
    }
  }, [inView, section, setVisibleSection]);

  return {
    entry,
    ref,
    inView,
  };
};
