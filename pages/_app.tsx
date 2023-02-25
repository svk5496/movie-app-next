import BasicLayout from "@/components/atoms/layout/BasicLayout";
import { AppProps } from "next/dist/shared/lib/router/router";
import React from "react";
import { Hydrate, QueryClient, QueryClientProvider } from "react-query";

export default function App({ Component, pageProps }: AppProps) {
  const [queryClient] = React.useState(() => new QueryClient());
  return (
    <QueryClientProvider client={queryClient}>
      <BasicLayout>
        <Component {...pageProps}></Component>
      </BasicLayout>
    </QueryClientProvider>
  );
}
