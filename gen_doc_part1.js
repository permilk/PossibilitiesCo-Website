const docx = require("docx");
const fs = require("fs");
const { Document, Packer, Paragraph, TextRun, Table, TableRow, TableCell, WidthType, AlignmentType, HeadingLevel, BorderStyle, ShadingType, TableLayoutType } = docx;

// Helper functions
function title(text) {
    return new Paragraph({ heading: HeadingLevel.TITLE, spacing: { after: 200 }, children: [new TextRun({ text, bold: true, size: 52, font: "Calibri", color: "1B3A5C" })] });
}
function h1(text) {
    return new Paragraph({ heading: HeadingLevel.HEADING_1, spacing: { before: 400, after: 200 }, children: [new TextRun({ text, bold: true, size: 36, font: "Calibri", color: "1B3A5C" })] });
}
function h2(text) {
    return new Paragraph({ heading: HeadingLevel.HEADING_2, spacing: { before: 300, after: 150 }, children: [new TextRun({ text, bold: true, size: 28, font: "Calibri", color: "2E5E8E" })] });
}
function h3(text) {
    return new Paragraph({ heading: HeadingLevel.HEADING_3, spacing: { before: 200, after: 100 }, children: [new TextRun({ text, bold: true, size: 24, font: "Calibri", color: "3A7BBF" })] });
}
function para(text, opts = {}) {
    return new Paragraph({ spacing: { after: 120 }, alignment: opts.center ? AlignmentType.CENTER : AlignmentType.JUSTIFIED, children: [new TextRun({ text, size: 22, font: "Calibri", ...opts })] });
}
function boldPara(label, value) {
    return new Paragraph({ spacing: { after: 100 }, children: [new TextRun({ text: label, bold: true, size: 22, font: "Calibri" }), new TextRun({ text: value, size: 22, font: "Calibri" })] });
}
function bullet(text, level = 0) {
    return new Paragraph({ bullet: { level }, spacing: { after: 60 }, children: [new TextRun({ text, size: 22, font: "Calibri" })] });
}
function bulletBold(label, value, level = 0) {
    return new Paragraph({ bullet: { level }, spacing: { after: 60 }, children: [new TextRun({ text: label, bold: true, size: 22, font: "Calibri" }), new TextRun({ text: value, size: 22, font: "Calibri" })] });
}
function spacer() { return new Paragraph({ spacing: { after: 200 }, children: [] }); }
function hr() {
    return new Paragraph({ spacing: { before: 200, after: 200 }, border: { bottom: { style: BorderStyle.SINGLE, size: 6, color: "1B3A5C" } }, children: [] });
}

const hdrCell = (text) => new TableCell({
    shading: { type: ShadingType.SOLID, color: "1B3A5C" },
    children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text, bold: true, size: 20, font: "Calibri", color: "FFFFFF" })] })],
});
const cell = (text, opts = {}) => new TableCell({
    shading: opts.shade ? { type: ShadingType.SOLID, color: "F0F4FA" } : undefined,
    children: [new Paragraph({ children: [new TextRun({ text, size: 20, font: "Calibri", bold: opts.bold })] })],
});

function makeTable(headers, rows) {
    return new Table({
        width: { size: 100, type: WidthType.PERCENTAGE },
        layout: TableLayoutType.AUTOFIT,
        rows: [
            new TableRow({ children: headers.map(h => hdrCell(h)) }),
            ...rows.map((r, i) => new TableRow({ children: r.map((c, j) => cell(c, { shade: i % 2 === 1, bold: j === 0 })) }))
        ],
    });
}

// ============ BUILD DOCUMENT ============
const children = [];

// COVER PAGE
children.push(spacer(), spacer(), spacer(), spacer());
children.push(title("MODELO OPERATIVO AS-IS"));
children.push(para("Subdirección de Soporte 2do Nivel (S2N)", { size: 32, color: "2E5E8E", center: true }));
children.push(spacer());
children.push(para("Servicios Electrónicos Globales (E-Global)", { size: 28, color: "555555", center: true }));
children.push(para("Fase 1: Diagnóstico Estructural Completo", { size: 24, color: "777777", center: true }));
children.push(spacer(), spacer());
children.push(para("Marzo 2026", { size: 24, center: true }));
children.push(spacer());
children.push(makeTable(["Campo", "Detalle"], [
    ["Elaboró", "Kenneth Andersson Perleche Quintanilla"],
    ["Revisó", "Pendiente"],
    ["Autorizó", "César Ulises Damián Fierro — Subdirector S2N"],
    ["Versión", "3.0 — Documento Consolidado"],
    ["Fecha", "Marzo 2026"],
    ["Clasificación", "Confidencial — Uso Interno"],
]));

