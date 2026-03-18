import { Helmet } from "react-helmet-async";

interface PageSEOProps {
  title: string;
  description: string;
  path?: string;
  noIndex?: boolean;
}

const BASE_URL = "https://quran-word-flow.lovable.app";

export const PageSEO = ({ title, description, path = "", noIndex = false }: PageSEOProps) => {
  const fullTitle = title === "Home" 
    ? "Quranic Arabic Lab | Learn. Practice. Understand the Qur'an." 
    : `${title} | Quranic Arabic Lab`;
  const url = `${BASE_URL}${path}`;

  return (
    <Helmet>
      <title>{fullTitle}</title>
      <meta name="description" content={description} />
      <link rel="canonical" href={url} />
      {noIndex && <meta name="robots" content="noindex" />}
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:url" content={url} />
      <meta property="og:type" content="website" />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={description} />
    </Helmet>
  );
};
