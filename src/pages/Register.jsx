import { useNavigate } from "react-router"
import { useRef } from "react";
import { useRegister } from "../hooks/useRegister";

const Register = () => {
  const navigate = useNavigate()
  const formRef = useRef();
  const { registerUser, loading, message } = useRegister();

  return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center p-4">

      <div className="w-full max-w-md bg-white rounded-xl shadow-sm p-6">

        <h2 className="text-2xl font-semibold text-slate-800 mb-1">
          Create account
        </h2>
        <p className="text-sm text-slate-500 mb-6">
          Register to start managing your contacts
        </p>

        <form
          ref={formRef}
          onSubmit={(e) => {
            e.preventDefault()
            registerUser({
              fullName: e.target.fullName.value.trim(),
              email: e.target.email.value.trim(),
              gender: e.target.gender.value.trim(),
              country: e.target.country.value.trim(),
              phone: e.target.phone.value.trim(),
              password: e.target.password.value.trim()
            })
          }}
        >

          <div className="space-y-4">

            {/* Full name */}
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">
                Full name
              </label>
              <input
                name="fullName"
                type="text"
                required
                className="w-full border border-slate-300 rounded-lg px-3 py-2
                  focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="John Doe"
              />
            </div>

            {/* Email */}
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">
                Email
              </label>
              <input
                name="email"
                type="email"
                required
                className="w-full border border-slate-300 rounded-lg px-3 py-2
                  focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="you@example.com"
              />
            </div>

            {/* Gender */}
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">
                Gender
              </label>
              <select
                name="gender"
                id="gender"
                required
                className="w-full border border-slate-300 rounded-lg px-3 py-2 bg-white
                  focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="Pria">Pria</option>
                <option value="Wanita">Wanita</option>
              </select>
            </div>

            {/* Phone */}
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">
                Phone
              </label>

              <div className="flex gap-2">
                <select
                  name="country"
                  id="country"
                  className="w-28 border border-slate-300 rounded-lg px-2 py-2 bg-white
                    focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="+62">+62</option>
                </select>

                <input
                  type="number"
                  name="phone"
                  id="phone"
                  required
                  className="flex-1 border border-slate-300 rounded-lg px-3 py-2
                    focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="812xxxxxxx"
                />
              </div>
            </div>

            {/* Password */}
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
              />
            </div>

            {/* Re-type password */}
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">
                Re-type password
              </label>
              <input
                name="verification"
                type="password"
                required
                className="w-full border border-slate-300 rounded-lg px-3 py-2
                  focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <button
              disabled={loading}
              type="submit"
              className="w-full mt-2 px-4 py-2 rounded-lg bg-blue-600 text-white
                hover:bg-blue-700 transition disabled:opacity-60 disabled:cursor-not-allowed"
            >
              {loading ? "Registering..." : "Register"}
            </button>

          </div>
        </form>

        {/* Login link */}
        <div className="mt-5 text-center">
          <button
            type="button"
            onClick={() => navigate("/login")}
            className="text-sm text-blue-600 hover:text-blue-700 font-medium"
          >
            Already have an account? Login
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

export default Register
