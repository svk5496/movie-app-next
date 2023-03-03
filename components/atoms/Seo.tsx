import Head from "next/head";

interface SeoProps {
  title: string;
}

export default function Seo({ title }: SeoProps) {

  const message = `${title} | 영화 앱`
  return (
    <Head>
      <title>{message}</title>
    </Head>
  );
}
