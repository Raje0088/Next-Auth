import { cookies } from "next/headers";
import Link from "next/link";

export default function RootLayout({ children }) {
  const token = cookies().get("token");

  return (
    <html>
      <body>
        <header style={{ padding: 20, borderBottom: "1px solid #ccc" }}>
          <Link href="/">Home</Link> |{" "}
          <Link href="/products">Products</Link>

          <span style={{ float: "right" }}>
            {!token && <Link href="/login">Login</Link>}

            {token && (
              <form action="/logout" method="POST" style={{ display: "inline" }}>
                <button type="submit">Logout</button>
              </form>
            )}
          </span>
        </header>

        {children}
      </body>
    </html>
  );
}
