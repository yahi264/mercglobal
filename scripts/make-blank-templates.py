# Makes the blank (titles only) job-offer Word templates from the example ones in public/templates.
import docx

PAIRS = [
    ("public/templates/job-offer-template-EN.docx", "public/templates/job-offer-blank-EN.docx",
     "Write after each title (keep the titles as they are), save, then use \"Upload Word / PDF\" on the admin page."),
    ("public/templates/is-ilani-sablonu-TR.docx", "public/templates/is-ilani-bos-TR.docx",
     "Başlıkların karşısına yazın (başlıkları değiştirmeyin), kaydedin ve yönetim sayfasında \"Dosya yükle\" ile içe aktarın."),
]

for src, dst, hint in PAIRS:
    d = docx.Document(src)
    ps = d.paragraphs
    # instruction line
    for r in ps[1].runs[1:]:
        r.text = ""
    if ps[1].runs:
        ps[1].runs[0].text = hint
    bullets = 0
    for p in ps[2:]:
        if p.style.name == "List Bullet":
            bullets += 1
            if bullets > 3:
                p._element.getparent().remove(p._element)
            else:
                for r in p.runs:
                    r.text = ""
            continue
        runs = p.runs
        if runs and runs[0].bold:
            for r in runs[1:]:
                r.text = ""  # keep the bold title, clear the example value
        else:
            for r in runs:
                r.text = ""  # example description paragraph -> empty line to write in
    d.save(dst)
    print("saved", dst)
