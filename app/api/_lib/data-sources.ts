import { getOrgStats, getRepoStats } from "./github";
import { getNpmStats } from "./npm";

type GithubOptions = {
  token?: string | null;
  revalidateSeconds?: number;
};

type NpmOptions = {
  revalidateSeconds?: number;
};

export class GitHubData {
  static async repo(owner: string, repo: string, options: GithubOptions) {
    return getRepoStats(owner, repo, options);
  }

  static async org(org: string, options: GithubOptions) {
    return getOrgStats(org, options);
  }
}

export class NpmData {
  static async package(name: string, options: NpmOptions) {
    return getNpmStats(name, options);
  }
}
