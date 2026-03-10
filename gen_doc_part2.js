const p1 = require("./gen_doc_part1.js");
const { children, h1, h2, h3, para, boldPara, bullet, bulletBold, spacer, hr, makeTable } = p1;

// ============ SECTION 3: MACROPROCESOS ============
children.push(hr(), h1("3. MAPA DE MACROPROCESOS AS-IS"));

children.push(h2("3.1 Flujo Principal: Gestión de Incidentes End-to-End"));
children.push(para("El proceso central que articula toda la operación de S2N es la Gestión de Incidentes, alineado con las prácticas de ITIL 4. El flujo completo, desde la detección de una anomalía hasta el cierre del incidente, involucra múltiples actores y sistemas:"));

children.push(h3("Paso 1: Detección de Anomalía"));
children.push(para("La detección puede originarse por tres vías: (a) alertas proactivas del Monitor de Salud a través de Slack, (b) reportes de usuarios/operaciones al Service Desk, o (c) identificación directa por analistas S2N durante sus actividades de monitoreo."));

children.push(h3("Paso 2: Registro en Jira"));
children.push(para("El Service Desk o el propio Monitor de Salud levanta un folio (ticket) en Jira con la información inicial del incidente: descripción, prioridad estimada, plataforma afectada y grupo de asignación correspondiente."));

children.push(h3("Paso 3: Asignación a S2N"));
children.push(para("El ticket se asigna al grupo de soporte correspondiente según la plataforma afectada. El gerente del área puede reasignar al analista más adecuado según la complejidad y disponibilidad."));

children.push(h3("Paso 4: Investigación y Diagnóstico"));
children.push(para("El analista de S2N investiga la causa raíz utilizando las herramientas especializadas de su gerencia (Kibana, Rawcom, DESC, Datadog, Insite F5, según aplique). Se realizan consultas a logs, análisis de mensajería ISO, revisión de archivos de procesamiento y correlación de eventos."));

children.push(h3("Paso 5: Determinación de Acción"));
children.push(para("Si el incidente requiere un cambio en código o configuración, se reasigna al equipo de Desarrollo / Gestión de Cambios. Si es recuperable por S2N, se ejecuta la acción de recuperación directamente (reproceso, reinicio de servicio, corrección de datos)."));

children.push(h3("Paso 6: Documentación del Diagnóstico"));
children.push(para("El analista documenta el diagnóstico completo en el Formulario Java (sistema desarrollado internamente, independiente de Jira), incluyendo: causa raíz, acción tomada, impacto estimado y recomendaciones."));

children.push(h3("Paso 7: Comunicación"));
children.push(para("El diagnóstico se comparte con el Gestor de Incidentes, quien comunica la resolución al usuario/banco afectado en un lenguaje de negocio comprensible."));

children.push(h3("Paso 8: Cierre del Incidente"));
children.push(para("Una vez confirmada la resolución, el Gestor de Incidentes cierra el ticket en Jira. El equipo de Calidad valida que los tiempos de SLA se hayan cumplido."));

children.push(h2("3.2 Acuerdos de Nivel de Servicio (SLA)"));
children.push(makeTable(["Prioridad", "Tiempo de Recuperación", "Horario de Atención", "Descripción"], [
    ["P1 — Crítica", "2 horas", "24/7 (inmediato)", "Afectación masiva a la operación transaccional"],
    ["P2 — Alta", "4 horas", "24/7 (inmediato)", "Afectación significativa a un cliente o proceso crítico"],
    ["P3 — Media", "1 día hábil", "Horario hábil", "Afectación parcial, workaround disponible"],
    ["P4 — Baja", "3 días hábiles", "Horario hábil", "Afectación menor, sin impacto en producción"],
    ["P5 — Mínima", "5 días hábiles", "Horario hábil", "Solicitudes de información o mejoras"],
]));
children.push(boldPara("SLA interno S2N: ", "Recuperación < 4 días, Diagnóstico < 10 días. Estos indicadores son monitoreados diariamente por el equipo de Calidad con dos cortes: ~10am y ~5pm."));

// ============ SECTION 4: PROCESOS POR GERENCIA ============
children.push(hr(), h1("4. PROCESOS DETALLADOS POR GERENCIA"));

