import { useMutation, useQueryClient } from "@tanstack/react-query";
import { addProduct } from "../api/productsAPI";

const ProductForm = () => {
  const queryClient = useQueryClient();

  const addProductMutation = useMutation({
    mutationFn: addProduct,
    onSuccess: () => {
      console.log("Product added successfully");
      queryClient.invalidateQueries("products");
    },
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const product = Object.fromEntries(formData);
    addProductMutation.mutate({
      ...product,
      inStock: true,
    });
  };

  return (
    <div>
      <h3>Add a new product</h3>
      <form onSubmit={handleSubmit}>
        <label htmlFor="name">Name</label>
        <input type="text" id="name" name="name" />
        <br />
        <label htmlFor="description">Description</label>
        <input type="text" id="description" name="description" />
        <br />
        <label htmlFor="price">Price</label>
        <input type="text" id="price" name="price" />
        <br />
        <button>Add Product</button>
      </form>
    </div>
  );
};

export default ProductForm;
