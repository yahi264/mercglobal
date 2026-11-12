# Lists every English text in lib/content.ts and lib/i18n.ts (used to prepare new languages).
import json, re

PAT = re.compile(r'\ben:\s*("(?:[^"\\]|\\.)*")')
strs = []
for f in ["lib/content.ts", "lib/i18n.ts"]:
    s = open(f, encoding="utf8").read()
    for m in PAT.finditer(s):
        v = json.loads(m.group(1))
        if v not in strs:
            strs.append(v)
json.dump(strs, open("scripts/i18n/en-strings.json", "w", encoding="utf8"), ensure_ascii=False, indent=0)
print(len(strs), sum(len(x) for x in strs))