// 4.1 LINEA
children.push(h2("4.1 Gerencia de Línea (Switch Transaccional)"));
children.push(boldPara("Gerente: ", "Valter Raziel César Márquez Hernández"));
children.push(boldPara("Función Principal: ", "Procesamiento de transacciones en tiempo real mediante el protocolo ISO 8583. Esta gerencia es el corazón del switch transaccional, donde cada mensaje de autorización de una compra con tarjeta es recibido, ruteado, procesado y respondido en milisegundos."));

children.push(h3("Flujo Transaccional"));
children.push(para("1. El adquirente (terminal POS, ATM, e-commerce) envía un mensaje ISO 8583 al switch."));
children.push(para("2. El sistema Authentic analiza el mensaje entrante, validando campos clave (BIN, tipo de mensaje, monto)."));
children.push(para("3. El mensaje se rutea al emisor correspondiente (banco que emitió la tarjeta)."));
children.push(para("4. Se recibe la respuesta del emisor (aprobación, rechazo, o referir)."));
children.push(para("5. La respuesta se envía de vuelta al adquirente."));
children.push(para("6. La transacción se graba en el Log Transaccional (DESC) para su posterior procesamiento batch."));
children.push(para("7. Los datos quedan disponibles para consulta en tiempo casi real a través de Kibana/Elastic."));

children.push(h3("Tipos de Mensaje ISO 8583"));
children.push(bulletBold("Single Message (0200): ", "Autorización y compensación en un solo mensaje. Utilizado principalmente en transacciones POS donde se requiere respuesta inmediata."));
children.push(bulletBold("Double Message: ", "Autorización (0100) separada de la compensación posterior. Utilizado en escenarios donde la compensación se procesa en batch."));

children.push(h3("Procesos Clave de Soporte"));
children.push(bullet("Análisis de transacciones utilizando Rawcom (tramas crudas), DESC (log transaccional) y Kibana (dashboards)"));
children.push(bullet("Diagnóstico de fallas en mensajería ISO: campos faltantes, valores incorrectos, timeouts"));
children.push(bullet("Validación de indicadores: tokens C4, B5, campo 55 (datos de chip EMV)"));
children.push(bullet("Soporte en cortes de ATM y administrador de cortes"));
children.push(bullet("Análisis integral con Batch cuando se requiere cruzar información de autorización con compensación"));
children.push(boldPara("Métricas (Diciembre 2025): ", "120 tickets atendidos, 100% SLA en recuperación P2/P3."));

// 4.2 BATCH
children.push(h2("4.2 Gerencia Batch (Procesamiento por Lotes)"));
children.push(boldPara("Gerente: ", "Enrique Solis Cielo | Líder Técnico: Juan David Peña Cruz | Backup: Armando Rodríguez Rojano"));
children.push(boldPara("Función Principal: ", "Compensación, liquidación e intercambio de transacciones con marcas internacionales (Visa, Mastercard, Amex, Discover) y entidades nacionales (Prosa, Banamex). Opera 24/7 procesando los lotes de transacciones que fueron autorizadas por la Gerencia de Línea."));

children.push(h3("Subprocesos Principales"));
children.push(bulletBold("Compensación Doméstica: ", "Intercambio con Prosa y Banamex a través del sistema CID (Centro de Intercambio y Datos). Validaciones de sintaxis, nombre de comercio, fechas y duplicidad."));
children.push(bulletBold("Intercambio Internacional: ", "Generación de archivos Outgoing (envío a marcas) y recepción de archivos Incoming (respuesta de marcas). Cada marca tiene su propio formato y reglas de negocio."));
children.push(bulletBold("Liquidación: ", "Abono a comercios, generación de archivos LiqCom para el Monitor BX."));
children.push(bulletBold("Procesos Especiales: ", "No Match (transacciones sin coincidencia), riesgo/fraude, reprocesos manuales."));
children.push(bulletBold("Reportería: ", "Estadísticos, cifras de lotes, conciliación de carátulas."));

children.push(h3("Incidentes Frecuentes"));
children.push(bullet("Diferencias en reportería por dispatchers no configurados correctamente"));
children.push(bullet("Rechazos por llaves débiles: trace_id duplicado — código Mastercard 2969"));
children.push(bullet("Rechazos de sintaxis CID: nombre de comercio con caracteres inválidos, fechas fuera de rango, duplicidad de registros"));
children.push(bullet("Bugs en Monitor de Archivos: registra archivo del día anterior como actual (problema quincenal)"));

