import { useEffect, useState } from "react";
import { SOCIAL } from "@/data/data";

export interface MediumPost {
  title: string;
  link: string;
  pubDate: string;
  description: string;
  thumbnail?: string;
  subtitle?: string;
  readingMinutes: number;
}

type RssItem = {
  title: string;
  link: string;
  pubDate: string;
  description?: string;
  content?: string;
  thumbnail?: string;
  enclosure?: { link?: string };
};

const RSS_TO_JSON = "https://api.rss2json.com/v1/api.json?rss_url=";
const WORDS_PER_MINUTE = 220;

const stripHtml = (html: string) =>
  html
    .replace(/<[^>]*>/g, " ")
    .replace(/&nbsp;/g, " ")
    .replace(/\s+/g, " ")
    .trim();

const toPost = (item: RssItem): MediumPost => {
  const content = item.content ?? item.description ?? "";

  let thumbnail = item.thumbnail || item.enclosure?.link;
  if (!thumbnail) {
    thumbnail = content.match(/<img[^>]+src="([^"]+)"/i)?.[1];
  }

  // Medium uses the first <h4> as the article subtitle
  const subtitle = content.match(/<h4[^>]*>([^<]+)<\/h4>/i)?.[1]?.trim() ?? "";
  const body = subtitle
    ? content.replace(/<h4[^>]*>[\s\S]*?<\/h4>/i, "")
    : content;
  const plain = stripHtml(body);
  const words = stripHtml(content).split(" ").filter(Boolean).length;

  return {
    title: item.title,
    link: item.link,
    pubDate: item.pubDate,
    description: plain.length > 200 ? `${plain.slice(0, 200).trimEnd()}…` : plain,
    thumbnail,
    subtitle,
    readingMinutes: Math.max(1, Math.round(words / WORDS_PER_MINUTE)),
  };
};

// Shared across the home section and the blog page: one request per visit
let cache: Promise<MediumPost[]> | null = null;

const fetchPosts = () => {
  cache ??= fetch(RSS_TO_JSON + encodeURIComponent(SOCIAL.mediumFeed))
    .then((res) => {
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      return res.json();
    })
    .then((data) => {
      if (data.status !== "ok") throw new Error(data.message ?? "Feed error");
      return (data.items as RssItem[]).map(toPost);
    })
    .catch((err) => {
      cache = null; // allow a retry on the next mount
      throw err;
    });
  return cache;
};

export const useMediumPosts = () => {
  const [posts, setPosts] = useState<MediumPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [failed, setFailed] = useState(false);

  useEffect(() => {
    let active = true;
    fetchPosts()
      .then((p) => active && setPosts(p))
      .catch((err) => {
        console.error("Error fetching Medium posts:", err);
        if (active) setFailed(true);
      })
      .finally(() => active && setLoading(false));
    return () => {
      active = false;
    };
  }, []);

  return { posts, loading, failed };
};
