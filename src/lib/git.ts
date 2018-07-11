import {basename} from "path"
import {JSON_BBRANCH_LIST_FORMAT, JSON_LOG_FORMAT} from "./formats"
import {dugite, parseLines, parseJsonStream, parseJson, parseStatus} from "./utils"
import {Branch, Commit, GitRepo, Diff, FileStatus} from "../model/git"

export async function getRepo(dir = "."): Promise<GitRepo> {
  const head = await getHead(dir)
  const repo = {
    dir,
    head,
    branch: await getBranch(dir, head),
    branches: await listBranches(dir),
    commits: await listCommits(dir),
    stage: await getDiff(dir, "--staged"),
    workingTree: await getDiff(dir),
    status: await getStatus(dir)
  }
  return repo
}

export async function updateRepo(repo: GitRepo) {
  repo.head = await getHead(repo.dir)
  repo.branch = await getBranch(repo.dir, repo.head)
  repo.branches = await listBranches(repo.dir)
  repo.commits = await listCommits(repo.dir)
  repo.stage = await getDiff(repo.dir, "--staged")
  repo.workingTree = await getDiff(repo.dir)
  repo.status = await getStatus(repo.dir)
}

export async function getStatus(dir = "."): Promise<FileStatus[]> {
  const {stdout} = await dugite(["status", "--porcelain"], dir)
  return parseLines(stdout, {trim: false}).map(parseStatus)
}

export async function getHead(dir = "."): Promise<Commit> {
  const {stdout} = await dugite(["log", "-n1", `--pretty=${JSON_LOG_FORMAT}`], dir)
  return parseJson(stdout) as Commit
}

export async function getBranch(dir = ".", commit: Commit): Promise<Branch> {
  const {stdout} = await dugite(["rev-parse", "--abbrev-ref", commit.hash], dir)
  return {hash: commit.hash, name: String(stdout).trim()}
}

export async function getDiff(dir = ".", ...args: string[]): Promise<Diff> {
  const {stdout} = await dugite(["diff", "--name-only", ...args], dir)
  const changedFiles = parseLines(stdout).map(a => Object.assign({name: basename(a), path: a}))
  return {changedFiles}
}

export async function getStatusClean(dir = "."): Promise<boolean> {
  const {stdout} = await dugite(["status", "--porcelain"], dir)
  return stdout.trim() === ""
}

export async function listBranches(dir = "."): Promise<Branch[]> {
  const {stdout} = await dugite(["branch", "-a", "--format", JSON_BBRANCH_LIST_FORMAT], dir)
  return parseJsonStream(stdout).map(a => a as Branch)
}

export async function listCommits(dir = "."): Promise<Commit[]> {
  const {stdout} = await dugite(["log", `--pretty=${JSON_LOG_FORMAT}`], dir)
  return parseJsonStream(stdout).map(a => a as Commit)
}

export async function setStaged(dir = ".", ...pathspec: string[]): Promise<void> {
  await dugite(["add", "--", ...pathspec], dir)
}

export async function setUnstaged(dir = ".", ...pathspec: string[]): Promise<void> {
  await dugite(["reset", "HEAD", "--", ...pathspec], dir)
}
