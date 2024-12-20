import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";
import './Components/App.css';
import Header from './Components/Header';
import ArticlesList from './Components/ArticlesList';
import ArticleDetail from './Components/ArticlesDetails';
import Articles from './Components/Articles';
import About from "./Components/About";
import Contact from "./Components/Contact";

function App() {
  return (
    <Router>
      <Header />
     
      <Routes>
        <Route path="/" element={<ArticlesList />} />
        <Route path="/articles/:articleId" element={<ArticleDetail />} />
        <Route path="/articles" element={<Articles />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/about" element={<About />} />
      </Routes>
    </Router>
  );
}


export default App;

