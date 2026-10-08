# MCPs de interface — Associação Atlética Cocari

A configuração local do Antigravity está em `.agents/mcp_config.json`.

| Servidor | Configuração | Verificação |
| --- | --- | --- |
| watermelon | https://mcp.watermelon.sh/mcp | Health e handshake MCP responderam em 06/10/2026 |
| shadcn | shadcn@4.21.3 via npx | Pacote e registries conferidos; execução pendente de Node.js |
| gsap-master | @vinhnguyen/gsap-mcp@1.1.2 via npx | Pacote comunitário conferido; execução pendente de Node.js |

`components.json` configura os catálogos @prompt-kit, @motion-primitives e @watermelon. Os três endpoints registry.json responderam na verificação. As versões dos servidores locais foram fixadas para evitar atualizações automáticas do pacote principal.

## Ativação no Windows

1. Instale Node.js LTS a partir de https://nodejs.org/. O shadcn configurado requer Node >= 20.18.1. A instalação automática não foi concluída porque as conexões de download foram interrompidas nesta máquina.
2. Feche e reabra o Antigravity para atualizar o PATH e carregar `.agents/mcp_config.json`. Abra esta pasta como workspace.
3. Abra MCP Servers → Manage MCP Servers e atualize os servidores. Confira o estado conectado e as ferramentas de cada um.
4. Se sua versão do IDE não carregar a configuração local, abra View raw config e incorpore as entradas mcpServers deste projeto, preservando os servidores já existentes.

Os comandos usam cmd /c npx para compatibilidade com Windows. Na primeira inicialização, npx baixa os pacotes e suas dependências; é necessário acesso ao registry npm. O cwd está fixado no caminho S:\matheus.lopes\_Projetos\associacao-cocari; ajuste se mover o projeto ou usar outra unidade de rede.

## Uso no site atual

O site usa HTML, CSS e JavaScript puro. O arquivo components.json é uma configuração de consulta de catálogos: não instala React, Tailwind, Motion ou GSAP no site. Os campos de estilo e aliases satisfazem o formato do shadcn; não representam uma aplicação React pronta para instalação de componentes.

A regra `.agents/rules/ui-mcp.md` orienta o agente a consultar referências e adaptá-las ao site. Exemplo de pedido:

> Consulte o Watermelon e o Motion Primitives para propor uma animação de entrada dos cards. Adapte a referência ao HTML, CSS e JavaScript atuais e respeite prefers-reduced-motion.

O servidor gsap-master é comunitário e não é uma integração oficial da GSAP. A instalação dos MCPs fornece ferramentas ao agente; a implementação de componentes ou animações nas páginas é um trabalho separado.

## Documentação

- Antigravity: https://antigravity.google/docs/mcp
- Watermelon: https://ui.watermelon.sh/developers/mcp
- shadcn MCP: https://ui.shadcn.com/docs/mcp
- GSAP MCP comunitário: https://github.com/glorynguyen/gsap-mcp
