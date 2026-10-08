# Contexto do Portal da Associação Atlética Cocari

> **Última atualização:** 08/10/2026  
> **Status do documento:** contexto funcional e técnico inicial para desenvolvimento  
> **Objetivo:** servir como fonte de contexto para Codex, Antigravity e demais agentes/IA utilizados no desenvolvimento do portal.

---

## 1. Visão geral do projeto

A Associação Atlética Cocari possui atualmente um sistema terceirizado utilizado pelos associados para consultar dados pessoais, realizar locações de espaços, visualizar débitos e pagamentos e acessar outros serviços relacionados à associação.

O objetivo do novo projeto é **internalizar esse sistema dentro da cooperativa**, reduzindo a dependência de terceiros, eliminando o custo recorrente do sistema atual e permitindo que a própria equipe de desenvolvimento da Cocari evolua a solução.

O sistema atual atende às necessidades básicas, porém possui problemas importantes de experiência de uso, navegação, aparência, controle de pagamentos e flexibilidade para evoluções.

Já existe um **protótipo próprio em HTML, CSS e JavaScript**, criado para validar a nova experiência visual. Esse protótipo deve ser preservado como referência de interface e evoluído para um sistema operacional completo.

O novo portal deve ser pensado principalmente para uso em celulares, mas também deve funcionar corretamente em computadores.

---

## 2. Objetivos principais

O novo portal deve:

- centralizar os serviços da Associação Atlética Cocari;
- oferecer uma interface moderna, simples e fácil de navegar;
- permitir que associados consultem e atualizem informações permitidas do perfil;
- permitir consulta e reserva/solicitação de espaços;
- impedir conflitos de agenda;
- controlar corretamente o ciclo financeiro de cada reserva;
- permitir pagamento por PIX, caso a integração seja aprovada;
- manter histórico de reservas e pagamentos;
- enviar notificações relevantes por e-mail;
- disponibilizar uma área administrativa para a equipe da associação;
- permitir futuras integrações com sistemas internos da cooperativa;
- eliminar regras críticas mantidas apenas manualmente ou na memória das pessoas.

---

## 3. Situação atual

### 3.1 Sistema terceirizado

O sistema atual possui login, porém o acesso não é necessariamente criado antecipadamente para todos os associados.

Normalmente o cadastro/acesso é criado quando o associado precisa utilizar algum serviço da associação, principalmente a locação de espaços.

Entre as funcionalidades visíveis no sistema atual estão:

- atualização cadastral;
- carteirinha virtual;
- locação de espaços;
- consulta de débitos;
- histórico/consulta de pagamentos;
- perfil do associado.

A locação de espaços é atualmente uma das principais funcionalidades do portal.

### 3.2 Problemas percebidos no sistema atual

- interface visual antiga;
- navegação pouco intuitiva;
- experiência ruim principalmente quando comparada ao novo protótipo;
- dependência de fornecedor externo;
- custo do sistema terceirizado;
- controle financeiro insuficiente;
- pagamentos podem ficar pendentes sem que haja acompanhamento adequado;
- não existe hoje um fluxo robusto de cobrança, lembrete e confirmação de pagamento;
- o processo de reserva precisa ser revisto para definir se determinados pedidos devem ou não passar por aprovação.

---

## 4. Protótipo do novo portal

Existe um protótipo visual desenvolvido em HTML, CSS e JavaScript.

A direção visual atual é considerada adequada e deve ser mantida como base, evitando reconstruir a interface sem necessidade.

A navegação proposta no protótipo possui como áreas principais:

- **Início**;
- **Nova Reserva / Reservar**;
- **Minhas Reservas**;
- **Financeiro**;
- **Meu Perfil**.

O protótipo utiliza abordagem **mobile first** e apresenta uma interface mais moderna, limpa e amigável do que o portal terceirizado atual.

Também existe um botão flutuante de WhatsApp como atalho de contato com a associação.

---

## 5. Associado

O portal é destinado principalmente aos associados da Associação Atlética Cocari.

O associado é, em regra, uma pessoa vinculada à cooperativa, mas o relacionamento exato entre colaborador e associado deve ser confirmado com a área responsável.

### 5.1 Identificação

O sistema atual apresenta uma **matrícula/título do associado**.

A matrícula deve ser tratada como **identificador de negócio**, e não necessariamente como chave primária do banco de dados do novo portal.