// 4.3 BO CONTROVERSIAS
children.push(h2("4.3 Gerencia BackOffice Controversias"));
children.push(boldPara("Gerente: ", "Agustín Monterrosa Camacho | Líderes Técnicos: Jesús Ramírez Méndez, Luis Fernando Villar"));
children.push(boldPara("Función Principal: ", "Gestión de disputas transaccionales POS y ATM, incluyendo contracargos, devoluciones y representaciones. Actúa como intermediario técnico entre las marcas internacionales y los adquirentes en procesos de disputa."));

children.push(h3("Flujo de Controversias"));
children.push(para("1. La marca o emisor envía un contracargo al sistema Pconsul."));
children.push(para("2. Se recepcionan y cargan los archivos de soporte (VROL de Visa para disputas)."));
children.push(para("3. El área de Operaciones gestiona la disputa, recopilando evidencia."));
children.push(para("4. Se generan las imágenes de soporte requeridas por la marca."));
children.push(para("5. Se envía la respuesta al emisor/marca con la resolución."));

children.push(h3("Aplicativos"));
children.push(bulletBold("Pconsul: ", "Sistema principal de controversias, desarrollado en Delphi — tecnología OBSOLETA que no cuenta con bitácora automática de errores. Esto representa el gap tecnológico GT-01, uno de los más críticos de toda la subdirección, ya que imposibilita el diagnóstico automatizado de fallas."));

// 4.4 BO APP WEB
children.push(h2("4.4 Gerencia BackOffice App Web"));
children.push(boldPara("Gerente: ", "Alfredo Ortega Cervantes"));
children.push(boldPara("Función Principal: ", "Soporte de aplicaciones web de negocio y gestión de procesos de afiliaciones de comercios y renovación de BINes (Bank Identification Numbers)."));

children.push(h3("4.4.1 Flujo de Afiliaciones (Sidma → BDN)"));
children.push(para("El proceso de afiliación permite registrar nuevos comercios en el ecosistema de pagos:"));
children.push(para("1. El adquirente (EVO, Banorte, Paga Todo, Inbursa próximamente) envía un archivo XML con los trámites de afiliación."));
children.push(para("2. SIDMA recibe los archivos en ventanas programadas (5:30 y 7:50 AM)."));
children.push(para("3. Se ejecutan validaciones de formato y datos mínimos."));
children.push(para("4. Los trámites se cargan a la Base de Datos Nacional (BDN) con validaciones de negocio rigurosas."));
children.push(para("5. El registro se envía asincrónicamente a las marcas (Discover, Amex) para obtener el número de afiliación."));

children.push(h3("4.4.2 Renovación de BINes (BUP)"));
children.push(para("La BUP (Bin Unified Platform) centraliza la gestión de BINes que determinan a qué banco pertenece cada tarjeta:"));
children.push(bulletBold("Fuentes: ", "Archivos de marcas (Visa, MC) + Merlos (Banxico para BINs nacionales)"));
children.push(bulletBold("Gap Crítico (GT-02): ", "La renovación AUTOMÁTICA de BINes internacionales en la BUB (subsistema) está DESHABILITADA. Se realiza manualmente, generando rechazos mensuales en intercambio con EVO Chile. El proyecto GDP-984 está en fase de pruebas para resolver este problema."));

children.push(h3("Otros Aplicativos"));
children.push(bulletBold("CAP / Web Transfer: ", "Cargos automáticos mediante Java Servlet + JP procesador. Opera con 4 hilos de procesamiento, lo que genera problemas de concurrencia cuando llegan archivos simultáneos."));
children.push(bulletBold("KG: ", "Sistema de cobro del switch transaccional, genera informes de consumo para facturación."));
children.push(bulletBold("Evine, Capi: ", "Aplicativos pendientes de documentación completa."));

// 4.5 BBVA PERU / LATAM
children.push(h2("4.5 Gerencia BBVA Perú / LATAM"));
children.push(boldPara("Gerente: ", "Guadalupe Segovia Copado | Líderes: Gilberto Ulises Reyes Pacheco, Ángel Domínguez Chávez"));
children.push(boldPara("Función Principal: ", "Soporte integral para las operaciones de BBVA en Perú y consolidación de operaciones LATAM (Chile, Argentina). Opera sobre la plataforma SITMA con infraestructura dedicada para Perú."));

