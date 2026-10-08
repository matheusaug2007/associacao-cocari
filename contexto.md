# Contexto do Portal da Associação Atlética Cocari

## Objetivo e situação atual

Portal para associados da cooperativa Cocari, com prioridade para celulares e suporte a computadores. O protótipo disponível é composto por HTML, CSS, JavaScript e imagens em pasta imagens. Não há arquivos PHP, banco de dados, esquema ou autenticação real nesta pasta. PHP está instalado no ambiente, mas isso não identifica qual serviço de associados ou infraestrutura a cooperativa usa.

## Direção técnica

PHP faz sentido se o servidor e os sistemas internos já usam PHP e há uma fonte autorizada para cadastro e agenda. A linguagem, sozinha, não autentica associados nem impede conflitos entre reservas. Antes de converter o protótipo em portal operacional, localizar o sistema e banco existentes e as regras de acesso. Manter o protótipo atual enquanto se planeja a integração permite validar a experiência sem presumir tabelas ou duplicar cadastros. Não presumir SQL Maestro/PHP Generator sem encontrar um projeto .pgtm.

## Catálogo e valores informados

- Ginásio de Esportes: R$ 60 por horário selecionado.
- Campo de Futebol 01: R$ 140 por horário selecionado.
- Campo de Futebol 02: R$ 140 por horário selecionado.
- Campo de Futebol 03: R$ 120 por horário selecionado.
- Massagem Terapêutica Feminina: preço e agenda a confirmar.
- Quadras beach tennis 01, 02, 03 e 04: preços a confirmar.
- Beach tennis 1 Saibro Antiga (lado dos quiosques), 2 Saibro Nova (lado do quiosque 03) e 03 Quadra Rápida: preços a confirmar. Não está definido se essas descrições correspondem às quadras 01-04 ou se são espaços adicionais. Confirmar antes de publicar o inventário oficial.
- Quiosque 02: capacidade 50; Quiosque 03: capacidade 20; Quiosque 04: capacidade 40; Quiosque Nobre: capacidade 70. Preços e faixas de horário a confirmar.
- Salão Social com churrasqueira: R$ 808,50 por evento.
- Salão Social completo: R$ 1.617,00 por evento.
- Cada horário selecionado recebe o valor informado para aquele espaço. Os horários apresentados para ginásio, campos e beach tennis são 09:00 às 10:30, 10:30 às 11:59, 12:00 às 13:29, 13:30 às 14:59, 15:00 às 16:29, 16:30 às 17:59, 18:00 às 19:29, 19:30 às 21:00 e 21:00 às 22:30. A interface mostra o preço em um campo separado após a escolha do espaço/variação; os horários não exibem preço. A secretaria confirma a disponibilidade. Não inventar tarifas pendentes.

## Processo de locação e atendimento

WhatsApp da secretaria: +55 44 99936-4314, https://wa.me/5544999364314. Telefone: (44) 3233-8839. Endereço: Rodovia BR-376, km 395, Mandaguari, PR. O perfil ou endereço do Instagram não foi fornecido.

O protótipo abre uma mensagem preenchida no WhatsApp. Isso não consulta agenda nem confirma reserva. No portal real, consultar disponibilidade e criar a reserva no servidor antes da confirmação. Definir prazo, cancelamento, duração, horários de funcionamento e pagamento. Não publicar um PIX de demonstração como meio de pagamento.

## Dados do associado

A referência imagens/dados.png mostra nome, nascimento, CPF, RG, celular/WhatsApp, e-mail e endereço residencial (CEP, logradouro e número). A interface prevê complemento. O associado não pode editar CPF nem data de nascimento; correções vão para a secretaria. Quando existir autenticação, dados devem vir do cadastro oficial. Os campos editáveis neste protótipo não salvam no cadastro.

## Segurança e privacidade

- Exigir autenticação antes de consultar ou alterar cadastro individual.
- Bloquear CPF e nascimento também no servidor, não só com atributo readonly.
- Validar alterações no servidor e seguir a política de auditoria do clube.
- Não incluir dados pessoais na mensagem WhatsApp de locação sem necessidade autorizada.
- Não expor senhas em HTML ou JavaScript.
- Conferir pagamentos no provedor adotado pelo clube e calcular preços no servidor.

## MCPs de interface

A configuração .agents/mcp_config.json foi preparada para Antigravity (Watermelon, shadcn e GSAP Master comunitário). components.json lista Prompt Kit, Motion Primitives e Watermelon. O handshake remoto do Watermelon respondeu; shadcn e GSAP dependem de Node.js e acesso ao npm. Os componentes dos registries são React: servem como referência a adaptar, não estão instalados no site.

## Próximos dados para o portal real

Localizar o projeto PHP de produção, o banco autorizado e o método de login. Confirmar se as quadras beach tennis são espaços distintos, as tarifas da massagem/quadras/quiosques, horários de funcionamento, duração, confirmação, pagamento e cancelamento. Implementar PHP seguindo os padrões reais depois de obter essas informações.

Na tela, o catálogo mostra seis categorias recolhidas. As variações e os respectivos preços aparecem somente ao abrir a categoria. Na solicitação, o associado escolhe data e horário; o valor aparece em campo separado depois que escolhe espaço e variação. Ginásio, campos e quadras beach tennis usam os horários informados acima, e a secretaria confirma a disponibilidade. O único atalho persistente de WhatsApp é o botão flutuante no canto inferior direito. A barra inferior fica disponível em todas as telas internas e o atalho central abre Meu Perfil.
