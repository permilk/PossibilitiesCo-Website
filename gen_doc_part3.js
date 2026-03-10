const docx = require("docx");
const fs = require("fs");
const { Packer } = docx;
const p2 = require("./gen_doc_part2.js");
const { children, h1, h2, h3, para, boldPara, bullet, bulletBold, spacer, hr, makeTable } = p2;

// ============ SECTION 5: RACI ============
children.push(hr(), h1("5. MATRIZ DE ROLES Y RESPONSABILIDADES (COBIT)"));

children.push(h2("5.1 Matriz RACI — Gestión de Incidentes"));
children.push(para("La siguiente matriz define las responsabilidades de cada rol en el proceso de gestión de incidentes, siguiendo el modelo RACI de COBIT: R = Responsable (ejecuta), A = Aprobador (rinde cuentas), C = Consultado (aporta conocimiento), I = Informado (se le notifica)."));

children.push(makeTable(["Actividad", "Subdirección", "Gerente", "Analista S2N", "Calidad", "Monitor Salud", "Gestor Inc."], [
    ["Detección de anomalía", "-", "-", "-", "-", "R", "R"],
    ["Registro de ticket", "-", "-", "-", "-", "-", "R"],
    ["Asignación a analista", "-", "R", "-", "-", "-", "-"],
    ["Investigación y análisis", "-", "I", "R", "-", "C", "-"],
    ["Reproceso / recuperación", "A", "I", "R", "-", "-", "-"],
    ["Documentación diagnóstico", "-", "I", "R", "I", "-", "-"],
    ["Comunicación a usuario", "-", "-", "-", "-", "-", "R"],
    ["Seguimiento SLA", "A", "I", "-", "R", "-", "I"],
    ["Alerta vencimiento", "-", "I", "-", "R", "-", "-"],
    ["Escalamiento externo", "-", "-", "-", "-", "-", "R"],
    ["Cierre del incidente", "-", "I", "I", "I", "-", "R"],
]));

children.push(h2("5.2 Roles Clave y sus Funciones"));
children.push(makeTable(["Persona", "Rol", "Funciones Principales"], [
    ["César U. Damián Fierro", "Subdirector", "Aprobación de decisiones, revisión de reportes diarios, estrategia de transformación"],
    ["Daniel Flores Ortiz", "Calidad", "Extracción Jira, alertas vencimiento, documentación de procesos"],
    ["Luis Eduardo Lara García", "Calidad", "Reportes de carga de trabajo, desarrollo de herramientas, diseño de catálogos"],
    ["Luisa F. Zamora Pérez", "Calidad", "Validación de incidentes en progreso, seguimiento directo con analistas"],
    ["Edgar Y. Pita Rodríguez", "Ger. Observabilidad", "Estrategia de monitoreo, diseño de alertas inteligentes, mejora continua"],
    ["Karem Jattar Linares", "Metodología", "Implementación Design Thinking, estandarización de diagnósticos"],
    ["Marisol Rodríguez Oaxaca", "Apoyo estratégico", "Facilitación de sesiones, gestión administrativa"],
]));

// ============ SECTION 6: DEPENDENCIAS ============
children.push(hr(), h1("6. MAPA DE DEPENDENCIAS ENTRE GERENCIAS"));
children.push(para("Las gerencias de S2N no operan de manera aislada. Existen dependencias críticas entre ellas que, si fallan, pueden afectar significativamente la operación:"));

children.push(makeTable(["Dependencia", "Tipo de Flujo", "Impacto si Falla"], [
    ["Línea → Batch", "Log transaccional (DESC, Kibana)", "Sin log no hay compensación ni liquidación — se detiene el abono a comercios"],
    ["BOW → Batch (BUP/BINes)", "Archivos de BINes actualizados", "BINes desactualizados generan rechazos en intercambio internacional"],
    ["BOW → Batch (Sidma/BDN)", "Trámites de afiliación procesados", "Comercios no pueden operar sin afiliación"],
    ["Batch → BBVA Perú", "Archivos de intercambio", "Sin archivos no hay compensación para operaciones LATAM"],
    ["Monitor → Todas las gerencias", "Alertas proactivas 24/7", "Sin alertas, los incidentes se detectan por impacto al usuario (reactivo)"],
    ["Calidad → Subdirección", "Reportes de SLA y carga", "Sin visibilidad para toma de decisiones ejecutivas"],
    ["Multi → Línea, Batch, BOW, BOC", "Diagnóstico cross-platform", "Incidentes complejos sin análisis integral"],
    ["Externas: Desarrollo, Producción, PMO", "Cambios, instalaciones, proyectos", "Dependencias fuera del control de S2N que afectan tiempos de resolución"],
]));

