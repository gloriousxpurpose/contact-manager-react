import { useNavigate } from "react-router"
import { useRef } from "react";
import { useLogin } from "../hooks/useLogin";

const Login = () => {
  const navigate = useNavigate()
  const formRef = useRef();
  const { loginUser, loading, message } = useLogin();

  return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center p-4">

      <div className="w-full max-w-md bg-white rounded-xl shadow-sm p-6">

        <h2 className="text-2xl font-semibold text-slate-800 mb-1">
          Welcome back
        </h2>
        <p className="text-sm text-slate-500 mb-6">
          Login to your contact manager
        </p>

        <form
          ref={formRef}
          onSubmit={(e) => {
            e.preventDefault()
            loginUser({
              email: e.target.email.value.trim(),
              password: e.target.password.value.trim(),
            })
          }}
        >

          <div className="space-y-4">

            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">
                Email
              </label>
              <input
                name="email"
                type="text"
                required
                className="w-full border border-slate-300 rounded-lg px-3 py-2
                  focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="you@example.com"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">
                Password
              </label>
              <input
                name="password"
                type="password"
                required
                className="w-full border border-slate-300 rounded-lg px-3 py-2
                  focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="••••••••"
              />
            </div>

            <button
              disabled={loading}
              type="submit"
              className="w-full mt-2 px-4 py-2 rounded-lg bg-blue-600 text-white
                hover:bg-blue-700 transition disabled:opacity-60 disabled:cursor-not-allowed"
            >
              {loading ? "Logging in..." : "Login"}
            </button>

          </div>
        </form>

        {/* Register link */}
        <div className="mt-5 text-center">
          <button
            type="button"
            onClick={() => navigate("/register")}
            className="text-sm text-blue-600 hover:text-blue-700 font-medium"
          >
            Create new account
          </button>
        </div>

        {/* Message */}
        {message && (
          <p
            className={`mt-4 text-sm text-center ${
              message.includes("✅")
                ? "text-green-600"
                : "text-red-600"
            }`}
          >
            {message}
          </p>
        )}

      </div>
    </div>
  )
}

export default Login
