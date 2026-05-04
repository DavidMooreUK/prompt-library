#!/bin/bash

# Required parameters:
# @raycast.schemaVersion 1
# @raycast.title Process with File Pipeline
# @raycast.mode silent

# Optional parameters:
# @raycast.icon 🤖
# @raycast.packageName File Pipeline

# Documentation:
# @raycast.description Process selected Finder file through the pipeline
# @raycast.author david_moore
# @raycast.authorURL https://raycast.com/david_moore

export PATH="/Users/odin/.local/bin:/opt/homebrew/bin:/usr/local/bin:/usr/bin:/bin:$PATH"

# Get the selected file from Finder
SELECTED=$(osascript -e 'tell application "Finder" to set sel to selection' -e 'if (count of sel) > 0 then return POSIX path of (item 1 of sel as alias)' 2>/dev/null)

echo "$(date): SELECTED=$SELECTED" >> /tmp/file-pipeline-quickaction.log

if [ -z "$SELECTED" ]; then
    osascript -e 'display notification "No file selected in Finder" with title "File Pipeline"'
    exit 1
fi

BASENAME=$(basename "$SELECTED")
osascript -e "display notification \"Processing: $BASENAME\" with title \"File Pipeline\""

cd /Users/odin/Documents/07_Development/file-processing
uv run file-pipeline process "$SELECTED" >> /tmp/file-pipeline-quickaction.log 2>&1

if [ $? -eq 0 ]; then
    osascript -e 'display notification "Done" with title "File Pipeline"'
else
    osascript -e 'display notification "Failed — check /tmp/file-pipeline-quickaction.log" with title "File Pipeline"'
fi

