import { Client, Databases } from 'appwrite';

// Helper to get env vars if available (Vite standard)
const getEnv = (key: string) => {
  // @ts-ignore
  return import.meta.env?.[key] || '';
}

export const APPWRITE_CONFIG = {
  ENDPOINT: getEnv('VITE_APPWRITE_ENDPOINT') || 'https://cloud.appwrite.io/v1',
  
  // Project ID
  PROJECT_ID: getEnv('VITE_APPWRITE_PROJECT_ID') || '6973e93f000b75bd2e9f',           
  
  // Database ID
  DATABASE_ID: getEnv('VITE_APPWRITE_DATABASE_ID') || '697833510028cb761130',         
  
  // Collection ID (Table ID) - You named it 'portfolio'
  COLLECTION_ID: getEnv('VITE_APPWRITE_COLLECTION_ID') || 'portfolio'      
};

export const isAppwriteConfigured = () => {
  return (
    APPWRITE_CONFIG.PROJECT_ID !== 'YOUR_PROJECT_ID' &&
    APPWRITE_CONFIG.DATABASE_ID !== 'YOUR_DATABASE_ID' &&
    APPWRITE_CONFIG.COLLECTION_ID !== 'YOUR_COLLECTION_ID'
  );
};

const client = new Client();

client
    .setEndpoint(APPWRITE_CONFIG.ENDPOINT)
    .setProject(APPWRITE_CONFIG.PROJECT_ID);

export const databases = new Databases(client);
