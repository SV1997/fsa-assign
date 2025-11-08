"use client";

import type React from "react";
import { useEffect, useState } from "react";
import { Loader2, Pencil, Trash2, Save, X } from "lucide-react";
import type { User, UpdateUserPayload } from "../types/index";
import { fetchRequestGet, fetchRequesDelete, fetchRequesPut } from "../common/NetworkOps";

interface UserMasterProps {
  initialUsers?: User[];
  onUserUpdate?: (user: User) => void;
  apiBaseUrl?: string;
}

export default function UserMaster({ initialUsers = [], onUserUpdate, apiBaseUrl = "/api" }: UserMasterProps) {
  const [users, setUsers] = useState<User[]>(initialUsers);
  const [editingUserId, setEditingUserId] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const [formData, setFormData] = useState<UpdateUserPayload>({});
  const [errors, setErrors] = useState<Record<string, string>>({});

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      const res: any = await fetchRequestGet('/users/getallusers');
      setLoading(false);
      if (Array.isArray(res.data)) {
        setUsers(res.data);
      }
    };
    fetchData();
  }, []);

  const formatDate = (date: Date): string => {
    return new Date(date).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  const getRoleBadgeColor = (role: string): string => {
    switch (role) {
      case "ADMIN":
        return "bg-red-100 text-red-800 dark:bg-red-900/40 dark:text-red-200 ring-1 ring-red-200/60 dark:ring-red-800/50";
      case "TEACHER":
        return "bg-blue-100 text-blue-800 dark:bg-blue-900/40 dark:text-blue-200 ring-1 ring-blue-200/60 dark:ring-blue-800/50";
      case "STUDENT":
        return "bg-green-100 text-green-800 dark:bg-green-900/40 dark:text-green-200 ring-1 ring-green-200/60 dark:ring-green-800/50";
      default:
        return "bg-gray-100 text-gray-800 dark:bg-gray-900/40 dark:text-gray-200 ring-1 ring-gray-200/60 dark:ring-gray-800/50";
    }
  };

  const validateForm = (): boolean => {
    const newErrors: Record<string, string> = {};

    if (!formData.name?.trim()) newErrors.name = "Name is required";

    if (!formData.email?.trim()) {
      newErrors.email = "Email is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = "Invalid email format";
    }

    if (!formData.role) newErrors.role = "Role is required";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleEditUser = (user: User) => {
    setEditingUserId(user.id);
    setFormData({ name: user.name, email: user.email, role: user.role });
    setError(null);
    setSuccess(null);
    setErrors({});
  };

  const handleCancelEdit = () => {
    setEditingUserId(null);
    setFormData({});
    setErrors({});
    setError(null);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev: any) => ({ ...prev, [name]: value }));
    if (errors[name]) setErrors((prev) => ({ ...prev, [name]: "" }));
  };

  const handleSaveUser = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm() || !editingUserId) return;
    setLoading(true);
    setError(null);
    setSuccess(null);
    try {
      const response: any = await fetchRequesPut(`/users/updateuser`, { id: editingUserId, ...formData });
      if (!response.success) throw new Error(`Failed to update user: ${response.statusText}`);
      const updatedUser = response.data;
      setUsers((prevUsers) => prevUsers.map((user) => (user.id === editingUserId ? updatedUser : user)));
      setSuccess(`User "${updatedUser.name}" updated successfully!`);
      setEditingUserId(null);
      setFormData({});
      setErrors({});
      setError(null);
      if (onUserUpdate) onUserUpdate(updatedUser);
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : "An error occurred";
      setError(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteUser = async (userId: string) => {
    if (!window.confirm("Are you sure you want to delete this user?")) return;
    setLoading(true);
    setError(null);
    try {
      const response: any = await fetchRequesDelete('/users/delete-user?id=' + userId);
      if (!response.success) throw new Error(`Failed to delete user: ${response.statusText}`);
      setUsers((prevUsers) => prevUsers.filter((user) => user.id !== userId));
      setSuccess("User deleted successfully!");
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : "An error occurred";
      setError(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  // --- UI helpers (purely presentational) ---
  const SkeletonCard = () => (
    <div className="rounded-2xl border border-border bg-card/50 p-6 shadow-sm">
      <div className="flex items-start justify-between mb-4">
        <div className="space-y-2 w-2/3">
          <div className="h-5 w-1/2 animate-pulse rounded bg-muted" />
          <div className="h-4 w-2/3 animate-pulse rounded bg-muted" />
        </div>
        <div className="h-6 w-20 animate-pulse rounded-full bg-muted" />
      </div>
      <div className="mt-4 space-y-2">
        <div className="h-4 w-full animate-pulse rounded bg-muted" />
        <div className="h-4 w-5/6 animate-pulse rounded bg-muted" />
      </div>
      <div className="mt-6 grid grid-cols-2 gap-3">
        <div className="h-9 animate-pulse rounded bg-muted" />
        <div className="h-9 animate-pulse rounded bg-muted" />
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-background/60 p-6">
      <div className="mx-auto max-w-7xl">
        {/* Header / Toolbar */}
        <div className="mb-8 flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <h1 className="text-3xl sm:text-4xl font-bold tracking-tight text-foreground">User Master</h1>
            <p className="mt-2 text-muted-foreground">Manage users, edit details, and change roles</p>
          </div>
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <span className="rounded-full bg-muted px-3 py-1">Total: {users.length}</span>
            {loading && (
              <span className="inline-flex items-center gap-1 rounded-full bg-muted px-3 py-1">
                <Loader2 className="h-3.5 w-3.5 animate-spin" /> Loading
              </span>
            )}
          </div>
        </div>

        {/* Alerts */}
        {error && (
          <div className="mb-6 rounded-xl border border-destructive/40 bg-destructive/10 p-4 backdrop-blur">
            <p className="text-sm font-medium text-destructive">{error}</p>
          </div>
        )}
        {success && (
          <div className="mb-6 rounded-xl border border-emerald-500/40 bg-emerald-50 p-4 dark:bg-emerald-950/40">
            <p className="text-sm font-medium text-emerald-700 dark:text-emerald-300">{success}</p>
          </div>
        )}

        {/* Users Grid */}
        {users.length === 0 ? (
          loading ? (
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {Array.from({ length: 6 }).map((_, i) => (
                <SkeletonCard key={i} />
              ))}
            </div>
          ) : (
            <div className="rounded-2xl border border-border bg-card/60 p-12 text-center shadow-sm">
              <p className="text-muted-foreground">No users found</p>
            </div>
          )
        ) : (
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {users.map((user) => (
              <div key={user.id} className="group">
                {editingUserId === user.id ? (
                  <form onSubmit={handleSaveUser} className="rounded-2xl border border-border bg-card/70 p-6 shadow-sm ring-1 ring-transparent transition-transform duration-200 group-hover:shadow-md">
                    <div className="mb-4 flex items-center justify-between">
                      <h3 className="text-lg font-semibold text-card-foreground">Edit User</h3>
                      <button
                        type="button"
                        onClick={handleCancelEdit}
                        disabled={loading}
                        className="inline-flex items-center gap-1 rounded-md border border-border bg-secondary px-2.5 py-1.5 text-xs font-medium text-secondary-foreground hover:bg-secondary/80 disabled:cursor-not-allowed disabled:opacity-50"
                        aria-label="Cancel edit"
                      >
                        <X className="h-4 w-4" /> Cancel
                      </button>
                    </div>

                    {/* Name Field */}
                    <div className="mb-4">
                      <label htmlFor="name" className="block text-sm font-medium text-foreground">Name</label>
                      <input
                        type="text"
                        id="name"
                        name="name"
                        value={formData.name || ""}
                        onChange={handleInputChange}
                        disabled={loading}
                        className="mt-2 w-full rounded-lg border border-input bg-background/80 px-3 py-2 text-sm text-foreground placeholder-muted-foreground shadow-sm outline-none ring-1 ring-transparent transition focus:border-ring focus:ring-ring/50 disabled:cursor-not-allowed disabled:opacity-50"
                        placeholder="Enter user name"
                      />
                      {errors.name && <p className="mt-1 text-xs text-destructive">{errors.name}</p>}
                    </div>

                    {/* Email Field */}
                    <div className="mb-4">
                      <label htmlFor="email" className="block text-sm font-medium text-foreground">Email</label>
                      <input
                        type="email"
                        id="email"
                        name="email"
                        value={formData.email || ""}
                        onChange={handleInputChange}
                        disabled={loading}
                        className="mt-2 w-full rounded-lg border border-input bg-background/80 px-3 py-2 text-sm text-foreground placeholder-muted-foreground shadow-sm outline-none ring-1 ring-transparent transition focus:border-ring focus:ring-ring/50 disabled:cursor-not-allowed disabled:opacity-50"
                        placeholder="Enter email address"
                      />
                      {errors.email && <p className="mt-1 text-xs text-destructive">{errors.email}</p>}
                    </div>

                    {/* Role Field */}
                    <div className="mb-6">
                      <label htmlFor="role" className="block text-sm font-medium text-foreground">Role</label>
                      <select
                        id="role"
                        name="role"
                        value={formData.role || ""}
                        onChange={handleInputChange}
                        disabled={loading}
                        className="mt-2 w-full rounded-lg border border-input bg-background/80 px-3 py-2 text-sm text-foreground shadow-sm outline-none ring-1 ring-transparent transition focus:border-ring focus:ring-ring/50 disabled:cursor-not-allowed disabled:opacity-50"
                      >
                        <option value="">Select a role</option>
                        <option value="STUDENT">Student</option>
                        <option value="STAFF">Staff</option>
                        <option value="ADMIN">Admin</option>
                      </select>
                      {errors.role && <p className="mt-1 text-xs text-destructive">{errors.role}</p>}
                    </div>

                    {/* Action Buttons */}
                    <div className="flex gap-3">
                      <button
                        type="submit"
                        disabled={loading}
                        className="flex-1 inline-flex items-center justify-center gap-2 rounded-lg bg-primary px-4 py-2 text-sm font-semibold text-primary-foreground shadow-sm transition hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring/60 disabled:cursor-not-allowed disabled:opacity-50"
                      >
                        {loading ? <Loader2 className="h-4 w-4 animate-spin" /> : <Save className="h-4 w-4" />} 
                        {loading ? "Saving..." : "Save Changes"}
                      </button>
                      <button
                        type="button"
                        onClick={handleCancelEdit}
                        disabled={loading}
                        className="flex-1 inline-flex items-center justify-center gap-2 rounded-lg border border-border bg-secondary px-4 py-2 text-sm font-semibold text-secondary-foreground transition hover:bg-secondary/80 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring/60 disabled:cursor-not-allowed disabled:opacity-50"
                      >
                        <X className="h-4 w-4" /> Cancel
                      </button>
                    </div>
                  </form>
                ) : (
                  <div className="rounded-2xl border border-border bg-card/70 p-6 shadow-sm transition duration-200 hover:shadow-md focus-within:shadow-md">
                    {/* User Header */}
                    <div className="mb-4 flex items-start justify-between gap-3">
                      <div className="min-w-0">
                        <h3 className="truncate text-lg font-semibold text-card-foreground">{user.name}</h3>
                        <p className="mt-1 truncate text-sm text-muted-foreground">{user.email}</p>
                      </div>
                      <span className={`inline-block shrink-0 rounded-full px-3 py-1 text-xs font-semibold ${getRoleBadgeColor(user.role)}`}>
                        {user.role}
                      </span>
                    </div>

                    {/* User Details */}
                    <div className="mb-6 space-y-2 rounded-xl border border-border/60 bg-background/40 p-4">
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-muted-foreground">User ID</span>
                        <span className="font-mono text-xs text-card-foreground">{user.id.slice(0, 8)}...</span>
                      </div>
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-muted-foreground">Created</span>
                        <span className="text-card-foreground">{formatDate(user.createdAt)}</span>
                      </div>
                    </div>

                    {/* Action Buttons */}
                    <div className="flex gap-3">
                      <button
                        onClick={() => handleEditUser(user)}
                        disabled={loading}
                        className="flex-1 inline-flex items-center justify-center gap-2 rounded-lg bg-primary px-4 py-2 text-sm font-semibold text-primary-foreground shadow-sm transition hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring/60 disabled:cursor-not-allowed disabled:opacity-50"
                        aria-label={`Edit ${user.name}`}
                      >
                        <Pencil className="h-4 w-4" /> Edit
                      </button>
                      <button
                        onClick={() => handleDeleteUser(user.id)}
                        disabled={loading}
                        className="flex-1 inline-flex items-center justify-center gap-2 rounded-lg border border-destructive/60 bg-destructive/10 px-4 py-2 text-sm font-semibold text-destructive transition hover:bg-destructive/20 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-destructive/60 disabled:cursor-not-allowed disabled:opacity-50"
                        aria-label={`Delete ${user.name}`}
                      >
                        <Trash2 className="h-4 w-4" /> Delete
                      </button>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
