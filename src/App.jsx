import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";
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
      <ConditionalMainContent />
      <Routes>
        <Route path="/" element={<ArticlesList />} />
        <Route path="/articles/:articleId" element={<ArticleDetail />} />
        <Route path="/articles" element={<Articles />} />
      </Routes>
      <Footer />
    </Router>
  );
}

function ConditionalMainContent() {
  const location = useLocation();

  if (location.pathname === "/") {
    return <MainContent />;
  }
  return null;
}

export default App;

