interface Props {
  children: React.ReactNode;
}

export const Layout = ({ children }: Props) => {
  return (
    <div className="relative flex min-h-screen w-full flex-shrink-0 flex-grow flex-col bg-neutral-100 transition-colors dark:bg-neutral-900 dark:text-white">
      <main className="z-10">{children}</main>
    </div>
  );
};
