import React from 'react';
import { useForm } from "react-hook-form";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";

interface AddCourseDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onAddCourse: (course: { name: string; description: string; teacher: string }) => void;
}

type FormData = {
  name: string;
  description: string;
  teacher: string;
};

export const AddCourseDialog = ({ open, onOpenChange, onAddCourse }: AddCourseDialogProps) => {
  const form = useForm<FormData>();

  const onSubmit = (data: FormData) => {
    onAddCourse(data);
    onOpenChange(false);
    form.reset();
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>إضافة مادة جديدة</DialogTitle>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>اسم المادة</FormLabel>
                  <FormControl>
                    <Input placeholder="أدخل اسم المادة" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>وصف المادة</FormLabel>
                  <FormControl>
                    <Input placeholder="أدخل وصف المادة" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="teacher"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>المدرس</FormLabel>
                  <FormControl>
                    <Input placeholder="اختر المدرس" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="flex justify-end">
              <Button type="submit">إضافة</Button>
            </div>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};
