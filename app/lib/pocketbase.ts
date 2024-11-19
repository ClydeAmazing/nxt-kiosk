import PocketBase from 'pocketbase';

export const baseUrl = process.env.NEXT_PUBLIC_POCKETBASE_URL || 'http://127.0.0.1:8090';

// Singleton instance for client-side
let clientSidePb: PocketBase | null = null;

export function getPocketbaseInstance(): PocketBase {
  if (typeof window === 'undefined') {
    // Server-side: Always return a new instance
    return new PocketBase(baseUrl);
  }
  
  if (!clientSidePb) {
    // Client-side: Create singleton instance
    clientSidePb = new PocketBase(baseUrl);
  }
  
  return clientSidePb;
} 