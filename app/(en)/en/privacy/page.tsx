import PrivacyPage from "@/components/PrivacyPage";
import { pageMetadata } from "@/lib/meta";

export const metadata = pageMetadata("en", "privacy");

export default function Page() {
  return <PrivacyPage lang="en" />;
}
