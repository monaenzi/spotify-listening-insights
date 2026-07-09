"use client";

import { signIn, signOut, useSession } from "next-auth/react";

export function AuthButton() {
  const { data: session, status } = useSession();

  if (status === "loading") return null;

  if (session) {
    return (
      <div className="flex items-center gap-4 font-sans text-sm text-muted">
        <span>
          Signed in as <span className="text-foreground">{session.user?.name}</span>
        </span>
        <button
          onClick={() => signOut()}
          className="border border-muted px-3 py-1 uppercase tracking-wide text-xs hover:border-accent hover:text-accent transition-colors"
        >
          Sign out
        </button>
      </div>
    );
  }

  return (
    <button
      onClick={() => signIn("spotify")}
      className="bg-accent text-foreground font-display uppercase tracking-wide px-6 py-3 text-sm hover:brightness-110 transition-all"
    >
      Sign in with Spotify
    </button>
  );
}