echo "git-rebase-automatic"
echo ${1}
grep '^pick' ${1}
echo "_/_/_/_/"
# gawk -i inplace '
awk '
/^pick [0-9a-f]{7} fixup [0-9a-f]{7}/{
  $0 = "fixup " $2 " fixup " $4;
}
{print}' ${1} | grep -v '^#'
