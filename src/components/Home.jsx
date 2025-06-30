import TopicList from "./TopicList";
import AllArticles from "./AllArticles";

function Home() {
    return (
        <div>
            <h1>Welcome to NC News!!!</h1>
            <TopicList />
            <AllArticles />
        </div>
    );
}

export default Home;