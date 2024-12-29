"use client";

import BookCard from '@/components/BookCard';
import CustomPagination from '@/components/CustomPagination';
import useRafoBooks from '@/hooks/useRafoBooks';
import { RafoBook } from '@/types/bookTypes';

export default function Book() {
  const { books, loading: booksLoading, refresh, setPage, error: booksError } = useRafoBooks();
  return (
    <div className="container mx-auto px-4">
      <h1 className="text-5xl my-4">Take a look at our readings!</h1>

      {/* Error Message */}
      {booksError && (
        <p className="text-red-500">
          Something went wrong: {typeof booksError === 'string' ? booksError : 'Unknown error'}
        </p>
      )}

      {/* Book List */}
      {!booksError && !booksLoading && books?.data?.length > 0 ? (
        <ul className="grid grid-cols-5 gap-4">
          {books.data.map((b: RafoBook) => (
            <BookCard key={b.id} refresh={refresh} book={b} />
          ))}
        </ul>
      ) : (
        !booksLoading && (
          <p className="text-gray-500">No books available at the moment.</p>
        )
      )}

      {/* Pagination */}
      {!booksError && !booksLoading && books?.totalPages > 1 && (
        <section className="mt-16">
          <CustomPagination
            currentPage={books.currentPage}
            totalPages={books.totalPages}
            onPageChange={setPage}
          />
        </section>
      )}
    </div>
  );
}