children.push(h3("Componentes Operativos"));
children.push(bulletBold("Autorizaciones (Línea): ", "Transacciones POS a través de OpenPay / Redsys, utilizando dispatchers 30001-30006."));
children.push(bulletBold("Batch Perú: ", "Generación de lotes, abono a comercios e intercambio con marcas (Visa, MC, Amex, Diners)."));
children.push(bulletBold("Reportería: ", "Estadístico BBVA, Cifras de Lotes, archivos Outgoing."));

children.push(h3("Operativas Específicas"));
children.push(bullet("Cierre de turnos (manual/automático) — Las diferencias surgen cuando el cierre manual genera fechas de abono > T+1"));
children.push(bullet("eBind portal: devoluciones y tasas preferenciales"));
children.push(bullet("Bloqueo de abono por fraude"));
children.push(bullet("Pago con puntos — funcionalidad que no se refleja correctamente en la reportería"));

children.push(h3("Problemática Recurrente — DEUDA TÉCNICA"));
children.push(para("BBVA Perú es el MAYOR GENERADOR DE INCIDENTES RECURRENTES en toda la subdirección. Las diferencias diarias en estadísticos se deben a deuda técnica de proyectos no completados:"));
children.push(bulletBold("EGBBP24039 — 'Reportes de capa EG': ", "Proyecto que debería resolver las discrepancias en reportería, actualmente en gestión por el equipo de Proyectos."));
children.push(bulletBold("EGBMR21172: ", "Proyecto histórico no finalizado que contribuye a las inconsistencias."));
children.push(para("Casuísticas recurrentes que consumen capacidad analítica diariamente:"));
children.push(bullet("Dispatchers 30003/30006 no listados en reportes de estadísticos"));
children.push(bullet("Transacciones con fecha de abono > T+1 por cierre de turnos manual"));
children.push(bullet("Pago con puntos no reflejado en reportería"));
children.push(bullet("Transacciones PinPad mezcladas con OpenPay en los reportes"));
children.push(para("Hallazgo crítico del análisis de incidentes fuera de SLA: aproximadamente el 70% de los incidentes fuera de SLA provienen de esta deuda técnica de BBVA Perú."));

// 4.6 MONITOR DE SALUD
children.push(h2("4.6 Gerencia Monitor de Salud (Observabilidad)"));
children.push(boldPara("Gerente: ", "Edgar Yedith Pita Rodríguez | Estructura: 2 Líderes Técnicos + ~6 Analistas"));
children.push(boldPara("Función Principal: ", "Diseño e implementación de monitores inteligentes para la detección proactiva de anomalías en las plataformas transaccionales. Esta gerencia opera en la intersección entre el rol estratégico (crear inteligencia operativa) y el rol operativo (consumir alertas 24/7)."));

children.push(h3("Rol Estratégico"));
children.push(bullet("Mesas de análisis con áreas operativas para entender casuísticas y definir qué monitorear"));
children.push(bullet("Minería de datos con +1.5 meses de datos históricos para establecer baselines"));
children.push(bullet("Desarrollo de reglas y umbrales (umbral estándar: 30% de desviación validado con 3 meses de histórico)"));
children.push(bullet("Evolución tecnológica: Shell Scripts → Python → Java → Machine Learning (meta futura)"));

children.push(h3("Rol Operativo"));
children.push(bullet("Consumo de alertas 24/7 desde Slack, Datadog, Control-M y monitores internos"));
children.push(bullet("Validación en dashboards de Datadog y Kibana"));
children.push(bullet("Solicitud de tickets al Service Desk cuando se confirma una anomalía"));
children.push(bullet("Notificación a grupos de soporte y convocatoria de meets de seguimiento"));

children.push(h3("Áreas Especializadas"));
children.push(bulletBold("Monitor Especializado: ", "Monitores inteligentes, reglas Slack parametrizadas, indicadores de comportamiento, alta disponibilidad ATM."));
children.push(bulletBold("Innovación y Monitoreo: ", "Nuevas soluciones de observabilidad, base de conocimientos, integración con AnyPoint."));