// ============ SECTION 7: HERRAMIENTAS ============
children.push(hr(), h1("7. INVENTARIO DE HERRAMIENTAS AS-IS"));

children.push(makeTable(["Herramienta", "Tipo", "Gerencias", "Función"], [
    ["Jira", "Gestión tickets", "Todas", "Registro de incidentes, requerimientos, tareas"],
    ["Kibana/Elastic", "Análisis logs", "Línea, Batch, Perú, Multi", "Consulta de transacciones en tiempo casi real"],
    ["Datadog", "APM/Monitoring", "Monitor de Salud (18 apps)", "Monitoreo de aplicaciones y métricas de rendimiento"],
    ["Control-M", "Scheduler", "Batch, Monitor Salud", "Ejecución programada de jobs batch y monitores"],
    ["Slack", "Alertas", "Monitor Salud, Operaciones", "Canal de alertas parametrizadas en tiempo real"],
    ["Rawcom", "Análisis tramas", "Línea", "Análisis de mensajería ISO 8583 en formato crudo"],
    ["DESC", "Log transaccional", "Línea, Batch", "Registro maestro de transacciones autorizadas"],
    ["Insite (F5)", "Análisis tráfico", "Multi, Línea", "Decodificación de mensajes ISO, análisis de red"],
    ["Authentic", "App transaccional", "Línea", "Plataforma core del switch (Linux/Oracle)"],
    ["Excel (alertas)", "Gestión SLA", "Calidad", "Alertas de vencimiento, tracking de incidentes"],
    ["Formulario Java", "Diagnósticos", "Todas", "Registro de diagnósticos (independiente de Jira)"],
    ["Sidma", "Afiliaciones", "BO App Web", "Gestión de trámites y afiliaciones de adquirentes"],
    ["BUP", "BINes", "BO App Web, Batch", "Plataforma unificada de BINes"],
    ["BDN", "Catálogo comercios", "BO App Web", "Base de Datos Nacional de comercios"],
    ["Pconsul", "Controversias", "BO Controversias", "Gestión de disputas (Delphi — OBSOLETO)"],
    ["CAP / Web Transfer", "Cargos automáticos", "BO App Web", "Procesamiento de cargos recurrentes (Java Servlet)"],
    ["KitWs", "Telecarga", "Multi", "Actualización de versiones terminales EVO"],
    ["Asana", "Gestión proyectos", "Monitor de Salud", "Seguimiento de proyectos internos del área"],
    ["Google Chat", "Comunicación", "Todas", "Chats de tracking, comunicación con gestores"],
]));

// ============ SECTION 8: GAPS ============
children.push(hr(), h1("8. ANÁLISIS DE GAPS Y CRITICIDAD (SEMANA 3)"));

children.push(h2("8.1 Gaps Tecnológicos"));
children.push(makeTable(["ID", "Gap", "Impacto", "Severidad"], [
    ["GT-01", "Pconsul en Delphi (obsoleto, sin logs de error)", "Imposibilidad de diagnóstico automatizado en Controversias", "ALTA"],
    ["GT-02", "Renovación automática de BINs deshabilitada en BUP", "Rechazos mensuales en intercambio EVO Chile", "ALTA"],
    ["GT-03", "Jira limitado a 100 issues por consulta API", "Extracción manual diaria, sin integración directa", "MEDIA"],
    ["GT-04", "Herramienta de alertas en Excel (artesanal)", "Riesgo de error humano, limitada escalabilidad", "MEDIA"],
    ["GT-05", "CAP/Web Transfer sin Datadog (migración 3-6 meses)", "Falta de visibilidad en procesamiento de cargos automáticos", "MEDIA"],
    ["GT-06", "4 hilos de procesamiento en CAP", "Problemas de concurrencia con archivos simultáneos", "MEDIA-BAJA"],
]));

