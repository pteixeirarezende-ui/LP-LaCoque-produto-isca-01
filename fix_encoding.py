import re

with open('index4.html', 'r', encoding='utf-8') as f:
    text = f.read()

# Fix encoding artifacts
replacements = {
    'Â·': '&middot;',
    'â†’': '&rarr;',
    'â€”': '&mdash;',
    'â€œ': '&ldquo;',
    'â€': '&rdquo;',
    'â€˜': '&lsquo;',
    'â€™': '&rsquo;',
    '': '&mdash;',  # common fallback for em-dash
}

for old, new in replacements.items():
    text = text.replace(old, new)

# Just in case, let's also fix common ones that might have spaces
text = text.replace('  ', ' ')

with open('index4.html', 'w', encoding='utf-8') as f:
    f.write(text)

print("Encoding artifacts fixed!")
