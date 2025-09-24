import type { Data } from "@/components/Form/MultiStepForm";
import { Button } from "@/components/ui/button";
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
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { handleNext, handlePrev, is21Plus } from "@/lib/helper";
import { relations } from "@/mock-data/relations";
import { stepFourSchema } from "@/schemas/stepFour";
import { zodResolver } from "@hookform/resolvers/zod";
import { ChevronLeftIcon, ChevronRightIcon } from "lucide-react";
import type { JSX } from "react";
import { useMemo } from "react";
import { useForm } from "react-hook-form";
import z from "zod";

export default function StepFour({
  setData,
  setStep,
  data,
  dob,
}: {
  setData: React.Dispatch<React.SetStateAction<Data>>;
  setStep: React.Dispatch<React.SetStateAction<number>>;
  data: z.infer<typeof stepFourSchema>;
  dob: Date;
}): JSX.Element {
  const adult = useMemo(() => is21Plus(dob), [dob]);
  const refineSchema = stepFourSchema.superRefine((data, ctx) => {
    if (!adult) {
      if (!data.guardianName) {
        ctx.addIssue({
          path: ["guardianName"],
          code: "custom",
          message: "Guardian name is required",
        });
      }
      if (!data.guardianPhone) {
        ctx.addIssue({
          path: ["guardianPhone"],
          code: "custom",
          message: "Guardian phone is required",
        });
      }
    }
  });

  const form = useForm<z.infer<typeof refineSchema>>({
    resolver: zodResolver(refineSchema),
    defaultValues: {
      contactName: data.contactName || "",
      phone: data.phone || "",
      guardianName: adult ? undefined : data.guardianName || "",
      guardianPhone: adult ? undefined : data.guardianPhone || "",
      relationship: data.relationship || undefined,
    },
  });

  function onSubmit(values: z.infer<typeof stepFourSchema>) {
    setData((prev) => ({
      ...prev,
      stepFour: {
        ...prev.stepFour,
        ...values,
      },
    }));
    handleNext(setStep);
  }

  return (
    <>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="max-w-full mx-auto"
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-5">
            {/* contact name start  */}
            <FormField
              control={form.control}
              name="contactName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Contact Name</FormLabel>
                  <FormControl>
                    <Input placeholder="Full name" {...field} />
                  </FormControl>

                  <FormMessage />
                </FormItem>
              )}
            />
            {/* contact name end  */}
            {/* relationship start  */}
            <FormField
              control={form.control}
              name="relationship"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Relation</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl className="w-full">
                      <SelectTrigger>
                        <SelectValue placeholder="Select a relative" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {relations.map((relation, i) => (
                        <SelectItem key={i} value={relation}>
                          {relation}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>

                  <FormMessage />
                </FormItem>
              )}
            />
            {/* relationship end  */}
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
                    Select country, and type phone number
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            {/* Phone end  */}
            {/* Guardian Contact info start  */}
            {!adult && (
              <div className="space-y-5">
                <FormField
                  control={form.control}
                  name="guardianName"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Guardian Name</FormLabel>
                      <FormControl>
                        <Input placeholder="Name" {...field} />
                      </FormControl>

                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="guardianPhone"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Guardian Phone</FormLabel>
                      <FormControl>
                        <PhoneInput
                          placeholder="Enter a phone number"
                          {...field}
                        />
                      </FormControl>
                      <FormDescription>
                        Select country, and type phone number
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            )}

            {/* Guardian Contact info end  */}
          </div>

          {/* next and prev button  start*/}
          <div className="flex justify-between my-5">
            <Button
              variant="outline"
              size="sm"
              className="uppercase cursor-pointer"
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
