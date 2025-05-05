
import { useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { BuildingType, ContractingType, EnvironmentalCertification, Project } from "@/types/project";
import { useProject } from "@/context/ProjectContext";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Plus } from "lucide-react";

type FormValues = Omit<Project, "id">;

const NewProjectDialog = () => {
  const [open, setOpen] = useState(false);
  const { addProject } = useProject();
  const navigate = useNavigate();
  
  const defaultValues: FormValues = {
    name: "",
    status: "pågående",
    thumbnail: "https://source.unsplash.com/random/800x600/?building",
    city: "",
    region: "",
    buildingType: "Bostäder",
    contractingType: "Totalentreprenad",
    manager: "",
    environmentalCertification: "Ingen",
    deadline: new Date().toISOString().split("T")[0],
  };
  
  const form = useForm<FormValues>({
    defaultValues,
  });
  
  const onSubmit = (data: FormValues) => {
    const newProjectId = addProject(data);
    form.reset(defaultValues);
    setOpen(false);
    
    // Navigate to the new project's detail page
    navigate(`/projects/${newProjectId}`);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className="bg-wastbygg-green hover:bg-wastbygg-green/90">
          <Plus className="mr-2 h-4 w-4" /> Lägg till projekt
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[525px] max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Skapa nytt projekt</DialogTitle>
          <DialogDescription>
            Fyll i information om det nya projektet.
          </DialogDescription>
        </DialogHeader>
        
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Projektnamn</FormLabel>
                  <FormControl>
                    <Input placeholder="Ange projektnamn" {...field} required />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <div className="grid grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="city"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Stad</FormLabel>
                    <FormControl>
                      <Input placeholder="Ange stad" {...field} required />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <FormField
                control={form.control}
                name="region"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Region</FormLabel>
                    <FormControl>
                      <Input placeholder="Ange region" {...field} required />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            
            <FormField
              control={form.control}
              name="manager"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Projektledare</FormLabel>
                  <FormControl>
                    <Input placeholder="Ange projektledare" {...field} required />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <div className="grid grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="buildingType"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Byggnadstyp</FormLabel>
                    <Select 
                      onValueChange={field.onChange} 
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Välj byggnadstyp" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="Bostäder">Bostäder</SelectItem>
                        <SelectItem value="Kommersiellt">Kommersiellt</SelectItem>
                        <SelectItem value="Samhällsservice">Samhällsservice</SelectItem>
                        <SelectItem value="Logistik">Logistik</SelectItem>
                        <SelectItem value="Industri">Industri</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <FormField
                control={form.control}
                name="contractingType"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Entreprenadform</FormLabel>
                    <Select 
                      onValueChange={field.onChange} 
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Välj entreprenadform" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="Totalentreprenad">Totalentreprenad</SelectItem>
                        <SelectItem value="Utförandeentreprenad">Utförandeentreprenad</SelectItem>
                        <SelectItem value="Samverkansentreprenad">Samverkansentreprenad</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="environmentalCertification"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Miljöcertifiering</FormLabel>
                    <Select 
                      onValueChange={field.onChange} 
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Välj miljöcertifiering" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="Miljöbyggnad">Miljöbyggnad</SelectItem>
                        <SelectItem value="BREEAM">BREEAM</SelectItem>
                        <SelectItem value="LEED">LEED</SelectItem>
                        <SelectItem value="Svanen">Svanen</SelectItem>
                        <SelectItem value="Ingen">Ingen</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <FormField
                control={form.control}
                name="deadline"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Slutdatum</FormLabel>
                    <FormControl>
                      <Input type="date" {...field} required />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            
            <div className="flex justify-end gap-2">
              <Button 
                type="button" 
                variant="outline" 
                onClick={() => setOpen(false)}
              >
                Avbryt
              </Button>
              <Button type="submit">Skapa projekt</Button>
            </div>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};

export default NewProjectDialog;
