import admin from 'firebase-admin';

function initializeFirebase() {
  if (admin.apps.length > 0) {
    return { admin, db: admin.firestore() }; // Already initialized
  }
  
  try {
    let initialized = false;
    
    // For production environment using individual environment variables
    if (process.env.FIREBASE_PROJECT_ID && process.env.FIREBASE_PRIVATE_KEY && process.env.FIREBASE_CLIENT_EMAIL) {
      const serviceAccount = {
        type: 'service_account',
        project_id: process.env.FIREBASE_PROJECT_ID,
        private_key_id: process.env.FIREBASE_PRIVATE_KEY_ID,
        private_key: process.env.FIREBASE_PRIVATE_KEY.replace(/\\n/g, '\n'),
        client_email: process.env.FIREBASE_CLIENT_EMAIL,
        client_id: process.env.FIREBASE_CLIENT_ID,
        auth_uri: process.env.FIREBASE_AUTH_URI,
        token_uri: process.env.FIREBASE_TOKEN_URI,
        auth_provider_x509_cert_url: process.env.FIREBASE_AUTH_PROVIDER_CERT_URL,
        client_x509_cert_url: process.env.FIREBASE_CLIENT_CERT_URL
      };
      
      admin.initializeApp({
        credential: admin.credential.cert(serviceAccount)
      });
      initialized = true;
    } 
    // For production environment using JSON string
    else if (process.env.FIREBASE_SERVICE_ACCOUNT) {
      const serviceAccount = JSON.parse(process.env.FIREBASE_SERVICE_ACCOUNT);
      
      admin.initializeApp({
        credential: admin.credential.cert(serviceAccount)
      });
      initialized = true;
    }
    // For local development with service account JSON file
    else if (process.env.GOOGLE_APPLICATION_CREDENTIALS) {
      admin.initializeApp();
      initialized = true;
    } 
    
    // If we couldn't initialize using any method, throw an error
    if (!initialized) {
      throw new Error("No Firebase credentials found. Make sure environment variables are set correctly.");
    }
    
    console.log("Firebase Admin initialized successfully:", admin.apps[0]?.name);
    
    const db = admin.firestore();
    db.settings({ ignoreUndefinedProperties: true });
    
    return { admin, db };
  } catch (error) {
    console.error("Firebase initialization error:", error);
    throw error; // Re-throw to handle it in the calling code
  }
}

const { admin: initializedAdmin, db } = initializeFirebase();

export { initializedAdmin as admin, db };