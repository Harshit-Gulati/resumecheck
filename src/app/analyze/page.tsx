import { Footer } from "@/components/footer";
import { Doto } from "next/font/google";
import { Steps } from "./_components/steps";
import { Toaster } from "sonner";

const doto = Doto({
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
});

export default function Analyze() {
  return (
    <>
      <div className="mx-auto flex max-h-screen min-h-screen max-w-2xl flex-col items-center justify-between text-center">
        <div
          className={`mt-2 text-lg font-[900] md:text-2xl ${doto.className}`}
        >
          ResumeCheck
        </div>
        <div className="flex h-full w-full flex-col items-center justify-center">
          <Steps />
        </div>
        <Footer />
      </div>
      <Toaster position="bottom-center" richColors theme="dark" />
    </>
  );
}
