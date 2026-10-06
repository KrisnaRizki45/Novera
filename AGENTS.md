Lakukan perbaikan menyeluruh pada project NOVERA yang sedang berjalan.

IMPORTANT:

Jangan rebuild website dari awal.

Jangan menghapus desain, animation, content structure, component, atau functionality yang sebelumnya sudah bagus.

Saat ini terdapat beberapa REGRESSION dan CURRENT PROBLEMS yang harus diperbaiki terlebih dahulu, kemudian lanjutkan dengan enrichment CMS dan content.

Prioritas:

1. Fix seluruh current problems.
2. Restore rich Services & Solutions content seperti versi sebelumnya.
3. Pastikan content tidak hardcoded.
4. Pastikan database/Supabase menjadi source of truth.
5. Pastikan seluruh Admin CMS benar-benar functional.
6. Pastikan Settings bukan sekadar kumpulan button.
7. Pastikan seluruh route public dan admin benar-benar memiliki implementation.
8. Pastikan public website dan CMS memiliki hubungan data yang benar.

==================================================
CURRENT PROBLEMS — WAJIB DIPERBAIKI
===================================

### PROBLEM 1 — INSIGHTS CATEGORY BLANK / 404

URL:

`http://localhost:3000/insights/category`

Saat ini route tersebut blank page / 404.

Audit existing routing terlebih dahulu.

Pastikan route berikut tersedia dan functional:

`/insights`

`/insights/[slug]`

`/insights/category/[slug]`

`/insights/tag/[slug]`

Jika `/insights/category` digunakan sebagai category landing/index page, implementasikan:

`/insights/category`

sebagai valid route.

Jangan hanya membuat redirect tanpa alasan.

Halaman `/insights/category` harus memiliki:

* Hero / page header
* Category overview
* daftar category
* jumlah artikel jika tersedia
* category cards
* link ke `/insights/category/[slug]`
* empty state
* loading state
* error state

Semua category harus berasal dari database.

Jangan hardcode category list.

Jika tidak ada category di database:

tampilkan empty state yang proper.

Pastikan:

`/insights/category/[slug]`

juga membaca data dari database berdasarkan slug.

Contoh:

`/insights/category/ai`

harus menampilkan artikel dengan category AI.

==================================================
PROBLEM 2 — SERVICES CONTENT TERLALU SEDIKIT
============================================

Saat ini `/services` dan service detail pages terlalu tipis dibanding versi sebelumnya.

Kembalikan konsep rich content seperti versi awal NOVERA.

Services harus terasa seperti website technology company profesional, bukan kumpulan card dengan 1-2 kalimat.

IMPORTANT:

Rich content TIDAK BOLEH di-hardcode di React component.

Rich content harus disimpan di Supabase dan dikelola melalui Admin CMS.

Public website hanya membaca content dari database.

==================================================
SERVICES CONTENT STRUCTURE
==========================

Setiap service minimal harus memiliki content berikut.

### Basic

* title
* short description
* detailed introduction
* slug
* icon
* display order
* active status

### Overview

Jelaskan:

* apa service tersebut
* masalah yang biasanya diselesaikan
* siapa yang membutuhkan
* bagaimana NOVERA membantu

### Capabilities

Contoh untuk Custom Software Development:

* Business Application Development
* Internal Operational Systems
* Workflow Applications
* Custom Platforms
* Enterprise Applications
* API-driven Applications
* Modular Application Architecture

Jangan sekadar menampilkan list.

Setiap capability memiliki:

* title
* description
* business context

### Use Cases

Misalnya:

* Internal Operations
* Sales Operations
* Customer Management
* Approval Workflow
* Reporting
* Data Processing
* Field Operations

### Business Value

Jelaskan value secara profesional:

* operational efficiency
* process visibility
* reduced manual work
* better data consistency
* improved scalability
* easier system integration

Jangan menggunakan angka hasil/ROI palsu.

### Technology / Engineering Approach

Boleh menjelaskan technology approach secara general:

* modern web architecture
* API integration
* database-driven applications
* responsive interfaces
* authentication & authorization
* scalable architecture
* quality engineering

Jangan mengklaim technology yang belum benar-benar digunakan.

### Process

Hubungkan service dengan:

