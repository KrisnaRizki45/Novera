import { Header } from '@/components/layout/header';
import { Footer } from '@/components/layout/footer';
import { getLanguage } from '@/lib/i18n';

export default async function MarketingLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const lang = await getLanguage();
  return (
    <div className="flex min-h-screen flex-col">
      <Header initialLang={lang} />
      <main className="flex-1">{children}</main>
      <Footer lang={lang} />
    </div>
  );
}