Exemplo conceitual:

```text
Associado
---------------------------------
idAssociado       -> chave interna
matricula         -> identificador externo/negócio
idColaborador     -> integração futura, se existir
nome
email
telefone
...
```

Antes de criar a estrutura definitiva de associados, deve ser localizado o **cadastro oficial existente na cooperativa** e definido se os dados serão consultados diretamente, sincronizados ou integrados por API/serviço.

Não duplicar cadastros corporativos sem necessidade.

### 5.2 Dados apresentados atualmente

O sistema atual trabalha com informações como:

- nome;
- matrícula/título;
- data de nascimento;
- CPF;
- RG;
- celular/WhatsApp;
- e-mail;
- CEP;
- logradouro;
- número;
- complemento;
- bairro;
- cidade.

CPF e data de nascimento não devem ser livremente alteráveis pelo associado sem uma regra formal de correção cadastral.

Alterações críticas devem ser validadas no servidor e, se necessário, encaminhadas para a secretaria/área responsável.

---

## 6. Espaços e serviços reserváveis

O sistema deve trabalhar com um modelo genérico de **espaço/serviço reservável**, evitando implementar uma regra completamente diferente para cada local.

Uma categoria pode possuir uma ou várias unidades/variações.

Exemplo:

```text
Categoria
Campo de Futebol

Unidades
- Campo 01
- Campo 02
- Campo 03
```

### 6.1 Categorias conhecidas

Atualmente foram identificadas as seguintes categorias:

- Ginásio de Esportes;
- Campo de Futebol;
- Massagem Terapêutica Feminina;
- Quadras de Beach Tennis;
- Quadra de Tênis;
- Quiosques;
- Salão Social.

### 6.2 Variações conhecidas

#### Campo de Futebol

Existem **3 campos**.

Os valores informados durante o levantamento apresentam divergência e devem ser confirmados antes da implementação definitiva.

#### Quiosques

Existem **4 quiosques** conhecidos.

Foram identificadas referências a:

- Quiosque 02;
- Quiosque 03;
- Quiosque 04;
- Quiosque Nobre.

Os quiosques possuem capacidades diferentes e os valores podem variar de acordo com o espaço.

Capacidades já registradas no levantamento anterior:

- Quiosque 02: 50 pessoas;
- Quiosque 03: 20 pessoas;
- Quiosque 04: 40 pessoas;
- Quiosque Nobre: 70 pessoas.

Valores precisam ser confirmados.

#### Quadras de Beach Tennis

Há múltiplas quadras.

Em um levantamento foram mencionadas **4 quadras**, porém também existem descrições/nomenclaturas diferentes que ainda precisam ser reconciliadas com o cadastro oficial.

Não assumir quantidade, nomes ou tarifas definitivas antes da confirmação.

#### Quadra de Tênis

Existem variações/regras que ainda precisam ser levantadas.

Foi mencionado durante a conversa que existe uma quadra com valor de aproximadamente **R$ 60,00**, porém ainda é necessário confirmar a qual espaço esse valor pertence.

#### Salão Social

Foram encontrados anteriormente dois formatos de locação:

- Salão Social com churrasqueira;
- Salão Social completo.

Valores anteriores registrados no levantamento:

- Salão Social com churrasqueira: R$ 808,50 por evento;
- Salão Social completo: R$ 1.617,00 por evento.

Esses valores devem ser confirmados antes da publicação.

#### Massagem Terapêutica Feminina

Existe como serviço no sistema atual.

Preço, agenda, duração, profissional responsável e forma de reserva ainda precisam ser confirmados.

---

## 7. Valores e tarifas

Os valores **não devem ficar fixos no código**.

Eles devem ser mantidos em banco/configuração administrativa e associados ao espaço/unidade correspondente.

Também deve ser armazenado na própria reserva o valor cobrado naquele momento.

Exemplo:

```text
Reserva
---------------------------------
idReserva
idEspaco
idAssociado
data
horario
valorCobrado
status
...
```

Isso evita que uma alteração futura de preço modifique o histórico de reservas antigas.

### 7.1 Divergências atualmente existentes

Há informações conflitantes entre levantamentos anteriores e a conversa mais recente.

Foram mencionados, em momentos diferentes:

