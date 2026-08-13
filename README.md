# Curves — Catálogo

Static single-page catalog for the Curves handmade-bag brand (`@curvescr._`).

- **Hosting**: free on GitHub Pages (no server).
- **Data**: free-tier Firebase (Firestore + Auth) — no credit card.
- **Images**: free-tier Cloudinary (25 GB) — no credit card.
- **Admin edits**: go live for customers **instantly** — no repo pushes needed after the initial setup.

Stack: static HTML/CSS/JS + Firebase Web SDK (modular v10) + Cloudinary unsigned uploads. All CDN-loaded, no build step.

---

## Files

```
curves-web/
├── index.html          # the whole app
├── firebase-config.js  # your Firebase + Cloudinary keys
└── README.md
```

---

## Setup — do these in order

### 1. Create the Firebase project (Firestore + Auth only)

1. Go to https://console.firebase.google.com/ → **Add project** → name it (e.g. `curves-catalog`) → disable Analytics → **Create**.
2. Left sidebar: **Build → Firestore Database → Create database** → **Production mode** → region close to Costa Rica (e.g. `nam5` or `southamerica-east1`) → **Enable**.
3. Left sidebar: **Build → Authentication → Get started** → **Email/Password** → **Enable** → **Save**.
4. **Authentication → Users → Add user** → your girlfriend's email + a starter password (she'll change it in the app).

> ⚠️ **Do NOT enable Firebase Storage.** Since late 2024, Storage requires the paid Blaze plan even for free-tier usage. We use Cloudinary instead.

### 2. Firestore security rules

Firestore Database → **Rules** tab → paste and Publish:

```
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /catalog/{doc} {
      allow read: if true;
      allow write: if request.auth != null;
    }
  }
}
```

Read is open (customers need to see the catalog). Write requires a signed-in user (only your girlfriend).

### 3. Set up Cloudinary (image hosting)

1. Go to https://cloudinary.com/users/register_free → sign up (email + password — no credit card).
2. On the dashboard, at the top, note your **Cloud name** (e.g. `dxyzabcde`).
3. ⚙ (top-right) → **Settings → Upload → Upload presets** → **Add upload preset**:
   - **Signing Mode**: `Unsigned` (very important — lets uploads happen from the browser).
   - **Folder**: leave empty.
   - You can leave everything else at defaults.
   - Click **Save**. Note the **Name** of the preset (e.g. `ml_default` or whatever it created).

### 4. Wire up the web app

1. Firebase Console → ⚙ **Project settings → General → Your apps → Add app → `</>` (web)**.
2. Nickname `curves-web` → **Register app** → **do NOT** enable Hosting.
3. Copy the `firebaseConfig` values it shows you.
4. Open **`firebase-config.js`** in this repo. Paste your Firebase values in the top block, and your Cloudinary cloud name + upload preset name in the bottom block. Save.

### 5. Deploy to GitHub Pages

```bash
cd /Users/charlie/Documents/curves-web
git init
git add index.html firebase-config.js README.md
git commit -m "Initial Curves catalog"
git branch -M main
git remote add origin https://github.com/<your-username>/<repo>.git
git push -u origin main
```

On GitHub: **Settings → Pages → Source: Deploy from a branch → Branch: `main` / `(root)` → Save**. Wait ~1 minute. URL is `https://<your-username>.github.io/<repo>/`.

### 6. Authorize your Pages domain in Firebase Auth

**Firebase Console → Authentication → Settings → Authorized domains → Add domain** → paste `<your-username>.github.io`.

(You already have `localhost` there for local testing.)

### 7. First run

1. Open the Pages URL.
2. Tap the ⚙ in the footer → sign in with the admin email + starter password.
3. Barra negra → **Cambiar contraseña** → set a real one.
4. If the grid says "Catálogo vacío" → tap **Poblar con productos de muestra** to seed the 13 items (including Tote Bag under Bolsos).

---

## How editing works

