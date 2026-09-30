#!/bin/sh
# Basılı materyalleri PDF ve PNG önizlemeye çevirir (headless Edge).
EDGE="/c/Program Files (x86)/Microsoft/Edge/Application/msedge.exe"
for f in basili/*.html; do
  ad=$(basename "$f" .html)
  "$EDGE" --headless=new --disable-gpu --no-pdf-header-footer --print-to-pdf="$(cygpath -w "$PWD/basili/$ad.pdf")" "file:///$(cygpath -m "$PWD/$f")" 2>/dev/null
  "$EDGE" --headless=new --disable-gpu --hide-scrollbars --force-device-scale-factor=2 --window-size=397,559 --screenshot="$(cygpath -w "$PWD/basili/$ad.png")" "file:///$(cygpath -m "$PWD/$f")" 2>/dev/null
done
ls -la basili
