# Datasources Documentation - Corrections & Validations

Based on plai-api repository analysis, the following corrections and validations were made:

## 1. Visibility/Sharing Model (CORRECTION)

**What I documented (WRONG):**
- Datasources have visibility levels: Private, Team, Public

**What is actually correct:**
- Datasources belong to a specific Project (Project Scope)
- Datasources can be shared with other Projects (cross-project sharing)
- There is NO Private/Team/Public visibility model
- Access is controlled at the Project level, not through visibility settings

**Impact:** Remove all "visibility" references from datasource-metadata.mdx

---

## 2. Metadata Schema (MAJOR CORRECTION)

**What I documented (WRONG):**
- Metadata is just labels/tags for organizing resources
- Resource metadata can be freely defined by the user
- Metadata fields are optional and flexible

**What is actually correct:**
- `metadata_schema` is a JSON Schema defined at the **Datasource level** (not Resource level)
- It defines a strict structure that ALL resources in that datasource MUST follow
- Each field has: `name`, `type` (str/int/float/bool), and `optional` (boolean)
- When creating a resource, its `metadata` field MUST conform to the datasource's `metadata_schema`
- If datasource has no `metadata_schema`, resources cannot have metadata

**Structure:**
```python
class MetadataSchemaEntry:
    name: str                              # Field name
    type: Literal["str", "int", "float", "bool"]  # Data type
    optional: bool                         # Can be omitted?

class MetadataSchema:
    entries: list[MetadataSchemaEntry]
```

**Example:**
```json
{
  "entries": [
    {"name": "department", "type": "str", "optional": false},
    {"name": "priority", "type": "int", "optional": true},
    {"name": "version", "type": "str", "optional": false}
  ]
}
```

**Related Concept: allowed_vectors**
- During agent invocation, pass `allowed_vectors` to filter resources by metadata values
- Format: `dict[str, MetadataFilter]` where keys match schema field names
- Only resources matching the filters are searched
- Example: only search in resources where `department="engineering"`

**Impact:** Completely rewrite datasource-metadata.mdx to explain metadata_schema properly

---

## 3. Google Drive Sync - Supported File Types (VALIDATION)

**What I documented:**
- Google Docs, Google Sheets, PDF, Word, Text, Rich Text

**Needs verification:**
- Actual supported types from plai-api haven't been explicitly verified
- The google-drive-datasource-frontend-flow.md doesn't specify file type restrictions
- Likely supported: Google Docs, Google Sheets, PDF, Word (.docx), Text (.txt, .md)
- Need to check: Spreadsheets (.xlsx), Rich Text (.rtf), PowerPoint

**Action:** Validate against actual Google Drive sync implementation in plai-api

---

## 4. URL/Webpage Re-scraping (UNCLEAR)

**What I documented:**
- URLs can be re-scraped automatically via cron job
- Old URLs can be removed from sitemap

**Actual Status:**
- The spec-resource-sync-and-firecrawl-config.md discusses:
  - Jobs stored in `resource.config["jobs"]`
  - Webhook handling for job completion
  - `FinalizeResourceScrapingJob` for analyzing scraping status
  - Manual recovery endpoint: `POST /resources/{resource_id}/recover`
  - But NO automatic re-scraping cron job is mentioned

**Needs Clarification:**
- Is there automatic re-scraping of URLs?
- How does the user configure re-scraping frequency?
- What happens to old URLs in sitemap?

**Action:** Request explicit documentation from plai-api on re-scraping capabilities

---

## 5. Resource Creation Methods (VALIDATION NEEDED)

**What I documented:**
- UI: One by one or drag-and-drop
- API: Direct resource creation
- Google Drive: Auto-sync
- Drag-and-drop options: Assign metadata, "save" vs "vectorize-only"

**Status in plai-api:**
- Metadata assignment during drag-and-drop: NOT explicitly confirmed
- "Vectorize-only" vs "save" option: Mentioned in code as `store` field
  - `store: boolean` in resource model determines if file is saved
  - Files with `store=false` are vectorized but not downloadable/accessible
  - Example reference: datasource-tool-resources-ui.md shows `"store": true/false`

**What needs validation:**
- Exact UI behavior for bulk upload with metadata assignment
- How the `store` flag affects file availability

**Impact:** Create new section in resource-types.mdx about bulk upload options

---

## 6. Metadata Usage in Vector Search (VALIDATION)

**Status:** ✅ CONFIRMED

From vector-database-metadata.md:
- Resource `metadata` field is stored in Pinecone
- Each chunk/vector contains the resource's metadata
- Metadata can be used for filtering searches
- Example query filters:
  ```python
  metadata_filter={
      "$and": [
          {"field": "category", "values": ["legal"]},
          {"field": "department", "values": ["compliance"]}
      ]
  }
  ```

**Difference between fields:**
- `metadata`: Stored in Pinecone, used for search filtering ✅
- `config`: NOT stored in Pinecone, used for resource processing configuration only ⚠️
  - Example for WEBPAGE: `config.render: true` controls JavaScript rendering

**Impact:** Add section to resource-metadata.mdx explaining `metadata` vs `config` distinction

---

## 7. Project Scope Sharing (NEW CONCEPT)

**Status:** ✅ CONFIRMED but NOT DOCUMENTED

Datasources are created in a Project and can be shared with other Projects:
- Primary project: datasource created here
- Other projects: can reference and use the datasource
- Access controlled at the sharing level

**Files affected:**
- Remove all Project visibility sections
- Add new section on "Datasource Sharing Across Projects"

---

## Summary of Changes Needed

| File | Change | Severity |
|------|--------|----------|
| datasource-metadata.mdx | Complete rewrite - explain metadata_schema, remove visibility | CRITICAL |
| resource-metadata.mdx | Add metadata vs config explanation | HIGH |
| resource-types.mdx | Add bulk upload with metadata options | MEDIUM |
| datasource-types.mdx | Validate Google Drive file types | MEDIUM |
| shared-datasources.mdx | Update to "Project Scope Sharing" | MEDIUM |
| * | Remove all "visibility" and "Private/Team/Public" references | HIGH |

---

## Documentation Files to Rewrite

1. **datasource-metadata.mdx** - CRITICAL
   - Remove visibility model entirely
   - Explain metadata_schema as JSON Schema definition
   - Document allowed_vectors filtering
   - Show examples of schema definition and usage

2. **resource-metadata.mdx** - HIGH
   - Add `metadata` vs `config` distinction
   - Explain how metadata is used in vector search
   - Document metadata filtering in agent queries

3. **datasource-types.mdx** - MEDIUM
   - Validate Google Drive file type support
   - Clarify re-scraping capabilities

4. **resource-types.mdx** - MEDIUM
   - Add section on bulk upload options
   - Explain `store` flag behavior
   - Document metadata assignment during upload

5. **shared-datasources.mdx** - MEDIUM
   - Rename to "Cross-Project Sharing"
   - Explain project-to-project datasource sharing
   - Remove all visibility/permission references