- Ginásio por R$ 60,00;
- uma quadra por R$ 60,00;
- campos com valores de R$ 120,00 e R$ 140,00;
- anteriormente também foram registrados dois campos por R$ 140,00 e um por R$ 120,00.

**Não escolher automaticamente qual informação está correta.**

Todos os valores devem ser confirmados com a Associação antes da implementação definitiva.

---

## 8. Horários

Já foi levantado anteriormente um conjunto de faixas de horários utilizado em alguns espaços:

- 09:00 às 10:30;
- 10:30 às 11:59;
- 12:00 às 13:29;
- 13:30 às 14:59;
- 15:00 às 16:29;
- 16:30 às 17:59;
- 18:00 às 19:29;
- 19:30 às 21:00;
- 21:00 às 22:30.

Não assumir que todos os espaços usam exatamente essas mesmas faixas.

Cada categoria/unidade deve poder possuir sua própria grade de disponibilidade.

---

## 9. Modelo de reservas

A reserva deve ser tratada como uma entidade central do sistema.

Fluxo conceitual:

```text
Associado
   |
   v
Escolhe espaço
   |
   v
Escolhe data e horário
   |
   v
Sistema valida disponibilidade
   |
   v
Cria solicitação/reserva
   |
   +--> aprovação automática OU manual
   |
   v
Pagamento
   |
   v
Reserva concluída
```

### 9.1 Conflitos de agenda

O servidor deve impedir duas reservas incompatíveis para o mesmo espaço, data e horário.

Essa regra não pode existir apenas no JavaScript da interface.

A validação precisa ocorrer no backend e, idealmente, também ser protegida por mecanismos no banco/transação para evitar condições de corrida.

### 9.2 Aprovação

No sistema atual, quando um horário aparece disponível, o associado consegue reservá-lo sem um processo formal de aprovação.

Para o novo sistema existe a ideia de permitir um fluxo de **aprovação ou recusa** pela equipe da associação.

Essa regra ainda precisa ser confirmada.

Uma possibilidade é tornar a aprovação configurável por categoria:

```text
Beach Tennis -> aprovação automática
Campo        -> aprovação automática
Quiosque     -> aprovação manual
Salão Social -> aprovação manual
```

O exemplo acima é apenas uma possibilidade de produto e **não deve ser tratado como regra definida**.

### 9.3 Status sugeridos

O sistema deve ser preparado para trabalhar com estados claros.

Exemplo inicial:

```text
SOLICITADA
AGUARDANDO_APROVACAO
APROVADA
RECUSADA
AGUARDANDO_PAGAMENTO
PAGA
CANCELADA
CONCLUIDA
```

A lista definitiva deve ser definida durante a modelagem do fluxo.

---

## 10. Financeiro

O módulo financeiro é uma parte importante do novo portal.

Hoje existe histórico de pagamentos, porém o controle não é considerado suficiente.

Um problema relatado é que uma pessoa pode reservar um horário e não realizar o pagamento. Caso ninguém acompanhe manualmente, a pendência pode passar despercebida.

O novo sistema deve permitir acompanhar claramente:

- valor da reserva;
- forma de pagamento;
- vencimento;
- situação do pagamento;
- data do pagamento;
- histórico;
- possíveis cancelamentos/estornos;
- pagamentos pendentes.

---

## 11. PIX

Existe interesse em permitir pagamento por PIX diretamente pelo portal.

O objetivo ideal não é apenas exibir uma chave PIX fixa, mas integrar uma cobrança individual por reserva.

Fluxo desejado:

```text
Reserva aprovada
      |
      v
Sistema solicita cobrança PIX
      |
      v
Provedor/banco retorna QR Code
+ código PIX Copia e Cola
      |
      v
Associado realiza pagamento
      |
      v
Provedor notifica o portal
      |
      v
Pagamento marcado como confirmado
```

A confirmação automática normalmente depende de integração com banco/gateway/provedor e webhook.

Nenhum provedor foi definido ainda.

Não implementar integração PIX até que sejam definidos:

- instituição financeira/provedor;
- APIs disponíveis;
- credenciais e ambiente de homologação;
- fluxo de cobrança;
- expiração;
- cancelamento;
- estorno;
- conciliação.

---

## 12. Possível desconto em folha

Existe uma ideia de permitir pagamento de reservas através de **desconto em folha**, considerando que o associado pode ser colaborador da cooperativa.

