import Link from "next/link";

export default function NotFound() {
  return (
    <div className="mx-auto max-w-xl px-4 py-20 text-center">
      <h1 className="text-3xl">Cette page n'existe pas</h1>
      <p className="mt-3 text-ink-soft">L'adresse est peut-être incomplète. Le programme complet est accessible depuis l'accueil.</p>
      <Link href="/" className="btn btn-primary mt-6">
        Revenir à l'accueil
      </Link>
    </div>
  );
}
