import { useNavigate } from "react-router"
import { useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getData, deleteData } from "../store/redux/contactReducer";

const Home = () => {

  const navigate = useNavigate()
  const dispatch = useDispatch();

  const { value: contact, isError, isLoading } = useSelector(
    (state) => state.contact
  );

  const [search, setSearch] = useState("");
  const [sort, setSort] = useState("asc"); // asc | desc

  useEffect(() => {
    dispatch(getData())
  }, [dispatch])

  const handleLogout = () => {
  localStorage.removeItem("token");
  navigate("/login");
};

  const filteredContacts = useMemo(() => {
    if (!contact) return [];

    let result = contact.filter((item) => {
      const keyword = search.toLowerCase();

      return (
        item.fullname?.toLowerCase().includes(keyword) ||
        item.email?.toLowerCase().includes(keyword) ||
        item.phone?.toLowerCase().includes(keyword)
      );
    });

    result.sort((a, b) => {
      const nameA = a.fullname?.toLowerCase() || "";
      const nameB = b.fullname?.toLowerCase() || "";

      if (sort === "asc") return nameA.localeCompare(nameB);
      return nameB.localeCompare(nameA);
    });

    return result;
  }, [contact, search, sort]);

  return (
    <div className="min-h-screen bg-slate-50 p-6">

      <div className="max-w-5xl mx-auto">

        {/* Header */}
        {/* <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
          <h2 className="text-2xl font-semibold text-slate-800">
            Contact Manager
          </h2>

          <button
            onClick={() => navigate("entry")}
            className="px-4 py-2 rounded-lg bg-blue-600 text-white hover:bg-blue-700 transition"
          >
            + New Contact
          </button>
        </div> */}


        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
        <h2 className="text-2xl font-semibold text-slate-800">
            Contact Manager
        </h2>

        <div className="flex gap-2">
            <button
            onClick={() => navigate("entry")}
            className="px-4 py-2 rounded-lg bg-blue-600 text-white hover:bg-blue-700 transition"
            >
            + New Contact
            </button>

            <button
            onClick={handleLogout}
            className="px-4 py-2 rounded-lg border border-slate-300 text-slate-700 hover:bg-slate-100 transition"
            >
            Logout
            </button>
        </div>
        </div>


        {/* Search & Sort */}
        <div className="bg-white rounded-xl shadow-sm p-4 mb-6 flex flex-col sm:flex-row gap-4">

          <input
            type="text"
            placeholder="Search by name, email, or phone..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full sm:flex-1 border border-slate-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />

          <select
            value={sort}
            onChange={(e) => setSort(e.target.value)}
            className="border border-slate-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="asc">Sort by name (A - Z)</option>
            <option value="desc">Sort by name (Z - A)</option>
          </select>

        </div>

        {/* State */}
        {isLoading && (
          <p className="text-slate-600">Loading...</p>
        )}

        {isError && (
          <p className="text-red-600">Failed to load contacts.</p>
        )}

        {!isLoading && !isError && (
          <>
            {filteredContacts.length === 0 ? (
              <div className="text-center text-slate-500 py-10">
                Tidak ada contact ditemukan.
              </div>
            ) : (

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {filteredContacts.map((item) => (
                  <div
                    key={item.contact_id}
                    className="bg-white rounded-xl shadow-sm p-5 flex flex-col justify-between"
                  >
                    <div className="space-y-1">
                      <h3 className="text-lg font-semibold text-slate-800">
                        {item.fullname}
                      </h3>

                      <p className="text-sm text-slate-600">
                        {item.job_title} 
                      </p>

                      <div className="pt-2 text-sm text-slate-700 space-y-1">
                        <p><span className="font-medium">Email:</span> {item.email}</p>
                        <p><span className="font-medium">Phone:</span> {item.phone}</p>
                        <p><span className="font-medium">Company:</span> {item.company}</p>
                        {item.notes && (
                          <p className="pt-1 text-slate-500 line-clamp-2">
                            <span className="font-medium">Notes:</span> {item.notes}
                          </p>
                        )}
                      </div>
                    </div>

                    <div className="flex gap-2 pt-4">
                      <button
                        onClick={() => navigate(`update/${item.contact_id}`)}
                        className="flex-1 px-3 py-2 rounded-lg border border-slate-300 text-slate-700 hover:bg-slate-100 transition"
                      >
                        Edit
                      </button>

                      <button
                        onClick={() => dispatch(deleteData(item.contact_id))}
                        className="flex-1 px-3 py-2 rounded-lg bg-red-600 text-white hover:bg-red-700 transition"
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                ))}
              </div>

            )}
          </>
        )}

      </div>
    </div>
  )
}

export default Home
