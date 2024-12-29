import BookService from "@/services/book.service";
import OwnService from "@/services/own.service";
import { RafoBook } from "@/types/bookTypes";
import { useEffect, useState, useCallback } from "react";

export default function useRafoBooks() {
  const [books, setBooks] = useState<{
    data: RafoBook[];
    currentPage: number;
    totalPages: number;
  }>({
    data: [],
    currentPage: 0,
    totalPages: 0,
  });
  const [loading, setLoading] = useState<boolean>(true);
  const [refreshCount, setRefreshCount] = useState<number>(0);
  const [error, setError] = useState<null | string>(null);
  const [page, setPage] = useState<number>(0);

  const refresh = useCallback(() => setRefreshCount((v) => v + 1), []);

  useEffect(() => {
    const fetchBooks = async () => {
      setLoading(true);
      setError(null);

      try {
        const accessToken = await OwnService.getAccessToken();
        if (!accessToken){
          throw new Error("Not authenticated.");
        }
        const response = await BookService.findAll(accessToken, page, 10);
        const {body: bookData} = response;
        if (!response.error && bookData) {
          setBooks({
            data: bookData.rows,
            currentPage: bookData.currentPage || 0,
            totalPages: bookData.totalPages || 0,
          });
        } else {
          throw new Error("Invalid response structure from BookService.");
        }
      } catch (err) {
        console.error("Error fetching books:", err);
        setError(err instanceof Error ? err.message : "Unknown error occurred.");
      } finally {
        setLoading(false);
      }
    };

    fetchBooks();
  }, [refreshCount, page]);

  return {
    books,
    loading,
    refresh,
    setPage,
    error,
    page,
  };
}
