import { CloseIcon } from '@boolti/icon';
import { useTransition } from '@react-spring/web';

import Portal from '../Portal';
import Styled from './Drawer.styles'

interface DrawerProps {
  open: boolean;
  title: string;
  width?: string;
  children?: React.ReactNode;
  onClose: () => void;
}

const Drawer = ({ open, title, width = '580px', children, onClose }: DrawerProps) => {
  const transition = useTransition(open, {
    from: { right: '-100%', opacity: 0 },
    enter: { right: '0', opacity: 1 },
    leave: { right: '-100%', opacity: 0 }
  });

  return (
    <Portal>
      {
        transition((styles, open) => {
          if (!open) return null;

          return (
            <>
              <Styled.DimmedArea onClick={onClose} style={{ opacity: styles.opacity}} />
              <Styled.Drawer width={width} style={{ right: styles.right }}>
                <Styled.DrawerHeader>
                  <Styled.DrawerTitle>{title}</Styled.DrawerTitle>
                  <Styled.DrawerCloseButton onClick={onClose}>
                    <CloseIcon />
                  </Styled.DrawerCloseButton>
                </Styled.DrawerHeader>
                <Styled.DrawerContent>
                  {children}
                </Styled.DrawerContent>
              </Styled.Drawer>
            </>
          );
        })
      }
    </Portal>
  )
}

export default Drawer;
