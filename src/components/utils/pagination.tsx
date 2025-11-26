import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import React from 'react';

type Props = {
  pages:number;
  handlePage:Function;
}
export function PaginationUtil({ pages, handlePage }: Props) {
  const [currentPage, setCurrentPage] = React.useState<number>(1);
  const perPage = 10; // número de páginas a mostrar alrededor del número actual de página

  const handleClick = (i: number) => {
    if (currentPage !== i) {
      setCurrentPage(i);
      handlePage(i);
    }
  };

  const handleGetBack = () => {
    if (currentPage !== 1) {
      setCurrentPage(currentPage - 1);
      handlePage(currentPage - 1);
    }
  };

  const handleGoForward = () => {
    if (currentPage !== pages) {
      setCurrentPage(currentPage + 1);
      handlePage(currentPage + 1);
    }
  };

  const startPage = Math.max(1, currentPage - Math.floor(perPage / 2));
  const endPage = Math.min(startPage + perPage - 1, pages);

  return (
    <>
      {pages > 1 ? (
        <Pagination>
          <PaginationContent>
            {currentPage > 1 && (
              <PaginationItem>
                <PaginationPrevious onClick={handleGetBack} href="#" />
              </PaginationItem>
            )}
            {Array.from({ length: pages }, (_, i) => i + 1)
              .filter((page) => page >= startPage && page <= endPage)
              .map((number, i) => (
                <PaginationItem key={i}>
                  <PaginationLink
                    onClick={() => handleClick(number)}
                    href="#"
                    isActive={currentPage === number ? true : false}
                  >
                    {number}
                  </PaginationLink>
                </PaginationItem>
              ))}
            <PaginationItem>
              <PaginationEllipsis />
            </PaginationItem>
            {currentPage < pages && (
              <PaginationItem>
                <PaginationNext onClick={handleGoForward} href="#" />
              </PaginationItem>
            )}
          </PaginationContent>
        </Pagination>
      ) : null}
    </>
  );

}