children.push(h2("8.2 Gaps de Proceso"));
children.push(makeTable(["ID", "Gap", "Impacto", "Severidad"], [
    ["GP-01", "Sin estandarización de diagnósticos", "Calidad variable en análisis y documentación", "ALTA"],
    ["GP-02", "Reprocesos manuales de transacciones (Amex Blue, EVO)", "Riesgo financiero por error humano en montos", "ALTA"],
    ["GP-03", "Deuda técnica BBVA Perú genera incidentes diarios", "Desperdicio de capacidad analítica en análisis repetitivos", "ALTA"],
    ["GP-04", "Monitor Operativo no existe como área formal", "Monitor de Salud ejecuta doble función (sobrecarga)", "MEDIA"],
    ["GP-05", "Vencimiento de diagnóstico no automatizado desde Jira", "Cálculo manual de fechas de vencimiento", "MEDIA"],
    ["GP-06", "Documentación de incidencias no mapeada por tipo", "Solo los más recurrentes de Sidma están documentados", "MEDIA"],
]));

children.push(h2("8.3 Gaps Organizacionales"));
children.push(makeTable(["ID", "Gap", "Impacto", "Severidad"], [
    ["GO-01", "Equipo Multi con 2/7 personas activas (28%)", "Capacidad reducida para diagnóstico integral y proyectos", "ALTA"],
    ["GO-02", "Transferencia de conocimiento generacional", "Prácticas inconsistentes, dependencia de personas", "MEDIA"],
    ["GO-03", "Percepción negativa del rol de soporte L1", "Dificultad para atraer/retener talento junior", "MEDIA"],
    ["GO-04", "Resistencia al cambio en metodologías nuevas", "Implementaciones lentas, baja adopción", "MEDIA-BAJA"],
]));

children.push(h2("8.4 Matriz de Criticidad — Impacto × Urgencia"));
children.push(para("Los 15 gaps identificados fueron evaluados en una matriz de impacto × urgencia para determinar la priorización de atención en la Fase 2:"));
children.push(makeTable(["Cuadrante", "Gaps", "Acción Recomendada"], [
    ["CRÍTICO (Alto impacto + Alta urgencia)", "GT-01, GT-02, GP-01, GP-02, GP-03, GO-01", "Atención inmediata en Fase 2. Diseño TO-BE prioritario."],
    ["IMPORTANTE (Alto impacto + Baja urgencia)", "GT-03, GT-04, GP-04", "Planificar para Fase 2-3. Proyectos estructurales."],
    ["QUICK WIN (Bajo impacto + Alta urgencia)", "GP-05, GP-06, GT-06", "Implementar en paralelo como quick wins."],
    ["MONITOREAR (Bajo impacto + Baja urgencia)", "GT-05, GO-02, GO-03, GO-04", "Seguimiento periódico. Abordar cuando haya capacidad."],
]));

// ============ SECTION 9: PROBLEMAS RECURRENTES ============
children.push(hr(), h1("9. PRINCIPALES PROBLEMAS RECURRENTES DE INCIDENTES"));
children.push(para("Basado en el análisis de incidentes fuera de SLA del período Noviembre 2025 — Enero 2026:"));
children.push(makeTable(["Categoría", "Descripción", "Frecuencia"], [
    ["Diferencias en reportería BBVA Perú", "Dispatchers no listados (30003, 30006), pago con puntos, cierre de turnos T+2", "Diaria"],
    ["Rechazos MC código 2969", "Llave débil en proceso batch para campo trace_id", "Semanal"],
    ["Rechazos de sintaxis Prosa", "Nombre de comercio con caracteres inválidos, fechas > 30 días", "Semanal"],
    ["BINs no actualizados (BUB)", "Renovación automática deshabilitada (GDP-984 en pruebas)", "Mensual"],
    ["Monitor de archivos (bug)", "Registra archivo del día anterior como actual", "Quincenal"],
    ["Smart Hotel — llaves duplicadas", "Check Out con misma llave de match (GDP-882 pendiente)", "Semanal"],
]));

// ============ SECTION 10: ESTRATEGIA E INICIATIVAS ============
children.push(hr(), h1("10. ESTRATEGIA E INICIATIVAS EN CURSO"));

children.push(h2("10.1 Monitor de Salud → Monitor de Servicios (Observabilidad)"));
children.push(para("Iniciativa estratégica central de la subdirección: evolucionar de un monitoreo reactivo a un modelo de observabilidad proactiva y predictiva. El concepto de 'Inteligencia Operativa' busca que las alertas incorporen conocimiento del negocio para evitar falsos positivos, utilizando umbrales validados con datos históricos de 3 meses."));
children.push(para("La evolución tecnológica planificada (Shell → Python → Java → Machine Learning) permitirá eventualmente predecir incidentes antes de que ocurran, pasando de un modelo de detección a uno de prevención."));

