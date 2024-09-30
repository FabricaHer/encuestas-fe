import React from 'react'
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";

type Props = {
  pages:number;
  handlePage:Function;
}
export function PaginationUtil({pages,handlePage}:Props){
  const [currentPage, setCurrentPage] = React.useState<number>(1);
  const handleClick = (i: number) => {
    if (currentPage !== i) {
      setCurrentPage(i);
      handlePage(i)
    }
  };

  const handleGetBack = () => {
    if (currentPage !== 1) {
      setCurrentPage(currentPage - 1);
      handlePage(currentPage - 1)
    }
  };

  const handleGoForward = () => {
    if (currentPage !== pages) {
      setCurrentPage(currentPage + 1);
      handlePage(currentPage + 1)
    }
  };
  console.log(pages)
  return (<>
        {pages > 1 ? (
        <Pagination>
          <PaginationContent>
            {currentPage > 1 && (
              <PaginationItem>
                <PaginationPrevious onClick={handleGetBack} href="#" />
              </PaginationItem>
            )}
            {Array.from({ length: pages }, (_, i) => i + 1).map((number,i) => (
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
            {currentPage !== pages && (
              <PaginationItem>
                <PaginationNext onClick={handleGoForward} href="#" />
              </PaginationItem>
            )}
          </PaginationContent>
        </Pagination>
      ) : null}
  
  </>)
}