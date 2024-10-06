import Image from 'next/image';
import { RafoBook } from '../types/bookTypes';
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { FaSuitcase, FaCrown, FaAddressBook, FaXmark } from 'react-icons/fa6';
import withTooltip from './utils/hoc/withTooltip';
import { capitalize } from '@/utils/general';
import BookService from '@/services/book.service';
export default function BookCard({ book, refresh }: { book: RafoBook, refresh: () => void }) {
  const handleDelete = async() => {
    await BookService.delete(book.id);
    refresh();
  };
  const icon = {
    canon: FaSuitcase,
    bonus: FaCrown,
    nini: FaAddressBook,
  }[book.trophyType];
  const TrophyIcon = withTooltip(icon, capitalize(book.trophyType));

  return (
    <Card className='relative'>
      <CardHeader className='p-[5px]'>
        <CardTitle className='text-md w-full text-center'>{book.name}</CardTitle>
      </CardHeader>
      <CardContent className='flex justify-center'>
        <figure className="relative inline-block">
          <div className='opacity-0 hover:opacity-50 cursor-pointer transition-opacity bg-primary w-full h-full absolute'
          onClick={handleDelete}>
          <FaXmark className='fill-secondary text-2xl absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2'/>
          </div>
          <Image src={book.cover} alt={book.name} className='max-w-full m-auto' width={100} height={200}/>
        </figure>
      </CardContent>
      <CardFooter>
        <TrophyIcon className='text-3xl absolute bottom-4 left-4'/>
      </CardFooter>
    </Card>
  )
}