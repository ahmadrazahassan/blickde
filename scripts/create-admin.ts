/**
 * Create an editorial account.
 *
 *   npm run admin:create -- redaktion@example.de
 *
 * The password is asked for interactively and is never passed on the command
 * line, because a command line ends up in the shell history.
 *
 * There is no public sign up on this site. Accounts exist only because someone
 * ran this, or created one by hand in the Supabase dashboard.
 */

import { createInterface } from "node:readline/promises";
import { stdin, stdout } from "node:process";
import { createClient } from "@supabase/supabase-js";
import { config } from "dotenv";

config({ path: ".env.local", quiet: true });
config({ path: ".env", quiet: true });

const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
const serviceRole = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!url || !serviceRole) {
  console.error("NEXT_PUBLIC_SUPABASE_URL und SUPABASE_SERVICE_ROLE_KEY muessen gesetzt sein.");
  process.exit(1);
}

const email = process.argv[2];
if (!email || !/^[^@\s]+@[^@\s]+\.[a-zA-Z]{2,}$/.test(email)) {
  console.error("Aufruf: npm run admin:create -- <e-mail-adresse>");
  process.exit(1);
}

async function main() {
  const rl = createInterface({ input: stdin, output: stdout });
  const password = await rl.question(`Passwort fuer ${email} (mindestens 12 Zeichen): `);
  rl.close();

  if (password.length < 12) {
    console.error("Zu kurz. Bitte mindestens 12 Zeichen verwenden.");
    process.exit(1);
  }

  const db = createClient(url as string, serviceRole as string, {
    auth: { persistSession: false, autoRefreshToken: false },
  });

  const { data, error } = await db.auth.admin.createUser({
    email,
    password,
    // Confirmed straight away: the account was created by an operator with
    // database access, so there is nobody left to verify the address to.
    email_confirm: true,
  });

  if (error) {
    console.error(`Konnte den Zugang nicht anlegen: ${error.message}`);
    process.exit(1);
  }

  console.log(`Zugang angelegt: ${data.user?.email}`);
  console.log("");
  console.log("Noch zu tun:");
  console.log("  1. In den Supabase-Einstellungen unter Authentication die Registrierung");
  console.log("     abschalten (Allow new users to sign up = aus).");
  console.log(`  2. ADMIN_EMAILS in .env auf ${email} setzen, damit nur dieser Zugang`);
  console.log("     den Redaktionsbereich oeffnen kann.");
  console.log("  3. Anmelden unter /admin/anmelden");
}

main().catch((error: unknown) => {
  console.error(error instanceof Error ? error.message : error);
  process.exit(1);
});
