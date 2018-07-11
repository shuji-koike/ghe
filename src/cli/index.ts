import * as path from "path"
import {screen} from "blessed"
import {getRepo} from "../lib/git"

async function test() {
  const repo = await getRepo()
  console.log(repo.status)
  console.log(screen)
  // console.log(repo.head)
  // console.log(repo.branch)
  // console.log(repo.branches.slice(0, 3))
  // console.log(repo.commits.slice(0, 3))
  // console.log(repo.stage)
  // console.log(repo.workingTree)
}

async function delete_branch_inquirer(dir) {
  // http://www.nodegit.org/api/
  const Git = require("nodegit")
  const inquirer = require("inquirer")

  const repo = await Git.Repository.open(dir)
  const raw = await Git.Reference.list(repo)
  const heads = raw.filter(a => /^refs\/heads\//.test(a))
  const remotes = raw.filter(a => /^refs\/remotes\//.test(a))
  console.debug(heads, remotes, raw)
  const answer = await inquirer.prompt([
    {
      type: "checkbox",
      message: "delete_branch",
      name: "checked",
      pageSize: 20,
      choices: [
        new inquirer.Separator(" = local = "),
        ...heads.map(a =>
          Object.assign({
            name: a.replace(/^refs\/(heads|remotes)\//, ""),
            checked: false
          })
        ),
        new inquirer.Separator(" = remote (remote) = "),
        ...remotes.map(a =>
          Object.assign({
            name: a.replace(/^refs\/(heads|remotes)\//, ""),
            checked: false
          })
        )
      ]
    }
  ])
  for (let name of answer.checked) {
    console.info("lookup: ", name)
    const ref = await Git.Branch.lookup(repo, name, Git.Branch.BRANCH.LOCAL)
    // const upstream = await Git.Branch.upstream(ref);
    // Branch.delete(ref);
    console.info("deleted: ", name, ref)
  }
}

async function main({dir}) {
  console.debug = () => null
  console.debug("argv:", process.argv)
  const mode: number = 0
  switch (mode) {
    case 0:
      test()
      break
    case 1:
      delete_branch_inquirer(dir)
      break
  }
}
main({
  dir: path.resolve(process.argv[2] || ".")
})
