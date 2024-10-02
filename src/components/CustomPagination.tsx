import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";

interface CustomPaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

const CustomPagination: React.FC<CustomPaginationProps> = ({
  currentPage,
  totalPages,
  onPageChange,
}) => {
  const pageNumbers: (number | string)[] = [];

  // Determinamos los límites de la paginación
  const startPage = Math.max(currentPage - 2, 1);
  const endPage = Math.min(currentPage + 2, totalPages);

  if (startPage > 1) pageNumbers.push(1); // Primera página siempre visible
  if (startPage > 2) pageNumbers.push("ellipsis"); // Elipsis para evitar mostrar muchas páginas

  // Agregamos los números de página dentro del rango visible
  for (let i = startPage; i <= endPage; i++) {
    pageNumbers.push(i);
  }

  if (endPage < totalPages - 1) pageNumbers.push("ellipsis"); // Elipsis al final si es necesario
  if (endPage < totalPages) pageNumbers.push(totalPages); // Última página siempre visible
  return (
    <Pagination>
      {totalPages != 0 && (
        <PaginationContent>
          {/* Previous button */}
          {currentPage == 0 || (
            <PaginationItem>
              <PaginationPrevious
                href="#"
                onClick={() => onPageChange(currentPage - 1)}
              />
            </PaginationItem>
          )}
          {/* Renderización dinámica de las páginas */}
          {pageNumbers.map((page, index) =>
            page === "ellipsis" ? (
              <PaginationItem key={index}>
                <PaginationEllipsis />
              </PaginationItem>
            ) : (
              <PaginationItem key={index}>
                <PaginationLink
                  href="#"
                  onClick={
                    (page as number) === currentPage
                      ? () => {}
                      : () => onPageChange((page as number) - 1)
                  }
                  isActive={(page as number) - 1 === currentPage}
                >
                  {page}
                </PaginationLink>
              </PaginationItem>
            )
          )}

          {/* Next button */}
          {currentPage == totalPages - 1 || (
            <PaginationItem>
              <PaginationNext
                href="#"
                onClick={() => onPageChange(currentPage + 1)}
              />
            </PaginationItem>
          )}
        </PaginationContent>
      )}
    </Pagination>
  );
};

export default CustomPagination;
