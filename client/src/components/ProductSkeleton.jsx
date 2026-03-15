import React from "react"

const ProductSkeleton = () => {

return (

<div className="animate-pulse bg-white rounded-xl p-4">

<div className="bg-gray-200 h-44 w-full rounded-lg"></div>

<div className="mt-3 space-y-2">

<div className="h-4 bg-gray-200 rounded w-3/4"></div>

<div className="h-3 bg-gray-200 rounded w-1/2"></div>

<div className="h-4 bg-gray-200 rounded w-1/4"></div>

</div>

</div>

)

}

export default ProductSkeleton