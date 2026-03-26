interface GithubAsset {
  name: string;
  browser_download_url: string;
}

interface GithubRelease {
  tag_name: string;
  body: string;
  assets: GithubAsset[];
}

export default async function () {
  const config = useRuntimeConfig();
  const githubToken = config.public.githubToken || "";
  const githubRepo = config.public.githubRepo || "";

  const headers: HeadersInit = {
    Accept: "application/vnd.github+json",
  };

  if (githubToken) headers.Authorization = `Bearer ${githubToken}`;

  return await $fetch<GithubRelease>(
    `https://api.github.com/repos/${githubRepo}/releases/latest`,
    { headers },
  );
}
