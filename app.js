/* Flexibility Lens · Fellipe Silva Martins and Lidiane da Silva Souza
   Data: Souza & Martins, Article 3 of L. S. Souza's doctoral thesis (N = 210, PAPRIKA / 1000minds).
   Portuguese texts follow the instrument applied in 1000minds (Quadro 4.3) and the thesis's profile names. */
(function () {
"use strict";

/* ---------- Research data (language-independent) ---------- */
const ORDER = ["AA", "PA", "CS", "AD"];
const DIM_N = { AA: "01", PA: "02", CS: "03", AD: "04" };
const SAMPLE = { AA: 26.4, PA: 26.3, CS: 24.9, AD: 22.3 };
// Profile averages: the two prioritized and the least valued weights are from Table 4.6; the fourth is the remainder to 100%.
const PROFILES = {
  OE: { pair: ["AA", "PA"], n: 22, pct: 10.5, w: { AA: 44.6, PA: 29.1, CS: 11.8, AD: 14.5 }, opp: ["SE"], axis: 1 },
  AT: { pair: ["PA", "AA"], n: 18, pct: 8.6, w: { AA: 29.3, PA: 40.1, CS: 17.5, AD: 13.1 }, opp: ["SE"], axis: 1 },
  SE: { pair: ["AD", "CS"], n: 37, pct: 17.6, w: { AA: 17.2, PA: 18.3, CS: 31.6, AD: 32.9 }, opp: ["OE", "AT"], axis: 1 },
  AJ: { pair: ["CS", "PA"], n: 32, pct: 15.2, w: { AA: 16.6, PA: 32.4, CS: 33.7, AD: 17.3 }, opp: ["SX"], axis: 2 },
  SX: { pair: ["AA", "AD"], n: 22, pct: 10.5, w: { AA: 34.0, PA: 19.1, CS: 16.8, AD: 30.1 }, opp: ["AJ"], axis: 2 },
  CR: { pair: ["AA", "CS"], n: 41, pct: 19.5, w: { AA: 31.5, PA: 20.5, CS: 31.2, AD: 16.8 }, opp: ["AE"], axis: 3 },
  AE: { pair: ["PA", "AD"], n: 33, pct: 15.7, w: { AA: 20.8, PA: 32.6, CS: 20.2, AD: 26.4 }, opp: ["CR"], axis: 3 }
};
const AXES = [{ id: 1, a: ["OE", "AT"], b: ["SE"] }, { id: 2, a: ["AJ"], b: ["SX"] }, { id: 3, a: ["CR"], b: ["AE"] }];
const V = { h: 1, m: 0.5, l: 0 };   // value functions are practically linear (Fig. 4.2)

/* ---------- Texts ---------- */
const TX = {
en: {
  dims: {
    AA: { name: "Awareness of Alternatives", label: "Awareness of options", role: "the repertoire", q: "what",
      lv: { h: "Before making a decision, this person considers several alternatives and compares different paths, including options that are not the most obvious.",
            m: "Before deciding, this person recognizes some alternatives but focuses on the best-known options.",
            l: "When making decisions, this person considers only one alternative or fails to assess other possibilities." },
      me: { h: "Before making a decision, I consider several alternatives and compare different paths, including options that are not the most obvious.",
            m: "Before deciding, I recognize some alternatives but focus on the best-known options.",
            l: "When making decisions, I usually consider only one alternative and rarely assess other possibilities." },
      short: "Sees that, in any situation, several options and paths are available.",
      tip: "Before closing a decision, ask for at least three genuinely different options, one of which is not the obvious one, and look for information outside the usual sources." },
    PA: { name: "Processing Agility", label: "Thinking agility", role: "the conversion mechanism", q: "how",
      lv: { h: "This person adjusts their way of thinking to the situation, switching between intuition and analysis.",
            m: "This person can switch between ways of thinking, but with some difficulty or delay.",
            l: "This person always uses the same way of thinking, even when the situation calls for change." },
      me: { h: "I adjust my way of thinking to the situation, switching between intuition and analysis.",
            m: "I can switch between ways of thinking, but with some difficulty or delay.",
            l: "I tend to use the same way of thinking, even when the situation calls for change." },
      short: "Switches between intuition and analysis to match the problem.",
      tip: "Name the mode before deciding: is this a familiar problem that intuition can handle, or a new one that needs slow analysis? Set checkpoints where the team asks whether the approach should change." },
    CS: { name: "Context Sensitivity", label: "Situational diagnosis", role: "the signal", q: "where & when",
      lv: { h: "This person identifies changes in the environment and quickly adjusts their interpretation.",
            m: "This person perceives changes but is slow to adjust their decisions.",
            l: "This person does not perceive changes or keeps the same interpretation even when the context changes." },
      me: { h: "I identify changes in the environment and quickly adjust my interpretation.",
            m: "I perceive changes but am slow to adjust my decisions.",
            l: "I often miss changes, or keep the same interpretation even when the context changes." },
      short: "Picks up the signals that the usual response no longer works.",
      tip: "Agree on the early-warning signals for the project and review them at every meeting. Ask, on a fixed rhythm, what has changed since the plan was made." },
    AD: { name: "Agentic Disposition", label: "Executive readiness", role: "the readiness to act", q: "who",
      lv: { h: "When facing change, this person quickly starts adaptive actions.",
            m: "This person recognizes the need to act but is slow to start changes.",
            l: "This person avoids acting or keeps the same practices, even when change is needed." },
      me: { h: "When facing change, I quickly start adaptive actions.",
            m: "I recognize the need to act but am slow to start changes.",
            l: "I tend to avoid acting, or keep the same practices, even when change is needed." },
      short: "Believes they can adapt under pressure and is willing to act on it.",
      tip: "Shorten the gap between noticing and acting: run small, reversible experiments and agree in advance who acts when a warning signal appears." }
  },
  profiles: {
    OE: { name: "Option explorers", view: "sees many alternatives and knows how to think them through", qs: "what and how, led by what",
      read: "You locate flexibility in the work of thinking, above all in the breadth of the repertoire. Being able to see many paths matters most to you; reading the situation and acting fast matter much less." },
    AT: { name: "Agile thinkers", view: "knows how to change the way of thinking when facing the alternatives", qs: "how and what, led by how",
      read: "You locate flexibility in the work of thinking, led by the mechanism: switching between intuition and analysis as the problem demands. Readiness to act carries the least weight in your view." },
    SE: { name: "Situational executors", view: "perceives the signal of change and acts", qs: "where, when and who",
      read: "You see flexibility as a response to the situation: catching the signal that something changed and moving. Having a wide menu of alternatives matters less to you than noticing and acting." },
    AJ: { name: "Agile adapters", view: "perceives change and adjusts thinking as it happens", qs: "where, when and how",
      read: "You see flexibility as continuous adjustment: perceiving change and re-framing the problem while it unfolds. A wide repertoire and quick execution are secondary in your view." },
    SX: { name: "Strategic executors", view: "sees the options and commits to carrying them out", qs: "what and who",
      read: "You see flexibility as choice followed by execution: lay out the options, pick one and commit. Reading shifts in the environment carries the least weight for you." },
    CR: { name: "Context readers", view: "understands the situation and the options it offers", qs: "what, where and when",
      read: "You see flexibility as reading: understanding the situation and the options it opens. This is the most common view in the study. Readiness to act carries the least weight for you." },
    AE: { name: "Agile executors", view: "changes the way of thinking and acts", qs: "how and who",
      read: "You see flexibility as acting: shifting how you think and then moving. This profile is the least cohesive in the study, so expect your priorities to blend with neighbouring profiles." }
  },
  axes: { 1: ["Deliberation vs situated response", "The strongest axis in the study."], 2: ["Continuous adjustment vs choice and execution", "A clear axis in the study."], 3: ["Reading vs acting", "A weak axis: read it as a gradient."] },
  lvl: { h: "High", m: "Medium", l: "Low" },
  dec: ".",
  ui: {
    navMe: "Diagnostic", navTeam: "Team view", navAbout: "About", aboutHref: "about/",
    footLine: "A diagnostic of how people in project teams see cognitive flexibility.<br>By <strong>Fellipe Silva Martins</strong> and <strong>Lidiane da Silva Souza</strong>.",
    footAbout: "About this project", footCode: "Source code", footDiscH: "Disclaimer",
    footDisc: "This tool is for reflection and learning only. Its results are not a psychological or professional assessment, are not legally binding, and must not be used for hiring, promotion, dismissal, performance appraisal or any other employment decision. The authors and developers accept no responsibility for the results, their interpretation or any use made of them.",
    footPriv: "Your answers stay in your browser and are not sent anywhere.",
    eyebrow: "Cognitive flexibility · Project teams",
    lead: "What makes someone flexible, in your eyes? People in project teams judge it by different criteria. Answer a few trade-offs, about three minutes, and see which of seven views of flexibility yours is closest to, what it tends to overlook, and who would complement it.",
    go: "Start the diagnostic", sample: "See a sample diagnostic",
    aboutLine: "Based on a study with 210 project professionals.", aboutLink: "About this project →",
    squareCap: "The seven profiles found in the study. Each line links the two dimensions a profile values most; the percentage is its share of the participants. Lines that share no corner are opposite views.",
    squareAria: "The four dimensions of cognitive flexibility at the corners of a square; each line is a profile that prioritizes the two dimensions it links.",
    fourDims: "Four dimensions of flexibility", before: "Before you start", answeringAs: "I'm answering as",
    roleMember: "a project team member", roleManager: "a project manager or leader",
    howTo: "You will see two people at a time. They differ on two traits only; everything else about them is the same. Pick the one who is more flexible in the way they think, or say they are equal. There are no right answers.",
    discH: "Not legally binding",
    disc: "This is a reflection tool, not a test. The diagnostic is not legally binding and must not be used for hiring, promotion, appraisal or any other employment decision. The authors and developers accept no responsibility for the results or how they are used.",
    startQuiz: "Start the trade-offs",
    tradeoff: n => `Trade-off ${n}`, lastOne: " · the last one", progress: (d, t) => `${d} of about ${t}`,
    prompt: "Which of these two people has more <strong>flexibility</strong> in the way they think?",
    person: "Person", same: "Same as the other person on everything else.", equal: "They are equal", back: "Back",
    quizHint: "Judge the people, not yourself. If both seem flexible in different ways, choose the one you would trust more to change course when a project needs it. Keyboard: A, B or E.",
    selfEyebrow: "Optional · four quick items", selfTitle: "Now, how do <strong>you</strong> usually act?",
    selfLead: "The trade-offs captured what you value in a flexible decision-maker. This short self-check adds how you see your own behaviour in projects, so the diagnostic can point out gaps. Pick the sentence closest to you, or skip it.",
    see: "See my diagnostic", skip: "Skip the self-check", backQuiz: "Back to the trade-offs",
    exampleFlag: "Example diagnostic with made-up answers", yourDiag: "Your diagnostic",
    closest: name => `Your view of flexibility is closest to <strong>${name}</strong>`,
    quote: view => `For you, a flexible decision-maker is someone who ${view}.`,
    ofParticipants: "of the 210 participants", choicesMade: "choices made",
    mineCap: "Solid red: your profile. Dashed: the opposite view, which shares no dimension with yours.",
    mineAria: name => `Your profile, ${name}, is highlighted; the dashed line marks the opposite profile.`,
    weighTitle: "How you weigh the four dimensions",
    weighLead: qs => `Each weight is the value you place on moving someone from low to high on that dimension; the four add up to 100%. Your profile prioritizes the questions <strong style="font-weight:500;color:var(--ink)">${qs}</strong>.`,
    lgAvg: "Average of the 210 participants", lgCen: name => `${name} average`, lgEq: "Equal weight (25%)",
    fitBalanced: s => `Your weights are close to equal (a spread of ${s} points), much like the sample average. The study found that this balanced pattern describes almost none of the individual participants, so treat the profile as a light tendency.`,
    fitClose: (p, d) => `Your weights sit close to the ${p} average (a distance of ${d} points; two profiles are typically 42 points apart).`,
    fitModerate: (p, d, q, e) => `Your weights resemble the ${p} average (distance ${d} points) but also share features with ${q} (distance ${e}).`,
    fitLoose: (p, d, q, e) => `You sit between profiles: the nearest is ${p} (distance ${d} points), followed closely by ${q} (${e}). Read both descriptions.`,
    lessCertainH: "Less certain result",
    lessCertain: "Your repeated question got a different answer the second time. That is common (in the study, only half of the participants were consistent on both checks), but your weights are less certain. You may want to take it again.",
    meansTitle: "What this means", valueMost: "You value most", overlook: "You tend to overlook", oppView: "Opposite view", yourAxis: "Your axis",
    theQuestions: qs => `The questions ${qs}.`, and: " and ", or: " or ",
    forThem: view => `For them, a flexible person ${view}.`,
    gapTitle: "What you value vs how you see yourself",
    gapLead: "The study recommends looking at flexibility dimension by dimension rather than as one global score, because a single number hides these differences. The self-ratings are a rough, unvalidated snapshot.",
    gapMeta: (w, l) => `Your weight ${w}% · self-rating ${l}`,
    tagAligned: "Aligned strength", tagDev: "Development priority", tagBlind: "Possible blind spot", tagLower: "Lower priority",
    txtAligned: "You value it and see yourself acting this way. Others may not weigh it as you do, so make it visible when you explain your decisions.",
    txtDev: (l, tip) => `You value it highly but rate yourself ${l}. ${tip}`,
    txtBlind: tip => `You give it little weight and rate yourself low. Colleagues with other profiles may judge your flexibility by exactly this. ${tip}`,
    txtLower: l => `You give it less weight than the others; your self-rating is ${l}.`,
    forManager: "For you as a manager", forMember: "For you as a team member",
    tipsManager: (least, opp) => [
      "Assess people dimension by dimension. Someone with a broad repertoire may struggle to turn options into decisions, and the reverse also happens.",
      `Your own lens shapes whom you call flexible. Check whether you under-rate people who are strong on ${least}, the dimension you weigh least.`,
      `When composing a team, consider people from the opposite side of your axis (${opp}). Together, opposite profiles cover all four dimensions. This is a hypothesis from the study, not a tested rule.`,
      "Make the four dimensions an explicit shared language, so people who judge flexibility by different criteria can discuss it without friction."],
    tipsMember: (least, opp) => [
      "Colleagues may judge flexibility by different criteria. When your choices are questioned, explain them in terms of the dimension the other person values.",
      `Pay attention to ${least}, the dimension you weigh least. It may be the one others notice most.`,
      `Seek out people with the opposite profile (${opp}) when a project is stuck. They will see what your lens tends to skip.`,
      "In the study, Processing Agility was valued as much as the repertoire. Practising deliberate changes of strategy when the situation changes is worthwhile for everyone."],
    compareTitle: "Compare with your team",
    compareLead: "Share this code with your team and paste everyone's codes in the Team view to see which views of flexibility the team covers. The code holds only your four weights.",
    copy: "Copy code", toTeam: "Add to Team view", copied: "Copied.", selected: "Selected. Press Ctrl+C or ⌘C to copy.", me: "Me",
    resultDiscH: "Not legally binding",
    resultDisc: "This diagnostic describes your <b>views</b> about what makes someone flexible, not how flexible you are. It is for reflection only, is not legally binding, and must not be used for hiring, promotion, appraisal or any other employment decision. The authors and developers accept no responsibility for these results or their use.",
    again: "Take it again", home: "Back to the start",
    teamEyebrow: "Team view", teamTitle: "Which views of flexibility does your <strong>team</strong> hold?",
    teamLead: "Each member takes the diagnostic and shares their code. Paste one code per line, with a name before it if you like. Nothing leaves this browser.",
    teamCodes: "Team codes", showMap: "Show the team map", exTeam: "Load an example team", clear: "Clear",
    exampleTag: "example", exampleTeamFlag: "Example team with made-up members",
    noTeamH: "No team yet", noTeam: "Paste at least two codes, or load the example team to see how the map works.",
    badCodes: list => `Skipped lines without a valid code: ${list}. A code looks like CF-26-26-25-23 (four numbers that add up to 100).`,
    memberN: i => `Member ${i}`, teamMap: n => `Team map · ${n} ${n === 1 ? "member" : "members"}`,
    covLead: "How many members have each dimension among their two top priorities:",
    missing: dims => `Nobody on this team prioritizes <strong>${dims}</strong>. The team may under-rate people who are strong there, and miss the moments when it matters.`,
    allCovered: "Between them, members prioritize all four dimensions, the coverage the study's team hypothesis points to.",
    teamCap: "Thicker red lines mean more members with that profile.", teamAria: "Number of team members in each profile, shown by line thickness.",
    axesTitle: "Axes of opposition", axesLead: "Opposite profiles judge flexibility by different criteria. Having both poles covers more of the system, but calls for a shared vocabulary.",
    nobody: "Nobody", bothPoles: "Both poles present", oneSided: "One-sided",
    members: "Members", name: "Name", profile: "Profile", teamMean: "Team mean",
    shortNames: { AA: "Awareness", PA: "Agility", CS: "Context", AD: "Disposition" },
    teamDiscH: "A conversation starter",
    teamDisc: "That teams mixing opposite profiles adapt better is a hypothesis from the study, not a tested finding. Do not use this map to select, rank or exclude people. It is not legally binding, and the authors and developers accept no responsibility for its use."
  }
},
pt: {
  dims: {
    AA: { name: "Consciência de Alternativas", label: "Consciência de opções", role: "o repertório", q: "o quê",
      lv: { h: "Antes de tomar uma decisão, a pessoa considera várias alternativas e compara diferentes caminhos, incluindo opções que não são as mais evidentes.",
            m: "Antes de decidir, a pessoa reconhece algumas alternativas, mas foca nas opções mais conhecidas.",
            l: "Ao tomar decisões, a pessoa considera apenas uma alternativa ou deixa de avaliar outras possibilidades." },
      me: { h: "Antes de tomar uma decisão, considero várias alternativas e comparo diferentes caminhos, incluindo opções que não são as mais evidentes.",
            m: "Antes de decidir, reconheço algumas alternativas, mas foco nas opções mais conhecidas.",
            l: "Ao tomar decisões, costumo considerar apenas uma alternativa e raramente avalio outras possibilidades." },
      short: "Percebe que, em qualquer situação, existem várias opções e caminhos disponíveis.",
      tip: "Antes de fechar uma decisão, peça ao menos três opções realmente diferentes, uma delas fora do óbvio, e busque informação fora das fontes habituais." },
    PA: { name: "Agilidade de Processamento", label: "Agilidade de pensamento", role: "o mecanismo", q: "como",
      lv: { h: "A pessoa ajusta sua forma de pensar conforme a situação, alternando entre intuição e análise.",
            m: "A pessoa consegue alternar entre formas de pensar, mas com alguma dificuldade ou demora.",
            l: "A pessoa utiliza sempre o mesmo modo de pensar, mesmo quando a situação exige mudança." },
      me: { h: "Ajusto minha forma de pensar conforme a situação, alternando entre intuição e análise.",
            m: "Consigo alternar entre formas de pensar, mas com alguma dificuldade ou demora.",
            l: "Costumo usar sempre o mesmo modo de pensar, mesmo quando a situação exige mudança." },
      short: "Alterna entre intuição e análise conforme o problema pede.",
      tip: "Nomeie o modo antes de decidir: é um problema conhecido, que a intuição resolve, ou um problema novo, que pede análise lenta? Marque pontos de checagem em que a equipe pergunta se a abordagem deve mudar." },
    CS: { name: "Sensibilidade ao Contexto", label: "Diagnóstico situacional", role: "o sinal", q: "onde e quando",
      lv: { h: "A pessoa identifica mudanças no ambiente e ajusta rapidamente sua interpretação.",
            m: "A pessoa percebe mudanças, mas demora para ajustar suas decisões.",
            l: "A pessoa não percebe mudanças ou mantém a mesma interpretação mesmo com alterações no contexto." },
      me: { h: "Identifico mudanças no ambiente e ajusto rapidamente minha interpretação.",
            m: "Percebo mudanças, mas demoro para ajustar minhas decisões.",
            l: "Muitas vezes não percebo mudanças, ou mantenho a mesma interpretação mesmo com alterações no contexto." },
      short: "Capta os sinais de que a resposta habitual já não serve.",
      tip: "Combine com a equipe os sinais de alerta do projeto e revise-os em toda reunião. Pergunte, com regularidade, o que mudou desde que o plano foi feito." },
    AD: { name: "Disposição Agêntica", label: "Prontidão executiva", role: "a prontidão", q: "quem",
      lv: { h: "Diante de mudanças, a pessoa inicia rapidamente ações adaptativas.",
            m: "A pessoa reconhece que precisa agir, mas demora para iniciar mudanças.",
            l: "A pessoa evita agir ou mantém as mesmas práticas, mesmo quando necessário mudar." },
      me: { h: "Diante de mudanças, inicio rapidamente ações adaptativas.",
            m: "Reconheço que preciso agir, mas demoro para iniciar mudanças.",
            l: "Tendo a evitar agir, ou mantenho as mesmas práticas, mesmo quando é necessário mudar." },
      short: "Acredita que consegue se adaptar sob pressão e se dispõe a agir.",
      tip: "Encurte a distância entre perceber e agir: faça experimentos pequenos e reversíveis e combine antes quem age quando um sinal de alerta aparecer." }
  },
  profiles: {
    OE: { name: "Exploradores de opções", view: "enxerga muitas alternativas e sabe pensá-las", qs: "o quê e como, com liderança do o quê",
      read: "Você situa a flexibilidade no trabalho de pensar, sobretudo na amplitude do repertório. Enxergar muitos caminhos é o que mais importa para você; ler a situação e agir rápido importam bem menos." },
    AT: { name: "Pensadores ágeis", view: "sabe trocar a forma de pensar diante das alternativas", qs: "como e o quê, com liderança do como",
      read: "Você situa a flexibilidade no trabalho de pensar, liderado pelo mecanismo: alternar entre intuição e análise conforme o problema pede. A prontidão para agir é o que menos pesa no seu olhar." },
    SE: { name: "Executores situacionais", view: "percebe o sinal de mudança e age", qs: "onde, quando e quem",
      read: "Você vê a flexibilidade como resposta à situação: captar o sinal de que algo mudou e se mover. Ter um leque amplo de alternativas importa menos para você do que perceber e agir." },
    AJ: { name: "Ágeis adaptativos", view: "percebe a mudança e ajusta o pensamento enquanto ela acontece", qs: "onde, quando e como",
      read: "Você vê a flexibilidade como ajuste contínuo: perceber a mudança e reenquadrar o problema enquanto ela acontece. Um repertório amplo e a execução rápida ficam em segundo plano no seu olhar." },
    SX: { name: "Executores estratégicos", view: "vê as opções e se compromete a executá-las", qs: "o quê e quem",
      read: "Você vê a flexibilidade como escolha seguida de execução: levantar as opções, escolher uma e se comprometer. Ler as mudanças do ambiente é o que menos pesa para você." },
    CR: { name: "Leitores de contexto", view: "entende a situação e as opções que ela oferece", qs: "o quê, onde e quando",
      read: "Você vê a flexibilidade como leitura: entender a situação e as opções que ela abre. É a visão mais comum no estudo. A prontidão para agir é o que menos pesa para você." },
    AE: { name: "Ágeis executivos", view: "muda a forma de pensar e age", qs: "como e quem",
      read: "Você vê a flexibilidade como ação: mudar a forma de pensar e, então, se mover. É o perfil menos coeso do estudo, então suas prioridades podem se misturar com as de perfis vizinhos." }
  },
  axes: { 1: ["Deliberação × resposta situada", "O eixo mais forte do estudo."], 2: ["Ajuste contínuo × escolha e execução", "Um eixo claro no estudo."], 3: ["Leitura × ação", "Um eixo fraco: leia como gradiente."] },
  lvl: { h: "Alto", m: "Médio", l: "Baixo" },
  dec: ",",
  ui: {
    navMe: "Diagnóstico", navTeam: "Equipe", navAbout: "Sobre", aboutHref: "sobre/",
    footLine: "Um diagnóstico de como as pessoas de equipes de projeto enxergam a flexibilidade cognitiva.<br>De <strong>Fellipe Silva Martins</strong> e <strong>Lidiane da Silva Souza</strong>.",
    footAbout: "Sobre o projeto", footCode: "Código-fonte", footDiscH: "Aviso",
    footDisc: "Esta ferramenta serve apenas para reflexão e aprendizado. Seus resultados não são uma avaliação psicológica ou profissional, não têm valor legal e não devem ser usados em contratação, promoção, demissão, avaliação de desempenho ou qualquer outra decisão sobre pessoas. Os autores e desenvolvedores não se responsabilizam pelos resultados, por sua interpretação nem pelo uso que se faça deles.",
    footPriv: "Suas respostas ficam no seu navegador e não são enviadas a lugar nenhum.",
    eyebrow: "Flexibilidade cognitiva · Equipes de projeto",
    lead: "O que torna alguém flexível, no seu olhar? Quem trabalha em equipes de projeto julga isso por critérios diferentes. Responda a algumas escolhas, em cerca de três minutos, e veja de qual das sete visões de flexibilidade a sua se aproxima, o que ela tende a deixar de lado e quem a completaria.",
    go: "Começar o diagnóstico", sample: "Ver um diagnóstico de exemplo",
    aboutLine: "Com base em um estudo com 210 profissionais de projetos.", aboutLink: "Sobre o projeto →",
    squareCap: "Os sete perfis encontrados no estudo. Cada linha liga as duas dimensões que um perfil mais valoriza; a porcentagem é a sua participação na amostra. Linhas sem vértice em comum são visões opostas.",
    squareAria: "As quatro dimensões da flexibilidade cognitiva nos vértices de um quadrado; cada linha é um perfil que prioriza as duas dimensões que liga.",
    fourDims: "Quatro dimensões da flexibilidade", before: "Antes de começar", answeringAs: "Estou respondendo como",
    roleMember: "membro de equipe de projeto", roleManager: "gestor ou líder de projeto",
    howTo: "Você verá duas pessoas de cada vez. Elas diferem em apenas duas características; em todo o resto são iguais. Escolha a que tem mais flexibilidade na forma de pensar, ou diga que são iguais. Não há respostas certas.",
    discH: "Sem valor legal",
    disc: "Esta é uma ferramenta de reflexão, não um teste. O diagnóstico não tem valor legal e não deve ser usado em contratação, promoção, avaliação de desempenho ou qualquer outra decisão sobre pessoas. Os autores e desenvolvedores não se responsabilizam pelos resultados nem pelo uso que se faça deles.",
    startQuiz: "Começar as escolhas",
    tradeoff: n => `Escolha ${n}`, lastOne: " · a última", progress: (d, t) => `${d} de cerca de ${t}`,
    prompt: "Qual destas duas pessoas tem mais <strong>flexibilidade</strong> na forma de pensar?",
    person: "Pessoa", same: "Igual à outra pessoa em todo o resto.", equal: "As duas são iguais", back: "Voltar",
    quizHint: "Julgue as pessoas, não você mesmo. Se as duas parecem flexíveis de jeitos diferentes, escolha a que você confiaria mais para mudar o rumo quando o projeto precisar. Teclado: A, B ou E.",
    selfEyebrow: "Opcional · quatro itens rápidos", selfTitle: "E <strong>você</strong>, como costuma agir?",
    selfLead: "As escolhas mostraram o que você valoriza em alguém flexível. Esta autoavaliação curta acrescenta como você vê o seu próprio comportamento nos projetos, para que o diagnóstico aponte diferenças. Escolha a frase mais próxima de você, ou pule esta etapa.",
    see: "Ver meu diagnóstico", skip: "Pular a autoavaliação", backQuiz: "Voltar às escolhas",
    exampleFlag: "Diagnóstico de exemplo, com respostas inventadas", yourDiag: "Seu diagnóstico",
    closest: name => `Sua visão de flexibilidade se aproxima dos <strong>${name}</strong>`,
    quote: view => `Para você, um decisor flexível é quem ${view}.`,
    ofParticipants: "dos 210 participantes", choicesMade: "escolhas feitas",
    mineCap: "Vermelho contínuo: o seu perfil. Tracejado: a visão oposta, que não tem nenhuma dimensão em comum com a sua.",
    mineAria: name => `Seu perfil, ${name}, está em destaque; a linha tracejada marca o perfil oposto.`,
    weighTitle: "Quanto você pesa cada dimensão",
    weighLead: qs => `Cada peso é o valor que você dá a levar alguém do nível baixo ao alto naquela dimensão; os quatro somam 100%. O seu perfil prioriza as perguntas <strong style="font-weight:500;color:var(--ink)">${qs}</strong>.`,
    lgAvg: "Média dos 210 participantes", lgCen: name => `Média dos ${name}`, lgEq: "Peso igual (25%)",
    fitBalanced: s => `Seus pesos são quase iguais (diferença de ${s} pontos entre o maior e o menor), como a média da amostra. O estudo mostrou que esse padrão equilibrado quase não descreve nenhum participante individual, então leia o perfil como uma tendência leve.`,
    fitClose: (p, d) => `Seus pesos estão perto da média dos ${p} (distância de ${d} pontos; dois perfis costumam estar a 42 pontos um do outro).`,
    fitModerate: (p, d, q, e) => `Seus pesos lembram a média dos ${p} (distância de ${d} pontos), mas também têm traços dos ${q} (distância de ${e}).`,
    fitLoose: (p, d, q, e) => `Você está entre perfis: o mais próximo é ${p} (distância de ${d} pontos), seguido de perto por ${q} (${e}). Leia as duas descrições.`,
    lessCertainH: "Resultado menos seguro",
    lessCertain: "A pergunta repetida recebeu uma resposta diferente na segunda vez. Isso é comum (no estudo, só metade dos participantes foi coerente nas duas checagens), mas seus pesos ficam menos seguros. Talvez valha refazer.",
    meansTitle: "O que isso significa", valueMost: "O que você mais valoriza", overlook: "O que você tende a deixar de lado", oppView: "Visão oposta", yourAxis: "Seu eixo",
    theQuestions: qs => `As perguntas ${qs}.`, and: " e ", or: " ou ",
    forThem: view => `Para eles, uma pessoa flexível ${view}.`,
    gapTitle: "O que você valoriza × como você se vê",
    gapLead: "O estudo recomenda olhar a flexibilidade dimensão por dimensão, e não por uma nota única, porque um número só esconde essas diferenças. A autoavaliação é um retrato aproximado e não validado.",
    gapMeta: (w, l) => `Seu peso ${w}% · autoavaliação ${l}`,
    tagAligned: "Força alinhada", tagDev: "Prioridade de desenvolvimento", tagBlind: "Possível ponto cego", tagLower: "Prioridade menor",
    txtAligned: "Você valoriza esta dimensão e se vê agindo assim. Outras pessoas podem não dar a ela o mesmo peso, então deixe-a visível quando explicar suas decisões.",
    txtDev: (l, tip) => `Você valoriza muito esta dimensão, mas se avalia no nível ${l}. ${tip}`,
    txtBlind: tip => `Você dá pouco peso a esta dimensão e se avalia no nível baixo. Colegas de outros perfis podem julgar a sua flexibilidade justamente por ela. ${tip}`,
    txtLower: l => `Você dá a esta dimensão menos peso que às outras; sua autoavaliação é ${l}.`,
    forManager: "Para você, como gestor", forMember: "Para você, como membro da equipe",
    tipsManager: (least, opp) => [
      "Avalie as pessoas dimensão por dimensão. Alguém com um repertório amplo pode ter dificuldade de transformar opções em decisões, e o contrário também acontece.",
      `O seu próprio olhar define quem você chama de flexível. Verifique se você subestima pessoas fortes em ${least}, a dimensão que você menos pesa.`,
      `Ao montar uma equipe, considere pessoas do outro lado do seu eixo (${opp}). Juntos, perfis opostos cobrem as quatro dimensões. Isso é uma hipótese do estudo, não uma regra testada.`,
      "Torne as quatro dimensões uma linguagem comum e explícita, para que pessoas que julgam a flexibilidade por critérios diferentes conversem sobre isso sem atrito."],
    tipsMember: (least, opp) => [
      "Seus colegas podem julgar a flexibilidade por critérios diferentes. Quando suas escolhas forem questionadas, explique-as com base na dimensão que a outra pessoa valoriza.",
      `Preste atenção em ${least}, a dimensão que você menos pesa. Pode ser a que os outros mais notam.`,
      `Procure pessoas do perfil oposto (${opp}) quando um projeto travar. Elas vão ver o que o seu olhar tende a pular.`,
      "No estudo, a Agilidade de Processamento foi tão valorizada quanto o repertório. Praticar mudanças deliberadas de estratégia quando a situação muda vale para todo mundo."],
    compareTitle: "Compare com a sua equipe",
    compareLead: "Compartilhe este código com a sua equipe e cole os códigos de todos na aba Equipe para ver quais visões de flexibilidade o time cobre. O código guarda apenas os seus quatro pesos.",
    copy: "Copiar código", toTeam: "Adicionar à aba Equipe", copied: "Copiado.", selected: "Selecionado. Use Ctrl+C ou ⌘C para copiar.", me: "Eu",
    resultDiscH: "Sem valor legal",
    resultDisc: "Este diagnóstico descreve a sua <b>visão</b> sobre o que torna alguém flexível, e não o quanto você é flexível. Serve apenas para reflexão, não tem valor legal e não deve ser usado em contratação, promoção, avaliação de desempenho ou qualquer outra decisão sobre pessoas. Os autores e desenvolvedores não se responsabilizam por estes resultados nem pelo seu uso.",
    again: "Fazer de novo", home: "Voltar ao início",
    teamEyebrow: "Equipe", teamTitle: "Quais visões de flexibilidade a sua <strong>equipe</strong> tem?",
    teamLead: "Cada membro faz o diagnóstico e compartilha o seu código. Cole um código por linha, com o nome antes, se quiser. Nada sai deste navegador.",
    teamCodes: "Códigos da equipe", showMap: "Mostrar o mapa da equipe", exTeam: "Carregar uma equipe de exemplo", clear: "Limpar",
    exampleTag: "exemplo", exampleTeamFlag: "Equipe de exemplo, com membros inventados",
    noTeamH: "Nenhuma equipe ainda", noTeam: "Cole pelo menos dois códigos, ou carregue a equipe de exemplo para ver como o mapa funciona.",
    badCodes: list => `Linhas ignoradas, sem código válido: ${list}. Um código tem este formato: CF-26-26-25-23 (quatro números que somam 100).`,
    memberN: i => `Membro ${i}`, teamMap: n => `Mapa da equipe · ${n} ${n === 1 ? "membro" : "membros"}`,
    covLead: "Quantos membros têm cada dimensão entre as suas duas prioridades:",
    missing: dims => `Ninguém nesta equipe prioriza <strong>${dims}</strong>. O time pode subestimar quem é forte nessa dimensão e perder os momentos em que ela faz diferença.`,
    allCovered: "Somados, os membros priorizam as quatro dimensões, a cobertura que a hipótese de equipe do estudo sugere.",
    teamCap: "Linhas vermelhas mais grossas indicam mais membros naquele perfil.", teamAria: "Número de membros da equipe em cada perfil, indicado pela espessura da linha.",
    axesTitle: "Eixos de oposição", axesLead: "Perfis opostos julgam a flexibilidade por critérios diferentes. Ter os dois polos cobre mais do sistema, mas pede um vocabulário comum.",
    nobody: "Ninguém", bothPoles: "Os dois polos presentes", oneSided: "Só um polo",
    members: "Membros", name: "Nome", profile: "Perfil", teamMean: "Média da equipe",
    shortNames: { AA: "Consciência", PA: "Agilidade", CS: "Contexto", AD: "Disposição" },
    teamDiscH: "Um ponto de partida para a conversa",
    teamDisc: "Que equipes com perfis opostos se adaptam melhor é uma hipótese do estudo, não um resultado testado. Não use este mapa para selecionar, classificar ou excluir pessoas. Ele não tem valor legal, e os autores e desenvolvedores não se responsabilizam pelo seu uso."
  }
}};

/* ---------- Utilities ---------- */
const $ = (s, r = document) => r.querySelector(s);
const esc = s => String(s).replace(/[&<>"]/g, c => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c]));
function mulberry32(a) { return function () { a |= 0; a = a + 0x6D2B79F5 | 0; let t = Math.imul(a ^ a >>> 15, 1 | a); t = t + Math.imul(t ^ t >>> 7, 61 | t) ^ t; return ((t ^ t >>> 14) >>> 0) / 4294967296; }; }
function shuffle(arr, rnd = Math.random) { const a = arr.slice(); for (let i = a.length - 1; i > 0; i--) { const j = Math.floor(rnd() * (i + 1)); [a[i], a[j]] = [a[j], a[i]]; } return a; }
const store = {
  get(k) { try { return JSON.parse(localStorage.getItem("cflens:" + k)); } catch (e) { return null; } },
  set(k, v) { try { localStorage.setItem("cflens:" + k, JSON.stringify(v)); } catch (e) { /* storage unavailable */ } }
};

/* ---------- Language ---------- */
function pickLang() {
  const q = new URLSearchParams(location.search).get("lang");
  if (q === "pt" || q === "en") { store.set("lang", q); return q; }
  const saved = store.get("lang"); if (saved === "pt" || saved === "en") return saved;
  return (navigator.language || "").toLowerCase().startsWith("pt") ? "pt" : "en";
}
let lang = pickLang();
const T = () => TX[lang], U = () => TX[lang].ui;
const D = d => TX[lang].dims[d], P = k => TX[lang].profiles[k];
const num = (v, digits = 0) => v.toFixed(digits).replace(".", T().dec);
const list = (arr, sep) => arr.join(sep);

function round100(w) {
  const raw = ORDER.map(d => w[d]), fl = raw.map(Math.floor); const rest = 100 - fl.reduce((a, b) => a + b, 0);
  const order = raw.map((v, i) => [v - fl[i], i]).sort((a, b) => b[0] - a[0]);
  for (let k = 0; k < rest; k++) fl[order[k % 4][1]]++;
  const o = {}; ORDER.forEach((d, i) => o[d] = fl[i]); return o;
}
const manhattan = (a, b) => ORDER.reduce((s, d) => s + Math.abs(a[d] - b[d]), 0);
const rankProfiles = w => Object.entries(PROFILES).map(([k, p]) => ({ k, d: manhattan(w, p.w) })).sort((a, b) => a.d - b.d);
const topTwo = w => ORDER.slice().sort((a, b) => w[b] - w[a]).slice(0, 2);
const codeOf = w => { const r = round100(w); return "CF-" + ORDER.map(d => r[d]).join("-"); };
function parseCode(s) {
  const m = /CF-(\d{1,3})-(\d{1,3})-(\d{1,3})-(\d{1,3})/i.exec(s); if (!m) return null;
  const v = [m[1], m[2], m[3], m[4]].map(Number); const t = v.reduce((a, b) => a + b, 0); if (t < 90 || t > 110) return null;
  const o = {}; ORDER.forEach((d, i) => o[d] = v[i] * 100 / t); return o;
}

/* ---------- Weight estimation ----------
   Each answer is a linear constraint on the four weights (low = 0, medium = half, high = full weight).
   We sample the weight simplex, keep the samples that break the fewest constraints and average them,
   in the spirit of PAPRIKA's feasible region. Same answers give the same weights. */
function estimate(answers) {
  const cons = answers.map(({ q, a }) => { const diff = [0, 0, 0, 0]; q.pair.forEach(d => { diff[ORDER.indexOf(d)] = V[q.X[d]] - V[q.Y[d]]; }); return { diff, a }; });
  let seed = 7; JSON.stringify(answers.map(x => [x.q.id, x.a])).split("").forEach(ch => seed = (seed * 31 + ch.charCodeAt(0)) | 0);
  const rnd = mulberry32(seed);
  let best = Infinity, cnt = 0; const sum = [0, 0, 0, 0], w = [0, 0, 0, 0];
  for (let n = 0; n < 60000; n++) {
    let t = 0; for (let i = 0; i < 4; i++) { w[i] = -Math.log(rnd() + 1e-12); t += w[i]; } for (let i = 0; i < 4; i++) w[i] /= t;
    let v = 0;
    for (const c of cons) {
      const s = c.diff[0] * w[0] + c.diff[1] * w[1] + c.diff[2] * w[2] + c.diff[3] * w[3];
      if (c.a === "X") { if (s <= 0.004) v++; } else if (c.a === "Y") { if (s >= -0.004) v++; } else if (Math.abs(s) > 0.035) v++;
      if (v > best) break;
    }
    if (v < best) { best = v; cnt = 1; for (let i = 0; i < 4; i++) sum[i] = w[i]; }
    else if (v === best) { cnt++; for (let i = 0; i < 4; i++) sum[i] += w[i]; }
  }
  const o = {}; ORDER.forEach((d, i) => o[d] = sum[i] / cnt * 100); return { w: o, violations: best };
}

/* ---------- State ---------- */
let S = null, history = [];
let result = (store.get("result") || {}).w ? store.get("result") : null;
let role = store.get("role") || "member";
let mode = result ? "result" : "intro";
let tab = "me";

function newRun() {
  const pairs = []; for (let i = 0; i < 4; i++) for (let j = i + 1; j < 4; j++) pairs.push([ORDER[i], ORDER[j]]);
  const queue = shuffle(pairs).map((p, k) => { const [i, j] = Math.random() < .5 ? p : [p[1], p[0]];
    return { id: "s" + k, kind: "swap", pair: [i, j], X: { [i]: "h", [j]: "l" }, Y: { [i]: "l", [j]: "h" }, flip: Math.random() < .5 }; });
  S = { queue, answers: [], checked: false, self: {} }; history = [];
}
function maxTotal() {
  const swaps = S.answers.filter(x => x.q.kind === "swap");
  return 6 + swaps.filter(x => x.a !== "E").length + S.queue.filter(q => q.kind === "swap").length + 1;
}
function answer(a) {
  history.push(JSON.stringify(S));
  const q = S.queue.shift(); S.answers.push({ q, a });
  if (q.kind === "swap" && a !== "E") {      // follow-up: is the preferred dimension worth more than twice the other?
    const [i, j] = a === "X" ? q.pair : [q.pair[1], q.pair[0]];
    const dq = { id: "d" + q.id, kind: "double", pair: [i, j], X: { [i]: "m", [j]: "l" }, Y: { [i]: "l", [j]: "h" }, flip: Math.random() < .5 };
    S.queue.splice(Math.min(S.queue.length, 1 + Math.floor(Math.random() * Math.max(1, S.queue.length))), 0, dq);
  }
  if (!S.queue.length && !S.checked) {        // one repeated question to check consistency
    S.checked = true;
    const swaps = S.answers.filter(x => x.q.kind === "swap"); const pref = swaps.filter(x => x.a !== "E");
    const pool = pref.length ? pref : swaps; const base = pool[Math.floor(Math.random() * pool.length)];
    S.queue.push(Object.assign({}, base.q, { id: "c" + base.q.id, kind: "check", ref: base.q.id, flip: !base.q.flip }));
  }
  if (!S.queue.length) mode = "self";
  render(true);
}
function undo() { if (!history.length) return; S = JSON.parse(history.pop()); mode = "quiz"; render(true); }
function finish() {
  const est = estimate(S.answers);
  const chk = S.answers.find(x => x.q.kind === "check"); const ref = chk && S.answers.find(x => x.q.id === chk.q.ref);
  result = { w: est.w, consistent: chk && ref ? chk.a === ref.a : null, nq: S.answers.length, self: S.self, role, when: new Date().toISOString().slice(0, 10) };
  store.set("result", result); mode = "result"; render(true);
}
function showSample() { result = { w: { AA: 18, PA: 31, CS: 34, AD: 17 }, consistent: true, nq: 12, self: { AA: "m", PA: "h", CS: "m", AD: "l" }, role, example: true }; mode = "result"; }

/* ---------- Square diagram (after Fig. 4.5) ---------- */
function square(opts = {}) {
  const PT = { AA: [110, 96], PA: [350, 96], CS: [350, 286], AD: [110, 286] };
  const mine = opts.mine, opp = opts.opp || [], counts = opts.counts, shares = opts.shares;
  const state = k => !mine ? "normal" : k === mine ? "mine" : opp.includes(k) ? "opp" : "dim";
  const edges = { OE: ["AA", "PA", -7], AT: ["AA", "PA", 7], SE: ["AD", "CS", 0], AJ: ["PA", "CS", 0], SX: ["AA", "AD", 0], CR: ["AA", "CS", 0], AE: ["PA", "AD", 0] };
  let lines = "";
  for (const [k, [a, b, off]] of Object.entries(edges)) {
    const st = state(k); const [x1, y1] = PT[a], [x2, y2] = PT[b];
    let sw = st === "mine" ? 6 : st === "opp" ? 3 : 2.5, col = st === "mine" || st === "opp" ? "#EA0029" : "#C9C6C1";
    if (counts) { sw = counts[k] ? 2 + Math.min(9, counts[k] * 2.4) : 1.5; col = counts[k] ? "#EA0029" : "#C9C6C1"; }
    lines += `<line x1="${x1}" y1="${y1 + off}" x2="${x2}" y2="${y2 + off}" stroke="${col}" stroke-width="${sw}"${st === "opp" ? ' stroke-dasharray="8 6"' : ""}/>`;
  }
  const L = { OE: [230, 78, 0, "middle"], AT: [230, 122, 0, "middle"], SE: [230, 305, 0, "middle"], AJ: [372, 191, 90, "middle"], SX: [88, 191, -90, "middle"], CR: [334, 264, 0, "end"], AE: [126, 247, 0, "start"] };
  let labels = "";
  for (const [k, [x, y, rot, anchor]] of Object.entries(L)) {
    const st = state(k); let t = P(k).name;
    if (shares) t += ` · ${Math.round(PROFILES[k].pct)}%`;
    if (counts && counts[k]) t += ` · ${counts[k]}`;
    const cls = st === "mine" ? "mine" : (st === "dim" || (counts && !counts[k])) ? "dim" : "";
    labels += `<text class="elab ${cls}" x="${x}" y="${y}" text-anchor="${anchor}"${rot ? ` transform="rotate(${rot} ${x} ${y})"` : ""}>${esc(t)}</text>`;
  }
  const VL = { AA: [110, 44], PA: [350, 44], CS: [350, 322], AD: [110, 322] };
  let verts = "";
  for (const d of ORDER) { const [x, y] = PT[d], [lx, ly] = VL[d];
    verts += `<rect x="${x - 10}" y="${y - 10}" width="20" height="20" fill="#1E1E1E"/>` +
      `<text class="vlab" x="${lx}" y="${ly}" text-anchor="middle">${esc(D(d).name)}</text>` +
      `<text class="vq" x="${lx}" y="${ly + 15}" text-anchor="middle">${esc(D(d).q.toUpperCase())}</text>`; }
  return `<svg class="sq" viewBox="0 0 460 350" role="img" aria-label="${esc(opts.aria || U().squareAria)}">${lines}${verts}${labels}</svg>`;
}

/* ---------- Views ---------- */
const VME = $("#view-me"), VTEAM = $("#view-team");
const callout = (title, body) => `<div class="callout"><h4>${title}</h4><p>${body}</p></div>`;

function renderIntro() {
  const u = U();
  VME.innerHTML = `
  <section class="opening"><div class="wrap narrow opening-grid">
    <div>
      <p class="eyebrow">${u.eyebrow}</p>
      <h1>Flexibility <strong>Lens</strong></h1>
      <p class="lead">${u.lead}</p>
      <div class="actions"><a class="btn-red" href="#begin" id="go">${u.go}</a><button class="btn-text" id="sample">${u.sample}</button></div>
      <p class="about-line">${u.aboutLine} <a href="${u.aboutHref}">${u.aboutLink}</a></p>
    </div>
    <div class="diagram">${square({ shares: true })}<p class="caption">${u.squareCap}</p></div>
  </div></section>
  <section class="sec tint"><div class="wrap narrow stack">
    <p class="sec-title">${u.fourDims}</p>
    <div class="fit">${ORDER.map(d => `<div style="background:#fff"><span class="n">${DIM_N[d]} · ${esc(D(d).q)}</span><h3>${esc(D(d).name)}</h3><p>${esc(D(d).short)}</p></div>`).join("")}</div>
  </div></section>
  <section class="sec" id="begin" style="scroll-margin-top:70px"><div class="wrap narrow stack">
    <p class="sec-title">${u.before}</p>
    <span class="label">${u.answeringAs}</span>
    <div class="role" role="radiogroup">
      <label><input type="radio" name="role" id="role-member" value="member" ${role === "member" ? "checked" : ""}> ${u.roleMember}</label>
      <label><input type="radio" name="role" id="role-manager" value="manager" ${role === "manager" ? "checked" : ""}> ${u.roleManager}</label>
    </div>
    <p class="soft">${u.howTo}</p>
    ${callout(u.discH, u.disc)}
    <div class="actions"><button class="btn-red" id="start">${u.startQuiz}</button></div>
  </div></section>`;
  VME.querySelectorAll("input[name=role]").forEach(r => r.addEventListener("change", e => { role = e.target.value; store.set("role", role); }));
  $("#go").onclick = e => { e.preventDefault(); $("#begin").scrollIntoView({ behavior: "smooth" }); };
  $("#start").onclick = () => { newRun(); mode = "quiz"; render(true); };
  $("#sample").onclick = () => { showSample(); render(true); };
}

const traitHTML = (d, l) => `<div class="trait"><div class="lvl"><span class="badge ${l}">${T().lvl[l]}</span>${esc(D(d).label)}</div><p>${esc(D(d).lv[l])}</p></div>`;
function renderQuiz() {
  const u = U(), q = S.queue[0], done = S.answers.length, tot = maxTotal();
  const card = (side, letter) => `<button class="person" id="pick-${letter}" data-a="${side}"><span class="who">${u.person} ${letter}<span class="kbd">${letter}</span></span>${q.pair.map(d => traitHTML(d, q[side][d])).join("")}<span class="same">${u.same}</span></button>`;
  VME.innerHTML = `
  <section class="sec"><div class="wrap narrow stack">
    <div class="qmeta"><span>${u.tradeoff(done + 1)}${q.kind === "check" ? u.lastOne : ""}</span><span>${u.progress(done, tot)}</span></div>
    <div class="progress"><i style="width:${Math.round(done / tot * 100)}%"></i></div>
    <h2 class="qprompt">${u.prompt}</h2>
    <div class="choices">${card(q.flip ? "Y" : "X", "A")}${card(q.flip ? "X" : "Y", "B")}</div>
    <div class="actions" style="justify-content:space-between"><button class="btn-line" id="eq">${u.equal}</button><button class="btn-text" id="back" ${history.length ? "" : "disabled"}>${u.back}</button></div>
    <p class="small soft">${u.quizHint}</p>
  </div></section>`;
  VME.querySelectorAll(".person").forEach(b => b.onclick = () => answer(b.dataset.a));
  $("#eq").onclick = () => answer("E"); $("#back").onclick = undo;
}

function renderSelf() {
  const u = U(), rnd = mulberry32(42);
  VME.innerHTML = `
  <section class="sec"><div class="wrap narrow stack">
    <p class="eyebrow">${u.selfEyebrow}</p>
    <h2 class="big">${u.selfTitle}</h2>
    <p class="lead">${u.selfLead}</p>
    ${ORDER.map(d => `<fieldset class="sc"><legend>${esc(D(d).label)}<span>${esc(D(d).name)}</span></legend>
      ${shuffle(["h", "m", "l"], rnd).map(l => `<label><input type="radio" name="sc-${d}" id="sc-${d}-${l}" value="${l}" ${S.self[d] === l ? "checked" : ""}><span>${esc(D(d).me[l])}</span></label>`).join("")}</fieldset>`).join("")}
    <div class="actions"><button class="btn-red" id="see">${u.see}</button><button class="btn-line" id="skip">${u.skip}</button><button class="btn-text" id="back">${u.backQuiz}</button></div>
  </div></section>`;
  VME.querySelectorAll(".sc input").forEach(r => r.addEventListener("change", e => { S.self[e.target.name.slice(3)] = e.target.value; }));
  $("#see").onclick = finish; $("#skip").onclick = () => { S.self = {}; finish(); }; $("#back").onclick = undo;
}

function barsHTML(w, k) {
  const u = U(), prof = PROFILES[k], sc = v => Math.min(100, v / 60 * 100);
  return `<div class="bars">${ORDER.map(d => `<div class="bar"><div class="nm">${esc(D(d).name)}<small>${esc(D(d).q)}</small></div>
    <div class="track" aria-hidden="true"><div class="fill" style="width:${sc(w[d])}%"></div><div class="eq" style="left:${sc(25)}%"></div><div class="avg" style="left:${sc(SAMPLE[d])}%"></div><div class="cen" style="left:${sc(prof.w[d])}%"></div></div>
    <div class="val">${Math.round(w[d])}%</div></div>`).join("")}</div>
    <div class="legend"><span><i class="lg-avg"></i>${u.lgAvg}</span><span><i class="lg-cen"></i>${esc(u.lgCen(P(k).name))}</span><span><i class="lg-eq"></i>${u.lgEq}</span></div>`;
}
function selfHTML(w, self) {
  if (!self || !Object.keys(self).length) return "";
  const u = U(), lv = T().lvl;
  const rows = ORDER.filter(d => self[d]).map(d => {
    const l = self[d], hi = w[d] >= 25, ln = lv[l].toLowerCase(); let tag, txt;
    if (hi && l === "h") { tag = `<span class="badge m">${u.tagAligned}</span>`; txt = u.txtAligned; }
    else if (hi) { tag = `<span class="badge h">${u.tagDev}</span>`; txt = u.txtDev(ln, D(d).tip); }
    else if (l === "l") { tag = `<span class="badge l">${u.tagBlind}</span>`; txt = u.txtBlind(D(d).tip); }
    else { tag = `<span class="badge l">${u.tagLower}</span>`; txt = u.txtLower(ln); }
    return `<li><div><h3>${esc(D(d).name)}</h3><span class="meta">${esc(u.gapMeta(Math.round(w[d]), ln))}</span></div>${tag}<p>${esc(txt)}</p></li>`;
  }).join("");
  return `<div class="block"><p class="sec-title">${u.gapTitle}</p><p class="soft">${u.gapLead}</p><ul class="rows">${rows}</ul></div>`;
}

function renderResult() {
  const u = U(), w = result.w, ranked = rankProfiles(w), k = ranked[0].k, PR = PROFILES[k], pn = P(k).name, sn = P(ranked[1].k).name;
  const d = Math.round(ranked[0].d), d2 = Math.round(ranked[1].d);
  const spread = Math.max(...ORDER.map(x => w[x])) - Math.min(...ORDER.map(x => w[x]));
  const fitText = spread < 10 ? u.fitBalanced(Math.round(spread)) : ranked[0].d < 22 ? u.fitClose(pn, d) : ranked[0].d < 38 ? u.fitModerate(pn, d, sn, d2) : u.fitLoose(pn, d, sn, d2);
  const mineTop = topTwo(w), least = ORDER.slice().sort((a, b) => w[a] - w[b])[0];
  const oppNames = PR.opp.map(o => P(o).name), ax = T().axes[PR.axis];
  const tips = (result.role === "manager" ? u.tipsManager : u.tipsMember)(D(least).name, list(oppNames, u.or));
  const code = codeOf(w);
  VME.innerHTML = `
  <section class="sec"><div class="wrap narrow">
    ${result.example ? `<p class="example-flag" style="margin-bottom:20px">${u.exampleFlag}</p>` : ""}
    <div class="result-head">
      <div class="stack">
        <p class="eyebrow">${u.yourDiag}${result.when ? ` · ${result.when}` : ""}</p>
        <h2 class="big">${u.closest(esc(pn))}</h2>
        <p class="quote">${esc(u.quote(P(k).view))}</p>
        <div class="figures"><div><b>${num(PR.pct, 1)}%</b><span>${u.ofParticipants}</span></div><div><b>${result.nq}</b><span>${u.choicesMade}</span></div></div>
      </div>
      <div class="diagram">${square({ mine: k, opp: PR.opp, aria: u.mineAria(pn) })}<p class="caption">${u.mineCap}</p></div>
    </div>
  </div></section>
  <section class="sec tint"><div class="wrap narrow">
    <div class="block">
      <p class="sec-title">${u.weighTitle}</p>
      <p class="soft">${u.weighLead(esc(P(k).qs))}</p>
      ${barsHTML(w, k)}
      <p>${esc(fitText)}</p>
      ${result.consistent === false ? callout(u.lessCertainH, u.lessCertain) : ""}
    </div>
  </div></section>
  <section class="sec"><div class="wrap narrow">
    <div class="block">
      <p class="sec-title">${u.meansTitle}</p>
      <p class="lead" style="color:var(--ink)">${esc(P(k).read)}</p>
      <div class="fit two">
        <div><span class="n">${u.valueMost}</span><h3>${esc(list(mineTop.map(x => D(x).name), " + "))}</h3><p>${esc(u.theQuestions(list(mineTop.map(x => D(x).q), u.and)))}</p></div>
        <div><span class="n">${u.overlook}</span><h3>${esc(D(least).name)}</h3><p>${esc(D(least).tip)}</p></div>
        <div><span class="n">${u.oppView}</span><h3>${esc(list(oppNames, " · "))}</h3><p>${esc(PR.opp.map(o => u.forThem(P(o).view)).join(" "))}</p></div>
        <div><span class="n">${u.yourAxis}</span><h3>${esc(ax[0])}</h3><p>${esc(ax[1])}</p></div>
      </div>
    </div>
    ${selfHTML(w, result.self)}
    <div class="block">
      <p class="sec-title">${result.role === "manager" ? u.forManager : u.forMember}</p>
      <ul class="dash-list">${tips.map(t => `<li>${esc(t)}</li>`).join("")}</ul>
    </div>
    <div class="block">
      <p class="sec-title">${u.compareTitle}</p>
      <p class="soft">${u.compareLead}</p>
      <div class="code-row"><span class="code" id="mycode">${code}</span><button class="btn-line" id="copy">${u.copy}</button><button class="btn-line" id="toTeam">${u.toTeam}</button></div>
      <span class="small soft" id="copymsg" aria-live="polite"></span>
    </div>
    <div class="block">
      ${callout(u.resultDiscH, u.resultDisc)}
      <div class="actions"><button class="btn-red" id="again">${u.again}</button>${result.example ? `<button class="btn-text" id="home">${u.home}</button>` : ""}</div>
    </div>
  </div></section>`;
  $("#copy").onclick = () => { const m = $("#copymsg");
    const sel = () => { const r = document.createRange(); r.selectNodeContents($("#mycode")); const s = getSelection(); s.removeAllRanges(); s.addRange(r); m.textContent = u.selected; };
    try { navigator.clipboard.writeText(code).then(() => m.textContent = u.copied, sel); } catch (e) { sel(); } };
  $("#toTeam").onclick = () => { const t = store.get("team") || ""; if (!t.includes(code)) store.set("team", (t ? t.trim() + "\n" : "") + u.me + ": " + code); showTab("team"); };
  $("#again").onclick = () => { newRun(); mode = "quiz"; render(true); };
  if ($("#home")) $("#home").onclick = () => { result = store.get("result"); mode = "intro"; render(true); };
}

/* ---------- Team view ---------- */
const exampleTeam = () => { const x = U().exampleTag; return `Ana (${x}): CF-18-31-34-17\nBruno (${x}): CF-30-19-17-34\nCarla (${x}): CF-33-21-31-15\nDiego (${x}): CF-21-33-20-26\nEva (${x}): CF-17-18-32-33`; };
function renderTeam() {
  const u = U(), current = $("#teamtxt") ? $("#teamtxt").value : (store.get("team") || "");
  VTEAM.innerHTML = `
  <section class="sec"><div class="wrap narrow stack">
    <p class="eyebrow">${u.teamEyebrow}</p>
    <h2 class="big">${u.teamTitle}</h2>
    <p class="lead">${u.teamLead}</p>
    <div class="form-box">
      <label for="teamtxt" class="label">${u.teamCodes}</label>
      <textarea id="teamtxt" placeholder="Ana: CF-18-31-34-17&#10;Bruno: CF-30-19-17-34">${esc(current)}</textarea>
      <div class="actions"><button class="btn-red" id="analyse">${u.showMap}</button><button class="btn-line" id="exteam">${u.exTeam}</button><button class="btn-text" id="clear">${u.clear}</button></div>
    </div>
  </div></section>
  <div id="teamout"></div>`;
  $("#analyse").onclick = () => { store.set("team", $("#teamtxt").value); analyse(); };
  $("#exteam").onclick = () => { $("#teamtxt").value = exampleTeam(); analyse(); };
  $("#clear").onclick = () => { $("#teamtxt").value = ""; store.set("team", ""); analyse(); };
  analyse();
}
function analyse() {
  const u = U(), out = $("#teamout"), txt = $("#teamtxt").value; const members = [], bad = [];
  txt.split(/\n+/).map(s => s.trim()).filter(Boolean).forEach((ln, i) => {
    const w = parseCode(ln); if (!w) { bad.push(ln); return; }
    const name = ln.split(/CF-/i)[0].replace(/[:\-–\s]+$/, "").trim() || u.memberN(i + 1);
    members.push({ name, w, k: rankProfiles(w)[0].k, top: topTwo(w) });
  });
  const badNote = bad.length ? `<p class="small" style="color:var(--red-deep)">${esc(u.badCodes(bad.join(" · ")))}</p>` : "";
  if (!members.length) { out.innerHTML = `<section class="sec" style="padding-top:0"><div class="wrap narrow stack"><div class="callout" style="background:var(--paper-2)"><h4>${u.noTeamH}</h4><p>${u.noTeam}</p></div>${badNote}</div></section>`; return; }
  const counts = {}; members.forEach(m => counts[m.k] = (counts[m.k] || 0) + 1);
  const cov = {}, mean = {}; ORDER.forEach(d => { cov[d] = members.filter(m => m.top.includes(d)).length; mean[d] = members.reduce((s, m) => s + m.w[d], 0) / members.length; });
  const missing = ORDER.filter(d => !cov[d]);
  const axes = AXES.map(a => { const ina = members.filter(m => a.a.includes(m.k)), inb = members.filter(m => a.b.includes(m.k));
    const pole = (ks, ms) => `<div class="pole ${ms.length ? "on" : "off"}"><b>${esc(ks.map(x => P(x).name).join(" / "))}</b><span>${ms.length ? esc(ms.map(m => m.name).join(", ")) : u.nobody}</span></div>`;
    return `<div class="axis">${pole(a.a, ina)}<div class="mid"><b>${esc(T().axes[a.id][0])}</b>${ina.length && inb.length ? u.bothPoles : u.oneSided}</div>${pole(a.b, inb)}</div>`; }).join("");
  const isExample = /\((example|exemplo)\)/.test(txt);
  out.innerHTML = `
  <section class="sec tint"><div class="wrap narrow">
    ${isExample ? `<p class="example-flag" style="margin-bottom:20px">${u.exampleTeamFlag}</p>` : ""}
    <div class="result-head">
      <div class="stack">
        <p class="sec-title">${u.teamMap(members.length)}</p>
        <p class="soft">${u.covLead}</p>
        <div class="cov">${ORDER.map(d => `<div><b>${cov[d]}</b><span>${esc(D(d).name)}</span></div>`).join("")}</div>
        <p>${missing.length ? u.missing(esc(list(missing.map(d => D(d).name), u.or))) : u.allCovered}</p>
      </div>
      <div class="diagram" style="background:#fff">${square({ counts, aria: u.teamAria })}<p class="caption">${u.teamCap}</p></div>
    </div>
  </div></section>
  <section class="sec"><div class="wrap narrow">
    <div class="block">
      <p class="sec-title">${u.axesTitle}</p>
      <p class="soft">${u.axesLead}</p>
      <div style="border-top:1px solid var(--line)">${axes}</div>
    </div>
    <div class="block">
      <p class="sec-title">${u.members}</p>
      <div class="tablewrap"><table><thead><tr><th>${u.name}</th><th>${u.profile}</th>${ORDER.map(d => `<th>${u.shortNames[d]}</th>`).join("")}</tr></thead>
      <tbody>${members.map(m => `<tr><td>${esc(m.name)}</td><td>${esc(P(m.k).name)}</td>${ORDER.map(d => `<td class="num">${Math.round(m.w[d])}%</td>`).join("")}</tr>`).join("")}
      <tr class="total"><td>${u.teamMean}</td><td></td>${ORDER.map(d => `<td class="num">${Math.round(mean[d])}%</td>`).join("")}</tr></tbody></table></div>
      ${badNote}
    </div>
    <div class="block">${callout(u.teamDiscH, u.teamDisc)}</div>
  </div></section>`;
}

/* ---------- Page chrome (header, footer, language) ---------- */
function applyStatic() {
  const u = U();
  document.documentElement.lang = lang === "pt" ? "pt-BR" : "en";
  document.querySelectorAll("[data-t]").forEach(el => { el.innerHTML = u[el.dataset.t]; });
  document.querySelectorAll("[data-about]").forEach(el => { el.setAttribute("href", u.aboutHref); });
  document.querySelectorAll("[data-lang]").forEach(b => b.setAttribute("aria-pressed", b.dataset.lang === lang));
}
function setLang(l) {
  if (l === lang) return;
  lang = l; store.set("lang", l);
  const url = new URL(location.href); url.searchParams.set("lang", l); try { window.history.replaceState(null, "", url); } catch (e) { /* ignore */ }
  applyStatic(); if (tab === "team") renderTeam(); else render();
}

/* ---------- Routing ---------- */
function render(scroll) {
  if (mode === "intro") renderIntro(); else if (mode === "quiz") renderQuiz(); else if (mode === "self") renderSelf(); else renderResult();
  if (scroll) window.scrollTo({ top: 0 });
}
function showTab(t) {
  tab = t;
  $("#tab-me").setAttribute("aria-selected", t === "me"); $("#tab-team").setAttribute("aria-selected", t === "team");
  VME.hidden = t !== "me"; VTEAM.hidden = t !== "team";
  if (t === "team") renderTeam(); else render();
  window.scrollTo({ top: 0 });
}
$("#tab-me").onclick = () => showTab("me"); $("#tab-team").onclick = () => showTab("team");
document.querySelectorAll("[data-lang]").forEach(b => b.onclick = () => setLang(b.dataset.lang));
document.addEventListener("keydown", e => {
  if (mode !== "quiz" || VME.hidden || e.target.matches("input,textarea") || e.metaKey || e.ctrlKey) return;
  const k = e.key.toLowerCase();
  if (k === "a" && $("#pick-A")) $("#pick-A").click(); else if (k === "b" && $("#pick-B")) $("#pick-B").click(); else if (k === "e" && $("#eq")) $("#eq").click();
});
applyStatic();
if (location.hash === "#sample") showSample();
if (location.hash === "#team") showTab("team"); else render();
})();
