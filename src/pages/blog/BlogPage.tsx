"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { ExternalLink, Calendar, Clock } from "lucide-react";
import { useTranslation } from "react-i18next";

interface MediumPost {
  title: string;
  link: string;
  pubDate: string;
  description: string;
  thumbnail?: string;
  subtitle?: string;
}

const BlogPage = () => {
  const { t } = useTranslation();
  const [posts, setPosts] = useState<MediumPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchMediumPosts = async () => {
      try {
        const rssUrl = 'https://medium.com/feed/@joegsuero';
        const corsProxy = 'https://api.rss2json.com/v1/api.json?rss_url=';

        const response = await fetch(corsProxy + encodeURIComponent(rssUrl));
        const data = await response.json();

        if (data.status === 'ok') {
          const mediumPosts = data.items.map((item: any) => {
            // Extraer la primera imagen del contenido HTML
            let thumbnail = item.thumbnail || item.enclosure?.link;
            if (!thumbnail && item.content) {
              const imgMatch = item.content.match(/<img[^>]+src="([^"]+)"/i);
              if (imgMatch && imgMatch[1]) {
                thumbnail = imgMatch[1];
              }
            }

            // Extraer el primer h4 como subtítulo
            let subtitle = '';
            if (item.content) {
              const h4Match = item.content.match(/<h4[^>]*>([^<]+)<\/h4>/i);
              if (h4Match && h4Match[1]) {
                subtitle = h4Match[1].trim();
              }
            }

            // Generar descripción removiendo el primer h4 si existe
            let cleanDescription = item.description;
            if (subtitle && item.content) {
              // Remover el primer h4 del contenido para evitar duplicación
              cleanDescription = item.content.replace(/<h4[^>]*>[\s\S]*?<\/h4>/i, '');
            }
            cleanDescription = cleanDescription.replace(/<[^>]*>/g, '').substring(0, 200) + '...';

            return {
              title: item.title,
              link: item.link,
              pubDate: item.pubDate,
              description: cleanDescription,
              thumbnail: thumbnail,
              subtitle: subtitle
            };
          });
          setPosts(mediumPosts);
        } else {
          setError('No se pudieron cargar los artículos');
        }
      } catch (err) {
        setError('Error al conectar con Medium');
        console.error('Error fetching Medium posts:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchMediumPosts();
  }, []);

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('es-ES', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  return (
    <div className="min-h-screen bg-black">
      <div className="py-32 relative px-6 overflow-hidden">
        <div className="absolute top-0 right-0 -translate-y-1/2 translate-x-1/2 w-96 h-96 bg-blue-500/10 blur-[120px] rounded-full pointer-events-none" />

        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="max-w-6xl mx-auto"
          >
            {/* Header Section */}
            <div className="text-center mb-20">
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="inline-block bg-blue-500/10 border border-blue-500/20 px-4 py-1.5 rounded-full mb-6 glass"
              >
                <h2 className="text-sm font-medium tracking-wider uppercase text-blue-400">
                  {t('blog.title', 'Blog')}
                </h2>
              </motion.div>
              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.1 }}
                className="text-4xl md:text-5xl font-bold mb-6 text-white"
              >
                {t('blog.pageTitle', 'Latest')} <span className="text-gradient">{t('blog.medium', 'Articles')}</span>
              </motion.h1>
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="text-gray-400 max-w-2xl mx-auto text-lg"
              >
                {t('blog.pageDescription', 'Explore all my published articles on Medium. Find topics that interest you and dive deeper into my thoughts and experiences.')}
              </motion.p>
            </div>

            {/* Articles Grid */}
            {loading ? (
              // Loading state
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                {Array.from({ length: 9 }).map((_, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    className="bg-slate-900/40 border border-white/5 rounded-3xl overflow-hidden glass-dark animate-pulse"
                  >
                    <div className="aspect-video bg-slate-800"></div>
                    <div className="p-6">
                      <div className="h-6 bg-slate-800 rounded mb-3"></div>
                      <div className="h-4 bg-slate-800 rounded mb-2"></div>
                      <div className="h-4 bg-slate-800 rounded w-3/4"></div>
                    </div>
                  </motion.div>
                ))}
              </div>
            ) : error ? (
              // Error state
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="text-center py-24"
              >
                <p className="text-gray-400 mb-8 text-lg">{error}</p>
                <a
                  href="https://joegsuero.medium.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-8 py-4 bg-blue-500 text-white rounded-2xl font-bold shadow-lg shadow-blue-500/10 hover:shadow-blue-500/20 hover:scale-[1.02] active:scale-[0.98] transition-all"
                >
                  Visit Medium Profile <ExternalLink className="w-5 h-5" />
                </a>
              </motion.div>
            ) : (
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                {posts.map((post, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    viewport={{ once: true, margin: "-50px" }}
                    className="group h-full"
                  >
                    <div className="bg-slate-900/40 border border-white/5 rounded-3xl overflow-hidden glass-dark h-full flex flex-col transition-all duration-500 hover:border-blue-500/30 hover:shadow-2xl hover:shadow-blue-500/10">
                      {/* Image Section */}
                      <div className="relative overflow-hidden aspect-video">
                        <img
                          src={post.thumbnail || "/placeholder.svg"}
                          alt={post.title}
                          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                          onError={(e) => {
                            const target = e.target as HTMLImageElement;
                            target.src = "/placeholder.svg";
                          }}
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-transparent opacity-60"></div>
                      </div>

                      {/* Content Section */}
                      <div className="p-6 flex flex-col flex-grow">
                        <h4 className="text-xl font-bold text-white mb-2 line-clamp-2 group-hover:text-blue-400 transition-colors">
                          {post.title}
                        </h4>

                        {post.subtitle && (
                          <p className="text-blue-400 text-sm font-medium mb-3 line-clamp-1">
                            {post.subtitle}
                          </p>
                        )}

                        <p className="text-gray-400 mb-4 line-clamp-3 text-sm leading-relaxed flex-grow">
                          {post.description}
                        </p>

                        {/* Meta info */}
                        <div className="flex items-center justify-between text-xs text-gray-500 mb-4">
                          <div className="flex items-center gap-1">
                            <Calendar className="w-4 h-4" />
                            <span>{formatDate(post.pubDate)}</span>
                          </div>
                          <div className="flex items-center gap-1">
                            <Clock className="w-4 h-4" />
                            <span>Medium</span>
                          </div>
                        </div>

                        {/* Read Article Link */}
                        <a
                          href={post.link}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-2 text-blue-400 hover:text-blue-300 transition-colors group-hover:gap-3 text-sm font-medium"
                        >
                          {t('blog.readMore', 'Read Article')} <ExternalLink className="w-4 h-4" />
                        </a>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            )}

            {/* Medium Link Section */}
            {!loading && posts.length > 0 && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.3 }}
                className="text-center mt-16"
              >
                <a
                  href="https://joegsuero.medium.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-2xl font-bold shadow-lg shadow-blue-500/25 hover:shadow-blue-500/40 hover:scale-[1.02] active:scale-[0.98] transition-all"
                >
                  {t('blog.viewOnMedium', 'View All on Medium')} <ExternalLink className="w-5 h-5" />
                </a>
                <p className="text-gray-400 text-sm mt-4">
                  {t('blog.pageDescription', 'Explore all my published articles on Medium')}
                </p>
              </motion.div>
            )}
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default BlogPage;