- Admin signs in → the `⚙` opens a sign-in modal.
- She adds/edits products or fabrics, uploads photos.
- Firestore syncs every change to all open browsers **in real time** (customers looking at the site see updates without refreshing).
- Photos are uploaded to Cloudinary under `curves/products/<id>/…` and `curves/telas/<id>/…`. The public URL goes into Firestore.

**No `git push` is needed after the initial deploy for catalog changes.** Push code only when you (Charlie) edit `index.html` or `firebase-config.js`.

### One caveat with Cloudinary

Deleting images from the browser would require exposing Cloudinary's API secret, which we don't do. When your girlfriend deletes a product or a photo, the reference disappears from the catalog but the file stays in Cloudinary — it just isn't linked anywhere anymore. With the 25 GB free plan she has room for thousands of photos before this matters. If she wants to clean up orphans later, she can delete them manually from the Cloudinary dashboard (Media Library → sort by date).

---

## Free-tier limits

| Service            | Free tier                                  | Credit card? |
|--------------------|--------------------------------------------|--------------|
| Firebase Firestore | 50k reads / 20k writes / 1 GB per day      | No           |
| Firebase Auth      | Unlimited email/password sign-ins          | No           |
| Cloudinary         | 25 GB storage, 25 GB monthly bandwidth     | No           |
| GitHub Pages       | Unlimited static hosting for public repos  | No           |

Realistic monthly cost for a small IG shop: **$0**.

---

## Guía para la administradora (Curves)

**Primera vez:**

1. Charlie te va a dar un correo y una contraseña de admin.
2. Entrá al sitio, tocá el ⚙ chiquito abajo del todo (pie de página).
3. Poné el email y la contraseña. Ya estás en modo administradora.
4. En la barra negra: **Cambiar contraseña** → ponete una nueva que solo vos sepas.

**Agregar / editar productos:**

- El panel de "Agregar producto nuevo" aparece al final de la página cuando estás en modo admin.
- Subí hasta 5 fotos. La primera es la que las clientas ven primero — usá ★ para elegir la principal.
- Categoría: escribí `neceser`, `funda`, `accesorio`, `organizador` o `bolso`. Podés inventar categorías nuevas también.
- Tocá **Agregar producto** o **Guardar cambios**.
- Las clientas ven el cambio **al instante**. No hace falta subir nada a ningún lado.

**Agregar telas:**

- Igual que los productos, pero en la sección "Telas disponibles".
- Las clientas van a poder elegir cualquier tela al pedir un producto.

**Eliminar:**

- Cada tarjeta tiene un botón rojo **Eliminar** cuando estás en modo admin.
- Te pide confirmación.

**Cosas a saber:**

- Cerrar sesión: botón **Salir** en la barra negra de arriba.
- Si te olvidás la contraseña, usá **¿Olvidaste?** en la pantalla de login. Te llega un correo.
- Todo se guarda en la nube. Podés editar desde tu celular, laptop, o donde sea.
- Las fotos se comprimen automáticamente antes de subir.

---

## Local development

```bash
python3 -m http.server 8000
```

Open http://127.0.0.1:8000. Firebase Auth needs an `http://` or `https://` origin — `file://` won't work.

---

## Tech notes

- **Single-page app**, one `index.html`, no build step. Firebase SDK loaded from `https://www.gstatic.com/firebasejs/10.14.0/`.
- **Real-time**: `onSnapshot` on `catalog/products` and `catalog/telas` documents. One document per collection (not per product) keeps read counts minimal.
- **Photos**: client-side compression (max 1200px, JPEG q0.75) → POST to `https://api.cloudinary.com/v1_1/<cloudname>/image/upload` with an unsigned upload preset. Response `secure_url` is stored in the Firestore doc.
- **Cart**: in-memory only. Cleared on page reload. Sends the full order via `wa.me/<phone>?text=...`.
- **WhatsApp number**: `WA_PHONE` constant near the top of `index.html`. Change and redeploy if the number changes.
- **In-app browser guard**: banner shown inside Instagram/Facebook/TikTok in-app browsers, which may break Firebase Auth's popup flow and `wa.me` links.
