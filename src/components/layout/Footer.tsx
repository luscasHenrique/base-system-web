// src/components/layout/Footer.tsx
export function Footer() {
  return (
    <footer className="w-full h-12 bg-white border-t flex items-center justify-center text-sm text-gray-500">
      © {new Date().getFullYear()} Inventory System. Todos os direitos
      reservados.
    </footer>
  );
}
