export default function ForbiddenPage() {
  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <h1 className="text-3xl font-bold text-red-500">🚫 Access Denied</h1>
      <p className="text-gray-600 mt-2">You don’t have permission to view this page.</p>
    </div>
  );
}