children.push(h2("10.2 Metodología de Diagnóstico (Design Thinking + 5 Porqués)"));
children.push(para("Se ha identificado que los diagnósticos de incidentes carecen de estandarización: cada analista resuelve de manera diferente, con documentación variable en calidad y completitud. La solución propuesta es una metodología híbrida que combina:"));
children.push(bulletBold("Design Thinking: ", "Foco en empatía con el usuario, entender el impacto de negocio antes de sumergirse en lo técnico."));
children.push(bulletBold("Five Whys (5 Porqués): ", "Técnica estructurada para llegar a la causa raíz de los incidentes."));
children.push(bulletBold("ITIL 4: ", "Prácticas formales de gestión de incidentes y problemas."));
children.push(para("La iniciativa incluye el uso de IA para generar borradores de diagnósticos ejecutivos a partir del análisis técnico, con prompts estandarizados para la conversión de lenguaje técnico a lenguaje de negocio."));
children.push(boldPara("Deadline: ", "31 de marzo 2026"));
children.push(boldPara("Líderes: ", "Karem Jattar Linares, Guadalupe Segovia Copado, Ángel Domínguez Chávez"));

children.push(h2("10.3 Automatización de Reprocesos Manuales"));
children.push(para("Los reprocesos manuales de transacciones (Amex Blue, EVO devoluciones) representan un riesgo operativo significativo por la manipulación manual de montos financieros. La iniciativa de automatización está actualmente estancada y requiere retomarse con los equipos de Desarrollo y Operaciones. Gerardo Camacho (Multi) debe abrir un ticket formal para impulsar esta automatización."));

// ============ SECTION 11: METRICAS ============
children.push(hr(), h1("11. MÉTRICAS OPERATIVAS — BASELINE"));

children.push(makeTable(["Métrica", "Valor", "Período"], [
    ["Incidentes asignados a S2N (semanal)", "~144", "Enero 2026"],
    ["Cumplimiento SLA recuperación", "96% (< 4 días)", "Enero 2026"],
    ["Cumplimiento SLA diagnóstico", "99% (< 10 días)", "Enero 2026"],
    ["Monto mitigado acumulado", "$2,299,733,324.40 MXN", "2025"],
    ["Monto mitigado semanal (ejemplo)", "$5,743,549.34 MXN", "Semana 15-21 Ene 2026"],
    ["HH invertidas en reprocesos", "1,998 hrs (952 hábiles + 1,046 inhábiles)", "2025"],
    ["Procesos críticos monitoreados", "336 / 591 (58.54%)", "Febrero 2026"],
    ["Monitores activos", "96 en 16 aplicativos", "Febrero 2026"],
    ["Aplicaciones en Datadog", "18", "Febrero 2026"],
    ["Incidentes activos simultáneos", "~134", "Febrero 2026"],
    ["Frecuencia promedio de alertas", "~1.6 veces/día", "Febrero 2026"],
]));

children.push(h2("11.1 Análisis de Incidentes Fuera de SLA"));
children.push(para("Del análisis del período Noviembre 2025 a Enero 2026, se identificó que aproximadamente el 70% de los incidentes que exceden los tiempos de SLA están relacionados con la deuda técnica de BBVA Perú. Esta concentración indica que resolver los proyectos EGBBP24039 y EGBMR21172 tendría el mayor impacto en la mejora del indicador de SLA de toda la subdirección."));

// ============ SECTION 12: TAREAS GENERICAS ============
children.push(hr(), h1("12. CATÁLOGO DE TAREAS GENÉRICAS (Dirección de TI)"));
children.push(para("Las actividades de S2N están catalogadas bajo los siguientes códigos definidos por la Dirección de TI:"));
children.push(makeTable(["Código", "Actividad"], [
    ["DES-15293", "Estrategias"],
    ["DES-15304", "Operación BAU (día a día)"],
    ["DES-14931", "Soporte a Producción"],
    ["DES-14941", "Monitoreo, Gestión de Incidentes y Problemas"],
    ["DES-14927", "Implementación de Cambios"],
    ["DES-14928", "Investigación e Innovación"],
    ["DES-14929", "Minería de Datos y Estadísticos"],
    ["DES-14940", "Mejora Continua"],
    ["DES-14936", "Auditoría y Control Interno"],
]));

// ============ SECTION 13: CONCLUSIONES ============
children.push(hr(), h1("13. CONCLUSIONES Y PRÓXIMOS PASOS"));

