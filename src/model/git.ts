export interface GitRef {
  hash: string
  name?: string
}

export interface Branch extends GitRef {
  name: string
}

export interface Commit extends GitRef {
  author_name: string
  author_email: string
  author_date: string
  subject: string
}

export interface Diff {
  changedFiles: ChangedFile[]
}

export interface FileName {
  name: string
  path: string
  checked?: boolean
}

export enum StatusCode {
  Unmodified = " ",
  Modified = "M",
  Added = "A",
  Deleted = "D",
  Renamed = "R",
  Copied = "C",
  Unmerged = "U",
  Untracked = "?",
  Ignored = "!",
  Unknown = "*"
}

export interface ChangedFile extends FileName {
  mode?: StatusCode
}

export interface FileStatus extends FileName {
  index: StatusCode
  worktree: StatusCode
  staged: boolean
  unstaged: boolean
  indeterminate: boolean
  added: boolean
  deleted: boolean
  renamed: boolean
  copied: boolean
  untracked: boolean
  ignored: boolean
}

export interface GitRepo {
  dir: string
  head: Commit
  branch?: Branch
  branches: Branch[]
  commits: Commit[]
  stage: Diff
  workingTree: Diff
  status: FileStatus[]
}
