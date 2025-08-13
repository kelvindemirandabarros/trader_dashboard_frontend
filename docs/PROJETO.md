# PROJETO — Frontend Dashboard Trader

"Construa um dashboard de monitoramento de performance e atividade de usuários que consuma eventos vindos de webhooks, os persista, agregue, exiba em gráficos e atualize em tempo real. Além disso, utilize a OpenAI API para gerar insights automáticos sobre os dados."

Checklist para desenvolvimento do frontend. Itens concluídos marcados com :white_check_mark:.

# Índice

- [Tasks](#tasks)
- [Descrição](#description)

---

## Tasks

- [:white_check_mark:] Next.js (React) + TypeScript + TailwindCSS
- [:white_check_mark:] Página protegida com login
- [:white_check_mark:] Autenticação leve (JWT / sessão)
- [ ] Visualização: Chart.js / ApexCharts / Echarts
- [ ] Tempo real: WebSocket (ex: socket.io)
- [ ] Integrações externas: Webhook + OpenAI API
- [ ] Gráficos interativos que mostrem:
  - Volume de eventos ao longo do tempo (linha/área)
  - Distribuição por tipo (pizza/bar)
  - Top N usuários por valor/frequência
- [ ] Card com insight gerado pela OpenAI baseado nos dados mais recentes
- [ ] Feed ou contador em tempo real refletindo novos eventos (via WebSocket)
- [ ] Filtros: intervalo de tempo e tipo de evento
- [ ] Indicador de “última atualização” / saúde (ex: “há 12s desde o último evento”)
- [ ] README.md com:
  - [:white_check_mark:] Como rodar localmente (sem Docker)
  - [ ] Como rodar localmente (com Docker)
  - [ ] Escolha de banco de dados e justificativa
  - [ ] Como disparar o webhook (ex: exemplo com curl)
  - [ ] Como obter/atualizar o insight da OpenAI (configuração de chave via .env.example)
- [ ] Endpoint de webhook documentado (payload de exemplo)
- [ ] Dashboard funcional com:
  - Gráficos com dados
  - Atualizações em tempo real
  - Insight da OpenAI exibido
- [:white_check_mark:] (Opcional) Deploy mínimo (ex: Vercel frontend + backend acessível via túnel/ngrok ou hospedado)

## Descrição

Projeto: Painel de Trader com IA e Gráficos

Desenvolvimento e manutenção de um Painel de Trader já estruturado, com foco em gráficos, IA e integração com corretoras.

- Análise de gráficos de candles
- Bot baseado em IA estilo ChatGPT
- Módulos com liberação por produto adquirido
- Dashboard com métricas operacionais
- Integração com corretora via API
- Área de membros com permissões
- Funções manuais e automáticas para operações

### STACKS USADAS:

- React.js / Next.js
- JavaScript / TypeScript
- TailwindCSS
- Gráficos: Chart.js / ApexCharts / Echarts
- Integrações: API REST, Webhooks, OpenAI API
- Real-time: WebSocket
