import { redirect } from "next/navigation";

/** Legacy route — redirects to Online Test Series hub */
export default function MockTestRedirect() {
  redirect("/online-test-series");
}
