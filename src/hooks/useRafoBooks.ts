import BookService from "@/services/book.service";
import { RafoBook } from "@/types/bookTypes";
import { useEffect, useState } from "react";

export default function useRafoBooks() {
  const [books, setBooks] = useState<RafoBook[] | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [refreshCount, setRefreshCount] = useState<number>(0);
  const [ page, setPage ] = useState<number>(0);
  const refresh = () => setRefreshCount((v) => v + 1);
  useEffect(() => {
    setLoading(true);
    const fetchBooks = async () => {
      try {
        const bookData = await BookService.findAll(page, 10);
        setBooks(bookData);
      } catch (error) {
        console.error("Error fetching user:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchBooks();
  }, [refreshCount, page]);
  return {
    books: books && {
      ...books,
      currentPage: (books?.currentPage * 1),
    },
    loading,
    refresh,
    setPage,
    page,
  };
}