Discovery
→ Design
→ Development
→ Quality
→ Deployment
→ Improvement

### FAQ

Setiap service dapat memiliki FAQ.

Minimal beberapa pertanyaan relevan.

### CTA

CTA menuju:

`/start-a-project`

atau halaman relevan.

==================================================
SERVICES YANG HARUS DIDUKUNG
============================

Minimal:

1. Custom Software Development
2. Web Development
3. Mobile Development
4. Business Systems
5. Automation
6. AI Solutions
7. System Integration

Jika existing project memiliki service tambahan yang valid, jangan hapus.

==================================================
PROBLEM 3 — SOLUTIONS CONTENT TERLALU SEDIKIT
=============================================

Solutions saat ini juga terlalu tipis.

Kembalikan rich content seperti versi awal.

Solutions harus berbeda dengan Services.

Services:

"What we build / what we provide"

Solutions:

"What business problems we help solve"

==================================================
SOLUTION CONTENT STRUCTURE
==========================

Setiap solution harus memiliki:

### Overview

* Business challenge
* Why the problem matters
* Solution overview
* Who it is for

### Common Challenges

Misalnya:

* Manual processes
* Fragmented information
* Multiple disconnected systems
* Lack of operational visibility
* Repetitive administrative tasks
* Slow approval workflows

### Solution Capabilities

Contoh:

Inventory Management:

* Inventory tracking
* Stock movement
* Warehouse visibility
* Stock adjustment
* Reporting
* Role-based access
* Integration

### Typical Workflow

Contoh:

Request
→ Validation
→ Processing
→ Approval
→ Execution
→ Reporting

### Business Value

* Better visibility
* Faster processes
* Consistent data
* Reduced manual effort
* Better decision support

### Use Cases

Gunakan use case yang relevan.

### Integration

Jika relevan:

* API
* Existing business systems
* Database
* Third-party services

Jangan claim specific integration yang belum tersedia.

### FAQ

Tambahkan FAQ yang relevan.

### CTA

"Discuss Your Business Challenge"

→ `/start-a-project`

==================================================
SOLUTIONS YANG HARUS DIDUKUNG
=============================

Minimal:

1. Business Operations
2. Inventory Management
3. Order Management
4. Field Service
5. Business Intelligence
6. Automation
7. AI

Jika existing project memiliki solution tambahan, pertahankan.

==================================================
PROBLEM 4 — CONTENT HARDCODE
============================

Ini sangat penting.

JANGAN membuat:

```ts
const services = [...]
```

atau:

```ts
const solutions = [...]
```

yang menjadi source utama public website.

Jangan hardcode:

* Services
* Solutions
* Process
* Careers
* Portfolio
* Insights
* Categories
* Site settings
* FAQ
* business value
* capabilities
* use cases

Content harus berasal dari Supabase.

Architecture:

Supabase
↓
Backend/service layer
↓
Public page

Admin:

Admin CMS
↓
Backend/service layer
↓
Supabase
↓
Public page

==================================================
PROBLEM 5 — ADMIN BELUM BENAR-BENAR FUNCTIONAL
==============================================

Audit SEMUA menu Admin.

Tidak boleh ada UI button yang tidak melakukan apa-apa.

Jangan membuat:

* fake button
* fake save
* fake delete
* fake settings
* placeholder table
* static statistics

Semua action harus benar-benar bekerja.

Menu:

`/admin`

`/admin/leads`

`/admin/services`

`/admin/solutions`

`/admin/process`

`/admin/portfolio`

`/admin/insights`

`/admin/categories`

`/admin/careers`

`/admin/media`

`/admin/settings`

Setiap menu harus memiliki fungsi nyata.

==================================================
ADMIN SERVICES
==============

Harus mendukung:

* list
* search
* filter
* create
* edit
* preview
* activate/deactivate
* reorder
* delete/archive
* bilingual content
* rich content

Admin harus bisa mengisi SELURUH struktur content:

* overview
* capabilities
* use cases
* business value
* technology approach
* process
* FAQ
* CTA

Jangan hanya:

Title
Description
Save

==================================================
ADMIN SOLUTIONS
===============

Harus mendukung:

* list
* search
* filter
* create
* edit
* preview
* activate/deactivate
* reorder
* delete/archive