// ============ SECTION 1: CONTEXTO ============
children.push(hr(), h1("1. CONTEXTO Y ALCANCE"));

children.push(h2("1.1 Objetivo del Documento"));
children.push(para("El presente documento tiene como objetivo documentar de forma exhaustiva el estado actual (AS-IS) del Modelo Operativo de la Subdirección de Soporte de 2do Nivel (S2N) de Servicios Electrónicos Globales (E-Global). Este diagnóstico estructural incluye el análisis detallado de procesos, roles, dependencias, herramientas tecnológicas, métricas operativas y gaps identificados, sirviendo como base fundamental para el diseño del modelo objetivo (TO-BE) que se abordará en la Fase 2 del proyecto de transformación."));
children.push(para("Este documento consolida la información recopilada durante las Semanas 1, 2 y 3 del proyecto, integrando sesiones de Knowledge Transfer con cada una de las gerencias, análisis de documentación existente, revisión de incidentes fuera de SLA, y validación directa con los gerentes y líderes técnicos de la subdirección."));

children.push(h2("1.2 ¿Qué es E-Global?"));
children.push(para("Servicios Electrónicos Globales (E-Global / Iglobal) es una empresa propiedad de BBVA y Banamex que opera como pieza central en la infraestructura de pagos electrónicos en México y Latinoamérica. Sus funciones principales son:"));
children.push(bulletBold("Switch Transaccional: ", "Procesa transacciones bajo el estándar ISO 8583 entre adquirentes y emisores, funcionando como la autopista digital por donde viajan las autorizaciones de compras con tarjeta en tiempo real."));
children.push(bulletBold("Cámara de Compensación: ", "Liquida e intercambia transacciones entre entidades financieras, asegurando que cada comercio reciba el pago correspondiente y cada emisor registre el cargo adecuado."));
children.push(bulletBold("Empresa Especializada: ", "Brinda servicios tecnológicos especializados a la industria de pagos, incluyendo monitoreo, soporte de aplicaciones y gestión de controversias."));

children.push(h3("Infraestructura Técnica"));
children.push(bulletBold("Alta Disponibilidad: ", "2 sitios operativos — Buenavista y Querétaro — configurados en esquema activo-activo para garantizar continuidad del servicio."));
children.push(bulletBold("Silos: ", "Clusters de servidores que operan sobre Linux con bases de datos Oracle, utilizando la plataforma core 'Authentic' para el procesamiento transaccional."));
children.push(bulletBold("Ecosistema de herramientas: ", "Jira (gestión de incidentes), Kibana/Elastic (análisis de logs), Datadog (APM), Control-M (scheduler batch), Slack (alertas), Insite F5 (análisis de tráfico)."));

children.push(h2("1.3 Frameworks de Referencia"));
children.push(para("El diagnóstico y modelado de la subdirección se fundamenta en cuatro frameworks internacionalmente reconocidos, cada uno aportando una perspectiva complementaria al análisis:"));
children.push(makeTable(["Framework", "Versión", "Aplicación en este Documento"], [
    ["ITIL 4", "v4 (2019)", "Estructura de gestión de incidentes, problemas y cambios. Define las prácticas de Service Management que S2N ejecuta diariamente."],
    ["COBIT", "2019", "Gobierno corporativo, toma de decisiones, validación de riesgo y matriz de roles (RACI). Asegura alineación entre TI y objetivos de negocio."],
    ["BPMN 2.0", "ISO 19510", "Modelado visual de los flujos de proceso end-to-end. Permite documentar cada paso del ciclo de vida de un incidente."],
    ["TOGAF", "v10", "Dominios de arquitectura empresarial (Gobierno, Control, Operación). Estructura la visión organizacional en capas funcionales."],
]));

children.push(h2("1.4 Subdirección S2N — Misión Actual"));
children.push(para("Proveer soporte técnico de segundo nivel para las plataformas transaccionales de E-Global, asegurando la continuidad del servicio, la recuperación de incidentes dentro de los Acuerdos de Nivel de Servicio (SLA), y la mitigación de impactos financieros derivados de fallas operativas. La subdirección actúa como el escudo técnico que protege la operación financiera, con un impacto directo en la economía al haber mitigado más de $2,299 millones de pesos mexicanos en el año 2025."));

