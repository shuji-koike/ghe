# fswatch ./git-rebase--automatic.sh | xargs -n1 -I{} sh ./test.sh

rm -rf sandbox
mkdir -p sandbox
cd sandbox
git init .
git checkout -b master
touch README.md
git add README.md
git commit -m "initial commit"
git checkout -b add-fox
cat > fox.txt <<EOL
the
quick
brown
fox
jumps
over
the
lazy
dog
EOL
git add fox.txt
git commit -m "add fox.txt"
cat > hoge.txt <<EOF
hoge
EOF
git add hoge.txt
git commit -m "add hoge.txt"
git apply <<EOF
diff --git a/fox.txt b/fox.txt
index ddd4af9..0041136 100644
--- a/fox.txt
+++ b/fox.txt
@@ -1,7 +1,7 @@
 the
 quick
 brown
-fox
+FOX
 jumps
 over
 the
EOF
git add fox.txt
git commit -m "fixup $(git rev-parse --short HEAD~1)"
# git status
# git log
export GIT_SEQUENCE_EDITOR='../git-rebase--automatic.sh'
git rebase --interactive master
git log
