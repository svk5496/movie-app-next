import BasicLayout from "@/components/atoms/layout/BasicLayout";
import { AppProps } from "next/dist/shared/lib/router/router";
import React from "react";
import { Hydrate, QueryClient, QueryClientProvider } from "react-query";

export default function App({ Component, pageProps }: AppProps) {
  const [queryClient] = React.useState(
    () =>
      new QueryClient({
        defaultOptions: {
          queries: {
            // refetchOnWindowFocus 는 데이터가 stale 상태일 경우 윈도우 포커싱 될 때 마다 refetch를 실행하는 옵션이다.
            refetchOnWindowFocus: false,
            // refetchOnMount 는 데이터가 stale 상태일 경우 마운트 시 마다 refetch를 실행하는 옵션이다.
            // default = true
            refetchOnMount: false,
            retry: 3,
            // staleTime 은 데이터가 fresh 상태로 유지되는 시간이다. 해당 시간이 지나면 stale 상태가 된다.
            staleTime: 2000,
          },
        },
      })
  );
  return (
    <QueryClientProvider client={queryClient}>
      <BasicLayout>
        <Component {...pageProps}></Component>
      </BasicLayout>
    </QueryClientProvider>
  );
}
