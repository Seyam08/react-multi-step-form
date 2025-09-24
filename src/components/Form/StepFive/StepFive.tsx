import type { Data } from "@/components/Form/MultiStepForm";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form";
import { Switch } from "@/components/ui/switch";
import { handleNext, handlePrev } from "@/lib/helper";
import { stepFiveSchema } from "@/schemas/stepFive";
import { zodResolver } from "@hookform/resolvers/zod";
import { ChevronLeftIcon, ChevronRightIcon } from "lucide-react";
import type { JSX } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import z from "zod";

export default function StepFive({
  setStep,
  data,
}: {
  setData: React.Dispatch<React.SetStateAction<Data>>;
  setStep: React.Dispatch<React.SetStateAction<number>>;
  data: Data;
}): JSX.Element {
  const form = useForm<z.infer<typeof stepFiveSchema>>({
    resolver: zodResolver(stepFiveSchema),
    defaultValues: {
      confirm: false,
    },
  });
  function onSubmit(_values: z.infer<typeof stepFiveSchema>) {
    handleNext(setStep);
    toast("Your form has been submitted", {
      description: "If you reload then information will be cleared!",
    });
  }

  const { stepOne, stepTwo, stepThree, stepFour } = data;

  const avatarUrl = stepOne.profilePic
    ? URL.createObjectURL(stepOne.profilePic)
    : null;

  return (
    <>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="max-w-full mx-auto"
        >
          <div className="mx-auto space-y-6 mb-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Step One */}
              <div className="border rounded-lg p-4 shadow-sm">
                <h2 className="text-lg font-semibold mb-4">
                  First step - Personal Info
                </h2>
                <div className="flex items-center space-x-4 mb-4">
                  {avatarUrl ? (
                    <Avatar className="size-8 md:size-14">
                      <AvatarImage src={avatarUrl} alt={stepOne.fullName} />
                      <AvatarFallback>{stepOne.fullName}</AvatarFallback>
                    </Avatar>
                  ) : null}
                  <div>
                    <p className="info-text">
                      <span className="info-label">Full Name: </span>
                      <span className="info-value">{stepOne.fullName}</span>
                    </p>
                    <p className="info-text">
                      <span className="info-label">Email: </span>
                      <span className="info-value">{stepOne.email}</span>
                    </p>
                    <p className="info-text">
                      <span className="info-label">Phone: </span>
                      <span className="info-value">{stepOne.phone}</span>
                    </p>
                  </div>
                </div>
                <p className="info-text">
                  <span className="info-label">Date of Birth: </span>
                  <span className="info-value">
                    {new Date(stepOne.dateOfBirth).toLocaleDateString()}
                  </span>
                </p>
              </div>

              {/* Step Two */}
              <div className="border rounded-lg p-4 shadow-sm">
                <h2 className="text-lg font-semibold mb-4">
                  Second step - Job Details
                </h2>
                <p className="info-text">
                  <span className="info-label">Department: </span>
                  <span className="info-value">{stepTwo.department}</span>
                </p>
                <p className="info-text">
                  <span className="info-label">Position: </span>
                  <span className="info-value">{stepTwo.position}</span>
                </p>
                <p className="info-text">
                  <span className="info-label">Start Date: </span>
                  <span className="info-value">
                    {new Date(stepTwo.startDate).toLocaleDateString()}
                  </span>
                </p>
                <p className="info-text">
                  <span className="info-label">Job Type: </span>
                  <span className="info-value">{stepTwo.jobType}</span>
                </p>
                <p className="info-text">
                  <span className="info-label">Salary Expectation: </span>
                  <span className="info-value">${stepTwo.salaryExpt}</span>
                </p>
                <p className="info-text">
                  <span className="info-label">Manager: </span>
                  <span className="info-value">{stepTwo.manager}</span>
                </p>
              </div>

              {/* Step Three */}
              <div className="border rounded-lg p-4 shadow-sm">
                <h2 className="text-lg font-semibold mb-4">
                  Third step - Skills & Preferences
                </h2>

                <p className="info-text info-label">Skills:</p>
                <ul className="list-disc list-inside">
                  {stepThree.skills.map((skill) => (
                    <li className="info-value" key={skill}>
                      {skill}
                    </li>
                  ))}
                </ul>

                <p className="info-text info-label">Experience:</p>
                <ul className="list-disc list-inside">
                  {Object.entries(stepThree.experience).map(([skill, exp]) => (
                    <li key={skill}>
                      <span className="info-label">{skill}: </span>
                      <span className="info-value">{exp}</span>
                    </li>
                  ))}
                </ul>

                <p className="info-text">
                  <span className="info-label">Preferred Work Time: </span>
                  <span className="info-value">
                    {stepThree.preferWorkTime.start} -{" "}
                    {stepThree.preferWorkTime.end}
                  </span>
                </p>
                <p className="info-text">
                  <span className="info-label">Remote Preference: </span>
                  <span className="info-value">{stepThree.remotePrefer}%</span>
                </p>
                {stepThree.remotePrefer < 50 && (
                  <p className="info-text">
                    <span className="info-label">Manager Approved: </span>
                    <span className="info-value">
                      {stepThree.managerApprove ? "Yes" : "No"}
                    </span>
                  </p>
                )}
                {stepThree.notes && (
                  <p className="info-text">
                    <span className="info-label">Notes: </span>
                    <span className="info-value">{stepThree.notes}</span>
                  </p>
                )}
              </div>

              {/* Step Four */}
              <div className="border rounded-lg p-4 shadow-sm">
                <h2 className="text-lg font-semibold mb-4">
                  Fourth step - Emergency Contact
                </h2>
                <p className="info-text">
                  <span className="info-label">Contact Name: </span>
                  <span className="info-value">{stepFour.contactName}</span>
                </p>
                <p className="info-text">
                  <span className="info-label">Relationship: </span>
                  <span className="info-value">{stepFour.relationship}</span>
                </p>
                <p className="info-text">
                  <span className="info-label">Phone: </span>
                  <span className="info-value">{stepFour.phone}</span>
                </p>
                {stepFour.guardianName && (
                  <p className="info-text">
                    <span className="info-label">Guardian Name: </span>
                    <span className="info-value">{stepFour.guardianName}</span>
                  </p>
                )}
                {stepFour.guardianPhone && (
                  <p className="info-text">
                    <span className="info-label">Guardian Phone: </span>
                    <span className="info-value">{stepFour.guardianPhone}</span>
                  </p>
                )}
              </div>
            </div>
          </div>

          {/* Confirm button  */}
          <FormField
            control={form.control}
            name="confirm"
            render={({ field }) => (
              <FormItem className="flex flex-row items-center justify-between rounded-lg border p-3 shadow-sm">
                <div className="space-y-0.5">
                  <FormLabel>Confirm before submitting</FormLabel>
                </div>
                <FormControl>
                  <Switch
                    checked={field.value}
                    onCheckedChange={field.onChange}
                  />
                </FormControl>
              </FormItem>
            )}
          />
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
