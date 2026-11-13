import { motion } from "framer-motion";
import { ExternalLink } from "lucide-react";
import { useTranslation } from "react-i18next";
import { SOCIAL } from "@/data/data";
import { useMediumPosts } from "@/hooks/useMediumPosts";
import { BlogCard, BlogCardSkeleton, BlogUnavailable } from "@/components/BlogCard";

const BlogPage = () => {
  const { t } = useTranslation();
  const { posts, loading, failed } = useMediumPosts();

  return (
    <main className="min-h-screen bg-black">
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
                <p className="text-sm font-medium tracking-wider uppercase text-blue-400">
                  {t("blog.title")}
                </p>
              </motion.div>
              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.1 }}
                className="text-4xl md:text-5xl font-bold mb-6 text-white"
              >
                {t("blog.pageHeadingStart")}{" "}
                <span className="text-gradient">{t("blog.pageHeadingHighlight")}</span>
              </motion.h1>
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="text-gray-400 max-w-2xl mx-auto text-lg"
              >
                {t("blog.pageDescription")}
              </motion.p>
            </div>

            {/* Articles Grid */}
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {loading ? (
                Array.from({ length: 6 }).map((_, i) => <BlogCardSkeleton key={i} />)
              ) : failed || posts.length === 0 ? (
                <BlogUnavailable />
              ) : (
                posts.map((post, index) => (
                  <BlogCard key={post.link} post={post} index={index} showSubtitle />
                ))
              )}
            </div>

            {!loading && posts.length > 0 && (
              <div className="text-center mt-16">
                <a
                  href={SOCIAL.medium}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-8 py-4 bg-primary text-primary-foreground rounded-2xl font-bold shadow-lg shadow-blue-500/20 hover:shadow-blue-500/30 hover:scale-[1.02] active:scale-[0.98] transition-all"
                >
                  {t("blog.viewOnMedium")} <ExternalLink className="w-5 h-5" aria-hidden="true" />
                </a>
              </div>
            )}
          </motion.div>
        </div>
      </div>
    </main>
  );
};

export default BlogPage;
