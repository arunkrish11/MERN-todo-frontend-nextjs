import Link from "next/link";

export default function Home() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-100 via-purple-100 to-pink-100">
      <div className="text-center bg-white shadow-xl p-10 rounded-2xl max-w-lg mx-auto">
        <h1 className="text-4xl font-bold text-gray-800 mb-4">
          Welcome to Your To-Do App! 🎯
        </h1>
        <p className="text-lg text-gray-600 mb-6">
          Stay productive and organized. Add, complete, and manage your tasks
          effortlessly.
        </p>
        <Link href="/login">
          <button className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-6 rounded-xl transition">
            Get Started
          </button>
        </Link>
      </div>
    </div>
  );
}
