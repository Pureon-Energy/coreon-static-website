import { absUrl } from "@/lib/i18n";
import { CVR, EMAIL, SITE_URL } from "@/lib/site";

export const dynamic = "force-static";

export function GET() {
  const lines = [
    "# Coreon",
    "",
    "> Coreon optimises the energy cost of existing industrial and commercial operations by shifting flexible power consumption to the hours when electricity is cheapest. It uses one smart optimisation device that connects to existing control systems via OPC UA, with no disruption to daily operations.",
    "",
    "Coreon connects to equipment and energy systems a customer already has. It does not reduce how much energy is used. It shifts the timing of that usage to cheaper hours, automatically and in the background, while operations continue exactly as before.",
    "",
    "## Key facts",
    "",
    "- Typical savings: 10-30% on energy costs, with a typical payback of under 6 months.",
    "- Setup: one smart optimisation device connected to existing control systems via OPC UA. What each site needs is set out in a plan before anything changes.",
    "- Onboarding: starts with a short call, followed by a documented plan the customer approves before anything changes.",
    "- Works across multiple sites and across industries.",
    "- Data is used only to power the customer's own optimisation and is never sold or shared with third parties. Data handling is GDPR-compliant.",
    "- Company: Coreon ApS, Nørrebrogade 47, 2., 2200 Copenhagen N, Denmark." + (CVR ? ` CVR ${CVR}.` : ""),
    `- Contact: ${EMAIL}, ${SITE_URL}/`,
    "",
    "## Pages",
    "",
    `- [Forside (Danish)](${absUrl("da")}): overview, how it works, results, process, team, FAQ and contact.`,
    `- [Home (English)](${absUrl("en")}): the same content in English.`,
    `- [Privatlivspolitik](${absUrl("da", "privacy")}) / [Privacy policy](${absUrl("en", "privacy")})`,
  ];
  return new Response(lines.join("\n") + "\n", { headers: { "Content-Type": "text/plain; charset=utf-8" } });
}
