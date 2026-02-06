import { useNavigate, useParams } from "react-router"
import { useEffect, useRef } from "react"
import { createData, updateData, getDataById } from "../store/redux/contactReducer"
import { useSelector, useDispatch } from "react-redux"

const Entry = ({ isUpdate }) => {
  const { id } = useParams()
  const formRef = useRef(null)
  const navigate = useNavigate()
  const dispatch = useDispatch()

  const { contactDetail, isLoading, isError } = useSelector(
    (state) => state.contact
  )

  useEffect(() => {
    if (isUpdate && id) {
      dispatch(getDataById(id))
    }
  }, [id, isUpdate, dispatch])

  useEffect(() => {
    if (isUpdate) {
      if (!contactDetail || !formRef.current) return

      formRef.current.fullname.value = contactDetail.fullname || ""
      formRef.current.email.value = contactDetail.email || ""
      formRef.current.phone.value = contactDetail.phone || ""
      formRef.current.company.value = contactDetail.company || ""
      formRef.current.job_title.value = contactDetail.job_title || ""
      formRef.current.notes.value = contactDetail.notes || ""
    } else {
      if (formRef.current) formRef.current.reset()
    }
  }, [contactDetail, isUpdate])

  return (
    <div className="min-h-screen bg-slate-50 p-6">

      <div className="max-w-3xl mx-auto">

        <div className="bg-white rounded-xl shadow-sm p-6">

          <div className="mb-6">
            <h2 className="text-2xl font-semibold text-slate-800">
              {isUpdate ? "Update Contact" : "New Contact"}
            </h2>
            <p className="text-sm text-slate-500">
              {isUpdate
                ? "Update contact information"
                : "Add a new contact to your list"}
            </p>
          </div>

          {isLoading && (
            <p className="text-slate-600">Loading...</p>
          )}

          {isError && (
            <p className="text-red-600">Failed to load contact.</p>
          )}

          {!isLoading && !isError && (
            <form
              ref={formRef}
              onSubmit={(e) => {
                e.preventDefault()

                const payload = {
                  fullname: e.target.fullname.value,
                  email: e.target.email.value,
                  phone: e.target.phone.value,
                  company: e.target.company.value,
                  job_title: e.target.job_title.value,
                  notes: e.target.notes.value
                }

                if (isUpdate) {
                  dispatch(updateData({ id, payload }))
                } else {
                  dispatch(createData(payload))
                }

                navigate("/home")
              }}
            >
              <div className="space-y-4">

                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">
                    Full name
                  </label>
                  <input
                    name="fullname"
                    type="text"
                    required
                    className="w-full border border-slate-300 rounded-lg px-3 py-2
                      focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="John Doe"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">
                    Email
                  </label>
                  <input
                    name="email"
                    type="email"
                    className="w-full border border-slate-300 rounded-lg px-3 py-2
                      focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="john@email.com"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">
                    Phone
                  </label>
                  <input
                    name="phone"
                    type="text"
                    className="w-full border border-slate-300 rounded-lg px-3 py-2
                      focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="0812xxxxxxx"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">
                    Company
                  </label>
                  <input
                    name="company"
                    type="text"
                    className="w-full border border-slate-300 rounded-lg px-3 py-2
                      focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Company name"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">
                    Job title
                  </label>
                  <input
                    name="job_title"
                    type="text"
                    className="w-full border border-slate-300 rounded-lg px-3 py-2
                      focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Software Engineer"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">
                    Notes
                  </label>
                  <textarea
                    name="notes"
                    rows="4"
                    className="w-full border border-slate-300 rounded-lg px-3 py-2
                      focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Additional notes..."
                  />
                </div>

                <div className="flex gap-3 pt-2">

                  <button
                    type="button"
                    onClick={() => navigate("/home")}
                    className="flex-1 px-4 py-2 rounded-lg border border-slate-300
                      text-slate-700 hover:bg-slate-100 transition"
                  >
                    Cancel
                  </button>

                  <button
                    type="submit"
                    className="flex-1 px-4 py-2 rounded-lg bg-blue-600 text-white
                      hover:bg-blue-700 transition"
                  >
                    {isUpdate ? "Update" : "Save"}
                  </button>

                </div>

              </div>
            </form>
          )}

        </div>

      </div>

    </div>
  )
}

export default Entry
