import { Mood } from "./mood";
export interface TrackerEntry {
  id: number;
  date: Date;
  caloriesIntake: number;
  caloriesBurned: number;
  bodyWeight: number;
  happinessLevel: Mood;
  waistCircumference: number;
}
