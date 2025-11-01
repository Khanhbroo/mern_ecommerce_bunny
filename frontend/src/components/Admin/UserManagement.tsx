import { useState, type ChangeEvent } from "react";

import type { UserManagement } from "../../type/admin";

const users = [
  {
    _id: 1,
    name: "Khanhbroo",
    email: "khanhdq1120@gmail.com",
    role: "admin",
  },
];

const UserManagement = () => {
  const [formData, setFormData] = useState<UserManagement>({
    name: "",
    email: "",
    password: "",
    role: "customer", // Default role
  });

  const handleChange = (
    event: ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    setFormData({
      ...formData,
      [event.target.name]: event.target.value,
    });
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    console.log(formData);

    // Reset the form after submission
    setFormData({ name: "", email: "", password: "", role: "customer" });
  };

  const handleRoleChange = (userId: number, newRole: string) => {
    console.log({ id: userId, role: newRole });
  };

  const handleDeleteUser = (userId: number) => {
    if (window.confirm("Are you sure you want to delete this user?")) {
      console.log("Deleted user with ID:", userId);
    }
  };

  return (
    <div className="max-w-7xl mx-auto p-6">
      <h2 className="text-2xl font-bold mb-6">User Managament</h2>

      {/* Add New User Form */}
      <div className="p-6 rounded-sm mb-6">
        <h3 className="text-lg font-bold mb-4">Add New User</h3>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="name" className="block text-gray-700">
              Name
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              className="w-full p-2 border border-gray-300 rounded-sm"
              onChange={handleChange}
            />
          </div>

          <div className="mb-4">
            <label htmlFor="email" className="block text-gray-700">
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              className="w-full p-2 border border-gray-300 rounded-sm"
              onChange={handleChange}
            />
          </div>

          <div className="mb-4">
            <label htmlFor="password" className="block text-gray-700">
              Password
            </label>
            <input
              type="password"
              id="password"
              name="password"
              value={formData.password}
              className="w-full p-2 border border-gray-300 rounded-sm"
              onChange={handleChange}
            />
          </div>

          <div className="mb-4">
            <label htmlFor="password" className="block text-gray-700">
              Role
            </label>
            <select
              name="role"
              id="role"
              value={formData.role}
              className="w-full p-2 border border-gray-300 rounded-sm"
              onChange={handleChange}
            >
              <option value="admin">Admin</option>
              <option value="customer">Customer</option>
            </select>
          </div>

          <button
            type="submit"
            className="bg-green-500 text-white/95 py-2 px-4 rounded-sm hover:bg-green-600"
          >
            Add User
          </button>
        </form>
      </div>

      {/* User List Management */}
      <div className="overflow-x-auto shadow-md sm:rounded-lg">
        <table className="min-w-full text-left text-gray-500">
          <thead className="bg-gray-100 text-xs uppercase text-gray-700">
            <tr>
              <th className="py-3 px-4">Name</th>
              <th className="py-3 px-4">Email</th>
              <th className="py-3 px-4">Role</th>
              <th className="py-3 px-4">Action</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr
                key={user._id}
                className="border-b border-gray-300 hover:bg-gray-50 last:border-b-0 transition"
              >
                <td className="p-4 font-medium text-gray-900 whitespace-nowrap">
                  {user.name}
                </td>
                <td className="p-4">{user.email}</td>
                <td className="p-4">
                  <select
                    value={user.role}
                    className="p-2 border border-gray-300 rounded-sm"
                    onChange={(event) =>
                      handleRoleChange(user._id, event.target.value)
                    }
                  >
                    <option value="customer">Customer</option>
                    <option value="admin">Admin</option>
                  </select>
                </td>
                <td className="p-4">
                  <button
                    className="bg-bunny-red/90 text-white px-4 py-2 rounded-sm hover:bg-bunny-red transition"
                    onClick={() => handleDeleteUser(user._id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default UserManagement;
