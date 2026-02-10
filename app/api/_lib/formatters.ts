export class DataFormatter {
  static number(value: number | null | undefined) {
    return (value ?? 0).toLocaleString();
  }

  static text(value: string | null | undefined, fallback = "-") {
    return value && value.trim().length > 0 ? value : fallback;
  }

  static splitRepo(fullName: string, owner: string, repo: string) {
    const [orgName, repoName] = fullName.split("/");
    return {
      org: orgName ?? owner,
      repo: repoName ?? repo,
    };
  }

  static orgSubtitle(org: string) {
    return `github/${org}`;
  }
}
