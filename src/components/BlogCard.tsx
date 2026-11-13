import { motion } from "framer-motion";
import { Calendar, Clock, ExternalLink } from "lucide-react";
import { useTranslation } from "react-i18next";
import type { MediumPost } from "@/hooks/useMediumPosts";
import { SOCIAL } from "@/data/data";

export function BlogCard({
  post,
  index,
  showSubtitle = false,
}: {
  post: MediumPost;
  index: number;
  showSubtitle?: boolean;
}) {
  const { t, i18n } = useTranslation();
  const date = new Date(post.pubDate).toLocaleDateString(
    i18n.resolvedLanguage ?? "en",
    { year: "numeric", month: "short", day: "numeric" },
  );

  return (
    <motion.article
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      viewport={{ once: true, margin: "-50px" }}
      className="group relative h-full"
    >
      <div className="bg-slate-900/40 border border-white/5 rounded-3xl overflow-hidden glass-dark h-full flex flex-col transition-all duration-500 hover:border-blue-500/30 hover:shadow-2xl hover:shadow-blue-500/10">
        <div className="relative overflow-hidden aspect-video bg-slate-900">
          <img
            src={post.thumbnail || "/placeholder.svg"}
            alt=""
            loading="lazy"
            decoding="async"
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
            onError={(e) => {
              (e.target as HTMLImageElement).src = "/placeholder.svg";
            }}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-transparent opacity-60"></div>
        </div>

        <div className="p-6 flex flex-col flex-grow">
          <h3 className="text-xl font-bold text-white mb-2 line-clamp-2 group-hover:text-blue-400 transition-colors">
            {/* Stretched link: the whole card is clickable */}
            <a
              href={post.link}
              target="_blank"
              rel="noopener noreferrer"
              className="after:absolute after:inset-0"
            >
              {post.title}
            </a>
          </h3>

          {showSubtitle && post.subtitle && (
            <p className="text-blue-400 text-sm font-medium mb-3 line-clamp-1">
              {post.subtitle}
            </p>
          )}

          <p className="text-gray-400 mb-4 line-clamp-3 text-sm leading-relaxed flex-grow">
            {post.description}
          </p>

          <div className="flex items-center justify-between text-xs text-gray-400 mb-4">
            <span className="flex items-center gap-1.5">
              <Calendar className="w-4 h-4" aria-hidden="true" />
              <time dateTime={new Date(post.pubDate).toISOString()}>{date}</time>
            </span>
            <span className="flex items-center gap-1.5">
              <Clock className="w-4 h-4" aria-hidden="true" />
              {t("blog.readingTime", { count: post.readingMinutes })}
            </span>
          </div>

          <span className="inline-flex items-center gap-2 text-blue-400 group-hover:text-blue-300 transition-all group-hover:gap-3 text-sm font-medium">
            {t("blog.readMore")} <ExternalLink className="w-4 h-4" aria-hidden="true" />
          </span>
        </div>
      </div>
    </motion.article>
  );
}

export function BlogCardSkeleton() {
  return (
    <div className="bg-slate-900/40 border border-white/5 rounded-3xl overflow-hidden glass-dark animate-pulse">
      <div className="aspect-video bg-slate-800"></div>
      <div className="p-6">
        <div className="h-6 bg-slate-800 rounded mb-3"></div>
        <div className="h-4 bg-slate-800 rounded mb-2"></div>
        <div className="h-4 bg-slate-800 rounded w-3/4"></div>
      </div>
    </div>
  );
}

export function BlogUnavailable() {
  const { t } = useTranslation();
  return (
    <div className="col-span-full text-center py-12">
      <p className="text-gray-400 text-lg mb-6">{t("blog.unavailable")}</p>
      <a
        href={SOCIAL.medium}
        target="_blank"
        rel="noopener noreferrer"
        className="inline-flex items-center gap-2 px-6 py-3 rounded-2xl border border-white/10 bg-white/5 text-gray-200 font-semibold hover:border-blue-500/40 hover:text-white transition-colors"
      >
        {t("blog.unavailableCta")} <ExternalLink className="w-4 h-4" aria-hidden="true" />
      </a>
    </div>
  );
}