children.push(h3("Estado Actual de Cobertura"));
children.push(makeTable(["Métrica", "Valor"], [
    ["Procesos identificados", "1,201 en 59 aplicativos"],
    ["Procesos críticos", "591 en 30 aplicativos"],
    ["Procesos críticos monitoreados", "336 (58.54% de cobertura)"],
    ["Monitores activos", "96 en 16 aplicativos"],
    ["Aplicaciones en Datadog (APM)", "18 en producción"],
]));
children.push(para("NOTA IMPORTANTE: El equipo actualmente ejecuta funciones del Monitor Operativo (que aún no existe como área formal), además de su rol estratégico. Este gap organizacional (GP-04) genera sobrecarga y limita la capacidad de innovación."));

// 4.7 MULTIDISCIPLINARIA
children.push(h2("4.7 Gerencia Multidisciplinaria (SWAT)"));
children.push(boldPara("Gerente: ", "Gerardo Camacho López"));
children.push(boldPara("Función Principal: ", "Soporte integral cross-platform, diagnóstico avanzado que cruza múltiples gerencias, y atención de proyectos estratégicos. Actúa como el equipo de respuesta rápida para incidentes complejos que requieren conocimiento de múltiples plataformas."));

children.push(makeTable(["Proceso", "Descripción", "Frecuencia"], [
    ["Diagnóstico integral", "Análisis cruzando Línea + Batch + BackOffice para incidentes complejos", "Por incidente"],
    ["Telecarga EVO", "Actualización de versiones en terminales POS vía KitWs", "Diaria (~5pm)"],
    ["Reprocesos Amex Blue", "Generación manual de archivos insumo para reproceso de Amex", "Semanal"],
    ["Reprocesos EVO (devoluciones)", "Cambio de ventas a devoluciones (EVO no tiene infraestructura propia)", "Esporádico"],
    ["Validación de ambientes", "Revisión de estado POS/EVO Payments inicio y fin del día", "Diaria (2x)"],
    ["Alertas prevención de fraudes", "Validación de alertas de Karina San (segmentos ISO)", "Por alerta"],
    ["Atención de proyectos", "Carteras BBVA, EVO, Banorte, Citibanamex, Inbursa", "Continuo"],
    ["Documentación", "Generación de manuales paso a paso para base de conocimiento", "Continuo"],
]));
children.push(para("GAP ORGANIZACIONAL (GO-01): De 7 personas asignadas, solo 2 están activas (Gerardo + Fernando). Viviana, Carlos Andrés y Julio César están como refuerzo permanente en otras gerencias, reduciendo la capacidad del equipo al 28%."));

// 4.8 CALIDAD
children.push(h2("4.8 Gerencia de Calidad y Gestión Administrativa"));
children.push(boldPara("Equipo: ", "Daniel Flores Ortiz (Gerente), Luis Eduardo Lara García, Luisa Fernanda Zamora Pérez"));
children.push(boldPara("Función Principal: ", "Seguimiento de SLA, reportería ejecutiva a la Subdirección, gestión de formularios de diagnóstico y dashboards de control operativo."));

children.push(h3("Proceso Diario de Seguimiento"));
children.push(para("1. Extracción (diaria ~9am): Daniel descarga filtros de Jira a Excel y alimenta la herramienta de alertas (pestaña 'Origen Jira')."));
children.push(para("2. Análisis: Daniel genera alertas de vencimiento inminente (hoy/mañana antes de 11am) y próximo (2 días hábiles). Luisa revisa incidentes en progreso con más de 3 días. Luis Eduardo genera reportes de distribución de carga de trabajo."));
children.push(para("3. Comunicación: Se utilizan chats de tracking con gerentes (Google Chat) y un chat de calidad directo con César. Se actualizan dashboards Excel con gráficas de dona y barras."));

children.push(h3("Herramientas Propias Desarrolladas"));
children.push(bulletBold("Herramienta de alertas Excel: ", "Desarrollada por Luis Eduardo, centraliza filtros de Jira, cálculo de tiempos hábiles y condiciones de alerta. Es la herramienta principal para el seguimiento de SLA (gap GT-04: riesgo de error humano, limitada escalabilidad)."));
children.push(bulletBold("Formulario de diagnóstico Java: ", "Desarrollado por Rubén, con catálogos diseñados por Luis Eduardo. Funciona de manera independiente de Jira, permitiendo un registro más detallado y estructurado de los diagnósticos técnicos."));
children.push(bulletBold("Dashboard Excel: ", "Gráficas de distribución de carga de trabajo por gerencia, utilizado en los reportes diarios a César."));

console.log("Part 2 ready:", children.length, "elements");
module.exports = p1;
