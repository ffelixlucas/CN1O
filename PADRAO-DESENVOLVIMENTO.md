# Padrão de Desenvolvimento - CN10

Este documento define o padrão oficial para manter o projeto consistente em desenvolvimento e produção.

## 1) Objetivo

- Ter logs completos no desenvolvimento.
- Ter logs mínimos e úteis em produção.
- Garantir UX mobile-first e SEO consistente a cada entrega.
- Evitar regressões com checklist fixo antes de deploy.

## 2) Fluxo Padrão de Trabalho

1. Atualizar branch com a `main`.
2. Implementar mudança pequena e focada.
3. Rodar validação local.
4. Revisar UX mobile e desktop.
5. Validar SEO básico.
6. Commit semântico.
7. Deploy.
8. Smoke test em produção.

## 3) Comandos Oficiais (Frontend CN10)

Instalação:

```bash
npm install
```

Desenvolvimento:

```bash
npm run dev
```

Build de validação:

```bash
npm run build
```

Preview local da build:

```bash
npm run preview
```

## 4) Variáveis de Ambiente (CN10)

Obrigatórias para produção:

- `VITE_ADMIN_URL`
- `VITE_CLASSES_API_URL`
- `VITE_NOTICIAS_API_URL`

Exemplo local (`.env`):

```env
VITE_ADMIN_URL=https://capoeira-base.vercel.app
VITE_CLASSES_API_URL=https://capoeira-base-production.up.railway.app/api/public/horarios/cn10
VITE_NOTICIAS_API_URL=https://capoeira-base-production.up.railway.app/api/public/noticias/cn10
```

Regra:

- Nunca commitar segredo.
- Toda variável `VITE_*` deve existir também na Vercel (Preview e Production).

## 5) Padrão de Logs

### Desenvolvimento

- Logs detalhados permitidos para depuração.
- Mensagens com contexto claro (módulo + ação + status).

### Produção

- Exibir apenas logs essenciais (erro real, falha de API, fallback acionado).
- Evitar spam no console.

Regra prática:

- `console.error`: somente erros relevantes.
- `console.warn`: somente aviso acionável.
- `console.log`: evitar em produção.

## 6) Padrão de UX (Mobile-First)

- Prioridade de leitura no celular.
- Títulos curtos e escalonados por breakpoint.
- Cards com hierarquia clara: imagem -> data/hora -> título -> resumo -> CTA.
- Conteúdo longo com "Ler publicação completa".
- Espaçamento e contraste consistentes entre sections.
- Scroll anchor ajustado para não esconder título sob header.

## 7) Padrão de SEO

Checklist mínimo por página:

- `title` único e descritivo.
- `meta description` objetiva.
- Hierarquia semântica (`h1` único, `h2/h3` coerentes).
- `alt` em todas imagens relevantes.
- `robots.txt` e `sitemap.xml` válidos.
- Open Graph básico para compartilhamento.

## 8) Integração com Backend (Multi-org)

- Sempre consumir endpoints por `slug` da organização.
- Não fixar dados de organização no frontend.
- Fallback somente quando API estiver indisponível.
- Mensagens de erro amigáveis para usuário e detalhes no console.

## 9) Definição de Pronto (Definition of Done)

Uma tarefa só está pronta quando:

1. Funciona em mobile e desktop.
2. Build local passa sem erro.
3. Não gera erro de console inesperado.
4. API responde e renderiza corretamente.
5. Navegação por menu e âncoras está correta.
6. Deploy realizado e validado em produção.

## 10) Padrão de Commit

Usar Conventional Commits:

- `feat:` nova funcionalidade
- `fix:` correção de bug
- `refactor:` melhoria sem alterar regra de negócio
- `style:` ajustes visuais/CSS
- `docs:` documentação
- `chore:` manutenção

Exemplos:

- `feat(notices): adiciona modal de leitura completa no mobile`
- `fix(classes): ordena dias da semana por regra de calendario`
- `docs: adiciona padrão oficial de desenvolvimento do CN10`

## 11) Checklist Rápido Pré-Deploy

- `npm run build` sem erro.
- Variáveis da Vercel conferidas.
- Classes e Notícias carregando da API correta.
- Navegação do header e menu mobile atualizados.
- Sem regressão visual entre sections.
- Console limpo (exceto logs esperados).

---

Responsável por manter este padrão atualizado: time CN10.
Qualquer ajuste de processo deve atualizar este arquivo no mesmo PR.
