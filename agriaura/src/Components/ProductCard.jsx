const ProductCard = ({ product }) => {
    return (
        <>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredProducts.map((product) => (
                    <div
                        key={product.id}
                        className="bg-white border rounded-lg shadow-md overflow-hidden transition-transform transform hover:scale-105"
                    >
                        <img src={product.image} alt={product.name} className="w-full h-40 object-cover" />
                        <div className="p-4 text-center">
                            <h2 className="text-lg font-bold">{product.name}</h2>
                            <p className="text-gray-600">Per Kg</p>
                            <p className="text-xl font-bold text-orange-500">${product.price}</p>
                            <button className="mt-4 px-6 py-2 bg-orange-500 text-white rounded-full hover:bg-orange-600">
                                Add to Cart
                            </button>
                        </div>
                    </div>
                ))}
            </div>
        </>
    )
}