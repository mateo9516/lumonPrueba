import re

print('Di hola')
cadena = input()

def validar(texto):
    hola = re.compile("^([Hh]+[Oo]+[Ll]+[Aa]+)")
    if hola.match(texto) is not None:
        print("Verdadero")
    else:
        print("Falso")

validar(cadena)


