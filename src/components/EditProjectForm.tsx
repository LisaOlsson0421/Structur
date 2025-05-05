
import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { Project, BuildingType, ContractingType, EnvironmentalCertification } from "@/types/project";
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
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Calendar as CalendarIcon, Upload, Trash2 } from "lucide-react";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
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
import { format } from "date-fns";
import { cn } from "@/lib/utils";

interface EditProjectFormProps {
  project: Project;
  onSave: (updatedProject: Partial<Omit<Project, "id">>) => void;
  onCancel: () => void;
  onDelete?: () => void;
}

const buildingTypes: BuildingType[] = ["Bostäder", "Kommersiellt", "Samhällsservice", "Logistik", "Industri"];
const contractingTypes: ContractingType[] = ["Totalentreprenad", "Utförandeentreprenad", "Samverkansentreprenad"];
const environmentalCertifications: EnvironmentalCertification[] = ["Miljöbyggnad", "BREEAM", "LEED", "Svanen", "Ingen"];

const EditProjectForm = ({ project, onSave, onCancel, onDelete }: EditProjectFormProps) => {
  const [thumbnailPreview, setThumbnailPreview] = useState<string>(project.thumbnail);
  const [thumbnailFile, setThumbnailFile] = useState<File | null>(null);

  const form = useForm({
    defaultValues: {
      name: project.name,
      city: project.city,
      region: project.region,
      buildingType: project.buildingType,
      contractingType: project.contractingType,
      manager: project.manager,
      environmentalCertification: project.environmentalCertification,
      deadline: new Date(project.deadline),
    },
  });

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setThumbnailFile(file);
    const reader = new FileReader();
    reader.onloadend = () => {
      setThumbnailPreview(reader.result as string);
    };
    reader.readAsDataURL(file);
  };

  const onSubmit = (data: any) => {
    const updatedProject: Partial<Omit<Project, "id">> = {
      ...data,
      deadline: data.deadline.toISOString(),
    };
    
    if (thumbnailFile) {
      // In a real app with backend, you'd upload the file here
      // For now, we'll just use the data URL from the FileReader
      updatedProject.thumbnail = thumbnailPreview;
    }
    
    onSave(updatedProject);
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-4">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Projektnamn</FormLabel>
                  <FormControl>
                    <Input {...field} />
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
                      <Input {...field} />
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
                      <Input {...field} />
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
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="deadline"
              render={({ field }) => (
                <FormItem className="flex flex-col">
                  <FormLabel>Deadline</FormLabel>
                  <Popover>
                    <PopoverTrigger asChild>
                      <FormControl>
                        <Button
                          variant={"outline"}
                          className={cn(
                            "w-full pl-3 text-left font-normal",
                            !field.value && "text-muted-foreground"
                          )}
                        >
                          {field.value ? (
                            format(field.value, "yyyy-MM-dd")
                          ) : (
                            <span>Välj datum</span>
                          )}
                          <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                        </Button>
                      </FormControl>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0" align="start">
                      <Calendar
                        mode="single"
                        selected={field.value}
                        onSelect={field.onChange}
                        initialFocus
                      />
                    </PopoverContent>
                  </Popover>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <div className="space-y-4">
            <FormField
              control={form.control}
              name="buildingType"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Byggtyp</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Välj byggtyp" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {buildingTypes.map((type) => (
                        <SelectItem key={type} value={type}>
                          {type}
                        </SelectItem>
                      ))}
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
                      {contractingTypes.map((type) => (
                        <SelectItem key={type} value={type}>
                          {type}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

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
                      {environmentalCertifications.map((cert) => (
                        <SelectItem key={cert} value={cert}>
                          {cert}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div>
              <Label htmlFor="thumbnail">Projektbild</Label>
              <div className="mt-2 space-y-3">
                <div className="relative h-40 w-full overflow-hidden rounded-md border bg-gray-50">
                  {thumbnailPreview && (
                    <img
                      src={thumbnailPreview}
                      alt="Förhandsgranskning"
                      className="h-full w-full object-cover"
                    />
                  )}
                </div>
                <div className="flex items-center">
                  <label
                    htmlFor="thumbnail-upload"
                    className="flex cursor-pointer items-center gap-2 rounded-md border bg-gray-50 px-3 py-2 text-sm hover:bg-gray-100"
                  >
                    <Upload size={16} />
                    <span>Ladda upp bild</span>
                    <input
                      id="thumbnail-upload"
                      type="file"
                      accept="image/*"
                      className="hidden"
                      onChange={handleImageChange}
                    />
                  </label>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="flex justify-between items-center">
          {onDelete && (
            <AlertDialog>
              <AlertDialogTrigger asChild>
                <Button type="button" variant="destructive" className="flex items-center gap-2">
                  <Trash2 size={16} />
                  Ta bort projekt
                </Button>
              </AlertDialogTrigger>
              <AlertDialogContent>
                <AlertDialogHeader>
                  <AlertDialogTitle>Ta bort projekt</AlertDialogTitle>
                  <AlertDialogDescription>
                    Är du säker på att du vill ta bort projektet "{project.name}"? 
                    Denna åtgärd kan inte ångras och all data kopplad till projektet kommer att försvinna.
                  </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                  <AlertDialogCancel>Avbryt</AlertDialogCancel>
                  <AlertDialogAction onClick={onDelete}>
                    Ta bort
                  </AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
          )}
          
          <div className="flex justify-end space-x-3 ml-auto">
            <Button type="button" variant="outline" onClick={onCancel}>
              Avbryt
            </Button>
            <Button type="submit">Spara ändringar</Button>
          </div>
        </div>
      </form>
    </Form>
  );
};

export default EditProjectForm;
