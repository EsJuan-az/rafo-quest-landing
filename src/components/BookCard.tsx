import Image from "next/image";
import { RafoBook } from "../types/bookTypes";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { FaSuitcase, FaCheck, FaQuestion } from "react-icons/fa6";
import withTooltip from "./utils/hoc/withTooltip";
import { useState } from "react";
import { toast } from "@/hooks/use-toast";
import UserBookService from "@/services/user_book.service";
import useRafoUser from "@/hooks/useRafoUser";

export default function BookCard({ book, refresh }: { book: RafoBook; refresh: () => void }) {
  const [dialogOpen, setDialogOpen] = useState(false);
  const [totalPages, setTotalPages] = useState("");
  const {accessToken, refresh: refreshUser} = useRafoUser()
  const TrophyIcon = withTooltip(FaSuitcase, "Canon Book");
  const hasBookData = !!book.userData[0];
  const Check = withTooltip(FaCheck,`${book.userData[0]?.totalPages} pages`);

  const handleAddData = async () => {
    if (!hasBookData) {
      setDialogOpen(true);
    }
  };

  const handleSubmit = async () => {
    // Aquí va la lógica para enviar el formulario (ej. llamada a la API)
    const pages = parseInt(totalPages);
    if(!accessToken){
      toast({
        title: `Access Forbidden`,
        description: `Try logging in.`,
        variant: "destructive",
      })
      return;
    }
    if(pages <= 0 || isNaN(pages)){
      toast({
        title: `Do your book really have ${totalPages} pages?`,
        description: `We don't think so...`,
        variant: "destructive",
      })
      return;
    }
    const resp = await UserBookService.create(accessToken, { totalPages, bookId: book.id });
    if(resp.error){
      toast({
        title: `Something has gone wrong.`,
        description: `Mala mía.`,
        variant: "destructive",
      });
      return
    }
    setDialogOpen(false);
    refresh(); // Actualiza la lista después de guardar
    refreshUser();
  };

  return (
    <>
      <Card className="relative">
        <CardHeader className="p-[5px]">
          <CardTitle className="text-md w-full text-center">{book.name}</CardTitle>
        </CardHeader>
        <CardContent className="flex justify-center">
          <figure className="relative inline-block">
            <Image
              src={book.cover}
              alt={book.name}
              className="max-w-full m-auto select-none"
              width={100}
              height={200}
            />
            <div
              className={`bg-primary rounded-full absolute bottom-[-10px] right-[-10px] size-7 flex justify-center items-center`}
              onClick={handleAddData}
            >
              {hasBookData ? (
                <Check className="fill-white cursor-default" />
              ) : (
                <FaQuestion className="cursor-pointer fill-white" />
              )}
            </div>
          </figure>
        </CardContent>
        <CardFooter>
          <TrophyIcon className="text-3xl absolute bottom-4 left-4" />
        </CardFooter>
      </Card>

      {/* Dialog for Adding Book Data */}
      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Add Book Data</DialogTitle>
          </DialogHeader>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSubmit();
            }}
          >
            <div className="mb-4 !outline-0">
              <label htmlFor="totalPages" className="block text-sm font-medium text-gray-700">
                How many pages does your book have?
              </label>
              <Input
                className="!outline-0"
                id="totalPages"
                type="number"
                value={totalPages}
                onChange={(e) => setTotalPages(e.target.value)}
                required
              />
            </div>
            <div className="flex justify-end gap-2">
              <Button type="button" variant="outline" onClick={() => setDialogOpen(false)}>
                Cancel
              </Button>
              <Button type="submit">Save</Button>
            </div>
          </form>
        </DialogContent>
      </Dialog>
    </>
  );
}