Content editor harus mendukung:

* overview
* challenges
* capabilities
* workflows
* business value
* use cases
* integration
* FAQ
* CTA

Semua content bilingual.

==================================================
ADMIN PROCESS
=============

Harus dapat:

* create step
* edit step
* reorder step
* active/inactive
* preview
* delete/archive

Public `/process` membaca data ini.

==================================================
ADMIN INSIGHTS
==============

Harus dapat:

* create article
* edit
* draft
* publish
* unpublish
* archive
* delete
* category
* tags
* cover image
* preview

Pastikan:

`/insights/category`

dan

`/insights/category/[slug]`

menggunakan data CMS.

==================================================
ADMIN CATEGORIES
================

Category management harus benar-benar digunakan oleh public Insights.

Fungsi:

* create
* edit
* slug
* type
* active/inactive
* delete/archive
* article count

Jangan membuat category hanya sebagai UI.

==================================================
ADMIN CAREERS
=============

Harus fully functional:

* create job
* edit
* publish
* unpublish
* archive
* delete
* preview
* filter
* search

Fields:

* title EN
* title ID
* department
* employment type
* location
* work mode
* experience level
* description
* responsibilities
* requirements
* nice to have
* technologies
* application category
* application URL
* status
* published date

Career card public:

klik →

`/careers/[slug]`

Apply:

gunakan `application_url` dari database.

Jangan hardcode Google Form.

==================================================
ADMIN SETTINGS — WAJIB BENAR-BENAR FUNCTIONAL
=============================================

Ini sangat penting.

Saat ini Settings hanya seperti button/placeholder.

Jadikan Settings sebagai konfigurasi website yang benar-benar digunakan.

Minimal:

### General

* Website name
* Company name
* Website URL
* Default language

### Contact

* Email
* Phone
* WhatsApp
* Address jika memang tersedia

### Social Media

* LinkedIn
* Instagram
* GitHub
* other supported social links

### SEO

* Default SEO title
* Default SEO description
* Default OG image

### CTA

* Default Start a Project URL
* WhatsApp URL
* Contact email

### Website

* Maintenance mode jika memang dibutuhkan
* Default pagination
* Content settings jika relevan

Semua settings:

Admin edit
→ Save
→ Supabase
→ Public website menggunakan value tersebut.

Jangan membuat button yang hanya memunculkan toast "Saved" tanpa database update.

==================================================
SETTINGS DATABASE
=================

Buat atau sesuaikan:

`site_settings`

Gunakan struktur yang maintainable.

Contoh:

* id
* key
* value
* type
* description
* updated_at
* updated_by

Atau gunakan relational schema jika lebih sesuai dengan architecture existing.

Jangan menyimpan secret/API credentials di Settings.

==================================================
PROBLEM 6 — DATABASE HARUS MENDUKUNG RICH CONTENT
=================================================

Database schema yang sebelumnya dibuat terlalu sederhana jika belum mampu menyimpan rich content.

Evaluasi ulang schema.

Jangan memaksa seluruh content menjadi satu string.

Untuk content seperti:

Capabilities
Use Cases
FAQ
Business Value
Process
Features

gunakan relational tables atau JSONB structured data jika benar-benar sesuai.

Contoh architecture:

services
↓
service_capabilities
service_use_cases
service_faqs

solutions
↓
solution_capabilities
solution_use_cases
solution_faqs
solution_workflows

Dengan demikian Admin dapat mengelola content secara dinamis.

Pilih architecture yang paling maintainable berdasarkan existing project.

Jangan membuat schema berlebihan jika tidak diperlukan.

==================================================
BILINGUAL CMS
=============

Semua rich content harus mendukung:

English
Indonesian

Termasuk:

* title
* description
* capabilities
* use cases
* business value
* FAQ
* process
* CTA
* career content
* insight content
* categories jika diperlukan

Public language switch harus membaca language yang dipilih.

Jangan menerjemahkan hanya UI navigation.

==================================================
PUBLIC SERVICES DETAIL
======================

Setiap:

`/services/[slug]`

harus memiliki struktur profesional:

