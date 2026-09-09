# Estado de Documentación - Restructuración

**Fecha:** 2026-09-07

## Estructura Deseada vs Actual

### ✅ 1. Getting Started / Login y Registro
- ✅ `getting-started/login-registro.mdx` (movido desde authentication.mdx)

**Falta crear:**
- [ ] Getting started intro
- [ ] Registro (sign up)
- [ ] Primer login

---

### ✅ 2. Conceptos
- ✅ `concepts/concepts.mdx`

**Debería contener (según estructura deseada):**
- [ ] Organizaciones, proyectos, miembros y roles

**Pendiente de desglosar en subcapítulos**

---

### ✅ 3. Agents
- ✅ `agents/que-es-un-agent.mdx` (overview)
- ✅ `agents/configuracion.mdx` (settings)

**Falta crear:**
- [ ] Configuración del prompt
- [ ] Modelos y capacidades
- [ ] Configuración de Datasources
- [ ] Configuración de Tools
- [ ] **Avanzado/**
  - [ ] Structured Output
  - [ ] Agent Slugs
  - [ ] Versiones

---

### ✅ 4. Datasources
- ✅ Directorio creado: `datasources/`

**Falta crear:**
- [ ] Que es un Datasource
- [ ] Tipos de Datasource (Manual o Google Drive)
- [ ] Datasources compartidos
- [ ] Metadata
- [ ] Recursos
- [ ] Tipos de recursos (Ficheros, URLs/Sitemaps, Content)
- [ ] Metadata de recursos

---

### ✅ 5. Tools
- ✅ `tools/que-es-una-tool.mdx`
- ✅ `tools/api-requests.mdx`
- ✅ `tools/mcp-servers.mdx`
- ✅ `tools/browser-tool.mdx`
- ✅ `tools/external-datasource.mdx`
- ✅ `tools/perplexity-ai.mdx`
- ✅ `tools/agents.mdx`

**Falta crear:**
- [ ] Tipos de Tools (resumen)
- [ ] Credenciales
- [ ] Configuración básica de una Tool
- [ ] Code Interpreter (parece falta)

---

### ❌ 6. Workflows
- ❌ Directorio creado: `workflows/`

**Falta crear completamente:**
- [ ] Que es un Workflow
- [ ] Cómo funciona el motor de ejecución
- [ ] Tipos de nodos
- [ ] Dependencias
- [ ] Variables de ejecución
- [ ] Variables de entrada

---

### ❌ 7. Jobs
- ❌ Directorio creado: `jobs/`

**Falta crear:**
- [ ] Que es un Job
- [ ] Configuración

---

### ❌ 8. Triggers
- ❌ Directorio creado: `triggers/`

**Falta crear:**
- [ ] Documentación completa

---

### ❌ 9. Monitor
- ❌ Directorio creado: `monitor/`

**Falta crear:**
- [ ] Documentación completa

---

### ✅ 10. API
- ✅ Directorio creado: `api/`

**Falta crear:**
- [ ] Autenticación
- [ ] Endpoints

---

### 📚 Otros
- ✅ `index.mdx` - Homepage (mantener)
- ✅ `guides/first-agent.mdx` - Tutorial/Quickstart (mantener)

---

## Archivos Movidos a `_internal/`

Estos archivos NO son documentación de usuario final:

- `_internal/development.mdx` - Cómo ejecutar Mintlify localmente
- `_internal/essentials/` - Guía sobre cómo escribir documentación
- `_internal/ai-tools/` - Guías sobre herramientas externas (Claude Code, Cursor, etc.)
- `_internal/api-reference/` - Referencia API completa (puede generarse automáticamente)
- `_internal/snippets/` - Ejemplos de código
- `_internal/README.md` - Meta-documentación sobre infraestructura
- `_internal/mcp-improvements.md` - Notas técnicas internas

---

## Próximos Pasos

1. **Actualizar docs.json** - Reflejar nueva estructura de navegación
2. **Crear documentación faltante** - Especialmente Workflows, Jobs, Triggers, Monitor
3. **Desglosar archivos grandes** - Algunos .mdx contienen múltiples temas
4. **Revisar contenido existente** - Asegurar que alinee con estructura deseada
5. **Agregar índices/overviews** - Para cada sección principal

---

## Estadísticas

| Métrica | Valor |
|---------|-------|
| **Total .mdx en docs/core** | 14 |
| **Total .mdx en _internal/** | 7+ |
| **Directorios core creados** | 8 |
| **Documentación completada** | ~35% |
| **Documentación por crear** | ~65% |

