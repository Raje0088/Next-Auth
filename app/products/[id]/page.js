
const products = [
  { id: 1, name: "Wireless Headphones", description: "High quality wireless headphones." },
  { id: 2, name: "Smartwatch", description: "Smartwatch with health tracking." },
  { id: 3, name: "Gaming Mouse", description: "Precision gaming mouse." },
];

export async function generateMetadata({ params }) {
  const { id } = await params;
  const product = products.find((p) => p.id === parseInt(id));
  
  if (!product) {
      return {
          title: "Product Not Found - Products Store"
      }
  }

  return {
    title: `${product.name} - Products Store`,
  };
}

export default async function ProductDetailPage({ params }) {
  const { id } = await params;
  const product = products.find((p) => p.id === parseInt(id));

  if (!product) {
    return <div>Product not found</div>;
  }

  return (
    <div className="p-10">
      <h1 className="text-3xl font-bold mb-4">{product.name}</h1>
      <p className="text-lg">{product.description}</p>
    </div>
  );
}
