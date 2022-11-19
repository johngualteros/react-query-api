import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { getProducts, removeProduct, changeStock } from "../api/productsAPI";
const Products = () => {

  const queryClient = useQueryClient();

  const { isLoading, data: products, isError, error } = useQuery({
    queryKey: ["products"],
    queryFn: () => getProducts(),
    select: products => products.sort((a, b) => b.id - a.id),
  });

  const deleteProductMutation = useMutation({
    mutationFn: removeProduct,
    onSuccess: () => {
      console.log("Product deleted successfully");
      queryClient.invalidateQueries("products");
    }
  });

  const updateProductMutation = useMutation({
    mutationFn: changeStock,
    onSuccess: () => {
      console.log("Product updated successfully");
      queryClient.invalidateQueries("products");
    }
  })

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (isError) {
    return <div>Error: {error.message}</div>;
  }

  return (
    <div>
      {products.map((product) => (
        <>
          <div key={product.id}>
            <h3>{product.name}</h3>
            <p>{product.description}</p>
            <p>{product.price}</p>
            <button onClick={() => deleteProductMutation.mutate(product.id)}>Delete</button>
            <input type="checkbox" id={product.id} checked={product.inStock} onChange={e => updateProductMutation.mutate({
              ...product,
              inStock: e.target.checked
            })}/>
            <label htmlFor={product.id}>{product.inStock ? ' in stock' : 'not in stock'}</label>
          </div>
          <hr />
        </>
      ))}
    </div>
  );
};

export default Products;
