import ReactMarkdown from "react-markdown";

const Articles = ({ data }) => {
  return (
    <section>
      {data.map(({ attributes: { ArticleContent } }) => (
        <>
          <ReactMarkdown>{ArticleContent}</ReactMarkdown>
        </>
      ))}
    </section>
  );
};

export default Articles;
