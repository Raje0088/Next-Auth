
export async function generateMetadata({ params }) {
  const { id } = await params;
  return {
    title: `Post ${id} - My Blog`,
  };
}

export default async function PostPage({ params }) {
  const { id } = await params;
  return (
    <div className="p-10">
      <h1 className="text-3xl font-bold">Post {id}</h1>
      <p>This is the content of post {id}.</p>
    </div>
  );
}
