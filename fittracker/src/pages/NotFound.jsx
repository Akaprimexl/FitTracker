import { Link } from "react-router";
import { ArrowLeft, SearchX } from "lucide-react";

export default function NotFound() {
  return (
    <main className="page not-found">
      <div className="container">
        <div className="not-found-card">
          <div className="not-found-icon">
            <SearchX size={42} />
          </div>

          <span>404</span>

          <h1>Səhifə tapılmadı</h1>

          <p>
            Axtardığın səhifə mövcud deyil və ya ünvan
            dəyişdirilib.
          </p>

          <Link to="/" className="primary-button">
            <ArrowLeft size={18} />
            Ana səhifəyə qayıt
          </Link>
        </div>
      </div>
    </main>
  );
}
