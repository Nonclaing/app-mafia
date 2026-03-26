export type SemVer = {
  major: number;
  minor: number;
  patch: number;
};

export function parseSemver(version: string): SemVer | null {
  if (!version) return null;

  const normalized = version.trim().replace(/^v/i, "");
  const parts = normalized.split(".");

  if (parts.length > 3) return null;

  const [major = "0", minor = "0", patch = "0"] = parts;

  const majorNum = Number(major);
  const minorNum = Number(minor ?? "0");
  const patchNum = Number(patch ?? "0");

  if (
    Number.isNaN(majorNum)
    || Number.isNaN(minorNum)
    || Number.isNaN(patchNum)
  ) {
    return null;
  }

  return {
    major: majorNum,
    minor: minorNum,
    patch: patchNum,
  };
}

export function hasNativeUpdate(current: SemVer, remote: SemVer): boolean {
  return remote.major > current.major || remote.minor > current.minor;
}

export function hasPatchUpdate(current: SemVer, remote: SemVer): boolean {
  return (
    remote.major === current.major
    && remote.minor === current.minor
    && remote.patch > current.patch
  );
}
