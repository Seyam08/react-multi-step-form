import type { Data } from "@/components/Form/MultiStepForm";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { PhoneInput } from "@/components/ui/phone-input";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { handleNext, handlePrev } from "@/lib/helper";
import { cn } from "@/lib/utils";
import { stepOneSchema } from "@/schemas/stepOne";
import { zodResolver } from "@hookform/resolvers/zod";
import { format } from "date-fns";
import {
  CalendarIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
  CircleMinus,
} from "lucide-react";
import type { JSX } from "react";
import { useForm } from "react-hook-form";
import z from "zod";

export default function StepOne({
  setData,
  setStep,
  data,
  step,
}: {
  setData: React.Dispatch<React.SetStateAction<Data>>;
  setStep: React.Dispatch<React.SetStateAction<number>>;
  data: z.infer<typeof stepOneSchema>;
  step: number;
}): JSX.Element {
  const form = useForm<z.infer<typeof stepOneSchema>>({
    resolver: zodResolver(stepOneSchema),
    defaultValues: {
      fullName: data.fullName || "",
      email: data.email || "",
      phone: data.phone || "",
      dateOfBirth: data.dateOfBirth || new Date(),
      profilePic: data.profilePic || undefined,
    },
  });

  function onSubmit(values: z.infer<typeof stepOneSchema>) {
    setData((prev) => ({
      ...prev,
      stepOne: {
        ...prev.stepOne,
        ...values,
      },
    }));
    handleNext(setStep);
  }

  const handleImageBtn = () => {
    setData((prev) => ({
      ...prev,
      stepOne: {
        ...prev.stepOne,
        profilePic: undefined,
      },
    }));
    form.setValue("profilePic", undefined);
  };

  return (
    <>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="max-w-full mx-auto"
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-5">
            {/* fullName start  */}
            <FormField
              control={form.control}
              name="fullName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Full Name</FormLabel>
                  <FormControl>
                    <Input placeholder="Full name" {...field} />
                  </FormControl>

                  <FormMessage />
                </FormItem>
              )}
            />
            {/* fullName end  */}
            {/* email start  */}
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input placeholder="Email" {...field} />
                  </FormControl>

                  <FormMessage />
                </FormItem>
              )}
            />
            {/* email end  */}
            {/* Phone start  */}
            <FormField
              control={form.control}
              name="phone"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Phone</FormLabel>
                  <FormControl>
                    <PhoneInput placeholder="Enter a phone number" {...field} />
                  </FormControl>
                  <FormDescription>
                    Select your country, and type your phone number
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            {/* Phone end  */}
            {/* DOB start  */}
            <FormField
              control={form.control}
              name="dateOfBirth"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Date of birth</FormLabel>
                  <Popover>
                    <PopoverTrigger asChild>
                      <FormControl>
                        <Button
                          variant={"outline"}
                          className={cn(
                            "pl-3 text-left font-normal",
                            !field.value && "text-muted-foreground"
                          )}
                        >
                          {field.value ? (
                            format(field.value, "PPP")
                          ) : (
                            <span>Pick a date</span>
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
                        disabled={(date) =>
                          date > new Date() || date < new Date("1950-01-01")
                        }
                        captionLayout="dropdown"
                      />
                    </PopoverContent>
                  </Popover>
                  <FormDescription>
                    You must be at least 18 years old
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            {/* DOB end  */}

            {/* Picture start  */}
            <FormField
              control={form.control}
              name="profilePic"
              render={({ field }) => {
                const { onChange } = field;
                const selectedFile = form.watch("profilePic");
                const fileUrl = selectedFile
                  ? URL.createObjectURL(selectedFile)
                  : null;
                return (
                  <FormItem>
                    <FormLabel>Profile picture</FormLabel>
                    <FormControl>
                      {fileUrl ? (
                        <Popover>
                          <PopoverTrigger asChild>
                            <Avatar>
                              <AvatarImage
                                src={fileUrl}
                                alt={selectedFile?.name}
                              />
                              <AvatarFallback>CN</AvatarFallback>
                            </Avatar>
                          </PopoverTrigger>
                          <PopoverContent className="w-auto p-1">
                            <Button
                              size="sm"
                              className="bg-red-400 hover:bg-red-500 transition-all cursor-pointer text-white shadow-xs"
                              onClick={handleImageBtn}
                            >
                              <CircleMinus />
                            </Button>
                          </PopoverContent>
                        </Popover>
                      ) : (
                        <Input
                          id="profilePic"
                          type="file"
                          onChange={(e) => onChange(e.target.files?.[0])}
                        />
                      )}
                    </FormControl>
                    <FormDescription>
                      {selectedFile
                        ? selectedFile?.name
                        : "Please upload a picture of yours."}
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                );
              }}
            />
            {/* Picture end  */}
          </div>
          {/* next and prev button  start*/}
          <div className="flex justify-between my-5">
            <Button
              variant="outline"
              disabled={step === 0}
              size="sm"
              className="uppercase cursor-not-allowed"
              onClick={(e) => handlePrev(setStep, e)}
            >
              <ChevronLeftIcon /> prev
            </Button>
            <Button
              type="submit"
              variant="outline"
              size="sm"
              className="uppercase cursor-pointer"
            >
              <ChevronRightIcon /> next
            </Button>
          </div>
          {/* next and prev button  end*/}
        </form>
      </Form>
    </>
  );
}