Essa funcionalidade ainda é apenas uma hipótese de produto e precisa ser validada com RH, Financeiro e responsáveis pela folha.

Antes de desenvolver, confirmar:

- se o desconto é permitido;
- necessidade de autorização formal do colaborador;
- formato da integração;
- datas de fechamento da folha;
- tratamento de cancelamentos;
- estornos;
- desligamentos;
- limites de valor;
- regras contábeis/financeiras.

O sistema pode ser arquitetado para suportar múltiplas formas de pagamento futuramente, por exemplo:

```text
PIX
FOLHA
OUTRO
```

Mas **FOLHA não deve ser implementado como regra vigente sem aprovação formal**.

---

## 13. Lembretes e inadimplência

O novo portal deve corrigir o problema de reservas que ficam sem pagamento e são esquecidas.

É desejável existir:

- vencimento da cobrança;
- status de pagamento pendente;
- lembretes automáticos;
- identificação de atraso;
- regra clara para reserva não paga.

Exemplo de fluxo possível:

```text
Reserva aprovada
     |
     v
Aguardando pagamento
     |
     +--> lembrete
     |
     +--> novo lembrete
     |
     v
Vencimento
```

Após o vencimento, ainda precisa ser definido se a reserva será:

- cancelada automaticamente;
- mantida como débito;
- encaminhada para cobrança;
- tratada manualmente.

Essa decisão deve ser tomada pela Associação.

---

## 14. Notificações por e-mail

Existe interesse em utilizar e-mail para acompanhar o fluxo de reservas.

### Fluxo desejado

Ao criar uma solicitação:

1. o associado recebe confirmação de que o pedido foi registrado;
2. a equipe responsável recebe aviso de nova solicitação, se houver aprovação manual;
3. a equipe acessa o painel administrativo para aprovar ou recusar;
4. o associado recebe o resultado por e-mail;
5. o status também fica visível dentro do portal.

Evitar colocar ações administrativas sensíveis diretamente em links públicos de e-mail sem autenticação adequada.

O ideal é o e-mail direcionar o responsável para o painel administrativo.

Outros e-mails possíveis:

- reserva solicitada;
- reserva aprovada;
- reserva recusada;
- PIX disponível;
- lembrete de pagamento;
- pagamento confirmado;
- reserva cancelada;
- alteração de data/horário.

---

## 15. Área administrativa

Além do portal do associado, o projeto precisará de uma área para a equipe que administra a associação.

Módulos iniciais sugeridos:

```text
Dashboard
Solicitações
Agenda
Reservas
Espaços
Unidades / variações
Preços
Horários
Pagamentos
Associados
Bloqueios de agenda
Configurações
Auditoria
```

A lista pode mudar conforme as regras forem levantadas.

Ações administrativas relevantes devem registrar usuário, data/hora e alteração realizada.

---

## 16. Arquitetura técnica recomendada

### 16.1 Situação atual

O protótipo está em:

- HTML;
- CSS;
- JavaScript.

A equipe da cooperativa utiliza PHP e PHPGenerator em sistemas internos.

### 16.2 Recomendação atual

Para este portal, a recomendação técnica inicial é:

```text
Frontend
Laravel Blade + HTML + CSS + JavaScript

Backend
PHP + Laravel

Banco
A definir conforme infraestrutura corporativa

Integrações futuras
Cadastro corporativo
E-mail
PIX
Folha de pagamento
```

### 16.3 Motivos

Laravel é recomendado porque o projeto envolve:

- autenticação;
- autorização;
- dados pessoais;
- regras de reserva;
- concorrência de horários;
- envio de e-mail;
- jobs/filas;
- integrações externas;
- webhooks;
- pagamentos;
- auditoria;
- área administrativa;
- aplicação pública na internet.

### 16.4 PHPGenerator

O PHPGenerator continua adequado para vários sistemas administrativos internos da cooperativa, porém **não é a primeira escolha recomendada para o portal público da associação**.

Ele pode eventualmente ser utilizado em alguma ferramenta administrativa separada caso exista uma necessidade real, mas as regras críticas de negócio não devem ficar duplicadas entre sistemas diferentes.

### 16.5 React

React não é considerado necessário na primeira versão.

Laravel Blade + JavaScript pode atender o portal com menor complexidade operacional e permitir reaproveitamento do protótipo existente.

