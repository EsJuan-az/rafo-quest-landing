"use client";

import { useEffect, useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import {
  Select,
  SelectTrigger,
  SelectContent,
  SelectItem,
  SelectLabel,
  SelectGroup,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { toast } from "@/hooks/use-toast";
import RecordService from "@/services/record.service";
import useRafoUser from "@/hooks/useRafoUser";
import useRafoUsers from "@/hooks/useRafoUsers";
import Image from "next/image"; // Usar Image de Next.js
import ThreeMap from "@/components/ThreeMap";

type RafoBook = {
  cover: string;
  name: string;
  UserBookData: {
    advanceRatio: number;
    sortIndex: number;
  };
};

export default function Home() {
  const threeRef = useRef(null);
  const [selectedOption, setSelectedOption] = useState<string>("pagesRead");
  const [inputValue, setInputValue] = useState<string>("");
  const [openDialog, setOpenDialog] = useState(false);
  const { accessToken, user } = useRafoUser();
  const [currentBook, setCurrentBook] = useState<RafoBook | null>(null);
  const myId = user?.id;
  const { users, loading, error } = useRafoUsers();
  const handleSelectChange = (value: string) => {
    setSelectedOption(value);
  };

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(event.target.value);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!accessToken) {
      toast({
        title: "Access Forbidden",
        description: "Try logging in.",
        variant: "destructive",
      });
      return;
    }

    const data: Record<string, number> = {};
    const num = parseInt(inputValue);

    if (num <= 0 || isNaN(num)) {
      toast({
        title: "Invalid Input",
        description: `The value \"${inputValue}\" is not valid. Please try again.`,
        variant: "destructive",
      });
      return;
    }

    data[selectedOption] = num;

    try {
      const resp = await RecordService.create(accessToken, data);

      if (resp.error) {
        toast({
          title: "Error",
          description: "Something went wrong. Please try again.",
          variant: "destructive",
        });
        return;
      }

      const { UserBookData, User } = resp.body;
      if (threeRef.current) {
        (threeRef.current as { moveChar(a: object, b: object): void }).moveChar(
          UserBookData.book.sortIndex,
          UserBookData.advanceRatio
        );
      }
      setCurrentBook(User.currentBook);
      setOpenDialog(false);
    } catch (error) {
      console.log(error);
      toast({
        title: "Error",
        description: "An unexpected error occurred. Please try again later.",
        variant: "destructive",
      });
    }
  };

  useEffect(() => {
    if (user) {
      setCurrentBook(user.currentBook as RafoBook);
    }
  }, [user]);

  const progressPercentage = currentBook
    ? (currentBook.UserBookData.advanceRatio * 100).toFixed(0)
    : 0;

  return (
    <div className="relative">
      {currentBook && (
        <div className="absolute top-4 left-4 bg-white p-4 rounded-lg shadow-lg w-80">
          <div className="flex items-center">
            <Image
              src={currentBook.cover}
              alt={currentBook.name}
              width={64}
              height={64}
              className="object-cover rounded-md mr-4"
            />
            <div className="flex flex-col">
              <h3 className="text-lg font-semibold">{currentBook.name}</h3>
              <div className="mt-2">
                <p className="text-sm font-medium">
                  Progress: {progressPercentage}% (
                  {currentBook.UserBookData.currentPage}/
                  {currentBook.UserBookData.totalPages})
                </p>
                <div className="w-full bg-gray-200 rounded-full h-2 mt-1">
                  <div
                    className="bg-blue-500 h-2 rounded-full"
                    style={{ width: `${progressPercentage}%` }}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {loading ? (
        <p>Loading...</p>
      ) : error ? (
        <p>Something went wrong. Please try again.</p>
      ) : !currentBook ? (
        <p>You must add the total pages of the next book to proceed.</p>
      ) : users && myId ? (
        <>
          <ThreeMap ref={threeRef} users={users} myId={myId} />
          <Dialog open={openDialog} onOpenChange={setOpenDialog}>
            <DialogTrigger asChild>
              <Button className="fixed bottom-4 right-4 bg-blue-500 text-white py-2 px-4 rounded-full shadow-md">
                Advance
              </Button>
            </DialogTrigger>
            <DialogContent className="w-80 p-6">
              <DialogTitle>Advance in the book</DialogTitle>
              <DialogDescription>
                Choose how you want to advance and specify the value.
              </DialogDescription>

              <div className="mb-4">
                <Select
                  value={selectedOption}
                  onValueChange={handleSelectChange}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select an option" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      <SelectLabel>Advance Options</SelectLabel>
                      <SelectItem value="pagesRead">
                        By Number of Pages
                      </SelectItem>
                      <SelectItem value="currentPage">
                        By Current Page
                      </SelectItem>
                    </SelectGroup>
                  </SelectContent>
                </Select>
              </div>

              <div className="mb-4">
                <Input
                  id="inputValue"
                  type="number"
                  value={inputValue}
                  onChange={handleInputChange}
                  placeholder="Number of pages"
                />
              </div>

              <div className="flex justify-between mt-4">
                <Button
                  variant="outline"
                  onClick={() => setOpenDialog(false)}
                  className="bg-gray-300 py-2 px-4 rounded"
                >
                  Cancel
                </Button>
                <Button
                  onClick={handleSubmit}
                  className="bg-blue-500 text-white py-2 px-4 rounded"
                >
                  Advance
                </Button>
              </div>
            </DialogContent>
          </Dialog>
        </>
      ) : (
        <p>No users available.</p>
      )}
    </div>
  );
}
