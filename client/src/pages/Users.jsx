import React, { useEffect, useState, useContext } from "react";
import { ShopContext } from "../context/ShopContext";
import { BiTrash, BiBlock } from "react-icons/bi";
import toast from "react-hot-toast";

const Users = () => {

const { axios } = useContext(ShopContext);

const [users, setUsers] = useState([]);

const fetchUsers = async () => {

try {

const { data } = await axios.get("/api/admin/users");

if (data.success) {

setUsers(data.users);

}

} catch (error) {

toast.error("Error loading users");

}

};

useEffect(() => {

fetchUsers();

}, []);

const deleteUser = async (id) => {

if (!window.confirm("Delete this user?")) return;

const { data } = await axios.delete(`/api/admin/user/${id}`);

if (data.success) {

toast.success("User deleted");

fetchUsers();

}

};

const blockUser = async (id) => {

const { data } = await axios.post(`/api/admin/block/${id}`);

if (data.success) {

toast.success(data.message);

fetchUsers();

}

};

return (

<div className="bg-white p-8 rounded-xl">

<h2 className="text-2xl font-bold mb-6">Users</h2>

<table className="w-full">

<thead>

<tr className="border-b">

<th className="py-3">Name</th>

<th>Email</th>

<th>Cart Items</th>

<th>Block</th>

<th></th>

</tr>

</thead>

<tbody>

{users.map((user) => (

<tr key={user._id} className="border-b">

<td className="py-3">{user.name}</td>

<td>{user.email}</td>

<td>{Object.keys(user.cartData || {}).length}</td>

<td>

<button
onClick={() => blockUser(user._id)}
className="text-yellow-600"
>

<BiBlock size={18}/>

</button>

</td>

<td>

<button
onClick={() => deleteUser(user._id)}
className="text-red-500"
>

<BiTrash size={18}/>

</button>

</td>

</tr>

))}

</tbody>

</table>

</div>

);

};

export default Users;