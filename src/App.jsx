import { Routes, Route, BrowserRouter } from "react-router-dom";
import Home from "./components/Home";
import SingleArticle from "./components/SingleArticle";
import TopicList from "./components/TopicList";
import TopicArticles from "./components/TopicArticles";
import "./app.css";


//main app wich defines app routes
function App() {

  return (
    
    //all available routes for the app
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/articles/:article_id" element={<SingleArticle />} />
        <Route path="/topics" element={<TopicList />} />
        <Route path="/topics/:topic_slug" element={<TopicArticles />} />
      </Routes>
  )
}
export default App
