import { ChevronLeftIcon, ChevronRightIcon } from '@boolti/icon';

import Styled from './Pagination.styles';

interface Props {
  totalPages: number;
  currentPage: number;
  onClickPage?: (page: number) => void;
}

const Pagination = ({ totalPages, currentPage, onClickPage }: Props) => {
  const pages = Array.from({ length: totalPages }, (_, i) => i);
  return (
    <Styled.Container>
      <Styled.Button
        disabled={currentPage === 0}
        onClick={() => {
          onClickPage?.(0);
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
          onClickPage?.(totalPages - 1);
        }}
      >
        <ChevronRightIcon />
      </Styled.Button>
    </Styled.Container>
  );
};

export default Pagination;
