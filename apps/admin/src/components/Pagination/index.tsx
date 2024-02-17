import { ChevronLeftIcon, ChevronRightIcon } from '@boolti/icon';

import Styled from './Pagination.styles';

interface Props {
  totalPages: number;
  currentPage: number;
  onClickPage?: (page: number) => void;
}

const SIZE_PER_PAGE = 10;

const Pagination = ({ totalPages, currentPage, onClickPage }: Props) => {
  const start = Math.floor(currentPage / SIZE_PER_PAGE) * SIZE_PER_PAGE;
  const end = start + SIZE_PER_PAGE;
  const pages = Array.from({ length: totalPages }, (_, i) => i).slice(start, end);
  return (
    <Styled.Container>
      <Styled.Button
        disabled={currentPage === 0}
        onClick={() => {
          onClickPage?.(Math.max(currentPage - SIZE_PER_PAGE, 0));
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
          onClickPage?.(Math.min(currentPage + SIZE_PER_PAGE, totalPages - 1));
        }}
      >
        <ChevronRightIcon />
      </Styled.Button>
    </Styled.Container>
  );
};

export default Pagination;
