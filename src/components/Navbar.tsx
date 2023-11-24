'use client';

import Link from 'next/link';
import { signIn, signOut, useSession } from 'next-auth/react';

function Navbar() {
  /* Como estamos accediendo a informacion dentro de un contexto, tenemos que crear un provider
  osea un componente que englobe todo y ese componente va a tener los datos de la session, hay
  que englobar las paginas dentro de ese componente, y lo hacemos en el layout */
  const { data: session } = useSession();
  /* console.log(session); */

  return (
    <nav className="bg-slate-900 flex items-center py-3 justify-between px-24 text-white">
      <Link href="/">
        <h1>SEG</h1>
      </Link>
      {session?.user ? (
        <div className="flex gap-x-2 items-center">
          <Link href="/dashboard">Panel de Control</Link>
          <p>
            {session.user.name} {session.user.email}
          </p>
          <img
            src={session.user.image}
            alt=""
            className="w-10 h-10 rounded-full cursor-pointer"
          />
          <button
            onClick={async () => {
              await signOut({
                callbackUrl: '/',
              });
            }}
          >
            {' '}
            Cerrar Sesión
          </button>
        </div>
      ) : (
        <button
          onClick={() => signIn()}
          className="bg-sky-400 px-3 py-2 rounded"
        >
          Iniciar Sesión
        </button>
      )}
    </nav>
  );
}

export default Navbar;
