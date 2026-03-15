import React, { useEffect, useState } from "react";
import axios from "axios";

const Dashboard = () => {

const [data,setData] = useState(null)

const fetchDashboard = async () => {

const res = await axios.get("/api/dashboard")

if(res.data.success){
setData(res.data.dashboardData)
}

}

useEffect(()=>{
fetchDashboard()
},[])

if(!data) return <p>Loading...</p>

return(

<div className="p-10">

<h1 className="text-2xl font-bold mb-6">Dashboard</h1>

<div className="grid grid-cols-4 gap-6">

<div className="bg-white p-6 shadow rounded">
<h2 className="text-gray-500">Users</h2>
<p className="text-2xl font-bold">{data.users}</p>
</div>

<div className="bg-white p-6 shadow rounded">
<h2 className="text-gray-500">Products</h2>
<p className="text-2xl font-bold">{data.products}</p>
</div>

<div className="bg-white p-6 shadow rounded">
<h2 className="text-gray-500">Orders</h2>
<p className="text-2xl font-bold">{data.orders}</p>
</div>

<div className="bg-white p-6 shadow rounded">
<h2 className="text-gray-500">Revenue</h2>
<p className="text-2xl font-bold">${data.revenue}</p>
</div>

</div>

</div>

)

}

export default Dashboard