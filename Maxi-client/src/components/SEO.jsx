import { Helmet } from "react-helmet-async";

const SEO = ({
  title,
  description,
  path = "/",
  keywords = "",
}) => {
  const domain = "https://maxicabstarprime.com";
  const canonicalUrl = `${domain}${path}`;

  return (
    <Helmet>
      <title>{title}</title>

      <meta name="description" content={description} />

      {keywords && (
        <meta name="keywords" content={keywords} />
      )}

      <link rel="canonical" href={canonicalUrl} />

      <meta name="robots" content="index, follow" />

      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:url" content={canonicalUrl} />
      <meta property="og:type" content="website" />
      <meta property="og:site_name" content="MaxiCabStar Prime" />

      <meta
        name="twitter:card"
        content="summary_large_image"
      />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
    </Helmet>
  );
};

export default SEO;