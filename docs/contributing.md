# Guia de Contribuição
Obrigado por considerar contribuir com o Barbershop Manager!
Este documento descreve como colaborar de forma organizada e produtiva.

## Como começar
- Faça um fork do repositório.
- Crie uma branch para sua feature ou correção:
```
git checkout -b minha-feature
```

- Envie suas alterações via pull request (PR).

## Padrão de commits
- Use mensagens claras e descritivas.
- Prefira o formato:
```
tipo: descrição breve
```
Exemplos de tipos: `feat`, `fix`, `docs`, `test`, `refactor`.

## Fluxo de trabalho ([GitHub Flow](https://docs.github.com/pt/get-started/using-github/github-flow))
1. Crie uma branch a partir de `main`.
2. Faça commits e push para sua branch.
3. Abra um pull request.
4. Aguarde revisão e aprovação.
5. O PR será mesclado em `main`.

## Testes
- Certifique-se de que todos os testes passam antes de abrir o PR:
```
docker compose run --rm test
```

## Reportando problemas
- Abra uma issue descrevendo claramente o problema.
- Inclua passos para reproduzir e contexto adicional.
