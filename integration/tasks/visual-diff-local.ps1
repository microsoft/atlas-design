# Checkout different branch, take screenshots, copy to separate folder
# Should be run from a feature branch

# get to monorepo root
Set-Location ../

# Remove screenshots folder and content related folders
Remove-Item -Path "./integration/visual-diff/screenshots/" -Recurse -Force -ErrorAction Ignore

# checkout branch that will be used for baseline screenshots
git checkout main

# take baseline screenshots
npm run screenshots:light --workspace=@microsoft/atlas-integration

# copy the taken screenshots into the baseline folder
Remove-Item -Path "./integration/visual-diff/screenshots/baseline" -Recurse -Force -ErrorAction Ignore
Copy-Item  "./integration/visual-diff/screenshots/updated" -Destination "./integration/visual-diff/screenshots/baseline" -Recurse

# Checkout working branch, take screenshots, copy to folder

# Checkout previous branch
git checkout '@{-1}'
git stash apply stash^{/visual_diff_stash_$StashTime}

# run screenshots against develop branch's screenshots
npm run screenshots:light --workspace=@microsoft/atlas-integration

# Compile diff script and perform diff
npm run compile-tasks --workspace=@microsoft/atlas-integration
npm run compare --workspace=@microsoft/atlas-integration