Hero
↓
Overview
↓
Business Challenges
↓
Capabilities
↓
Use Cases
↓
How We Approach It
↓
Technology / Engineering Considerations
↓
Business Value
↓
FAQ
↓
CTA

Tetap gunakan design system existing.

Jangan membuat halaman terlalu penuh secara visual.

Gunakan:

* sections
* compact cards
* tabs jika sesuai
* accordion
* visual flow
* subtle animation

==================================================
PUBLIC SOLUTIONS DETAIL
=======================

Setiap:

`/solutions/[slug]`

gunakan:

Hero
↓
Business Challenge
↓
Solution Overview
↓
Capabilities
↓
Typical Workflow
↓
Use Cases
↓
Business Value
↓
Integration Considerations
↓
FAQ
↓
CTA

Konten harus terasa seperti solution consulting page.

==================================================
CMS CONTENT QUALITY
===================

Konten database harus kaya dan profesional.

Jangan mengisi dengan:

"Lorem ipsum"

atau:

"Lorem ipsum dolor sit amet..."

Jangan membuat 1-2 kalimat generik.

Setiap service/solution harus memiliki content yang benar-benar berbeda dan relevan.

Contoh buruk:

"Automation helps businesses automate their processes."

Contoh yang diharapkan:

Jelaskan jenis proses yang dapat diotomatisasi, bagaimana workflow berubah, bagaimana data diproses, bagaimana approval dapat dibuat, dan bagaimana automation dapat diintegrasikan dengan sistem existing — tanpa mengklaim hasil numerik yang tidak terbukti.

==================================================
CONTENT SEED
============

Buat development seed untuk rich content Services dan Solutions.

Seed harus cukup lengkap untuk membuat website terlihat seperti website perusahaan teknologi profesional.

Minimal setiap service memiliki:

* rich overview
* 4–8 capabilities
* 4–8 use cases
* 4–6 business value points
* technology approach
* process
* 3–5 FAQ

Minimal setiap solution memiliki:

* rich overview
* 4–8 challenges/capabilities
* 4–8 use cases
* workflow
* 4–6 business value points
* integration considerations
* 3–5 FAQ

Seed ini hanya untuk development/initial CMS content.

Setelah di-seed:

Admin harus dapat mengubah seluruh content.

Public website tidak boleh membaca hardcoded seed object dari frontend.

==================================================
ROUTE AUDIT
===========

Audit SEMUA route public:

/
/services
/services/[slug]
/solutions
/solutions/[slug]
/portfolio
/portfolio/[slug]
/insights
/insights/[slug]
/insights/category
/insights/category/[slug]
/insights/tag/[slug]
/about
/process
/careers
/careers/[slug]
/contact
/start-a-project
/privacy
/terms

Audit SEMUA route admin:

/admin
/admin/login
/admin/leads
/admin/services
/admin/solutions
/admin/process
/admin/portfolio
/admin/insights
/admin/categories
/admin/careers
/admin/media
/admin/settings

Tidak boleh ada route yang blank/404 tanpa alasan.

==================================================
ERROR HANDLING
==============

Untuk dynamic route:

Jika slug tidak ditemukan:

gunakan proper 404 page.

Jangan blank page.

Untuk category:

Jika category tidak ditemukan:

proper not-found state.

Jika category valid tetapi belum memiliki article:

empty state:

"No articles in this category yet."

==================================================
CACHE / REVALIDATION
====================

Setelah Admin melakukan update:

* Service
* Solution
* Process
* Career
* Portfolio
* Insight
* Category
* Settings

public website harus mendapatkan data terbaru.

Gunakan architecture Next.js yang sesuai:

* revalidatePath
* revalidateTag
* server-side fetching
* cache invalidation

Jangan membuat admin update database tetapi public page masih menggunakan static hardcoded content.

==================================================
SECURITY
========

Pastikan:

* Supabase Auth
* Admin authorization
* RLS
* server-side validation
* Zod jika existing architecture menggunakan Zod
* service role key server-only
* no credentials in source code
* `.env` ignored
* `.env.example` committed
* safe HTML/rich content rendering
* upload validation

==================================================
ENVIRONMENT
===========

Pastikan tersedia:

`.env.example`

berdasarkan environment variable yang BENAR-BENAR digunakan oleh project.

Jangan membuat credential palsu.

