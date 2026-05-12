/* eslint-disable @typescript-eslint/no-explicit-any */
import { motion } from "framer-motion";
import { forwardRef, useEffect, useState } from "react";
import { ExternalLink, Calendar, Clock } from "lucide-react";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";

interface MediumPost {
  title: string;
  link: string;
  pubDate: string;
  description: string;
  thumbnail?: string;
  subtitle?: string;
}

const Blog = forwardRef((_props, ref: any) => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [posts, setPosts] = useState<MediumPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // Función para obtener posts de Medium RSS
    const fetchMediumPosts = async () => {
      try {
        // Medium RSS feed URL
        const rssUrl = 'https://medium.com/feed/@joegsuero';
        const corsProxy = 'https://api.rss2json.com/v1/api.json?rss_url=';

        const response = await fetch(corsProxy + encodeURIComponent(rssUrl));
        const data = await response.json();

        if (data.status === 'ok') {
          const mediumPosts = data.items.slice(0, 3).map((item: any) => {
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
            cleanDescription = cleanDescription.replace(/<[^>]*>/g, '').substring(0, 150) + '...';

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
          setError('No se pudieron cargar los posts');
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
    <section
      id="blog"
      ref={ref}
      className="py-32 relative px-6 overflow-hidden"
    >
      <div className="absolute top-1/4 left-0 -translate-x-1/2 w-80 h-80 bg-blue-500/3 blur-[120px] rounded-full pointer-events-none" />

      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <div className="text-center mb-20">
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
              className="inline-block bg-blue-500/10 border border-blue-500/20 px-4 py-1.5 rounded-full mb-6 glass"
            >
              <h2 className="text-sm font-medium tracking-wider uppercase text-blue-400">
                {t('blog.title', 'Blog')}
              </h2>
            </motion.div>
            <motion.h3
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.1 }}
              viewport={{ once: true }}
              className="text-4xl md:text-5xl font-bold mb-6"
            >
              {t('blog.subtitle', 'Latest Articles from')} <span className="text-gradient">{t('blog.medium', 'Medium')}</span>
            </motion.h3>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              viewport={{ once: true }}
              className="text-gray-400 max-w-2xl mx-auto text-lg"
            >
              {t('blog.description', 'Sharing knowledge, insights and experiences from my journey in software development.')}
            </motion.p>
          </div>

          {/* Posts Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {loading ? (
              // Loading state
              Array.from({ length: 3 }).map((_, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className="bg-slate-900/40 border border-white/5 rounded-3xl overflow-hidden glass-dark animate-pulse"
                >
                  <div className="aspect-video bg-slate-800"></div>
                  <div className="p-6">
                    <div className="h-6 bg-slate-800 rounded mb-3"></div>
                    <div className="h-4 bg-slate-800 rounded mb-2"></div>
                    <div className="h-4 bg-slate-800 rounded w-3/4"></div>
                  </div>
                </motion.div>
              ))
            ) : error ? (
              // Error state
              <div className="col-span-full text-center py-12">
                <p className="text-gray-400 text-lg">{error}</p>
                <p className="text-gray-500 text-sm mt-2">
                  {t('blog.errorMessage', 'Make sure to update your Medium username in the component')}
                </p>
              </div>
            ) : (
              // Posts
              posts.map((post, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: index * 0.15 }}
                  viewport={{ once: true, margin: "-50px" }}
                  className="group relative"
                >
                  <div className="bg-slate-900/40 border border-white/5 rounded-3xl overflow-hidden glass-dark h-full flex flex-col transition-all duration-500 hover:border-blue-500/30 hover:shadow-2xl hover:shadow-blue-500/10">
                    {/* Thumbnail */}
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

                    {/* Content */}
                    <div className="p-6 flex flex-col flex-grow">
                      <h4 className="text-xl font-bold text-white mb-3 line-clamp-2 group-hover:text-blue-400 transition-colors">
                        {post.title}
                      </h4>

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

                      {/* Read more link */}
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
              ))
            )}
          </div>

          {/* View All Link */}
          {!loading && !error && posts.length > 0 && (
            <div className="text-center mt-12">
              <button
                onClick={() => {
                  navigate('/blog');
                  setTimeout(() => {
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }, 300);
                }}
                className="inline-flex items-center gap-2 px-8 py-4 bg-primary text-primary-foreground rounded-2xl font-bold shadow-lg shadow-blue-500/10 hover:shadow-blue-500/20 hover:scale-[1.02] active:scale-[0.98] transition-all"
              >
                {t('blog.viewAll', 'View All Articles')}
              </button>
            </div>
          )}
        </div>
      </div>
    </section>
  );
});

Blog.displayName = "Blog";

export default Blog;