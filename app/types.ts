export interface UserOnboardingData {
  weight: number | null;
  goalWeight: number | null;
  age: number | null;
  height: number | null;
  sex: "male" | "female" | "other" | "";
  activity: string;
  goal: string;
  fasting: boolean;
  fastingMethod: "16:8" | "18:6" | "20:4";
}
