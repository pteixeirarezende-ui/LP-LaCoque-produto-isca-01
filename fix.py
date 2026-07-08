import codecs

try:
    with codecs.open('index4.html', 'r', encoding='utf-8') as f:
        text = f.read()
    
    replacements = {
        'Ãª': 'ê',
        'Ã£': 'ã',
        'Ã‰': 'É',
        'Ã³': 'ó',
        'Ã§': 'ç',
        'Ã¡': 'á',
        'Ã\xad': 'í',  
        'Ã¢': 'â',
        'Ãµ': 'õ',
        'Ãº': 'ú',
        'Ã€': 'À',
        'Ã ': 'à',
        'â€“': '–',
        'â€¢': '•',
        'â€œ': '“',
        'â€”': '—',
        'â€\x9d': '”',
        'Ã§Ã£': 'çã',
        'Ã§Ãµes': 'ções',
        'nÃ£o': 'não',
        'MÃ‰TODO': 'MÉTODO',
        'experiÃªncia': 'experiência'
    }
    
    for bad, good in replacements.items():
        text = text.replace(bad, good)
        
    with codecs.open('index4.html', 'w', encoding='utf-8') as f:
        f.write(text)
    print('Replaced characters successfully')
except Exception as e:
    print('Error:', e)
