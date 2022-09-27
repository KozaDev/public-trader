import ReactMarkdown from "react-markdown";
import uuid from "react-uuid";
const Articles = ({ data }) => {
  return (
    <section>
      {data.map(({ attributes: { ArticleContent } }) => (
        <ReactMarkdown key={uuid()}>{ArticleContent}</ReactMarkdown>
      ))}
    </section>
  );
};

export default Articles;
