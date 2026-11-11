"use client";

import { useEffect, useRef, useState, type FormEvent } from "react";
import { AnimatePresence, motion } from "motion/react";
import { Button } from "@/components/ui/button";
import {
  ArrowRight,
  ArrowUpRight,
  ChatCircleText,
  Check,
  CopySimple,
  EnvelopeSimple,
  ShareNetwork,
  X,
} from "./phosphor-icons";

type LocalComment = {
  id: string;
  name: string;
  text: string;
  postedAt: string;
};

const COMMENTS_PER_PAGE = 5;

function formatCommentTime(postedAt: string) {
  const minutes = Math.floor((Date.now() - new Date(postedAt).getTime()) / 60_000);
  if (minutes < 1) return "Just now";
  if (minutes < 60) return `${minutes}m ago`;
  const hours = Math.floor(minutes / 60);
  if (hours < 24) return `${hours}h ago`;
  return new Date(postedAt).toLocaleDateString(undefined, {
    day: "numeric",
    month: "short",
  });
}

export function ArticleEngagement({
  title,
  slug,
}: {
  title: string;
  slug: string;
}) {
  const [commentOpen, setCommentOpen] = useState(false);
  const [name, setName] = useState("");
  const [comment, setComment] = useState("");
  const [comments, setComments] = useState<LocalComment[]>([]);
  const [visibleCommentCount, setVisibleCommentCount] = useState(COMMENTS_PER_PAGE);
  const [commentFeedback, setCommentFeedback] = useState<{ type: "error" | "success"; message: string; comment?: LocalComment } | null>(null);
  const [isSubmittingComment, setIsSubmittingComment] = useState(false);
  const [shareStatus, setShareStatus] = useState("");
  const [shareOpen, setShareOpen] = useState(false);
  const [shareUrl, setShareUrl] = useState("");
  const [linkCopied, setLinkCopied] = useState(false);
  const shareTriggerRef = useRef<HTMLButtonElement>(null);
  const closeShareRef = useRef<HTMLButtonElement>(null);
  const commentTriggerRef = useRef<HTMLButtonElement>(null);
  const closeCommentRef = useRef<HTMLButtonElement>(null);
  const commentScrollRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const controller = new AbortController();
    fetch(`/api/articles/${encodeURIComponent(slug)}/comments`, { signal: controller.signal })
      .then(async (response) => {
        if (!response.ok) throw new Error("Comments could not be loaded.");
        return response.json() as Promise<{ docs?: { id: string; name: string; body: string; createdAt: string }[] }>;
      })
      .then((data) => {
        setComments((data.docs || []).map((item) => ({ id: item.id, name: item.name, text: item.body, postedAt: item.createdAt })));
        setVisibleCommentCount(COMMENTS_PER_PAGE);
      })
      .catch((error: unknown) => {
        if (error instanceof Error && error.name === "AbortError") return;
      });
    return () => controller.abort();
  }, [slug]);

  async function shareArticle() {
    const url = window.location.href;
    const supportsNativeShare = typeof navigator.share === "function";
    const isTouchDevice = window.matchMedia("(pointer: coarse)").matches;

    if (isTouchDevice && supportsNativeShare) {
      try {
        await navigator.share({ title, url });
      } catch (error) {
        if (error instanceof Error && error.name !== "AbortError") {
          setShareStatus(
            "The share menu could not be opened. Try again or copy the article link.",
          );
        }
      }
      return;
    }

    setShareUrl(url);
    setShareStatus("");
    setLinkCopied(false);
    setShareOpen(true);
  }

  async function copyShareLink() {
    try {
      await navigator.clipboard.writeText(shareUrl);
      setLinkCopied(true);
      window.setTimeout(() => setLinkCopied(false), 1800);
    } catch {
      setShareStatus(
        "Could not copy the link. Try sharing by email or another option.",
      );
    }
  }

  async function postComment(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const trimmedName = name.trim();
    const trimmedComment = comment.trim();
    if (!trimmedName || !trimmedComment) return;

    setCommentFeedback(null);
    setIsSubmittingComment(true);
    try {
      const response = await fetch(`/api/articles/${encodeURIComponent(slug)}/comments`, {
        method: "POST", headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name: trimmedName, body: trimmedComment }),
      });
      const result = await response.json().catch(() => ({})) as {
        error?: string;
        comment?: { id: string; name: string; body: string; createdAt: string };
      };
      if (!response.ok) throw new Error(result.error || "Your comment could not be submitted.");
      const postedComment = result.comment || {
        id: `local-${Date.now()}`,
        name: trimmedName,
        body: trimmedComment,
        createdAt: new Date().toISOString(),
      };
      const newComment = { id: postedComment.id, name: postedComment.name, text: postedComment.body, postedAt: postedComment.createdAt };
      const nextComments = [
        ...comments.filter((item) => item.id !== postedComment.id),
        newComment,
      ];
      setComments(nextComments);
      setVisibleCommentCount(nextComments.length);
      setCommentFeedback({ type: "success", message: "Your comment has been posted.", comment: newComment });
      setName("");
      setComment("");
    } catch (error) {
      setCommentFeedback({ type: "error", message: error instanceof Error ? error.message : "Your comment could not be submitted. Please try again." });
    } finally {
      setIsSubmittingComment(false);
    }
  }

  useEffect(() => {
    if (!shareOpen && !commentOpen) return;

    const activeDialog = shareOpen ? "share" : "comment";
    const previousOverflow = document.body.style.overflow;
    const previousDocumentOverflow = document.documentElement.style.overflow;
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setShareOpen(false);
        setCommentOpen(false);
      }
    };
    document.body.style.overflow = "hidden";
    document.documentElement.style.overflow = "hidden";
    window.addEventListener("keydown", handleKeyDown);
    if (activeDialog === "share") closeShareRef.current?.focus();
    else closeCommentRef.current?.focus();

    return () => {
      document.body.style.overflow = previousOverflow;
      document.documentElement.style.overflow = previousDocumentOverflow;
      window.removeEventListener("keydown", handleKeyDown);
      if (activeDialog === "share") shareTriggerRef.current?.focus();
      else commentTriggerRef.current?.focus();
    };
  }, [commentOpen, shareOpen]);

  const encodedUrl = encodeURIComponent(shareUrl);
  const encodedTitle = encodeURIComponent(title);
  const whatsappText = encodeURIComponent(`${title} ${shareUrl}`);
  const visibleComments = comments.slice(0, visibleCommentCount);

  function closeShare() {
    setShareOpen(false);
  }

  return (
    <section
      className="mt-12 flex flex-col gap-3 rounded-lg bg-[#f1f4f4] p-4 sm:p-5"
      aria-label="Article feedback and sharing"
    >
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div className="flex flex-col gap-1">
          <h2 className="m-0 font-sans text-base font-semibold text-[#171514]">
            Share your thoughts
          </h2>
          <p className="m-0 text-sm text-[#5b6264]">
            Share the article or leave a comment.
          </p>
        </div>
        <div className="flex flex-wrap items-center gap-2">
          <button
            ref={shareTriggerRef}
            type="button"
            onClick={shareArticle}
            className="inline-flex min-h-11 cursor-pointer items-center gap-2 rounded-lg bg-white px-4 font-sans text-sm font-semibold text-[#303635] transition-colors hover:bg-brand-teal-soft hover:text-brand-teal-ink"
          >
            <ShareNetwork size={18} aria-hidden="true" />
            Share
          </button>
          <button
            ref={commentTriggerRef}
            type="button"
            onClick={() => { setCommentFeedback(null); setCommentOpen(true); }}
            aria-haspopup="dialog"
            aria-expanded={commentOpen}
            className="inline-flex min-h-11 cursor-pointer items-center gap-2 rounded-lg bg-white px-4 font-sans text-sm font-semibold text-[#303635] transition-colors hover:bg-brand-teal-soft hover:text-brand-teal-ink"
          >
            <ChatCircleText size={18} aria-hidden="true" />
            Comment
          </button>
        </div>
      </div>

      {shareStatus && (
        <p className="m-0 text-sm text-brand-teal-ink" role="status">
          {shareStatus}
        </p>
      )}

      {comments.length > 0 && (
        <div className="flex flex-col gap-2">
          <div
            className="flex flex-col gap-1 rounded-lg bg-white px-3 pt-3"
            aria-live="polite"
            aria-label="Comments"
          >
            {visibleComments.map((item) => (
              <article
                key={item.id}
                className="flex gap-2 py-0"
              >
                <span
                  className="grid size-7 shrink-0 place-items-center rounded-lg bg-brand-teal-soft font-sans text-[0.625rem] font-bold uppercase text-brand-teal-ink"
                  aria-hidden="true"
                >
                  {item.name.trim().slice(0, 2)}
                </span>
                <div className="flex min-w-0 flex-1 flex-col gap-0">
                  <div className="flex flex-wrap items-baseline gap-x-1.5 gap-y-0">
                    <h4 className="m-0 font-sans text-sm font-semibold text-[#252b2a]">
                      {item.name}
                    </h4>
                    <time
                      className="text-xs text-[#777f7e]"
                      dateTime={item.postedAt}
                    >
                      {formatCommentTime(item.postedAt)}
                    </time>
                  </div>
                  <p className="m-0 whitespace-pre-wrap text-[0.8125rem] leading-[1.15rem] text-[#4b5351]">
                    {item.text}
                  </p>
                </div>
              </article>
            ))}
          </div>
          {visibleCommentCount < comments.length && (
            <button
              type="button"
              onClick={() => setVisibleCommentCount((count) => Math.min(count + COMMENTS_PER_PAGE, comments.length))}
              className="mx-auto inline-flex min-h-9 cursor-pointer items-center gap-2 rounded-lg px-3 font-sans text-sm font-semibold text-brand-teal-ink transition-colors hover:bg-white"
            >
              Load more comments <ArrowRight size={15} aria-hidden="true" />
            </button>
          )}
        </div>
      )}

      <AnimatePresence>
        {commentOpen && (
          <motion.div
            className="fixed inset-0 z-[120] flex items-center justify-center overflow-hidden overscroll-contain bg-[#101b1b]/55 p-4 backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onMouseDown={(event) => {
              if (event.target === event.currentTarget) setCommentOpen(false);
            }}
          >
            <motion.div
              role="dialog"
              aria-modal="true"
              aria-labelledby={`article-comment-title-${slug}`}
              className="my-auto flex max-h-[calc(100dvh-2rem)] w-full max-w-lg flex-col overflow-hidden rounded-lg bg-white p-4 shadow-2xl sm:p-6"
              onWheelCapture={(event) => {
                const content = commentScrollRef.current;
                if (!content || event.deltaY === 0) return;
                const previousTop = content.scrollTop;
                const maxTop = content.scrollHeight - content.clientHeight;
                content.scrollTop = Math.max(0, Math.min(maxTop, previousTop + event.deltaY));
                if (content.scrollTop !== previousTop) {
                  event.preventDefault();
                  event.stopPropagation();
                }
              }}
              initial={{ opacity: 0, y: 18, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 10, scale: 0.98 }}
              transition={{ duration: 0.22, ease: [0.22, 1, 0.36, 1] }}
            >
              <div className="flex shrink-0 items-start justify-between gap-3">
                <div className="flex flex-col gap-1">
                  <h2
                    id={`article-comment-title-${slug}`}
                    className="m-0 font-[var(--font-heading)] text-2xl font-semibold text-[#171514]"
                  >
                    Join the conversation
                  </h2>
                  <p className="m-0 text-sm leading-5 text-[#5b6264]">
                    Add your name and share a thought about this article.
                  </p>
                </div>
                <button
                  ref={closeCommentRef}
                  type="button"
                  onClick={() => setCommentOpen(false)}
                  aria-label="Close comment form"
                  className="grid size-10 shrink-0 cursor-pointer place-items-center rounded-lg bg-[#f1f4f4] text-[#303635] transition hover:bg-brand-teal-soft hover:text-brand-teal-ink"
                >
                  <X size={18} />
                </button>
              </div>
              <div ref={commentScrollRef} className="min-h-0 max-h-[calc(100dvh-10rem)] flex-1 overflow-y-auto overscroll-contain pr-2">
              {commentFeedback?.type === "success" ? (
                <div className="mt-4 flex flex-col gap-3" role="status">
                  <div className="flex items-start gap-3 rounded-lg bg-brand-teal-soft p-4 text-brand-teal-ink">
                    <Check className="mt-0.5 shrink-0" size={20} aria-hidden="true" />
                    <p className="m-0 text-sm leading-6">{commentFeedback.message}</p>
                  </div>
                  {commentFeedback.comment && (
                    <article className="rounded-lg bg-[#f1f4f4] p-3">
                      <div className="mb-1.5 flex items-center justify-between gap-3">
                        <p className="m-0 font-sans text-sm font-semibold text-[#252b2a]">{commentFeedback.comment.name}</p>
                        <time className="shrink-0 text-xs text-[#777f7e]" dateTime={commentFeedback.comment.postedAt}>
                          {formatCommentTime(commentFeedback.comment.postedAt)}
                        </time>
                      </div>
                      <p className="m-0 whitespace-pre-wrap text-sm leading-6 text-[#4b5351]">{commentFeedback.comment.text}</p>
                    </article>
                  )}
                  <div className="flex justify-end">
                    <Button type="button" shape="none" className="!rounded-lg cursor-pointer" onClick={() => { setCommentFeedback(null); setCommentOpen(false); }}>
                      Done
                    </Button>
                  </div>
                </div>
              ) : (
              <form onSubmit={postComment} className="mt-4 flex flex-col gap-3">
                {commentFeedback?.type === "error" && (
                  <p className="m-0 rounded-lg bg-[#fff0ed] px-4 py-3 text-sm leading-5 text-[#8f2f20]" role="alert">
                    {commentFeedback.message}
                  </p>
                )}
                <div className="flex flex-col gap-1.5">
                  <label
                    htmlFor={`article-comment-name-${slug}`}
                    className="font-sans text-sm font-semibold text-[#252b2a]"
                  >
                    Your name
                  </label>
                  <input
                    id={`article-comment-name-${slug}`}
                    required
                    minLength={2}
                    maxLength={80}
                    autoComplete="name"
                    value={name}
                    onChange={(event) => setName(event.target.value)}
                    placeholder="Name"
                    className="min-h-11 w-full rounded-lg border border-[#d5dddb] bg-white px-3 font-sans text-sm text-[#252b2a] outline-none placeholder:text-[#7a8280] focus:border-brand-teal-ink focus:ring-2 focus:ring-brand-teal-ink/15"
                  />
                </div>
                <div className="flex flex-col gap-1.5">
                  <label
                    htmlFor={`article-comment-${slug}`}
                    className="font-sans text-sm font-semibold text-[#252b2a]"
                  >
                    Your comment
                  </label>
                  <textarea
                    id={`article-comment-${slug}`}
                    required
                    minLength={2}
                    maxLength={2000}
                    value={comment}
                    onChange={(event) => setComment(event.target.value)}
                    rows={4}
                    placeholder="Write a comment…"
                    className="min-h-32 w-full resize-y rounded-lg border border-[#d5dddb] bg-white p-3 font-sans text-sm leading-6 text-[#252b2a] outline-none placeholder:text-[#7a8280] focus:border-brand-teal-ink focus:ring-2 focus:ring-brand-teal-ink/15"
                  />
                </div>
                <div className="flex justify-end">
                  <Button
                    type="submit"
                    shape="none"
                    disabled={isSubmittingComment}
                    className="!rounded-lg cursor-pointer"
                  >
                    {isSubmittingComment ? "Sending…" : "Post comment"}
                    {!isSubmittingComment && <ArrowRight data-icon="inline-end" />}
                  </Button>
                </div>
              </form>
              )}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {shareOpen && (
          <motion.div
            className="fixed inset-0 z-[120] flex items-center justify-center bg-[#101b1b]/55 p-4 backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onMouseDown={(event) => {
              if (event.target === event.currentTarget) closeShare();
            }}
          >
            <motion.div
              role="dialog"
              aria-modal="true"
              aria-labelledby={`article-share-title-${slug}`}
              className="w-full max-w-md rounded-lg bg-white p-5 shadow-2xl sm:p-7"
              initial={{ opacity: 0, y: 18, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 10, scale: 0.98 }}
              transition={{ duration: 0.22, ease: [0.22, 1, 0.36, 1] }}
            >
              <div className="mb-5 flex items-start justify-between gap-4">
                <div className="flex flex-col gap-1">
                  <h2
                    id={`article-share-title-${slug}`}
                    className="m-0 font-[var(--font-heading)] text-2xl font-semibold text-[#171514]"
                  >
                    Share this article
                  </h2>
                  <p className="m-0 text-sm leading-5 text-[#5b6264]">
                    Send this insight to someone who may find it useful.
                  </p>
                </div>
                <button
                  ref={closeShareRef}
                  type="button"
                  onClick={closeShare}
                  aria-label="Close share options"
                  className="grid size-10 shrink-0 cursor-pointer place-items-center rounded-lg bg-[#f1f4f4] text-[#303635] transition hover:bg-brand-teal-soft hover:text-brand-teal-ink"
                >
                  <X size={18} />
                </button>
              </div>

              <div className="flex flex-col gap-2">
                <button
                  type="button"
                  onClick={copyShareLink}
                  className={`flex min-h-12 cursor-pointer items-center gap-3 rounded-lg px-4 text-left font-sans text-sm font-semibold transition ${linkCopied ? "bg-brand-teal-soft text-brand-teal-ink" : "bg-[#f1f4f4] text-[#303635] hover:bg-brand-teal-soft hover:text-brand-teal-ink"}`}
                >
                  {linkCopied ? <Check size={19} /> : <CopySimple size={19} />}
                  {linkCopied ? "Copied" : "Copy article link"}
                </button>
                <a
                  href={`https://www.linkedin.com/sharing/share-offsite/?url=${encodedUrl}`}
                  target="_blank"
                  rel="noreferrer"
                  onClick={closeShare}
                  className="flex min-h-12 items-center gap-3 rounded-lg bg-[#f1f4f4] px-4 font-sans text-sm font-semibold text-[#303635] no-underline transition hover:bg-brand-teal-soft hover:text-brand-teal-ink"
                >
                  <ArrowUpRight size={19} />
                  Share on LinkedIn
                </a>
                <a
                  href={`https://wa.me/?text=${whatsappText}`}
                  target="_blank"
                  rel="noreferrer"
                  onClick={closeShare}
                  className="flex min-h-12 items-center gap-3 rounded-lg bg-[#f1f4f4] px-4 font-sans text-sm font-semibold text-[#303635] no-underline transition hover:bg-brand-teal-soft hover:text-brand-teal-ink"
                >
                  <ChatCircleText size={19} />
                  Share on WhatsApp
                </a>
                <a
                  href={`mailto:?subject=${encodedTitle}&body=${encodeURIComponent(`${title}\n${shareUrl}`)}`}
                  onClick={closeShare}
                  className="flex min-h-12 items-center gap-3 rounded-lg bg-[#f1f4f4] px-4 font-sans text-sm font-semibold text-[#303635] no-underline transition hover:bg-brand-teal-soft hover:text-brand-teal-ink"
                >
                  <EnvelopeSimple size={19} />
                  Share by email
                </a>
              </div>

              {shareStatus && (
                <p
                  className="mb-0 mt-3 text-sm text-brand-teal-ink"
                  role="status"
                >
                  {shareStatus}
                </p>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
