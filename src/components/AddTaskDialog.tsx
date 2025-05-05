
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Stage, TaskStatus } from '@/types/project';
import { useProject } from '@/context/ProjectContext';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from '@/components/ui/dialog';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';

interface AddTaskDialogProps {
  isOpen: boolean;
  onClose: () => void;
  projectId: string;
  stage: Stage;
  status: TaskStatus;
}

type TaskFormValues = {
  name: string;
  description: string;
};

const AddTaskDialog = ({ isOpen, onClose, projectId, stage, status }: AddTaskDialogProps) => {
  const { addTask } = useProject();
  const form = useForm<TaskFormValues>({
    defaultValues: {
      name: '',
      description: '',
    },
  });

  const onSubmit = (values: TaskFormValues) => {
    addTask(projectId, {
      name: values.name,
      description: values.description,
      stage,
      status,
    });
    form.reset();
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Lägg till ny uppgift</DialogTitle>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Uppgiftsnamn</FormLabel>
                  <FormControl>
                    <Input placeholder="Ange uppgiftsnamn" {...field} />
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
                  <FormLabel>Beskrivning</FormLabel>
                  <FormControl>
                    <Textarea 
                      placeholder="Ange beskrivning av uppgiften" 
                      className="min-h-[100px]" 
                      {...field} 
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <DialogFooter>
              <Button type="button" variant="outline" onClick={onClose}>
                Avbryt
              </Button>
              <Button type="submit">Skapa uppgift</Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};

export default AddTaskDialog;
