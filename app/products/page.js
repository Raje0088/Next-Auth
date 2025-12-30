import Link from "next/link";

export const metadata = {
  title: "Products Store - Products List",
};

const products = [
  { id: 1, name: "Wireless Headphones" },
  { id: 2, name: "Smartwatch" },
  { id: 3, name: "Gaming Mouse" },
];

export default function ProductsPage() {
  return (
    <div className="p-10">
      <h1 className="text-2xl font-bold mb-4">Products</h1>
      <ul className="list-disc pl-5">
        {products.map((product) => (
          <li key={product.id} className="mb-2">
            <Link href={`/products/${product.id}`} className="text-blue-500 hover:underline">
              {product.name}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
