

print('ingrese la cadena')
cadena = input()


def capitalizar(texto):
    texto = texto.replace(texto[0],texto[0].upper())
    return texto


print(capitalizar(cadena))