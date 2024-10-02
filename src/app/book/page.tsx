"use client";
import BookCard from '@/components/BookCard';
import BookFormDialog from '@/components/BookFormDialog';
import CustomPagination from '@/components/CustomPagination';
import useRafoBooks from '@/hooks/useRafoBooks';
import { pixel } from '@/utils/fonts';


export default function Book() {
  const { books, loading: booksLoading, refresh, setPage, page } = useRafoBooks();
  return (
    <>
      <h1 className={`${pixel.className} text-5xl mb-4`}>Take a look of our readings!</h1>
      <ul className='grid grid-cols-5 gap-4'>
        {
          books && books?.rows?.map((b: RafoBook)=> <BookCard key={b.id} refresh={refresh} book={b}/>)
        }
      </ul>
      <section className="mt-16">
        {
          books && <CustomPagination currentPage={books?.currentPage as number} totalPages={books?.totalPages as number} onPageChange={setPage}/>
        }
      </section>
    <BookFormDialog refresh={refresh}/>
    </>
  )
}