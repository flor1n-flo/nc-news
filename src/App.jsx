import { Routes, Route } from "react-router-dom";
import ArticleCard from "./components/ArticleCard";
import AllArticles from "./components/AllArticles";
import SingleArticle from "./components/SingleArticle";
import "./app.css";


//main app wich defines app routes
function App() {

  return (
    
    //all available routes for the app
    <Routes>
      <Route path="/" element={<AllArticles />} />
      <Route path="/articles/:article_id" element={<SingleArticle />} />

    </Routes>
  )
}
export default App
