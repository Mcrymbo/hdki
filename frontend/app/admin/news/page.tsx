"use client";

import { useState } from "react";
import { useQuery, useMutation } from "@apollo/client";
import { GET_NEWS } from "@/lib/graphql/queries";
import { DELETE_NEWS } from "@/lib/graphql/mutations";
import { useAuth } from "@/contexts/AuthContext";
import AdminLayout from "@/components/admin/AdminLayout";
import DataTable, { type DataTableColumn } from "@/components/admin/ui/DataTable";
import AccessDenied from "@/components/admin/ui/AccessDenied";
import ConfirmDialog from "@/components/admin/ui/ConfirmDialog";
import { useToast } from "@/components/admin/ui/Toast";
import LoadingState from "@/components/ui/LoadingState";
import ErrorState from "@/components/ui/ErrorState";
import EmptyState from "@/components/ui/EmptyState";
import Button from "@/components/ui/Button";
import Image from "next/image";
import Link from "next/link";
import { Plus, Eye, Pencil, Trash2, Newspaper, User } from "lucide-react";
import { cn } from "@/lib/cn";

interface NewsArticle {
  id: string;
  title: string;
  content: string;
  coverImage?: string;
  author?: { id: string; username: string; firstName?: string; lastName?: string };
  publishedAt: string;
  updatedAt: string;
  isPublished: boolean;
}

export default function AdminNews() {
  const { isAdmin } = useAuth();
  const { toast } = useToast();
  const [pendingDelete, setPendingDelete] = useState<NewsArticle | null>(null);

  const { data, loading, error, refetch } = useQuery(GET_NEWS);
  const [deleteNews, { loading: deleting }] = useMutation(DELETE_NEWS);

  if (!isAdmin) {
    return (
      <AdminLayout>
        <AccessDenied />
      </AdminLayout>
    );
  }

  const newsArticles: NewsArticle[] = data?.news || [];

  const handleDelete = async () => {
    if (!pendingDelete) return;
    try {
      await deleteNews({
        variables: { id: pendingDelete.id },
        update: (cache) => {
          cache.modify({
            fields: {
              news(existingNews = []) {
                return existingNews.filter((n: { __ref: string }) => n.__ref !== `News:${pendingDelete.id}`);
              },
            },
          });
        },
      });
      toast("Article deleted", "success");
      setPendingDelete(null);
      refetch();
    } catch (err) {
      toast(err instanceof Error ? err.message : "Failed to delete news article", "error");
    }
  };

  const columns: DataTableColumn<NewsArticle>[] = [
    {
      key: "title",
      label: "Article",
      render: (article) => (
        <div className="flex items-center gap-3">
          <div className="relative h-10 w-10 shrink-0 overflow-hidden rounded-sm bg-hdki-gray-light">
            {article.coverImage && (
              <Image src={article.coverImage} alt={article.title} fill unoptimized sizes="40px" className="object-cover" />
            )}
          </div>
          <div className="max-w-xs">
            <div className="truncate font-medium text-hdki-ink">{article.title}</div>
            <div className="truncate text-xs text-hdki-gray-mid">{article.content?.substring(0, 80)}...</div>
          </div>
        </div>
      ),
    },
    {
      key: "author",
      label: "Author",
      render: (article) => (
        <span className="flex items-center gap-1.5 text-hdki-gray-mid">
          <User className="h-3.5 w-3.5 text-hdki-red" />
          {article.author?.firstName && article.author?.lastName
            ? `${article.author.firstName} ${article.author.lastName}`
            : article.author?.username || "Unknown"}
        </span>
      ),
    },
    {
      key: "publishedAt",
      label: "Published",
      render: (article) => (article.publishedAt ? new Date(article.publishedAt).toLocaleDateString() : "—"),
    },
    {
      key: "status",
      label: "Status",
      render: (article) => (
        <span
          className={cn(
            "inline-flex rounded-sm px-2 py-1 text-xs font-semibold",
            article.isPublished ? "bg-green-100 text-green-800" : "bg-yellow-100 text-yellow-800"
          )}
        >
          {article.isPublished ? "Published" : "Draft"}
        </span>
      ),
    },
    {
      key: "actions",
      label: "",
      className: "text-right",
      render: (article) => (
        <div className="flex items-center justify-end gap-3">
          <Link href={`/activities/news/${article.id}`} className="text-hdki-gray-mid hover:text-hdki-ink" title="View">
            <Eye className="h-4 w-4" />
          </Link>
          <Link href={`/admin/news/${article.id}/edit`} className="text-hdki-gray-mid hover:text-hdki-red" title="Edit">
            <Pencil className="h-4 w-4" />
          </Link>
          <button onClick={() => setPendingDelete(article)} className="text-hdki-gray-mid hover:text-red-600" title="Delete">
            <Trash2 className="h-4 w-4" />
          </button>
        </div>
      ),
    },
  ];

  return (
    <AdminLayout breadcrumbs={[{ label: "Dashboard", href: "/admin" }, { label: "News" }]}>
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h1 className="font-display text-2xl font-medium text-hdki-ink">News Management</h1>
          <p className="mt-1 text-sm text-hdki-gray-mid">Manage news articles and announcements</p>
        </div>
        <Button href="/admin/news/create" variant="primary" size="sm" icon={<Plus />} iconPosition="left">
          Create Article
        </Button>
      </div>

      {loading ? (
        <LoadingState label="Loading news..." />
      ) : error ? (
        <ErrorState message={`Error loading news: ${error.message}`} onRetry={() => refetch()} />
      ) : newsArticles.length === 0 ? (
        <EmptyState
          icon={<Newspaper />}
          title="No news articles yet"
          action={{ label: "Create First Article", href: "/admin/news/create" }}
        />
      ) : (
        <DataTable columns={columns} rows={newsArticles} rowKey={(article) => article.id} />
      )}

      <ConfirmDialog
        open={!!pendingDelete}
        title="Delete article?"
        description={pendingDelete ? `"${pendingDelete.title}" will be permanently removed.` : undefined}
        confirmLabel="Delete"
        loading={deleting}
        onConfirm={handleDelete}
        onCancel={() => setPendingDelete(null)}
      />
    </AdminLayout>
  );
}
