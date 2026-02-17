"use client"
import { usePathname } from 'next/navigation';

export default function ContentWrapper({ children }) {
  const pathname = usePathname();
  const isLoginPage = pathname.startsWith('/login');
  
  return (
    <div className={`w-full ${!isLoginPage ? 'pt-16' : ''} min-h-screen`}>
      {children}
    </div>
  );
}