children.push(h2("13.1 Estado del Modelo Operativo AS-IS"));
children.push(para("El modelo operativo actual de la Subdirección S2N demuestra un alto nivel de cumplimiento en sus indicadores de servicio (96% en recuperación, 99% en diagnóstico), resultante de la dedicación y experiencia de un equipo de ~65-70 personas que operan con un impacto financiero cuantificable superior a los $2,299 millones de pesos mexicanos mitigados en 2025."));
children.push(para("Sin embargo, este nivel de desempeño se sostiene sobre fragilidades estructurales que, de no atenderse, pueden erosionar gradualmente la capacidad de respuesta:"));
children.push(bullet("Dependencia de herramientas manuales y artesanales para el control de SLA (Excel como eje de seguimiento)"));
children.push(bullet("Deuda técnica acumulada que genera carga operativa innecesaria (especialmente BBVA Perú, responsable del ~70% de fuera-de-SLA)"));
children.push(bullet("Falta de estandarización en procesos de diagnóstico (cada analista documenta de forma diferente)"));
children.push(bullet("Sobrecarga de roles (Monitor de Salud ejecuta doble función: estratégica + operativa)"));
children.push(bullet("Recursos humanos redistribuidos (Multidisciplinaria operando al 28% de capacidad por préstamo de personal)"));
children.push(bullet("Tecnología legacy sin plan de migración (Pconsul en Delphi, BUP con renovación automática deshabilitada)"));

children.push(h2("13.2 Fortalezas Identificadas"));
children.push(bullet("SLA de recuperación consistentemente superior al 96% — la subdirección cumple a pesar de las fragilidades"));
children.push(bullet("Monto mitigado > $2.3B MXN en 2025 — impacto financiero cuantificable y significativo para el negocio"));
children.push(bullet("Monitor de Salud avanzando hacia observabilidad predictiva con 336+ procesos críticos monitoreados"));
children.push(bullet("Iniciativa de metodología Design Thinking en marcha para transformar la calidad de los diagnósticos"));
children.push(bullet("Equipo comprometido con conocimiento profundo de las plataformas"));

children.push(h2("13.3 Próximos Pasos — Fase 2: Diseño TO-BE"));
children.push(para("Los 15 gaps identificados y priorizados en la matriz de criticidad servirán como input directo para la Fase 2, donde se diseñará el modelo operativo objetivo (TO-BE). Las líneas de trabajo prioritarias serán:"));
children.push(bullet("Diseño de procesos estandarizados de diagnóstico con la metodología híbrida Design Thinking + 5 Porqués + ITIL"));
children.push(bullet("Propuesta de automatización para los reprocesos manuales de alto riesgo financiero"));
children.push(bullet("Plan de migración tecnológica para Pconsul (Delphi) y resolución de BUP/BUB"));
children.push(bullet("Formalización del Monitor Operativo como área independiente"));
children.push(bullet("Plan de redistribución de personal de Multidisciplinaria"));
children.push(bullet("Evaluación de herramientas para reemplazar el seguimiento de SLA en Excel"));

children.push(spacer(), hr());
children.push(para("Elaboró: Kenneth Andersson Perleche Quintanilla", { bold: true }));
children.push(para("Revisó: (pendiente)"));
children.push(para("Autorizó: (pendiente — César Ulises Damián Fierro)"));
children.push(para("Fecha: Marzo 2026"));
children.push(para("Versión: 3.0 — Documento Consolidado"));

// ============ GENERATE DOCUMENT ============
const doc = new docx.Document({
    creator: "Kenneth Andersson Perleche Quintanilla",
    title: "Modelo Operativo AS-IS — Subdirección S2N — E-Global",
    description: "Documento consolidado del diagnóstico estructural AS-IS de la Subdirección de Soporte 2do Nivel",
    styles: {
        default: {
            document: { run: { font: "Calibri", size: 22 } }
        }
    },
    sections: [{ properties: { page: { margin: { top: 1440, right: 1440, bottom: 1440, left: 1440 } } }, children }],
});

const OUTPUT = "C:\\Users\\kenne\\OneDrive\\Documentos\\E-Global\\Modelo_Operativo_AS_IS_S2N_Consolidado.docx";
Packer.toBuffer(doc).then((buffer) => {
    fs.writeFileSync(OUTPUT, buffer);
    console.log("SUCCESS! Document saved to:", OUTPUT);
    console.log("Total paragraphs/elements:", children.length);
}).catch(err => { console.error("ERROR:", err); });
