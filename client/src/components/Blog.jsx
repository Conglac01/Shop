import React from "react";
import Title from "../components/Title";

// Import blog images
import blog1 from "../assets/blogs/blog1.png";
import blog2 from "../assets/blogs/blog2.png";
import blog3 from "../assets/blogs/blog3.png";
import blog4 from "../assets/blogs/blog4.png";

// Dữ liệu blog với link bài báo thật về Lining
const blogPosts = [
  {
    id: 1,
    title: "Li-Ning Fall 2026: On the Slopes With Team China",
    image: blog1,
    date: "2026-01-16",
    author: "WWD",
    excerpt: "Li-Ning hosted its one-off show in Milan, mounting a ski station inside an industrial venue, complete with chairlifts. The collection featured gorpcore, nylon pleated skirts, leotards, padded miniskirts, windbreakers, and technical parkas inspired by winter sports.",
    category: "Fashion Week",
    url: "https://shopping.yahoo.com/style/clothing/articles/li-ning-fall-2026-slopes-145056929.html"
  },
  {
    id: 2,
    title: "Li-Ning Mounts Milan Fashion Week Show With Winter Olympic Spirit in Mind",
    image: blog2,
    date: "2026-01-15",
    author: "WWD",
    excerpt: "As the official partner of the Chinese Olympic Committee, Li-Ning presented 'The Athlete in All of Us' collection featuring two distinct drops: LNCN for professional winter sports and Li-Ning Glory range with utilitarian bent, plus the Jackie Chan capsule collection.",
    category: "Brand News",
    url: "https://wwd.com/menswear-news/mens-sportswear/li-ning-milan-fashion-week-show-winter-olympics-1238453387/"
  },
  {
    id: 3,
    title: "China: Li-Ning Presents Its Fall/Winter 2026 Collection at Milan Men's Fashion Week",
    image: blog3,
    date: "2026-01-17",
    author: "Adnkronos",
    excerpt: "Chinese brand Li-Ning presented its Fall/Winter 2026 collection during Milan Men's Fashion Week, one of Italy's most prestigious fashion events. The show highlighted the dialogue between Chinese creativity and Italian fashion excellence.",
    category: "International",
    url: "https://www.adnkronos.com/Archivio/rassegna-stampa/inglese/china-li-ning-presents-its-fallwinter-2026-collection-at-milan-men-e-amp-39-s-fashion-week_13BwcTT3zkikt5Vm5IdgTW"
  },
  {
    id: 4,
    title: "Introducing MFW FW26 Talent: Li-Ning",
    image: blog4,
    date: "2025-12-22",
    author: "Buzzcut Zeazon",
    excerpt: "Li-Ning, founded by Olympic champion Li Ning, is a pioneering force in global athletic fashion. The brand seamlessly merges technical innovation with contemporary design and Chinese cultural heritage, creating collections at the intersection of sport, fashion, and identity.",
    category: "Brand Profile",
    url: "https://www.linkedin.com/posts/buzzcutzeazon_introducing-mfw-fw26-talent-li-ning-li-ning-activity-7409191003951087616-SiEG"
  }
];

const Blog = () => {
  // Hàm mở link trong tab mới
  const openArticle = (url) => {
    window.open(url, "_blank", "noopener noreferrer");
  };

  return (
    <div className="max-padd-container py-16 pt-28">
      <Title title1={"Latest"} title2={"News"} titleStyles={"pb-10"} />

      {/* Blog Grid - 4 bài viết */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {blogPosts.map((post) => (
          <article 
            key={post.id} 
            className="bg-white rounded-xl shadow-sm overflow-hidden hover:shadow-lg transition cursor-pointer"
            onClick={() => openArticle(post.url)}
          >
            <div className="relative h-48 overflow-hidden">
              <img
                src={post.image}
                alt={post.title}
                className="w-full h-full object-cover hover:scale-105 transition duration-300"
                onError={(e) => {
                  e.target.src = "https://via.placeholder.com/400x300?text=Li-Ning+Fashion";
                }}
              />
              <span className="absolute top-3 left-3 bg-secondary text-white text-xs px-3 py-1 rounded-full">
                {post.category}
              </span>
            </div>

            <div className="p-4">
              <div className="flex items-center gap-2 text-xs text-gray-500 mb-2">
                <span>{post.date}</span>
                <span>•</span>
                <span>{post.author}</span>
              </div>

              <h3 className="font-semibold text-base mb-2 line-clamp-2 hover:text-secondary transition">
                {post.title}
              </h3>

              <p className="text-gray-600 text-sm line-clamp-3 mb-3">
                {post.excerpt}
              </p>

              <span className="text-secondary font-medium text-sm hover:underline">
                Read full article →
              </span>
            </div>
          </article>
        ))}
      </div>

      {/* Note về nguồn bài viết */}
      <p className="text-center text-gray-400 text-xs mt-8">
        Articles sourced from WWD, Adnkronos, Yahoo Shopping, and LinkedIn • All about Li-Ning brand
      </p>
    </div>
  );
};

export default Blog;