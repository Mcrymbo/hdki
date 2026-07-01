"use client";

import { ApolloProvider } from "@apollo/client";
import { AuthProvider } from "@/contexts/AuthContext";
import { ToastProvider } from "@/components/admin/ui/Toast";
import apolloClient from "@/lib/apollo-client";

export default function Providers({ children }: { children: React.ReactNode }) {
  return (
    <ApolloProvider client={apolloClient}>
      <AuthProvider>
        <ToastProvider>{children}</ToastProvider>
      </AuthProvider>
    </ApolloProvider>
  );
}
