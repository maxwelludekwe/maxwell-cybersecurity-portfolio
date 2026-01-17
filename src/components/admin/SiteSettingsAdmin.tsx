import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Save, User, Mail, Phone, MapPin, Linkedin, Github } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface SiteSettings {
  name: string;
  title: string;
  tagline: string;
  about: string;
  email: string;
  phone: string;
  location: string;
  linkedin: string;
  github: string;
}

export const SiteSettingsAdmin = () => {
  const [settings, setSettings] = useState<SiteSettings>({
    name: '',
    title: '',
    tagline: '',
    about: '',
    email: '',
    phone: '',
    location: '',
    linkedin: '',
    github: '',
  });
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const fetchSettings = async () => {
    const { data, error } = await supabase
      .from('site_settings')
      .select('*');
    
    if (error) {
      console.error('Error fetching settings:', error);
      return;
    }
    
    const settingsMap: Partial<SiteSettings> = {};
    data?.forEach((item) => {
      const value = item.value as { value: string };
      settingsMap[item.key as keyof SiteSettings] = value.value || '';
    });
    
    setSettings((prev) => ({ ...prev, ...settingsMap }));
  };

  useEffect(() => {
    fetchSettings();
  }, []);

  const handleSave = async () => {
    setIsLoading(true);

    try {
      // Upsert all settings
      const settingsToSave = Object.entries(settings).map(([key, value]) => ({
        key,
        value: { value },
      }));

      for (const setting of settingsToSave) {
        const { error } = await supabase
          .from('site_settings')
          .upsert(
            { key: setting.key, value: setting.value },
            { onConflict: 'key' }
          );
        
        if (error) throw error;
      }

      toast({ title: 'Success', description: 'Settings saved successfully' });
    } catch (error: any) {
      toast({ title: 'Error', description: error.message, variant: 'destructive' });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-white">Site Settings</h2>
          <p className="text-gray-400">Update your personal information and site content</p>
        </div>
        <Button 
          onClick={handleSave}
          disabled={isLoading}
          className="bg-cyan-500 hover:bg-cyan-600"
        >
          <Save className="h-4 w-4 mr-2" />
          {isLoading ? 'Saving...' : 'Save Changes'}
        </Button>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        {/* Personal Information */}
        <Card className="bg-gray-800/50 border-gray-700">
          <CardHeader>
            <CardTitle className="text-white flex items-center gap-2">
              <User className="h-5 w-5 text-cyan-400" />
              Personal Information
            </CardTitle>
            <CardDescription className="text-gray-400">
              Update your name and professional title
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label className="text-gray-300">Full Name</Label>
              <Input
                value={settings.name}
                onChange={(e) => setSettings({ ...settings, name: e.target.value })}
                placeholder="Maxwell Udekwe"
                className="bg-gray-700 border-gray-600 text-white"
              />
            </div>
            <div className="space-y-2">
              <Label className="text-gray-300">Professional Title</Label>
              <Input
                value={settings.title}
                onChange={(e) => setSettings({ ...settings, title: e.target.value })}
                placeholder="Cybersecurity Professional"
                className="bg-gray-700 border-gray-600 text-white"
              />
            </div>
            <div className="space-y-2">
              <Label className="text-gray-300">Tagline</Label>
              <Input
                value={settings.tagline}
                onChange={(e) => setSettings({ ...settings, tagline: e.target.value })}
                placeholder="Protecting Digital Assets"
                className="bg-gray-700 border-gray-600 text-white"
              />
            </div>
          </CardContent>
        </Card>

        {/* Contact Information */}
        <Card className="bg-gray-800/50 border-gray-700">
          <CardHeader>
            <CardTitle className="text-white flex items-center gap-2">
              <Mail className="h-5 w-5 text-cyan-400" />
              Contact Information
            </CardTitle>
            <CardDescription className="text-gray-400">
              How people can reach you
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label className="text-gray-300 flex items-center gap-2">
                <Mail className="h-4 w-4" />
                Email
              </Label>
              <Input
                type="email"
                value={settings.email}
                onChange={(e) => setSettings({ ...settings, email: e.target.value })}
                placeholder="email@example.com"
                className="bg-gray-700 border-gray-600 text-white"
              />
            </div>
            <div className="space-y-2">
              <Label className="text-gray-300 flex items-center gap-2">
                <Phone className="h-4 w-4" />
                Phone
              </Label>
              <Input
                value={settings.phone}
                onChange={(e) => setSettings({ ...settings, phone: e.target.value })}
                placeholder="+1 (234) 567-8900"
                className="bg-gray-700 border-gray-600 text-white"
              />
            </div>
            <div className="space-y-2">
              <Label className="text-gray-300 flex items-center gap-2">
                <MapPin className="h-4 w-4" />
                Location
              </Label>
              <Input
                value={settings.location}
                onChange={(e) => setSettings({ ...settings, location: e.target.value })}
                placeholder="City, State"
                className="bg-gray-700 border-gray-600 text-white"
              />
            </div>
          </CardContent>
        </Card>

        {/* Social Links */}
        <Card className="bg-gray-800/50 border-gray-700">
          <CardHeader>
            <CardTitle className="text-white flex items-center gap-2">
              <Linkedin className="h-5 w-5 text-cyan-400" />
              Social Links
            </CardTitle>
            <CardDescription className="text-gray-400">
              Your professional profiles
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label className="text-gray-300 flex items-center gap-2">
                <Linkedin className="h-4 w-4" />
                LinkedIn URL
              </Label>
              <Input
                value={settings.linkedin}
                onChange={(e) => setSettings({ ...settings, linkedin: e.target.value })}
                placeholder="https://linkedin.com/in/username"
                className="bg-gray-700 border-gray-600 text-white"
              />
            </div>
            <div className="space-y-2">
              <Label className="text-gray-300 flex items-center gap-2">
                <Github className="h-4 w-4" />
                GitHub URL
              </Label>
              <Input
                value={settings.github}
                onChange={(e) => setSettings({ ...settings, github: e.target.value })}
                placeholder="https://github.com/username"
                className="bg-gray-700 border-gray-600 text-white"
              />
            </div>
          </CardContent>
        </Card>

        {/* About Section */}
        <Card className="bg-gray-800/50 border-gray-700">
          <CardHeader>
            <CardTitle className="text-white">About Section</CardTitle>
            <CardDescription className="text-gray-400">
              Tell visitors about yourself
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <Label className="text-gray-300">About Me</Label>
              <Textarea
                value={settings.about}
                onChange={(e) => setSettings({ ...settings, about: e.target.value })}
                placeholder="Write a brief description about yourself, your experience, and goals..."
                className="bg-gray-700 border-gray-600 text-white min-h-[150px]"
              />
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};
