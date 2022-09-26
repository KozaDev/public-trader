import ReactMarkdown from "react-markdown";

const Articles = ({ data }) => {
  return (
    <section>
      {data.map(({ attributes: { title, ArticleContent } }) => (
        <>
          <ReactMarkdown children={ArticleContent} />
        </>
      ))}
    </section>
  );
};

export default Articles;
