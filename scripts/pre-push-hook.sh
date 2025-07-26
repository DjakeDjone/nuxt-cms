#!/bin/sh
#
# Pre-push hook that automatically formats code before pushing
# This ensures consistent code style across the repository
#

echo "🎨 Running automatic code formatting before push..."

# Run the format command to fix auto-fixable issues
npm run format

# Check if formatting made any changes
if [ -n "$(git diff --name-only)" ]; then
    echo "📝 Code formatting applied changes to the following files:"
    git diff --name-only
    echo ""
    echo "💡 The formatting changes have been applied automatically."
    echo "   You may want to review these changes and commit them."
    echo "   The push will continue, but consider committing the formatting changes."
    # create commit message
    git commit -am "chore: auto-format code before push"
fi

echo "✅ Code formatting complete! Proceeding with push..."
exit 0
