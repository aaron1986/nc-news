import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import './Components/App.css';
import Header from './Components/Header';
import Footer from './Components/Footer';
import ArticlesList from './Components/ArticlesList';
import ArticleDetail from './Components/ArticlesDetails';
import MainContent from './Components/MainContent';
import Articles from './Components/Articles'; 

function App() {
  return (
    <Router>
      <Header />
      <MainContent />
      <Routes>
        <Route path="/" element={<ArticlesList />} />
        <Route path="/articles/:articleId" element={<ArticleDetail />} />
        <Route path="/articles" element={<Articles />} /> 
      </Routes>
      <Footer />
    </Router>
  );
}

export default App;

