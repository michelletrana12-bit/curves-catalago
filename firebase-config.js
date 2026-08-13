// ============================================================================
// FIREBASE (Firestore + Auth) — plan Spark (gratis, sin tarjeta)
// Copiá estos valores desde:
//   Firebase Console → tu proyecto → ⚙ Project settings → General → Your apps
// No hace falta que sea secreto: viajan al navegador de cualquier visitante.
// La seguridad real vive en las Firestore Rules (ver README.md).
// ============================================================================
export const firebaseConfig = {
  apiKey:            'AIzaSyDphKZtrdLRbmwAOXFReTzKG-abO0CWgOs',
  authDomain:        'curves-web-backend.firebaseapp.com',
  projectId:         'curves-web-backend',
  storageBucket:     'curves-web-backend.firebasestorage.app',
  messagingSenderId: '268549239482',
  appId:             '1:268549239482:web:454d718bd1b18d1b300883',
};

// ============================================================================
// CLOUDINARY — hosting de imágenes gratis (25 GB, sin tarjeta)
// Copiá estos valores desde:
//   cloudinary.com → Dashboard → "Cloud name" (arriba)
//   Settings ⚙ → Upload → Upload presets → Add upload preset →
//     Signing Mode: "Unsigned"
//     Folder: (dejar vacío)
//     Save → copiá el "Name" del preset acá abajo.
// ============================================================================
export const cloudinaryConfig = {
  cloudName:    'z4tx7hub',
  uploadPreset: 'catalog',
};
