import { ThemeToggle } from "@/components/theme-toggle";

interface HeaderProps {
  title?: string;
  children?: React.ReactNode;
}

export function Header({ title = "Notes", children }: HeaderProps) {
  return (
    <header className="sticky top-0 z-50 border-b bg-background/70 backdrop-blur-md">
      <div className="container mx-auto flex h-16 items-center justify-between px-4">
        <h1 className="text-xl font-bold">{title}</h1>
        <div className="flex items-center gap-4">
          {children}
          <ThemeToggle />
        </div>
      </div>
    </header>
  );
}
