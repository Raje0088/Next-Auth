import Image from "next/image";

export const metadata = {
  title: "Products Store - Home",
  description: "This is Homepage",
};

export default function Home() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-zinc-50 font-sans dark:bg-black">
      <main className="flex min-h-screen w-full max-w-3xl flex-col items-center justify-between py-32 px-16 bg-white dark:bg-black sm:items-start">
        <h1 className="text-4xl font-bold">Welcome to Products Store</h1>
        <p className="mt-4 text-lg">Browse our amazing products.</p>
      </main>
    </div>
  );
}
