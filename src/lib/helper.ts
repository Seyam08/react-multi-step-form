import { skillsByDepartment } from "@/mock-data/skills";

// extract department names
export const departmentList: string[] = Object.keys(skillsByDepartment);

// function for getting skills according to department
export type Department = keyof typeof skillsByDepartment;

export const getSkillsByDepartment = (department: Department): string[] => {
  return skillsByDepartment[department];
};

export const handlePrev = (
  setStep: React.Dispatch<React.SetStateAction<number>>,
  event: React.MouseEvent
) => {
  event.preventDefault();
  return setStep((prev) => (prev > 0 && prev <= 5 ? prev - 1 : prev));
};
export const handleNext = (
  setStep: React.Dispatch<React.SetStateAction<number>>
) => {
  return setStep((prev) => (prev >= 0 && prev < 5 ? prev + 1 : prev));
};
export const is21Plus = (date: Date) => {
  const today = new Date();
  const eighteen = new Date(
    today.getFullYear() - 21,
    today.getMonth(),
    today.getDate()
  );
  return date <= eighteen;
};
