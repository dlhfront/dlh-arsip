
```
persuratan-dlh
├─ app
│  ├─ api
│  │  ├─ auth
│  │  │  ├─ login
│  │  │  │  └─ route.js
│  │  │  ├─ logout
│  │  │  │  └─ route.js
│  │  │  ├─ me
│  │  │  │  └─ route.js
│  │  │  └─ register
│  │  │     └─ route.js
│  │  ├─ classifications
│  │  │  └─ route.js
│  │  └─ records
│  │     ├─ route.js
│  │     ├─ stats
│  │     │  └─ route.js
│  │     ├─ type
│  │     │  └─ [documentType]
│  │     │     └─ route.js
│  │     └─ [id]
│  │        └─ route.js
│  ├─ auth
│  │  └─ login
│  │     └─ page.js
│  ├─ components
│  │  ├─ atoms
│  │  │  ├─ Form
│  │  │  │  ├─ DateInput.jsx
│  │  │  │  ├─ DropdownInput.jsx
│  │  │  │  ├─ SubmitButton.jsx
│  │  │  │  └─ TextInput.jsx
│  │  │  └─ Table
│  │  │     ├─ TableCell.jsx
│  │  │     └─ TableHeaderCell.jsx
│  │  ├─ LoginForm.js
│  │  ├─ molecules
│  │  │  ├─ CardRecord.jsx
│  │  │  ├─ ClassificationDropdown.jsx
│  │  │  ├─ DeleteButton.jsx
│  │  │  ├─ DocumentStatusChart.jsx
│  │  │  ├─ EditButton.jsx
│  │  │  ├─ FormGroup.jsx
│  │  │  ├─ PaginationControls.jsx
│  │  │  ├─ RecentActivity.jsx
│  │  │  └─ TableRow.jsx
│  │  ├─ organism
│  │  │  ├─ PageHeader.jsx
│  │  │  ├─ RecordForm.jsx
│  │  │  └─ RecordsTable.jsx
│  │  ├─ ProtectedRoute.js
│  │  ├─ Register.js
│  │  ├─ SideNavbar.js
│  │  ├─ templates
│  │  │  ├─ FormPageTemplate.jsx
│  │  │  └─ RecordsPageTemplate.jsx
│  │  └─ ToastProvider.jsx
│  ├─ config
│  │  └─ documentTypes.js
│  ├─ context
│  │  └─ AuthContext.js
│  ├─ dashboard
│  │  ├─ beritaacara
│  │  │  ├─ create
│  │  │  │  └─ page.js
│  │  │  ├─ edit
│  │  │  │  └─ [id]
│  │  │  │     └─ page.js
│  │  │  └─ page.js
│  │  ├─ layout.js
│  │  ├─ page.js
│  │  ├─ suratkeluar
│  │  │  ├─ create
│  │  │  │  └─ page.js
│  │  │  ├─ edit
│  │  │  │  └─ [id]
│  │  │  │     └─ page.js
│  │  │  └─ page.js
│  │  ├─ suratketerangan
│  │  │  ├─ create
│  │  │  │  └─ page.js
│  │  │  ├─ edit
│  │  │  │  └─ [id]
│  │  │  │     └─ page.js
│  │  │  └─ page.js
│  │  ├─ suratmasuk
│  │  │  ├─ create
│  │  │  │  └─ page.js
│  │  │  ├─ edit
│  │  │  │  └─ [id]
│  │  │  │     └─ page.js
│  │  │  └─ page.js
│  │  ├─ surattugas
│  │  │  ├─ create
│  │  │  │  └─ page.js
│  │  │  ├─ edit
│  │  │  │  └─ [id]
│  │  │  │     └─ page.js
│  │  │  └─ page.js
│  │  └─ [id]
│  │     └─ page.jsx
│  ├─ favicon.ico
│  ├─ globals.css
│  ├─ hooks
│  │  ├─ useAuth.js
│  │  └─ useCurrentUser.js
│  ├─ layout.js
│  ├─ lib
│  │  ├─ formatDate.js
│  │  ├─ middleware.js
│  │  ├─ prisma.js
│  │  └─ romanMonths.js
│  ├─ page.js
│  └─ protected
│     └─ page.js
├─ arsip-code_rows.csv
├─ jsconfig.json
├─ next.config.js
├─ package-lock.json
├─ package.json
├─ postcss.config.js
├─ prisma
│  ├─ migrations
│  │  ├─ 20241224071150_init
│  │  │  └─ migration.sql
│  │  ├─ 20241224071326_init
│  │  │  └─ migration.sql
│  │  ├─ 20241224072128_init2
│  │  │  └─ migration.sql
│  │  ├─ 20241227051716_update_record
│  │  │  └─ migration.sql
│  │  ├─ 20250327182908_add_username_unique_constraint
│  │  │  └─ migration.sql
│  │  └─ migration_lock.toml
│  └─ schema.prisma
├─ public
│  ├─ images
│  │  └─ logo-dlh.png
│  ├─ next.svg
│  └─ vercel.svg
├─ README.md
├─ scripts
│  └─ postinstall.js
├─ tailwind.config.js
└─ vercel.json

```