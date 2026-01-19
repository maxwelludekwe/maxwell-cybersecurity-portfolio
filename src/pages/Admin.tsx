import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { LogOut, Shield, Award, Briefcase, FileText, Settings, MessageSquare } from 'lucide-react';
import { CertificatesAdmin } from '@/components/admin/CertificatesAdmin';
import { ProjectsAdmin } from '@/components/admin/ProjectsAdmin';
import { DocumentsAdmin } from '@/components/admin/DocumentsAdmin';
import { SiteSettingsAdmin } from '@/components/admin/SiteSettingsAdmin';
import { ContactMessagesAdmin } from '@/components/admin/ContactMessagesAdmin';
import { supabase } from '@/integrations/supabase/client';

const Admin = () => {
  const { user, isAdmin, loading, signOut } = useAuth();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('certificates');
  const [unreadCount, setUnreadCount] = useState(0);

  useEffect(() => {
    if (!loading && (!user || !isAdmin)) {
      navigate('/auth');
    }
  }, [user, isAdmin, loading, navigate]);

  useEffect(() => {
    const fetchUnreadCount = async () => {
      if (isAdmin) {
        const { count } = await supabase
          .from('contact_messages')
          .select('*', { count: 'exact', head: true })
          .eq('read', false);
        setUnreadCount(count || 0);
      }
    };

    fetchUnreadCount();
  }, [isAdmin, activeTab]);

  const handleSignOut = async () => {
    await signOut();
    navigate('/');
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 flex items-center justify-center">
        <div className="text-cyan-400 text-xl">Loading...</div>
      </div>
    );
  }

  if (!user || !isAdmin) {
    return null;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-cyan-900/20 via-transparent to-transparent" />
      
      <div className="relative z-10">
        {/* Header */}
        <header className="bg-gray-800/80 backdrop-blur-sm border-b border-gray-700 px-6 py-4">
          <div className="max-w-7xl mx-auto flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-gradient-to-br from-cyan-400 to-blue-500 rounded-full flex items-center justify-center">
                <Shield className="h-5 w-5 text-white" />
              </div>
              <div>
                <h1 className="text-xl font-bold text-white">Admin Dashboard</h1>
                <p className="text-sm text-gray-400">{user.email}</p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <Button
                variant="outline"
                onClick={() => navigate('/')}
                className="border-gray-600 text-gray-300 hover:text-white hover:border-gray-500"
              >
                View Site
              </Button>
              <Button
                variant="ghost"
                onClick={handleSignOut}
                className="text-red-400 hover:text-red-300 hover:bg-red-500/10"
              >
                <LogOut className="h-4 w-4 mr-2" />
                Sign Out
              </Button>
            </div>
          </div>
        </header>

        {/* Main Content */}
        <main className="max-w-7xl mx-auto px-6 py-8">
          <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
            <TabsList className="bg-gray-800/80 border border-gray-700 p-1">
              <TabsTrigger 
                value="certificates"
                className="data-[state=active]:bg-cyan-500 data-[state=active]:text-white text-gray-400"
              >
                <Award className="h-4 w-4 mr-2" />
                Certificates
              </TabsTrigger>
              <TabsTrigger 
                value="projects"
                className="data-[state=active]:bg-cyan-500 data-[state=active]:text-white text-gray-400"
              >
                <Briefcase className="h-4 w-4 mr-2" />
                Projects
              </TabsTrigger>
              <TabsTrigger 
                value="documents"
                className="data-[state=active]:bg-cyan-500 data-[state=active]:text-white text-gray-400"
              >
                <FileText className="h-4 w-4 mr-2" />
                Documents
              </TabsTrigger>
              <TabsTrigger 
                value="messages"
                className="data-[state=active]:bg-cyan-500 data-[state=active]:text-white text-gray-400 relative"
              >
                <MessageSquare className="h-4 w-4 mr-2" />
                Messages
                {unreadCount > 0 && (
                  <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                    {unreadCount}
                  </span>
                )}
              </TabsTrigger>
              <TabsTrigger 
                value="settings"
                className="data-[state=active]:bg-cyan-500 data-[state=active]:text-white text-gray-400"
              >
                <Settings className="h-4 w-4 mr-2" />
                Site Settings
              </TabsTrigger>
            </TabsList>

            <TabsContent value="certificates">
              <CertificatesAdmin />
            </TabsContent>
            <TabsContent value="projects">
              <ProjectsAdmin />
            </TabsContent>
            <TabsContent value="documents">
              <DocumentsAdmin />
            </TabsContent>
            <TabsContent value="messages">
              <ContactMessagesAdmin />
            </TabsContent>
            <TabsContent value="settings">
              <SiteSettingsAdmin />
            </TabsContent>
          </Tabs>
        </main>
      </div>
    </div>
  );
};

export default Admin;
