import { getData } from "@/lib/getData";
import CircleOfCareClient from "./CircleOfCareClient";

type CircleOfCareData = typeof import("@/data/circleOfCare.json");

export default async function CircleOfCare() {
  const data = await getData<CircleOfCareData>("circleOfCare");
  return <CircleOfCareClient data={data} />;
}
