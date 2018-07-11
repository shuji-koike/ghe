export const JSON_LOG_FORMAT = JSON.stringify({
  hash: "%H",
  author_name: "%an",
  author_email: "%ae",
  author_date: "%aI",
  subject: "%s"
})

export const JSON_BBRANCH_LIST_FORMAT = JSON.stringify({
  hash: "%(objectname)",
  name: "%(refname)"
})
