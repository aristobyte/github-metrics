import { redirect } from "next/navigation";
import { CONFIG } from "../config";

export default function Home() {
  redirect(`/${CONFIG.locales.fallback}`);
}