Jangan menaruh actual secret.

Contoh:

NEXT_PUBLIC_SUPABASE_URL=
NEXT_PUBLIC_SUPABASE_ANON_KEY=
SUPABASE_SERVICE_ROLE_KEY=
NEXT_PUBLIC_SITE_URL=

Tambahkan variable lain hanya jika benar-benar digunakan.

Pastikan `.env` / `.env.local` berada di `.gitignore`.

==================================================
DO NOT BREAK EXISTING DESIGN
============================

Pertahankan:

* NOVERA visual identity
* existing navbar
* existing footer
* existing responsive behavior
* Investment Plans animation
* Why Choose Us animation
* Enterprise animation
* Technology animation
* Our Clients marquee
* modal system
* card transition
* typography
* color system
* spacing system

Enhancement harus terasa seperti versi yang lebih matang dari website yang sama.

==================================================
FINAL ACCEPTANCE TEST
=====================

Sebelum menyatakan selesai, lakukan test nyata.

### PUBLIC

[ ] `/insights/category` tidak 404
[ ] `/insights/category/[slug]` bekerja
[ ] `/services` memiliki rich content
[ ] `/services/[slug]` memiliki rich content
[ ] `/solutions` memiliki rich content
[ ] `/solutions/[slug]` memiliki rich content
[ ] Process bekerja
[ ] Careers bekerja
[ ] Portfolio bekerja
[ ] Insights bekerja

### ADMIN

[ ] Login bekerja
[ ] Dashboard bekerja
[ ] Leads bekerja
[ ] Services CRUD bekerja
[ ] Solutions CRUD bekerja
[ ] Process CRUD bekerja
[ ] Portfolio CRUD bekerja
[ ] Insights CRUD bekerja
[ ] Categories CRUD bekerja
[ ] Careers CRUD bekerja
[ ] Media bekerja
[ ] Settings CRUD bekerja

### SETTINGS

[ ] Edit company information
[ ] Edit contact
[ ] Edit WhatsApp
[ ] Edit social links
[ ] Edit SEO defaults
[ ] Save ke Supabase
[ ] Refresh page
[ ] Data tetap tersimpan
[ ] Public website menggunakan data tersebut

### CMS

[ ] Tidak ada hardcoded service content
[ ] Tidak ada hardcoded solution content
[ ] Tidak ada hardcoded category content
[ ] Tidak ada hardcoded career content
[ ] Admin update → database
[ ] Database update → public page
[ ] EN/ID bekerja

### TECHNICAL

[ ] No broken route
[ ] No blank page
[ ] No fake button
[ ] No fake save action
[ ] No dummy production statistics
[ ] No console error
[ ] TypeScript passes
[ ] ESLint passes
[ ] Production build passes
[ ] Responsive layout works
[ ] No horizontal overflow

==================================================
FINAL IMPLEMENTATION PRINCIPLE
==============================

Jangan berhenti ketika:

"page sudah tidak 404."

Jangan berhenti ketika:

"button sudah bisa diklik."

Jangan berhenti ketika:

"CRUD sudah ada."

Target akhirnya adalah:

DATABASE
↓
SUPABASE
↓
BACKEND / SERVICE LAYER
↓
ADMIN CMS
↓
PUBLIC WEBSITE

Semua harus terhubung.

Admin harus benar-benar menjadi CMS.

Services dan Solutions harus memiliki rich, informative, professional content seperti versi awal NOVERA.

Content tersebut harus berada di database, bukan hardcoded.

Admin Settings harus benar-benar mengubah konfigurasi website.

`/insights/category` harus benar-benar menjadi route yang valid.

Setelah semua selesai, tampilkan ringkasan perubahan:

1. Root cause setiap current problem.
2. Route yang diperbaiki.
3. Database table/migration yang dibuat atau diubah.
4. Admin module yang berhasil dibuat.
5. Backend/service yang dibuat.
6. Environment variable yang dibutuhkan.
7. Content structure Services/Solutions.
8. Test yang sudah dijalankan.
9. Hasil lint/typecheck/build.
10. Jika ada hal yang belum dapat diimplementasikan, jelaskan secara spesifik — jangan menyatakan selesai jika sebenarnya masih placeholder.
