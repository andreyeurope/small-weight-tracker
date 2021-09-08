import { Mood } from "./mood";
export interface TrackerEntry {
  id: number;
  date: number;
  bodyWeight: number;
  happinessLevel: Mood;
  waistCircumference: number;
}
