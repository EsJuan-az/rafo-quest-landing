import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { useRef } from "react";
import { useToast } from "@/hooks/use-toast";
import { FormValidation, ValidationResponse } from "@/utils/formValidation";
import BookService from "@/services/book.service";

interface BookFormDialogProps{
  refresh: () => void;
}

export default function BookFormDialog({ refresh }: BookFormDialogProps) {
    const formRef = useRef<HTMLFormElement | null>(null);
    const { toast } = useToast();

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
      if (formRef.current) {
        const formData = new FormData(formRef.current);
        const data = Object.fromEntries(formData.entries());
        const validation: ValidationResponse = FormValidation.createBook(data);
        if(validation.ok){
          const response = await BookService.create( data );
          toast({
            title: `${data.name} was added!`,
            description: "Now read and find out.",
          });
          refresh()
        }else{
          e.preventDefault();
          toast({
            title: `Something went wrong.`,
            variant: "destructive",
            description: `${validation.field}: ${validation.message}`,
          });
        }
      }

      // Envío de datos
  };
    return (
      <AlertDialog>
        <AlertDialogTrigger asChild>
          <Button variant="outline" className="fixed bottom-4 right-4">
            Add Book
          </Button>
        </AlertDialogTrigger>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Add a Book!</AlertDialogTitle>
            <AlertDialogDescription asChild>
              <form ref={formRef} onSubmit={handleSubmit}>
                <div className="grid w-full items-center gap-4">
                  <div className="flex flex-col space-y-1.5">
                    <Label htmlFor="name" >Name</Label>
                    <Input id="name" name="name" placeholder="Name of the book" />
                  </div>
                  <div className="flex flex-col space-y-1.5">
                    <Label htmlFor="trophy-type">Book Type</Label>
                    <Select name="trophyType">
                      <SelectTrigger id="trophy-type">
                        <SelectValue placeholder="Select" />
                      </SelectTrigger>
                      <SelectContent position="popper">
                        <SelectItem value="canon">Canon</SelectItem>
                        <SelectItem value="bonus">Bonus</SelectItem>
                        <SelectItem value="nini">Nini</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </form>
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={handleSubmit}>Continue</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    );
  };
