## Modulação de cifras

### Desenvolvimento

Para executar o projeto localmente:

```bash
# Instalar dependências
pnpm install

# Executar servidor de desenvolvimento
pnpm run dev
```

O servidor será iniciado na porta 3000 e abrirá automaticamente no navegador.

### Conceito

A viola caipira é composta por cinco pares de cordas. Mesmo sem trabalhar com tablaturas, é comum precisar transpor cifras para
adequar uma música ao alcance vocal ou ao repertório. Este projeto permite manipular cifras de forma simples no navegador,
realizando a leitura de arquivos texto, exibindo a cifra original e oferecendo ferramentas para modulação do tom.

As cifras de exemplo distribuídas com o projeto foram atualizadas para contemplar apenas canções cifradas, sem qualquer trecho de
tablatura.

### Funcionalidades

- [x] Carregar cifras a partir de arquivos `.txt`
- [x] Ajustar o tom da cifra em semitons para cima ou para baixo
- [x] Adaptar a exibição para diferentes larguras de tela

### Instruções de uso

Primeiramente é necessário importar todos os arquivos de script em sua página:

```html
<script src="https://code.jquery.com/jquery-3.2.1.min.js"></script>
<script src="js/utils.js"></script>
<script src="js/classes/Nota.js"></script>
<script src="js/classes/Corda.js"></script>
<script src="js/classes/Afinacao.js"></script>
<script src="js/config.js"></script>
<script src="js/classes/Cifra.js"></script>
<script src="js/main.js"></script>
```

Pode se considerar interessante importar apenas um arquivo. Nesse caso, copie todo o conteúdo dos scripts na ordem acima para um
único arquivo `script.js` e utilize uma ferramenta como https://javascript-minifier.com para minificá-lo, reduzindo o número de
requisições.

### Configurações

As configurações são centralizadas no arquivo `config.js`. Nele é possível definir a lista de cifras (`bancoDeCifras`) e o estado
inicial da aplicação (`appState`).

| Variável | Descrição |
| --- | --- |
| `appState` | guarda informações de estado da cifra, como tom atual, afinacão selecionada, linhas renderizadas e se o modo premium está ativo |
| `afinacoes` | guarda as afinações possíveis e alimenta utilidades que dependem da afinação original das cifras |

### Funções importantes

#### `renderDependingOnWindowSize`

Função utilizada em `config.js` para estabelecer os *breakpoints* utilizados na quebra das cifras (o número indicado representa a
quantidade de caracteres por linha). A exibição mobile respeita as palavras completas, evitando quebras abruptas.

#### `Cifra.extrairDaCifra(Afinacao, string): [Cifra]`

Utilizado para extrair de uma cifra em string as linhas cifradas e salvá-las no `appState.cifras` como uma lista de objetos `Cifra`.

#### `cifra.alterarTom(notacaoTom)`

Método da instância de `Cifra`. Altera o tom da cifra instanciada de `appState.tomOriginal` para o tom selecionado em
`notacaoTom`.
