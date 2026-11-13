# Adds `it` (Italian) next to every `en: "..."` text in lib/content.ts and lib/i18n.ts, using scripts/i18n/it.json.
import json, re

T = json.load(open("scripts/i18n/it.json", encoding="utf8"))
STR = r'"(?:[^"\\]|\\.)*"'
EN = re.compile(r"\ben:\s*(" + STR + ")")
miss = set()
for p in ["lib/content.ts", "lib/i18n.ts"]:
    s = open(p, encoding="utf8").read()
    out, pos, n = [], 0, 0
    for m in EN.finditer(s):
        en = json.loads(m.group(1))
        if en == "English":
            continue
        if re.match(r"\s*,\s*it:", s[m.end():m.end() + 8]):
            continue
        if en not in T:
            miss.add(en)
            continue
        out.append(s[pos:m.end()])
        out.append(", it: " + json.dumps(T[en], ensure_ascii=False))
        pos = m.end()
        n += 1
    out.append(s[pos:])
    open(p, "w", encoding="utf8").write("".join(out))
    print(p, n)
print("missing", miss)
