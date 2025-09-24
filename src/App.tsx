import MultiStepForm from "@/components/Form/MultiStepForm";
import { ModeToggle } from "@/components/ModeToggle";
import { ThemeProvider } from "@/components/theme-provider";
import { Toaster } from "@/components/ui/sonner";

function App() {
  return (
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <div className="flex flex-col min-h-svh items-center justify-center p-4 md:p-8">
        {/* Title row start*/}
        <div className="w-full flex justify-between items-center px-2 md:px-8">
          <div className="py-2"></div>
          <div>
            <h2 className="basis-full scroll-m-20 border-b pb-2 text-xl md:text-3xl font-semibold tracking-wide first:mt-0">
              Talent hunt
            </h2>
          </div>
          <div>
            <ModeToggle />
          </div>
        </div>
        {/* Title row end*/}
        {/* Form row */}
        <div className="w-full flex items-center justify-center p-2 md:p-8">
          <MultiStepForm />
        </div>
      </div>
      <Toaster />
    </ThemeProvider>
  );
}

export default App;
