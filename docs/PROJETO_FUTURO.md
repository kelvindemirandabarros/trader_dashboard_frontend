# PROJETO — Frontend Dashboard Trader

Checklist para desenvolvimento do frontend. Itens concluídos marcados com :white_check_mark:.

# Índice

- [Tasks](#tasks)
- [Descrição do Projeto](#description)

---

# Tasks

## 1. Configuração inicial

- [:white_check_mark:] `package.json` com scripts (`dev`, `build`, `start`) e dependências.
- [:white_check_mark:] `tsconfig.json` configurado para Next.js + TypeScript.
- [:white_check_mark:] TailwindCSS configurado (`tailwind.config.js`, `postcss.config.js`, `globals.css`).
- [:white_check_mark:] ESLint + Prettier configurados.
- [:white_check_mark:] `.env.example` com variáveis públicas (ex: `NEXT_PUBLIC_API_URL`).

## 2. Estrutura de pastas (conforme esqueleto)

- [ ] `src/app` (App Router) configurado corretamente.
- [ ] `src/components/` contendo subpastas: `charts/`, `layout/`, `common/`.
- [ ] `src/services/` com `api.ts` e `socket.ts`.
- [ ] `src/store/` com store (Zustand) para events/insight/filters.
- [ ] `src/types/`, `src/utils/`, `src/styles/` prontos.

## 3. Autenticação e rotas protegidas

- [ ] Página de login mockada (`/` ou `/login`).
- [ ] Proteção de rota para `/dashboard` (redirect para login se não autenticado).
- [ ] Estratégia de autenticação leve (cookies JWT ou sessão). Documentar escolha.

## 4. Consumo de API e serviços

- [ ] `services/api.ts` configurado com Axios e baseURL.
- [ ] `services/socket.ts` configurado com `socket.io-client`.
- [ ] Tratar reconexão e backoff simples no client WebSocket.
- [ ] Mecanismo de retry ao chamar endpoints críticos (ex: webhook simulation).

## 5. Tipagem e modelos

- [ ] `EventData` (id, userId, type, value, timestamp, metadata).
- [ ] `InsightData` (summary, generated_at).
- [ ] Tipagens para componentes (usar `React.ComponentProps` quando aplicar a libs externas).

## 6. Componentes principais

- [ ] `DashboardLayout` com header e container responsivo.
- [ ] `AuthLayout` simples para páginas públicas.
- [ ] `FiltersBar` para intervalo de tempo e tipos de evento.
- [ ] `LastUpdateIndicator` mostrando tempo desde último evento.
- [ ] `EventsFeed` com paginação/infinite scroll.
- [ ] `InsightCard` exibindo insight da OpenAI.

## 7. Gráficos (Chart.js)

- [ ] `EventsLineChart` usando `react-chartjs-2` e Chart.js v4.
- [ ] `EventsPieChart` para distribuição por tipo.
- [ ] `TopUsersBarChart` para top N usuários.
- [ ] Charts responsivos e acessíveis (labels, tooltips legíveis).

## 8. Estado e sincronização em tempo real

- [ ] Store com eventos, filtros e insight.
- [ ] Ao receber `new_event` via WebSocket, atualizar store e charts sem reload.
- [ ] Contador de eventos em tempo real visível no header.

## 9. Integração com OpenAI (client-side apenas para demo)

- [ ] Tela/Card com botão `Gerar Insight` que dispara requisição ao backend.
- [ ] Exibição do `summary` retornado.
- [ ] Proteção de chave (chave OpenAI só no backend). Documentar fluxo.

## 10. Persistência local e seed

- [ ] Seed de dados sintéticos (`scripts/seed.ts` ou arquivo JSON) para testes locais.
- [ ] Persistência opcional em `localStorage` para sessão dev.

## 11. Scripts úteis

- [ ] `npm run dev` (porta padrão ou via `PORT=3001`).
- [ ] `npm run seed` para popular dados locais.
- [ ] `npm run lint` e `npm run format`.

## 12. Docker

- [ ] `Dockerfile` para frontend.
- [ ] `docker-compose.yml` integrando backend + frontend + banco (se necessário).

## 13. Testes (mínimo)

- [ ] Test unitário para o handler que transforma eventos em séries de tempo (ex: util).
- [ ] Test para o componente `EventsLineChart` renderizando com dados mock.

## 14. Acessibilidade e UX

- [ ] Navegação por teclado funcional.
- [ ] Contraste de cores verificável.
- [ ] Labels e aria-attributes em inputs e botões importantes.

## 15. Performance e otimização

- [ ] Memoizar dados para Chart.js (useMemo) para evitar re-renders caros.
- [ ] Cache simples para agregações pesadas (in-memory com TTL).
- [ ] Evitar envio excessivo de eventos ao cliente (agregação no backend quando possível).

## 16. Qualidade de código

- [ ] Regras de TypeScript estritas (`strict: true`) recomendadas.
- [ ] Manter comentários de código em português (conforme regras do projeto).
- [ ] Não alterar código da store sem revisão (Zustand persistência).

## 17. Documentação e entregáveis

- [ ] README com instruções de execução local e com Docker.
- [ ] Endpoint de webhook documentado com payload de exemplo.
- [ ] Instruções para configurar `NEXT_PUBLIC_API_URL` e `NEXT_PUBLIC_WS_URL`.
- [ ] Lista de tarefas concluídas no arquivo PROJETO.md (esta lista).

## 18. Extras recomendados (priorizar se houver tempo)

- [ ] Alertas/notifications persistentes (ex: última falha de webhook).
- [ ] Deploy mínimo (Vercel front + túnel para backend) e instruções.

---

### Observações rápidas

- Prefira `React.ComponentPropsWithoutRef<'input'>` para props de componentes base HTML.
- Coloque chaves sensíveis apenas no backend. Use `NEXT_PUBLIC_` para variáveis públicas.
- Use Chart.js v4 com `react-chartjs-2@^5` e registre os controllers explicitamente.

---