React pode ser reconsiderado caso surja uma necessidade técnica concreta.

---

## 17. Modelo de domínio inicial

Entidades conceituais que provavelmente existirão:

```text
Associado
Usuario
Perfil / Permissao
EspacoCategoria
EspacoUnidade
HorarioDisponivel
BloqueioAgenda
Reserva
ReservaHistorico
Pagamento
FormaPagamento
Cobranca
Notificacao
Auditoria
```

Isso é um **modelo conceitual**, não um esquema de banco definitivo.

Não criar tabelas definitivas apenas com base nesses nomes antes de validar integrações e regras reais.

---

## 18. Segurança e privacidade

Como o portal trabalhará com dados pessoais e ficará disponível na internet, segurança deve fazer parte da arquitetura desde o início.

Requisitos básicos:

- autenticação obrigatória para dados privados;
- senhas nunca armazenadas em texto puro;
- usar hashing seguro fornecido pelo framework;
- proteção contra CSRF;
- validação de entrada no backend;
- autorização por perfil/permissão;
- rate limiting onde fizer sentido;
- sessões seguras;
- logs de ações administrativas;
- não confiar em valores enviados pelo navegador;
- calcular preços e regras críticas no servidor;
- não expor credenciais em HTML ou JavaScript;
- proteger CPF, nascimento e demais campos sensíveis;
- limitar acesso de funcionários somente ao necessário;
- seguir as políticas internas da Cocari e os requisitos aplicáveis de proteção de dados.

---

## 19. Regras importantes para o desenvolvimento

### Regra 1 - Não inventar regras

Quando uma informação estiver marcada como **A CONFIRMAR**, o agente/desenvolvedor não deve tomar uma decisão sozinho e transformá-la em regra definitiva.

### Regra 2 - Não inventar preços

Tarifas só podem ser consideradas definitivas depois de confirmação oficial.

### Regra 3 - Não inventar banco corporativo

Antes de criar cadastros duplicados, descobrir onde estão os dados oficiais dos associados/colaboradores.

### Regra 4 - Backend é a fonte das regras

Disponibilidade, valores, permissões e estados financeiros devem ser validados pelo servidor.

### Regra 5 - Evitar lógica crítica apenas no frontend

JavaScript pode melhorar a experiência, mas não deve ser a única barreira de segurança ou validação.

### Regra 6 - Manter histórico

Mudanças de preço não devem alterar reservas antigas.

### Regra 7 - Evitar duplicidade de reserva

Não permitir duas reservas incompatíveis para o mesmo espaço/data/horário.

### Regra 8 - Preservar a nova direção visual

O novo protótipo é a referência visual atual do produto.

Alterações de interface devem priorizar clareza, simplicidade e experiência mobile.

---

## 20. Fluxo geral desejado

```text
LOGIN
  |
  v
PORTAL DO ASSOCIADO
  |
  +--> Meu Perfil
  |
  +--> Nova Reserva
  |       |
  |       v
  |    Escolher espaço
  |       |
  |       v
  |    Escolher unidade
  |       |
  |       v
  |    Escolher data/horário
  |       |
  |       v
  |    Validar disponibilidade
  |       |
  |       v
  |    Criar solicitação
  |       |
  |       +--> Aprovação, se necessária
  |       |
  |       v
  |    Gerar cobrança
  |       |
  |       v
  |    Pagamento
  |       |
  |       v
  |    Reserva confirmada
  |
  +--> Minhas Reservas
  |
  +--> Financeiro
  |
  +--> Histórico
```

---

## 21. Decisões já tomadas ou fortemente direcionadas

| Tema | Situação |
|---|---|
| Internalizar o sistema | DEFINIDO |
| Substituir gradualmente a solução terceirizada | DEFINIDO |
| Portal mobile first | DEFINIDO |
| Aproveitar o protótipo atual | DEFINIDO |
| Reserva de espaços como módulo central | DEFINIDO |
| Financeiro integrado à reserva | DEFINIDO |
| Histórico de pagamentos | DEFINIDO |
| Controle de pagamentos pendentes | DEFINIDO |
| Envio de e-mails | DESEJADO |
| PIX integrado | DESEJADO / A VALIDAR |
| Desconto em folha | IDEIA FUTURA / A VALIDAR |
| Laravel | RECOMENDAÇÃO TÉCNICA ATUAL |
| PHPGenerator no portal público | NÃO RECOMENDADO COMO PRIMEIRA OPÇÃO |
| React | NÃO NECESSÁRIO NA PRIMEIRA VERSÃO |
| Aprovação manual de reservas | A CONFIRMAR |
| Cadastro oficial do associado | A LOCALIZAR |
| Banco definitivo | A DEFINIR |
| Valores oficiais | A CONFIRMAR |

