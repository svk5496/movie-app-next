import Head from "next/head";

interface SeoProps {
  title: string;
}

export default function Seo({ title }: SeoProps) {
  return (
    <Head>
      <title>{title} | 알약하나</title>
    </Head>
  );
}
