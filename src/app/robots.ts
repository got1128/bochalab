import type { MetadataRoute } from "next";
import { site } from "@/lib/site";

// robots.txt：build 時自動產生
export const dynamic = "force-static";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: { userAgent: "*", allow: "/" },
    sitemap: `${site.url}/sitemap.xml`,
    host: site.url,
  };
}
