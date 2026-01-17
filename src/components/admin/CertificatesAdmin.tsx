import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Plus, Pencil, Trash2, Upload, Award } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface Certificate {
  id: string;
  name: string;
  issuer: string;
  date: string;
  description: string | null;
  achievement: string | null;
  status: string;
  certificate_url: string | null;
}

export const CertificatesAdmin = () => {
  const [certificates, setCertificates] = useState<Certificate[]>([]);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingCert, setEditingCert] = useState<Certificate | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    issuer: '',
    date: '',
    description: '',
    achievement: '',
    status: 'completed',
  });
  const [file, setFile] = useState<File | null>(null);
  const { toast } = useToast();

  const fetchCertificates = async () => {
    const { data, error } = await supabase
      .from('certificates')
      .select('*')
      .order('created_at', { ascending: false });
    
    if (error) {
      toast({ title: 'Error', description: 'Failed to fetch certificates', variant: 'destructive' });
      return;
    }
    setCertificates(data || []);
  };

  useEffect(() => {
    fetchCertificates();
  }, []);

  const resetForm = () => {
    setFormData({ name: '', issuer: '', date: '', description: '', achievement: '', status: 'completed' });
    setFile(null);
    setEditingCert(null);
  };

  const handleOpenDialog = (cert?: Certificate) => {
    if (cert) {
      setEditingCert(cert);
      setFormData({
        name: cert.name,
        issuer: cert.issuer,
        date: cert.date,
        description: cert.description || '',
        achievement: cert.achievement || '',
        status: cert.status,
      });
    } else {
      resetForm();
    }
    setIsDialogOpen(true);
  };

  const uploadFile = async (file: File): Promise<string | null> => {
    const fileExt = file.name.split('.').pop();
    const fileName = `certificates/${Date.now()}.${fileExt}`;
    
    const { error } = await supabase.storage
      .from('portfolio')
      .upload(fileName, file);
    
    if (error) {
      toast({ title: 'Upload Error', description: error.message, variant: 'destructive' });
      return null;
    }
    
    const { data: urlData } = supabase.storage
      .from('portfolio')
      .getPublicUrl(fileName);
    
    return urlData.publicUrl;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      let certificateUrl = editingCert?.certificate_url || null;
      
      if (file) {
        certificateUrl = await uploadFile(file);
        if (!certificateUrl) {
          setIsLoading(false);
          return;
        }
      }

      const certData = {
        name: formData.name,
        issuer: formData.issuer,
        date: formData.date,
        description: formData.description || null,
        achievement: formData.achievement || null,
        status: formData.status,
        certificate_url: certificateUrl,
      };

      if (editingCert) {
        const { error } = await supabase
          .from('certificates')
          .update(certData)
          .eq('id', editingCert.id);
        
        if (error) throw error;
        toast({ title: 'Success', description: 'Certificate updated successfully' });
      } else {
        const { error } = await supabase
          .from('certificates')
          .insert(certData);
        
        if (error) throw error;
        toast({ title: 'Success', description: 'Certificate added successfully' });
      }

      setIsDialogOpen(false);
      resetForm();
      fetchCertificates();
    } catch (error: any) {
      toast({ title: 'Error', description: error.message, variant: 'destructive' });
    } finally {
      setIsLoading(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this certificate?')) return;
    
    const { error } = await supabase
      .from('certificates')
      .delete()
      .eq('id', id);
    
    if (error) {
      toast({ title: 'Error', description: error.message, variant: 'destructive' });
      return;
    }
    
    toast({ title: 'Success', description: 'Certificate deleted successfully' });
    fetchCertificates();
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-white">Certificates</h2>
          <p className="text-gray-400">Manage your certifications and achievements</p>
        </div>
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button 
              onClick={() => handleOpenDialog()}
              className="bg-cyan-500 hover:bg-cyan-600"
            >
              <Plus className="h-4 w-4 mr-2" />
              Add Certificate
            </Button>
          </DialogTrigger>
          <DialogContent className="bg-gray-800 border-gray-700 max-w-2xl max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle className="text-white">
                {editingCert ? 'Edit Certificate' : 'Add New Certificate'}
              </DialogTitle>
            </DialogHeader>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label className="text-gray-300">Name *</Label>
                  <Input
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="bg-gray-700 border-gray-600 text-white"
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label className="text-gray-300">Issuer *</Label>
                  <Input
                    value={formData.issuer}
                    onChange={(e) => setFormData({ ...formData, issuer: e.target.value })}
                    className="bg-gray-700 border-gray-600 text-white"
                    required
                  />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label className="text-gray-300">Date *</Label>
                  <Input
                    value={formData.date}
                    onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                    placeholder="e.g., March 2025"
                    className="bg-gray-700 border-gray-600 text-white"
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label className="text-gray-300">Status</Label>
                  <Select value={formData.status} onValueChange={(value) => setFormData({ ...formData, status: value })}>
                    <SelectTrigger className="bg-gray-700 border-gray-600 text-white">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent className="bg-gray-700 border-gray-600">
                      <SelectItem value="completed">Completed</SelectItem>
                      <SelectItem value="in-progress">In Progress</SelectItem>
                      <SelectItem value="upcoming">Upcoming</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <div className="space-y-2">
                <Label className="text-gray-300">Description</Label>
                <Textarea
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  className="bg-gray-700 border-gray-600 text-white"
                  rows={2}
                />
              </div>
              <div className="space-y-2">
                <Label className="text-gray-300">Achievement</Label>
                <Textarea
                  value={formData.achievement}
                  onChange={(e) => setFormData({ ...formData, achievement: e.target.value })}
                  className="bg-gray-700 border-gray-600 text-white"
                  rows={2}
                />
              </div>
              <div className="space-y-2">
                <Label className="text-gray-300">Certificate Image/PDF</Label>
                <div className="flex items-center gap-4">
                  <Input
                    type="file"
                    accept="image/*,.pdf"
                    onChange={(e) => setFile(e.target.files?.[0] || null)}
                    className="bg-gray-700 border-gray-600 text-white"
                  />
                  {editingCert?.certificate_url && (
                    <a 
                      href={editingCert.certificate_url} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="text-cyan-400 hover:text-cyan-300 text-sm whitespace-nowrap"
                    >
                      View current
                    </a>
                  )}
                </div>
              </div>
              <div className="flex justify-end gap-3 pt-4">
                <Button type="button" variant="outline" onClick={() => setIsDialogOpen(false)} className="border-gray-600 text-gray-300">
                  Cancel
                </Button>
                <Button type="submit" disabled={isLoading} className="bg-cyan-500 hover:bg-cyan-600">
                  {isLoading ? 'Saving...' : (editingCert ? 'Update' : 'Add')}
                </Button>
              </div>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      <div className="grid gap-4">
        {certificates.length === 0 ? (
          <Card className="bg-gray-800/50 border-gray-700">
            <CardContent className="flex flex-col items-center justify-center py-12">
              <Award className="h-12 w-12 text-gray-500 mb-4" />
              <p className="text-gray-400">No certificates yet. Add your first one!</p>
            </CardContent>
          </Card>
        ) : (
          certificates.map((cert) => (
            <Card key={cert.id} className="bg-gray-800/50 border-gray-700">
              <CardHeader className="flex flex-row items-start justify-between space-y-0">
                <div>
                  <CardTitle className="text-white text-lg">{cert.name}</CardTitle>
                  <p className="text-sm text-gray-400">{cert.issuer} • {cert.date}</p>
                </div>
                <div className="flex items-center gap-2">
                  <span className={`px-2 py-1 text-xs rounded-full ${
                    cert.status === 'completed' ? 'bg-green-500/20 text-green-400' :
                    cert.status === 'in-progress' ? 'bg-yellow-500/20 text-yellow-400' :
                    'bg-blue-500/20 text-blue-400'
                  }`}>
                    {cert.status}
                  </span>
                  <Button size="icon" variant="ghost" onClick={() => handleOpenDialog(cert)} className="text-gray-400 hover:text-white">
                    <Pencil className="h-4 w-4" />
                  </Button>
                  <Button size="icon" variant="ghost" onClick={() => handleDelete(cert.id)} className="text-red-400 hover:text-red-300">
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </CardHeader>
              {(cert.description || cert.achievement) && (
                <CardContent className="pt-0">
                  {cert.description && <p className="text-gray-300 text-sm mb-2">{cert.description}</p>}
                  {cert.achievement && <p className="text-cyan-400 text-sm">{cert.achievement}</p>}
                </CardContent>
              )}
            </Card>
          ))
        )}
      </div>
    </div>
  );
};
