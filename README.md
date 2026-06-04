<div align="center">
<h1>Store</h1>
</div>

## Como Correr o Projeto

### Requisitos
- Node.js 18+
- npm ou yarn

### Setup
```bash
# 1. Instalar dependências
npm install

# 2. Correr em desenvolvimento
npm run dev

# 3. Abrir no browser
# Acede a http://localhost:3000
```

**Build para produção:**
```bash
npm run build
npm run start
```

## Arquitetura

### Estado Global
- **Zustand** para gerenciamento de estado do carrinho
- **Persist middleware** para persistência automática em localStorage
- **DevTools** ativado em desenvolvimento para debugging

O carrinho é acessível em qualquer página através do hook `useCartStore()`, garantindo que o estado seja compartilhado e sincronizado automaticamente.

### Estrutura de Pastas
```
src/
├── app/              # Next.js App Router (Server Components)
├── components/       # UI reutilizáveis
├── features/         # Features específicas (store, cart)
├── stores/           # Zustand stores
├── utils/            # Funções auxiliares
├── constants/        # Constantes da app
├── http/             # API calls
└── data/             # Data utilities
```

### Padrão de Componentes
- **Server Components** para fetch de dados (páginas iniciais)
- **Client Components** para interatividade (carrinho, modais)
- Props drilling minimalista com store para estado transversal

## Decisões de Arquitetura

### 1. Gestão de Quantidade

**Implementação:**
- Máximo de 12 unidades por produto
- Quantidade chega a 1 → o botão de decrease fica disabled
- Para remover um item do carrinho, deve clicar no botão de remover

**Lógica:**
- O botão "Add to Cart" fica desabilitado quando atinge o máximo
- Modal feedback especial quando máximo é atingido
- No carrinho, botão "-" fica desabilitado no mínimo

**Por quê?** Preço de loja realista (evita abuse) + UX clara (sem inputs quebrados).

---

### 2. Persistência do Carrinho

**Implementação:**
- localStorage via Zustand persist middleware
- SSR revalidation de 1 hora (cache de produtos)

**Trade-off:**
- Confiamos nos preços em cache (1h)
- Se um produto deixar de existir, mantém na cart (user vê erro apenas no checkout)
- Se um preço muda drasticamente, cache garante consistência por 1h

**Por quê?** Simples, resiliente, sem backend. A revalidação garante que preços antigos demais não passam (além de 1h, nova requisição é feita).

---

### 3. Estado do Botão "Checkout"

**Implementação:**
- Desabilitado se: carrinho vazio **OU** algum item no máximo de quantidade
- Alert visual explícito explicando o porquê (ícone + mensagem)
- User pode remover/diminuir itens para reativar o botão

**Por quê?** Melhora UX:
- User vê claramente o que está bloqueado e porquê
- Não é frustante (pode corrigir sem mudar de página)
- Mais informativo que um botão cinzento misterioso

---

### 4. Tratamento de Erros de Rede

**Implementação:**
- Validação de dados com **Zod** (garante estrutura correta)
- **Retry automático com backoff** (3 tentativas, delays: 1s, 2s, 3s)
- Error boundary com mensagens específicas
- Loading skeleton enquanto carrega

**Fluxo:**
1. Requisição inicial falha → retry automático
2. Todas as 3 tentativas falham → error boundary mostra mensagem
3. User clica "Try Again" → revalidation trigger (SSR)
4. Ou clica "Go Home" → volta ao home (loader carrega de novo)

**Por quê?** Redes móveis/instáveis são comuns. Retry automático resolve na maioria dos casos sem user perceber.

---

### 5. Header com Estado do Carrinho

**Implementação:**
- CartButton renderizado com hook `useCartStore`
- Badge com quantidade (max 99+)
- Aria-label dinâmico para acessibilidade
- Link prefetch para melhor UX

**Visível em:**
- Página de produtos
- Página de carrinho
- Sempre no topo (sticky, z-50)

**Por quê?** Feedback constante de que algo foi adicionado. User sabe quantos itens tem sem ir ao carrinho.


## O Que Deixou de Lado (e Porquê)

### 1. Autenticação / Login
- **Scope do desafio:** Mini-loja sem backend
- **Alternativa:** Seria bearer token + JWT no localStorage

### 2. Payment Integration
- **Scope:** Botão "Checkout" é visual (não integra stripe/paypal)
- **Alternativa:** Modal de sucesso como "order confirma" seria válido

### 3. Testes Automatizados
- **Valorizamos:** Sim, mas não é eliminatório
- **O que testarias:** Cart logic (add/remove/quantity), Zod validation, retry logic

### 4. Analytics / Error Monitoring
- **Setup:** Comentário no error.tsx aponta para Sentry
- **Alternativa:** Implementar quando houver endpoint de telemetria

### 5. Search / Filtros de Produtos
- **Requisito aberto?** Não especificado
- **Futura melhoria:** Implementar na page.tsx com client-side filtering

---

## Trade-offs Conscientes

| Decisão | Trade-off | Justificação |
|---------|-----------|-------------|
| localStorage + 1h revalidation | Preço pode estar desatualizado por até 1h | Simplicidade > precisão real-time (sem backend) |
| Máximo 12 itens | Limita quantidade | Usa comum em e-commerce (evita abuse) |
| Retry automático 3x | Pode parecer lento se API está realmente down | Melhor UX (user não precisa clicar) |
| Sem validação de CEP/morada | Checkout é visual | Scope do desafio não exige |

---

## TypeScript & Qualidade

- ✅ Strict mode ativado
- ✅ Tipos explícitos em todas as funções
- ✅ Sem `any` implícito
- ✅ Zod para runtime validation
- ✅ Biome para linting (ESLint + Prettier)

---

## Performance

- 🚀 SSR para primeira página (Server Components)
- 🚀 ISR: 1 hora de revalidação de produtos
- 🚀 Skeleton loaders durante carregamento
- 🚀 Next.js Image Optimization
- 🚀 Zustand DevTools (dev only)

---

## Acessibilidade

- ✅ Aria-labels em botões e ícones
- ✅ Sr-only para conteúdo screen reader
- ✅ Fieldsets corretamente estruturados
- ✅ Role alerts para erros/avisos
- ✅ Prefixos e sufixos de moeda/unidade

---

## Stack

| Tecnologia | Razão |
|-----------|-------|
| Next.js 16 | SSR, App Router, ISR |
| React 19 | Latest, Compiler support |
| Zustand 5 | Lightweight state, persist middleware |
| TypeScript | Type safety, DX |
| Tailwind CSS 4 | Utility-first, JIT compilation |
| Zod 4 | Runtime schema validation |
| Lucide Icons | Modern, accessible icons |

-----------
Obrigado! 🚀
