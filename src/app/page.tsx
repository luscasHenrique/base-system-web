import { Button } from '@/components/ui/button';

export default function Home() {
  return (
    <main className="flex min-h-screen items-center justify-center bg-gray-100">
      <div className="text-center">
        <h1 className="text-4xl font-bold mb-4">Home 🚀</h1>
        <Button variant="default">Clique Aqui</Button>
      </div>
    </main>
  );
}
