def create(string):
    res = ''
    for e in string:
        res += '+'*ord(e) +'.[-]'
    return res[:-3]

if __name__ == '__main__':
    print(create(input("Entrez votre chaine:\n")))