// ============ SECTION 2: ARQUITECTURA ORGANIZACIONAL ============
children.push(hr(), h1("2. ARQUITECTURA ORGANIZACIONAL (TOGAF)"));

children.push(h2("2.1 Dominios del Modelo Operativo"));
children.push(para("Siguiendo el marco de referencia TOGAF, la subdirección S2N se organiza en tres dominios funcionales que garantizan una separación clara de responsabilidades:"));

children.push(h3("Dominio de Gobierno"));
children.push(para("Responsable de la dirección estratégica, toma de decisiones y control administrativo de toda la subdirección."));
children.push(bulletBold("Subdirector: ", "César Ulises Damián Fierro — Máxima autoridad de S2N, aprueba decisiones críticas, revisa reportes diarios y define la estrategia de transformación."));
children.push(bulletBold("Calidad y Gestión Administrativa: ", "Daniel Flores Ortiz (Gerente), Luis Eduardo Lara García, Luisa Fernanda Zamora Pérez — Equipo encargado del seguimiento de SLA, generación de reportería y control administrativo."));

children.push(h3("Dominio de Control"));
children.push(para("Responsable de la observabilidad, detección proactiva de anomalías y aseguramiento de la continuidad operativa."));
children.push(bulletBold("Observabilidad / Monitor de Salud: ", "Edgar Yedith Pita Rodríguez (Gerente) — Diseño e implementación de monitores inteligentes, alertas parametrizadas y dashboards de control."));

children.push(h3("Dominio de Operación"));
children.push(para("Responsable de la ejecución operativa diaria, procesamiento de transacciones, resolución de incidentes y soporte técnico."));
children.push(bullet("Gerencia de Línea (Switch Transaccional)"));
children.push(bullet("Gerencia Batch (Procesamiento por Lotes)"));
children.push(bullet("Gerencia BackOffice Controversias (Disputas)"));
children.push(bullet("Gerencia BackOffice App Web (Afiliaciones y Apps)"));
children.push(bullet("Gerencia BBVA Perú / LATAM"));
children.push(bullet("Gerencia Multidisciplinaria — SWAT"));

children.push(h2("2.2 Estructura Organizacional Detallada"));
children.push(makeTable(["#", "Gerencia", "Gerente / Líder", "Personal", "Turno"], [
    ["1", "Línea", "Valter Raziel César Márquez H.", "~12 analistas", "Turnos rotativos"],
    ["2", "Batch", "Enrique Solis Cielo (Ger.), Juan David Peña Cruz (Líder), Armando Rodríguez Rojano (Backup)", "~10 analistas", "24/7"],
    ["3", "BO Controversias", "Agustín Monterrosa Camacho (Ger.), Jesús Ramírez Méndez, Luis Fernando Villar (Líderes Téc.)", "~8 analistas", "Horario estándar"],
    ["4", "BO App Web", "Alfredo Ortega Cervantes", "~5 analistas", "Horario estándar"],
    ["5", "BBVA Perú / LATAM", "Guadalupe Segovia Copado, Gilberto Ulises Reyes Pacheco, Ángel Domínguez Chávez", "~8 analistas", "Estándar + guardias"],
    ["6", "Monitor de Salud", "Edgar Yedith Pita Rodríguez (Ger.), 2 Líderes Técnicos, ~6 Analistas", "~9 personas", "07:00-22:00 + guardias"],
    ["7", "Multidisciplinaria (SWAT)", "Gerardo Camacho López", "7 personas (solo 2 activas)", "Horario estándar"],
    ["8", "Calidad y Gestión Adm.", "Daniel Flores Ortiz, Luis Eduardo Lara García, Luisa Fernanda Zamora Pérez", "~3 personas", "Horario estándar"],
]));
children.push(boldPara("Total estimado S2N: ", "~65-70 personas (incluyendo subdirector)"));

// Save Part 1 data
fs.writeFileSync("doc_children_p1.json", JSON.stringify({ count: children.length }));
module.exports = { children, h1, h2, h3, para, boldPara, bullet, bulletBold, spacer, hr, makeTable, hdrCell, cell, title };
console.log("Part 1 ready:", children.length, "elements");
