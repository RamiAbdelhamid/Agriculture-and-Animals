
import React, { useState, useEffect, useRef } from "react";
import {
  Search,
  AlertCircle,
  CheckCircle,
  XCircle,
  Filter,
  ChevronDown,
  Calendar,
  Tag,
  BookOpen,
} from "lucide-react";

const HealthGuide = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [articles, setArticles] = useState([]);
  const [filteredArticles, setFilteredArticles] = useState([]);
  const [selectedArticle, setSelectedArticle] = useState(null);
  const [showFilters, setShowFilters] = useState(false);
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [advancedFilters, setAdvancedFilters] = useState({
    dateRange: "all",
    sortBy: "newest",
  });
  const [currentPage, setCurrentPage] = useState(1);
  const [articlesPerPage] = useState(3);
  const [totalPages, setTotalPages] = useState(1);
  const modalRef = useRef(null);
  useEffect(() => {
    const fetchArticles = async () => {
      try {
        const res = await fetch(
          `http://localhost:5000/api/articles?page=${currentPage}&limit=${articlesPerPage}`
        );
        const data = await res.json();
        setArticles(data.articles);
        setTotalPages(data.totalPages);
      } catch (err) {
        console.error("Failed to fetch articles", err);
      }
    };

    fetchArticles();
  }, [currentPage, articlesPerPage]); // 👈 add currentPage + articlesPerPage

  useEffect(() => {
    const filtered = articles.filter((article) => {
      const matchesSearch =
        article.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        article.body.toLowerCase().includes(searchTerm.toLowerCase()) ||
        (article.tags &&
          article.tags.some((tag) =>
            tag.toLowerCase().includes(searchTerm.toLowerCase())
          ));

      const matchesCategory =
        selectedCategory === "all" || article.category === selectedCategory;

      let matchesDateFilter = true;
      if (advancedFilters.dateRange !== "all") {
        const articleDate = new Date(article.createdAt);
        const currentDate = new Date();

        switch (advancedFilters.dateRange) {
          case "week":
            const weekAgo = new Date();
            weekAgo.setDate(currentDate.getDate() - 7);
            matchesDateFilter = articleDate >= weekAgo;
            break;
          case "month":
            const monthAgo = new Date();
            monthAgo.setMonth(currentDate.getMonth() - 1);
            matchesDateFilter = articleDate >= monthAgo;
            break;
          case "year":
            const yearAgo = new Date();
            yearAgo.setFullYear(currentDate.getFullYear() - 1);
            matchesDateFilter = articleDate >= yearAgo;
            break;
          default:
            matchesDateFilter = true;
        }
      }

      return matchesSearch && matchesCategory && matchesDateFilter;
    });

    // Apply sorting
    const sortedArticles = [...filtered].sort((a, b) => {
      switch (advancedFilters.sortBy) {
        case "oldest":
          return new Date(a.createdAt) - new Date(b.createdAt);
        case "a-z":
          return a.title.localeCompare(b.title);
        case "z-a":
          return b.title.localeCompare(a.title);
        case "newest":
        default:
          return new Date(b.createdAt) - new Date(a.createdAt);
      }
    });

    setFilteredArticles(sortedArticles);
  }, [searchTerm, selectedCategory, advancedFilters, articles]);

  // Article Detail Modal
  const ArticleDetailModal = ({ article, onClose }) => {
    if (!article) return null;

    // Function to handle clicks outside the modal
    useEffect(() => {
      const handleClickOutside = (event) => {
        if (modalRef.current && !modalRef.current.contains(event.target)) {
          onClose();
        }
      };

      document.addEventListener("mousedown", handleClickOutside);
      return () => {
        document.removeEventListener("mousedown", handleClickOutside);
      };
    }, [onClose]);

    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
        <div
          ref={modalRef}
          className="bg-white rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto p-6 relative"
        >
          <button
            onClick={onClose}
            className="absolute top-4 right-4 text-red-500 hover:text-red-700 cursor-pointer"
          >
            <XCircle size={32} />
          </button>

          <div className="flex flex-col md:flex-row items-start mb-6">
            <img
              src={`http://localhost:5000${article.imageUrl}`}
              alt={article.title}
              className="w-full md:w-2/5 rounded-lg mb-4 md:mb-0 md:mr-6 object-cover h-64"
            />
            <div>
              <h2 className="text-3xl font-bold text-green-800 mb-2">
                {article.title}
              </h2>
              <div className="flex items-center mb-2">
                <Calendar size={18} className="text-green-600 mr-2" />
                <span className="text-gray-600">
                  {new Date(article.createdAt).toLocaleDateString()}
                </span>
              </div>
              <div className="flex items-center mb-4">
                <BookOpen size={18} className="text-green-600 mr-2" />
                <span className="text-gray-600">
                  by {article.author || "Unknown Author"}
                </span>
              </div>
              {article.tags && article.tags.length > 0 && (
                <div className="flex flex-wrap gap-2 mb-4">
                  {article.tags.map((tag, index) => (
                    <span
                      key={index}
                      className="px-3 py-1 rounded-full text-sm bg-green-100 text-green-800"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              )}
            </div>
          </div>

          <div className="border-t border-gray-200 pt-6">
            <h3 className="text-xl font-semibold text-green-700 mb-4">
              Article Content
            </h3>
            <div className="text-gray-700 space-y-4">
              {article.body.split("\n\n").map((paragraph, index) => (
                <p key={index} className="leading-relaxed">
                  {paragraph}
                </p>
              ))}
            </div>
          </div>

          {article.references && article.references.length > 0 && (
            <div className="mt-6 border-t border-gray-200 pt-6">
              <h3 className="text-xl font-semibold text-green-700 mb-3">
                References
              </h3>
              <ul className="list-disc pl-5 space-y-2">
                {article.references.map((reference, index) => (
                  <li key={index} className="text-gray-700">
                    {reference}
                  </li>
                ))}
              </ul>
            </div>
          )}

          {article.relatedArticles && article.relatedArticles.length > 0 && (
            <div className="mt-6 border-t border-gray-200 pt-6">
              <h3 className="text-xl font-semibold text-green-700 mb-3">
                Related Articles
              </h3>
              <div className="grid md:grid-cols-2 gap-4">
                {article.relatedArticles.map((relatedArticle, index) => (
                  <div
                    key={index}
                    className="border border-gray-200 rounded-lg p-3 hover:bg-gray-50"
                  >
                    <h4 className="font-medium text-green-800 mb-1">
                      {relatedArticle.title}
                    </h4>
                    <p className="text-sm text-gray-600">
                      {relatedArticle.description}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    );
  };

  const handleAdvancedFilterChange = (filterName, value) => {
    setAdvancedFilters((prev) => ({
      ...prev,
      [filterName]: value,
    }));
  };

  const ArticleCard = ({ article }) => (
    <div
      className="border border-gray-200 rounded-lg overflow-hidden hover:shadow-md transition-shadow cursor-pointer"
      onClick={() => setSelectedArticle(article)}
    >
      <div className="h-48 overflow-hidden">
        <img
          src={`http://localhost:5000${article.imageUrl}`}
          alt={article.title}
          className="w-full h-full object-cover"
        />
      </div>
      <div className="p-4">
        <div className="flex justify-between items-start mb-3">
          <h3 className="text-xl font-semibold text-green-800">
            {article.title}
          </h3>
        </div>
        <p className="text-gray-600 italic mb-2 flex items-center">
          <Calendar size={16} className="mr-1" />
          {new Date(article.createdAt).toLocaleDateString()}
        </p>
        <p className="text-gray-700 mb-3">{article.body.slice(0, 100)}...</p>
        {article.tags && article.tags.length > 0 && (
          <div className="flex flex-wrap gap-1 mb-3">
            {article.tags.slice(0, 2).map((tag, index) => (
              <span
                key={index}
                className="px-2 py-1 text-xs bg-green-50 text-green-700 rounded-full"
              >
                {tag}
              </span>
            ))}
            {article.tags.length > 2 && (
              <span className="px-2 py-1 text-xs bg-gray-50 text-gray-700 rounded-full">
                +{article.tags.length - 2}
              </span>
            )}
          </div>
        )}
        <div className="flex justify-between items-center">
          <span className="text-sm text-gray-500">
            by {article.author || "Unknown"}
          </span>
          <button
            onClick={(e) => {
              e.stopPropagation();
              setSelectedArticle(article);
            }}
            className="text-green-600 hover:text-green-800 font-medium flex items-center"
          >
            Read More <ChevronDown className="ml-1" size={16} />
          </button>
        </div>
      </div>
    </div>
  );

  return (
    <div className="max-w-6xl mx-auto p-6 bg-white shadow-2xl rounded-2xl">
      <header className="mb-8">
        <h1 className="text-3xl font-bold text-green-800 mb-2">
          Agricultural Health Platform
        </h1>
        <p className="text-gray-600">
          Comprehensive resource for animal and plant health information
        </p>
      </header>

      <div className="bg-white border border-gray-200 rounded-lg p-4 mb-6">
        <div className="flex flex-col md:flex-row gap-4 mb-4">
          <div className="relative flex-grow">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Search articles by title, content or tags..."
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <div className="flex gap-2">
            <button
              onClick={() => setShowFilters(!showFilters)}
              className="flex items-center gap-2 bg-gray-100 hover:bg-gray-200 px-3 py-2 rounded-lg"
            >
              <Filter size={18} />
              <span>Filters</span>
            </button>
          </div>
        </div>

        {showFilters && (
          <div className="bg-gray-50 p-4 rounded-lg mb-4">
            <h3 className="font-medium text-gray-700 mb-3">Advanced Filters</h3>
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Date Range
                </label>
                <select
                  className="w-full border border-gray-300 rounded-lg px-3 py-2"
                  value={advancedFilters.dateRange}
                  onChange={(e) =>
                    handleAdvancedFilterChange("dateRange", e.target.value)
                  }
                >
                  <option value="all">All Time</option>
                  <option value="week">Past Week</option>
                  <option value="month">Past Month</option>
                  <option value="year">Past Year</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Sort By
                </label>
                <select
                  className="w-full border border-gray-300 rounded-lg px-3 py-2"
                  value={advancedFilters.sortBy}
                  onChange={(e) =>
                    handleAdvancedFilterChange("sortBy", e.target.value)
                  }
                >
                  <option value="newest">Newest First</option>
                  <option value="oldest">Oldest First</option>
                  <option value="a-z">A-Z</option>
                  <option value="z-a">Z-A</option>
                </select>
              </div>
            </div>
          </div>
        )}
      </div>

      <div className="mb-6">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl font-bold text-green-800">
            Agricultural Health Articles
          </h2>
          <span className="text-gray-600">
            Showing {filteredArticles.length} articles
          </span>
        </div>

        {filteredArticles.length > 0 ? (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredArticles.map((article) => (
              <ArticleCard key={article._id} article={article} />
            ))}
          </div>
        ) : (
          <div className="text-center py-10 bg-gray-50 rounded-lg">
            <AlertCircle className="mx-auto text-gray-400 mb-3" size={48} />
            <h3 className="text-lg font-medium text-gray-700">
              No articles found
            </h3>
            <p className="text-gray-500 mt-1">
              Try adjusting your search filters or explore a different category
            </p>
          </div>
        )}
      </div>
      <div className="flex justify-center mt-6 space-x-2">
        <button
          onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
          disabled={currentPage === 1}
          className="px-4 py-2 bg-green-600 text-white rounded disabled:bg-gray-400"
        >
          Prev
        </button>

        <span className="flex items-center px-4 text-gray-700">
          Page {currentPage} of {totalPages}
        </span>

        <button
          onClick={() =>
            setCurrentPage((prev) => Math.min(prev + 1, totalPages))
          }
          disabled={currentPage === totalPages}
          className="px-4 py-2 bg-green-600 text-white rounded disabled:bg-gray-400"
        >
          Next
        </button>
      </div>

      {selectedArticle && (
        <ArticleDetailModal
          article={selectedArticle}
          onClose={() => setSelectedArticle(null)}
        />
      )}
    </div>
  );
};

export default HealthGuide;