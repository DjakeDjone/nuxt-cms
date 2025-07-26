# Git Hooks for Automatic Code Formatting

This project includes a Git pre-push hook that automatically runs code formatting before pushing to the repository.

## What it does

The pre-push hook:
1. 🎨 Automatically runs `npm run format` to fix formatting issues
2. 📝 Shows which files were changed by the formatting
3. ✅ Allows the push to continue (non-blocking)
4. 💡 Reminds you to commit the formatting changes

## Hook Location

The hook is located at: `.git/hooks/pre-push`

## Current Behavior (Non-blocking)

The current hook configuration is **non-blocking**, meaning:
- It will always format your code before pushing 
- It will inform you if changes were made
- It will **NOT** prevent the push from happening
- You should commit the formatting changes in your next commit

## Alternative: Strict Mode (Blocking)

If you want a stricter version that prevents pushes when there are linting errors, replace the hook content with:

```bash
#!/bin/sh
echo "🎨 Running automatic code formatting before push..."
npm run format

echo "🔍 Checking for linting errors..."
npm run lint

if [ $? -eq 0 ]; then
    echo "✅ Code formatting complete! Proceeding with push..."
    exit 0
else
    echo "❌ Linting errors found. Please fix them before pushing."
    echo "💡 Run 'npm run format' and 'npm run lint' to see issues."
    exit 1
fi
```

## Disabling the Hook

To temporarily disable the hook:
```bash
# Rename it to disable
mv .git/hooks/pre-push .git/hooks/pre-push.disabled

# Or remove it entirely
rm .git/hooks/pre-push
```

## Re-enabling the Hook

If the hook gets lost (e.g., after cloning), you can recreate it by running:

```bash
npm run setup:hooks
```

Or manually create the file with the content from `scripts/pre-push-hook.sh`.

## Installation for New Contributors

For new contributors who clone the repository, they should run:

```bash
npm install
npm run setup:hooks
```

This will install dependencies and set up the formatting hook.
