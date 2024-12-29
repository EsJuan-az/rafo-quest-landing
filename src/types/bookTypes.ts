export interface RafoBook {
  id: string;
  name: string;
  sortIndex: number;
  cover: string;
  userData: object[];
}
export interface RafoBookData {
  bookId: string;
  userId: string;
  totalPages: string;
  status: string;
  stars?: number;
  reviewText?: string;
  reviewTitle?: string;
}