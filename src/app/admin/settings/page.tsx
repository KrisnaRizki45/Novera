import React from 'react';
import { createClient } from '@/lib/supabase/server';
import { SettingsForm } from './_components/settings-form';

export const metadata = {
  title: 'Settings - NOVERA Admin'
}

export default async function AdminSettingsPage() {
  const supabase = createClient();
  const { data: settings } = await supabase.from('site_settings').select('*');

  // Convert settings array into key-value map for easy access
  const settingsMap: Record<string, string> = {};
  if (settings) {
    settings.forEach((s) => {
      settingsMap[s.key] = s.value;
    });
  }

  return (
    <div className="max-w-5xl mx-auto space-y-6">
      <div>
        <h1 className="text-2xl font-heading font-bold mb-1">System Settings</h1>
        <p className="text-muted-foreground text-sm">Manage global application configurations, SEO, and contact details.</p>
      </div>

      <SettingsForm settingsMap={settingsMap} />
    </div>
  );
}
