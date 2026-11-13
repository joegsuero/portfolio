/* eslint-disable @typescript-eslint/no-explicit-any */
import { motion } from "framer-motion";
import { forwardRef } from "react";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import { useMediumPosts } from "@/hooks/useMediumPosts";
import { BlogCard, BlogCardSkeleton, BlogUnavailable } from "@/components/BlogCard";

const Blog = forwardRef((_props, ref: any) => {
  const { t } = useTranslation();
  const { posts, loading, failed } = useMediumPosts();
  const latest = posts.slice(0, 3);

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
                {t("blog.title")}
              </h2>
            </motion.div>
            <motion.h3
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.1 }}
              viewport={{ once: true }}
              className="text-4xl md:text-5xl font-bold mb-6"
            >
              {t("blog.headingStart")}{" "}
              <span className="text-gradient">{t("blog.headingHighlight")}</span>
            </motion.h3>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              viewport={{ once: true }}
              className="text-gray-400 max-w-2xl mx-auto text-lg"
            >
              {t("blog.description")}
            </motion.p>
          </div>

          {/* Posts Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {loading ? (
              Array.from({ length: 3 }).map((_, i) => <BlogCardSkeleton key={i} />)
            ) : failed || latest.length === 0 ? (
              <BlogUnavailable />
            ) : (
              latest.map((post, index) => (
                <BlogCard key={post.link} post={post} index={index} />
              ))
            )}
          </div>

          {!loading && latest.length > 0 && (
            <div className="text-center mt-12">
              <Link
                to="/blog"
                className="inline-flex items-center gap-2 px-8 py-4 bg-primary text-primary-foreground rounded-2xl font-bold shadow-lg shadow-blue-500/10 hover:shadow-blue-500/20 hover:scale-[1.02] active:scale-[0.98] transition-all"
              >
                {t("blog.viewAll")}
              </Link>
            </div>
          )}
        </div>
      </div>
    </section>
  );
});

Blog.displayName = "Blog";

export default Blog;
