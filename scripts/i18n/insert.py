# Adds zh / es / de next to every `ru: "..."` text in lib/content.ts and lib/i18n.ts,
# using the translations in scripts/i18n/zh-es-de-*.json (keyed by the English text of the same object).
import glob, json, re

T = {}
for f in sorted(glob.glob("scripts/i18n/zh-es-de-*.json")):
    T.update(json.load(open(f, encoding="utf8")))

STR = r'"(?:[^"\\]|\\.)*"'
EN = re.compile(r"\ben:\s*(" + STR + ")")
RU = re.compile(r"\bru:\s*(" + STR + ")")

missing = set()
for path in ["lib/content.ts", "lib/i18n.ts"]:
    s = open(path, encoding="utf8").read()
    out, pos, n = [], 0, 0
    for m in RU.finditer(s):
        if re.match(r"\s*,?\s*zh:", s[m.end():m.end() + 12]):
            continue  # already done
        ens = list(EN.finditer(s, 0, m.start()))
        if not ens:
            continue
        en = json.loads(ens[-1].group(1))
        if en == "English":  # localeNames is handled by hand
            continue
        tr = T.get(en)
        if not tr:
            missing.add(en)
            continue
        ins = ", zh: %s, es: %s, de: %s" % tuple(json.dumps(tr[k], ensure_ascii=False) for k in ("zh", "es", "de"))
        out.append(s[pos:m.end()])
        out.append(ins)
        pos = m.end()
        n += 1
    out.append(s[pos:])
    open(path, "w", encoding="utf8").write("".join(out))
    print(path, "added", n)
print("missing:", sorted(missing))
