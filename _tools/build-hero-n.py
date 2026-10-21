"""Three isolated hero studies, retaining the rest of the v26 page verbatim."""
from pathlib import Path
from html.parser import HTMLParser

ROOT = Path(__file__).resolve().parents[1]

class HeroBounds(HTMLParser):
    def __init__(self, source):
        super().__init__()
        self.source = source
        self.lines = [0]
        for i, c in enumerate(source):
            if c == '\n': self.lines.append(i + 1)
        self.depth = 0
        self.bounds = None
    def source_offset(self):
        line, col = self.getpos()
        return self.lines[line - 1] + col
    def handle_starttag(self, tag, attrs):
        if tag != 'div': return
        if self.depth: self.depth += 1
        elif 'nhero' in dict(attrs).get('class', '').split():
            self.start = self.source_offset()
            self.depth = 1
    def handle_endtag(self, tag):
        if tag == 'div' and self.depth:
            self.depth -= 1
            if self.depth == 0: self.bounds = (self.start, self.source_offset() + len('</div>'))

CARDS = {
    'frame': ['the-last-of-us-poster', 'ar-f1-monaco', 'levski-goal', 'euphoria-poster',
              'fermata-1', 'house-of-the-dragon-poster', 'barbie-poster', 'igri-1'],
    'fan': ['dune-2-poster', 'euphoria-poster', 'the-last-of-us-poster',
            'house-of-the-dragon-poster', 'igri-1'],
    'v20': ['the-last-of-us-back', 'fermata-1', 'levski-goal', 'igri-1'],
}
TITLE = {'frame': 'Рамка', 'fan': 'Ветрило', 'v20': 'v20, повече живот'}

source = (ROOT / 'index.html').read_text()
parser = HeroBounds(source)
parser.feed(source)
assert parser.bounds
start, end = parser.bounds
for variant, images in CARDS.items():
    cards = ''.join(f'<figure class="n-scene"><div class="ns-card"><img src="img/{image}.jpg" alt="" decoding="async"></div></figure>' for image in images)
    hero = f'''<div class="nhero n-study n-{variant}" data-study="{variant}" aria-hidden="false">
<div class="n-scenes" aria-hidden="true">{cards}</div>
<div class="ntext"><h1 id="h1">Всичко за гледане<br>На едно място</h1><p class="sub" id="sub">Стрийминг със сериали, реалити, спорт и новини.</p><div class="ctas" id="heroCta"><a class="btn btn-p" href="#ceni" data-su="">Пробвай NOISY</a><span class="fine">Без карта.</span></div></div>
<div class="nhint">Скролни и открий световете</div></div>'''
    page = source[:start] + hero + source[end:]
    page = page.replace('</head>', '<meta name="robots" content="noindex,nofollow"><style>#intro{display:none!important}</style><link rel="stylesheet" href="hero-aperture.css?v=2"><link rel="stylesheet" href="hero-n-studies.css?v=2"><script src="hero-aperture.js?v=2" defer></script></head>')
    (ROOT / f'hero-n-{variant}.html').write_text(page)
    print(f'hero-n-{variant}.html: {TITLE[variant]}')
