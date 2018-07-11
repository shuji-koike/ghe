import {basename} from "path"
import {GitProcess, IGitResult} from "dugite"
import {FileStatus, StatusCode} from "../model/git"

export type Json = string

export async function dugite(args: string[], dir): Promise<IGitResult> {
  const result = await GitProcess.exec(args, dir)
  console.debug("git " + args.join(" "))
  return result
}

export function parseLines(string: string, opt: {trim: boolean} = {trim: true}) {
  return string
    .split("\n")
    .map(a => (opt.trim ? a.trim() : a))
    .filter(a => a.length)
}

export function parseJsonStream(json: Json): object[] {
  return json
    .split("\n")
    .filter(a => a.length)
    .map(parseJson)
    .filter(a => a != null)
}

export function parseJson(json: Json): object | null {
  try {
    return JSON.parse(json)
  } catch (err) {
    console.error(json.length, json, err)
    return null
  }
}

export function parseStatus(string: string): FileStatus {
  const match = string.match(/(^[\sMADRCU?!])([\sMADRCU?!])\s(.*)/)
  if (match) {
    const [, index, worktree, path] = match
    const status = index + worktree
    return {
      path,
      name: basename(path),
      index: index as StatusCode,
      worktree: worktree as StatusCode,
      staged: status == "M ",
      unstaged: status == " M",
      indeterminate: status == "MM",
      added: index == "A",
      deleted: index == "D" || worktree == "D",
      renamed: index == "R",
      copied: index == "C",
      untracked: status == "??",
      ignored: status == "!!"
    }
  } else {
    throw new Error("parseStatus failed.")
  }
}
