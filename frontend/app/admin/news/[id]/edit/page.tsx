"use client";

import { useEffect, useState } from "react";
import { useRouter, useParams } from "next/navigation";
import { useQuery, useMutation } from "@apollo/client";
import { GET_NEWS_ARTICLE } from "@/lib/graphql/queries";
import { UPDATE_NEWS } from "@/lib/graphql/mutations";
import AdminLayout from "@/components/admin/AdminLayout";
import AccessDenied from "@/components/admin/ui/AccessDenied";
import { useToast } from "@/components/admin/ui/Toast";
import LoadingState from "@/components/ui/LoadingState";
import { Input, Textarea } from "@/components/ui/Input";
import Button from "@/components/ui/Button";
import { useAuth } from "@/contexts/AuthContext";
import { Save } from "lucide-react";

export default function EditNewsPage() {
  const router = useRouter();
  const params = useParams();
  const { isAdmin } = useAuth();
  const { toast } = useToast();
  const id = String(params?.id || "");

  const { data, loading: loadingQuery } = useQuery(GET_NEWS_ARTICLE, { variables: { id }, skip: !id });
  const [updateNews, { loading }] = useMutation(UPDATE_NEWS, {
    onCompleted: () => {
      toast("Article updated successfully", "success");
      router.push("/admin/news");
    },
    onError: (e) => toast(e.message, "error"),
  });

  const [form, setForm] = useState({ title: "", content: "", coverImage: "", isPublished: false });
  const [file, setFile] = useState<File | null>(null);
  const [errors, setErrors] = useState<{ [k: string]: string }>({});

  useEffect(() => {
    const art = data?.newsArticle;
    if (art) {
      setForm({
        title: art.title || "",
        content: art.content || "",
        coverImage: art.coverImage || "",
        isPublished: !!art.isPublished,
      });
    }
  }, [data]);

  if (!isAdmin) {
    return (
      <AdminLayout>
        <AccessDenied />
      </AdminLayout>
    );
  }

  const validate = () => {
    const next: { [k: string]: string } = {};
    if (!form.title.trim()) next.title = "Title is required";
    if (!form.content.trim()) next.content = "Content is required";
    setErrors(next);
    return Object.keys(next).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;
    await updateNews({ variables: { id, ...form, coverImageFile: file || undefined } });
  };

  return (
    <AdminLayout
      breadcrumbs={[
        { label: "Dashboard", href: "/admin" },
        { label: "News", href: "/admin/news" },
        { label: "Edit" },
      ]}
    >
      <div className="mx-auto max-w-3xl">
        <h1 className="mb-6 font-display text-2xl font-medium text-hdki-ink">Edit Article</h1>
        {loadingQuery ? (
          <LoadingState label="Loading article..." />
        ) : (
          <form onSubmit={handleSubmit} className="space-y-5 rounded-sm border border-hdki-border bg-white p-6">
            <Input
              label="Title"
              value={form.title}
              onChange={(e) => setForm({ ...form, title: e.target.value })}
              error={errors.title}
            />
            <div>
              <Input
                label="Cover Image URL"
                value={form.coverImage}
                onChange={(e) => setForm({ ...form, coverImage: e.target.value })}
              />
              <input
                type="file"
                accept="image/*"
                onChange={(e) => setFile(e.target.files?.[0] || null)}
                className="mt-2 block w-full text-sm text-hdki-gray-mid file:mr-3 file:rounded-sm file:border-0 file:bg-hdki-gray-light file:px-3 file:py-1.5 file:text-sm file:font-medium file:text-hdki-ink hover:file:bg-hdki-border"
              />
            </div>
            <Textarea
              label="Content"
              rows={8}
              value={form.content}
              onChange={(e) => setForm({ ...form, content: e.target.value })}
              error={errors.content}
            />
            <div className="flex items-center gap-2">
              <input
                id="published"
                type="checkbox"
                checked={form.isPublished}
                onChange={(e) => setForm({ ...form, isPublished: e.target.checked })}
                className="h-4 w-4 rounded-sm border-hdki-border text-hdki-red focus:ring-hdki-red/20"
              />
              <label htmlFor="published" className="text-sm text-hdki-ink">
                Published
              </label>
            </div>
            <div className="flex gap-3 pt-2">
              <Button type="submit" variant="primary" size="md" loading={loading} icon={<Save />}>
                Save Changes
              </Button>
              <Button type="button" variant="outline" size="md" onClick={() => router.push("/admin/news")}>
                Cancel
              </Button>
            </div>
          </form>
        )}
      </div>
    </AdminLayout>
  );
}
