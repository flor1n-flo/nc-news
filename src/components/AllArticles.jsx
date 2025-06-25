import { useEffect, useState } from "react";
import ArticleCard from "./ArticleCard";

//displayng all articles component, store article and handle loading state
function AllArticles() {
    const [articles, setArticles] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    //fetch the articles form api when component mounts
    useEffect(() => {
        fetch("https://project29-05.onrender.com/api/articles")
        .then((res) => res.json())
        .then((data) => {
            //saving article to state
            setArticles(data.articles);
            setIsLoading(false);
        })
        //catch any error and stop loading
        .catch((err) => {
            console.log("API error: ", err);
            setIsLoading(false);

        });
    }, []);

    //show a loading message while data is being fetched
    if (isLoading) {
        return <p>Loading Articles...</p>;
    }

    //rendering a list of articles using allcard component with a uniqe key id
    return (
        <div className="article-list">
            {articles.map((article) =>(
                <ArticleCard key={article.article_id} article={article} />
            ))}
        </div>
    );

}
export default AllArticles;