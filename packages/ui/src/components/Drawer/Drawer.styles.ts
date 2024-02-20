import styled from "@emotion/styled";
import { animated } from "@react-spring/web";

interface DrawerProps {
  width?: string;
}

const DimmedArea = styled(animated.div)`
  position: fixed;
  inset: 0;
  background-color: ${({ theme }) => theme.palette.dim.dialog};
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 999;
`;

const Drawer = styled(animated.div)<DrawerProps>`
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  width: ${({ width }) => width};
  background-color: ${({ theme }) => theme.palette.grey.w};
  box-shadow: -12px 0px 20px 0px ${({ theme }) => theme.palette.shadow};
  z-index: 1000;
`

const DrawerHeader = styled.div`
  height: 66px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-left: 28px;
  padding-right: 21px;
  border-bottom: 1px solid ${({ theme }) => theme.palette.grey.g20};
`

const DrawerTitle = styled.h3`
  ${({ theme }) => theme.typo.sh2};
`

const DrawerCloseButton = styled.button`
  width: 24px;
  height: 24px;
  cursor: pointer;
`

const DrawerContent = styled.div``

export default {
  DimmedArea,
  Drawer,
  DrawerHeader,
  DrawerTitle,
  DrawerCloseButton,
  DrawerContent,
}
