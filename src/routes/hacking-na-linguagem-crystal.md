---
layout: article
title:  Hacking na Linguagem Crystal
date:   2016-06-01 13:46:12
categories: crystal
tags: crystal, hacking, compiler, opensource, br
path: /hacking-na-linguagem-crystal
media:
  type: image
  source: posts_crystal_language
  alt: Crystal Language Logo
  caption: hacking, do jeito crystal
---

# Hacking na Linguagem Crystal

You can check this post in [english](/hacking-on-crystal-language)

Ontem eu comecei a ajudar na Linguagem de Programação [Crystal](http://crystal-lang.org/), então eu gostaria de compartilhar aqui minhas experiências e que possam servir de referência futuramente.

* Problemas que precisam de verificação (código base atual)
* Reduzir a exemplos mínimo
* Trabalhar em pequenos pull requests

Como eu conhecia o codetriage.com, comecei olhando algumas issues antigas para contribuir, ou pelo menos verificar se ainda eram aplicáveis com a base de código atual.

Meu primeiro desafio foi colocar o compilador rodando com algumas versões (como Crystal ainda não possui gerenciador de multi-versões, brew fez o trabalho)

Você pode checar como fazer isto no [gist](https://gist.github.com/fernandes/52dce07fd0b8b902dcfb582c21c56d57).

Depois de instalada a versão mais recente da linguagem Crystal, comecei procurando dentro das issues e encontrei uma mais simples sobre o compilador. Para trabalhar no compilador é necessário testar com a verão master do repositório, então seguem os passos para compilar a mesma:

```bash
xcode-select --install
brew install \
  bdw-gc \
  gmp \
  libevent \
  libpcl \
  libxml2 \
  libyaml \
  llvm
git clone https://github.com/crystal-lang/crystal.git
cd crystal
make
```

Realmente fácil, então vamos começar o _hacking time!_

Primeiro eu escolhi [issue #194](https://github.com/crystal-lang/crystal/issues/194), não me pergunte o por que pensei que esta poderia ser fácil... hahaha

Então, quando estava procurando por uma solução, encontrei um erro de digitação na documentação e corrigi. Primeiro PR enviado, legal! É um bom caminho para aquecer.

ps: Em sua build o Crystal realiza testes na formatação, incluindo na documentação, então quando enviar um documento PR não use `[skip ci]`

O fluxo de trabalho para fazer a alteração no compilador é:

* Codificar
* make crystal spec
* Repetir

`make crystal spec` é um pouco demorado, então você pode achar mais útil apenas rodar um teste específico (com `crystal spec spec/path/to/file_spec.cr`), e então quando terminar rodar `make crystal spec` antes de commitar.

ps: Como eu estava brincando com o compilador, fiz `make clean crystal spec` antes do PR, apenas para recompilar o mesmo e checar se tudo estava ok, de primeira o teste passou, mas eu quebrei a build, hahah, esta é uma dica útil ;)

Considero até aqui apenas como uma introdução e contexto, vamos agora realmente entrar dentro do código do Crystal.

Se você leu a issue, tinha um problema de alteração do tipo, valores estavam sendo convertidos para `i32` se não havia um _enum base type_  sendo especificado e assumido como padrão (`i32`), é crucial entender os termos utilizados no problema, isto tornará mais fácil pesquisar no código.

Comecei procurando os testes com algo similar (crystal usa o `c_` prefixo para os _bindings_ de C, como isto é um problema em _binding_ da biblioteca padrão C, comecei nestes arquivos).

Encontrei o [spec/compiler/type_inference/c_enum_spec.cr](https://github.com/fernandes/crystal/blob/2f6d9e459601b3153c377964bf86dc63160c1bc3/spec/compiler/type_inference/c_enum_spec.cr) e adicionei o seguinte teste (com base em outros testes) para torná-lo vermelho:

```ruby
it "errors if enum value is different from default (Int32) (#194)" do
  assert_error "lib LibFoo; enum Bar; X = 0x00000001_u32; end; end;
LibFoo::Bar::X",
    "enum value must be an Int32"
end
```

ps: É uma convenção do Crystal adicionar `(#123)` para identificar a issue que o teste esta cobrindo.

Agora era a hora de torná-lo verde, como fazer isto? Era a hora de trabalhar no código fonte do compilador.

Até onde eu lembro das aulas de compiladores, não seria um trabalho léxico porque os _tokens_ foram identificados corretamente, apenas a semântica estava errada. Então dentro de `src/compiler/crystal`, encontrei a pasta `semantic` e pesquisei por `enum exception being triggered`.

Então, encontrei esta [exceção](https://github.com/fernandes/crystal/blob/2f6d9e459601b3153c377964bf86dc63160c1bc3/src/compiler/crystal/semantic/top_level_visitor.cr#L580) acontecendo, e pensei legal, encontrei a verificação de valor da enumeração, vamos começar trabalhando neste pedaço do código.

Depois de algum tempo, eu tornei verde com o [código](https://github.com/crystal-lang/crystal/pull/2703/files#diff-6a2ecb55e60454c135921c7303eeaa99R567)

Este verifica o _enum base type_ (é o padrão se o valor é `i32`), e em seguida se nenhum valor é `i32` a exceção é lançada. (qualquer questionamento sobre isto, deixe nos comentários)

Rodei `make clean crystal spec` e tive certeza que tudo estava ok.

ps: Não esqueça de rodar `crystal tool format` para formatar o código fonte.

Depois de tudo isso, [PR](https://github.com/crystal-lang/crystal/pull/2703) aberto!

## Considerações

Esta contribuição foi um momento bem divertido, e gostaria de enumerar algumas razões:

* Demorou 4 horas o processo todo, nunca pensei que seria possível fazer minha primeira contribuição em tão pouco tempo.
* Como o compilador é escrito em Crystal, é fácil de ler e programar (eu não sou um desenvolvedor experiente em Crystal)
* Contribuir para um compilador/linguagem de programação é incrível
* Eu aprendi muito sobre compilação / e tempo de execução no Crystal
* Aqui eu coloquei os passos corretos (eu cometi _MUITOS_ erros antes de fazer isto funcionar)

Eu gostaria de agradecer [@jhass](https://github.com/jhass) por toda paciência e apoio durante esta jornada.

Eu espero que este post sirva de inspiração para outros contribuidores, depois de lerem isto, você considera contribuir com o Crystal ou alguma outra linguagem de programação?
