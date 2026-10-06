import { cookies } from 'next/headers';

export async function getLanguage() {
  const cookieStore = await cookies();
  const lang = cookieStore.get('NEXT_LOCALE')?.value || 'en';
  return lang.toLowerCase() === 'id' ? 'id' : 'en';
}