---

## 22. Pendências para levantamento com a Associação

Antes de fechar a modelagem e iniciar partes críticas do backend, obter respostas para:

1. Quem pode ser associado?
2. Qual sistema mantém o cadastro oficial dos associados?
3. Existe relação direta com matrícula de colaborador?
4. Existe autenticação corporativa que pode ser reutilizada?
5. Quais espaços existem oficialmente?
6. Quais são todas as unidades/variações de cada espaço?
7. Quais são os valores oficiais atuais?
8. Quais horários cada espaço utiliza?
9. Existem dias/horários especiais?
10. Como são registrados bloqueios de agenda?
11. Uma reserva precisa de aprovação?
12. A regra de aprovação muda conforme o espaço?
13. Quem pode aprovar ou recusar?
14. É necessário registrar motivo da recusa?
15. Qual prazo existe para pagamento?
16. O que acontece quando não há pagamento?
17. Como funciona cancelamento?
18. Existe multa/taxa de cancelamento?
19. Existe estorno?
20. Qual é o fluxo financeiro utilizado hoje?
21. Qual banco/instituição financeira seria utilizado para PIX?
22. Existe API disponível para PIX?
23. O desconto em folha é permitido?
24. Qual equipe deve receber notificações de novas solicitações?
25. Quais e-mails devem ser enviados ao associado?
26. Quais relatórios a Associação precisa?
27. Há dependentes e eles podem reservar?
28. Existe limite de reservas simultâneas por associado?
29. Existem restrições por inadimplência?
30. Um associado com débito pode fazer nova reserva?

---

## 23. Pendências técnicas

- localizar infraestrutura disponível para hospedar o portal;
- confirmar versão de PHP permitida;
- confirmar banco de dados padrão da cooperativa;
- verificar servidor web utilizado;
- definir estratégia de deploy;
- definir ambientes de desenvolvimento, homologação e produção;
- localizar fonte oficial de associados;
- estudar autenticação existente;
- escolher serviço/provedor de e-mail;
- avaliar integração PIX;
- avaliar integração com folha;
- definir estratégia de backup;
- definir logs e monitoramento;
- definir política de auditoria.

---

## 24. Instruções para agentes de IA / Codex

Antes de implementar qualquer funcionalidade deste projeto:

1. Leia este documento por completo.
2. Consulte os arquivos complementares existentes na pasta `docs/`, se houver.
3. Diferencie claramente **definido**, **recomendado**, **desejado** e **a confirmar**.
4. Nunca transforme uma informação marcada como "a confirmar" em regra definitiva.
5. Nunca invente preços, tabelas corporativas, credenciais, APIs ou integrações.
6. Preserve a direção visual do protótipo salvo orientação contrária.
7. Priorize experiência mobile.
8. Reutilize componentes e padrões existentes antes de criar alternativas paralelas.
9. Mantenha regras críticas no backend.
10. Evite duplicação de regras entre portal público e área administrativa.
11. Ao encontrar uma decisão necessária que não esteja documentada, informe a pendência antes de implementar.
12. Não criar complexidade desnecessária apenas para utilizar uma tecnologia específica.
13. Para funcionalidades financeiras, priorizar rastreabilidade e histórico.
14. Para reservas, garantir proteção contra conflito e concorrência.
15. Para dados pessoais, priorizar segurança e princípio de menor privilégio.

---

## 25. Princípio do projeto

O objetivo não é apenas recriar o sistema terceirizado com outra aparência.

O novo portal deve manter o que funciona, corrigir os processos frágeis e permitir que a Cocari tenha controle sobre a evolução da solução.

A interface deve continuar simples para o associado, enquanto regras de reserva, pagamentos, notificações, auditoria e integrações ficam organizadas de forma segura no backend.

**O protótipo atual representa a direção visual. Este documento representa a direção funcional e técnica inicial.**
