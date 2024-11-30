import { ChevronLeftIcon, ChevronRightIcon } from '@boolti/icon';

import Styled from './Pagination.styles';
import { useDeviceWidth } from '~/hooks/useDeviceWidth';
import { useTheme } from '@emotion/react';

interface Props {
  totalPages: number;
  currentPage: number;
  onClickPage?: (page: number) => void;
}

const Pagination = ({ totalPages, currentPage, onClickPage }: Props) => {
  const deviceWidth = useDeviceWidth();
  const theme = useTheme();
  const isMobile = deviceWidth < parseInt(theme.breakpoint.mobile, 10);
  const sizePerPage = isMobile ? 5 : 10;
  const start = Math.floor(currentPage / sizePerPage) * sizePerPage;
  const end = start + sizePerPage;
  const pages = Array.from({ length: totalPages }, (_, i) => i).slice(start, end);
  return (
    <Styled.Container>
      <Styled.Button
        disabled={currentPage === 0}
        onClick={() => {
          onClickPage?.(Math.max(start - sizePerPage, 0));
        }}
      >
        <ChevronLeftIcon />
      </Styled.Button>
      {pages.map((page) => (
        <Styled.Button
          key={page}
          isCurrent={page === currentPage}
          onClick={() => {
            onClickPage?.(page);
          }}
        >
          {page + 1}
        </Styled.Button>
      ))}
      <Styled.Button
        disabled={currentPage === totalPages - 1}
        onClick={() => {
          onClickPage?.(Math.min(end, totalPages - 1));
        }}
      >
        <ChevronRightIcon />
      </Styled.Button>
    </Styled.Container>
  );
};

export default Pagination;
