import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Plus, Pencil, Trash2, FileText, Download, ExternalLink } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface Document {
  id: string;
  name: string;
  type: string;
  file_url: string;
}

export const DocumentsAdmin = () => {
  const [documents, setDocuments] = useState<Document[]>([]);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingDoc, setEditingDoc] = useState<Document | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    type: 'resume',
  });
  const [file, setFile] = useState<File | null>(null);
  const { toast } = useToast();

  const fetchDocuments = async () => {
    const { data, error } = await supabase
      .from('documents')
      .select('*')
      .order('created_at', { ascending: false });
    
    if (error) {
      toast({ title: 'Error', description: 'Failed to fetch documents', variant: 'destructive' });
      return;
    }
    setDocuments(data || []);
  };

  useEffect(() => {
    fetchDocuments();
  }, []);

  const resetForm = () => {
    setFormData({ name: '', type: 'resume' });
    setFile(null);
    setEditingDoc(null);
  };

  const handleOpenDialog = (doc?: Document) => {
    if (doc) {
      setEditingDoc(doc);
      setFormData({
        name: doc.name,
        type: doc.type,
      });
    } else {
      resetForm();
    }
    setIsDialogOpen(true);
  };

  const uploadFile = async (file: File): Promise<string | null> => {
    const fileExt = file.name.split('.').pop();
    const fileName = `documents/${Date.now()}.${fileExt}`;
    
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
    
    if (!editingDoc && !file) {
      toast({ title: 'Error', description: 'Please select a file to upload', variant: 'destructive' });
      return;
    }
    
    setIsLoading(true);

    try {
      let fileUrl = editingDoc?.file_url || '';
      
      if (file) {
        const uploadedUrl = await uploadFile(file);
        if (!uploadedUrl) {
          setIsLoading(false);
          return;
        }
        fileUrl = uploadedUrl;
      }

      const docData = {
        name: formData.name,
        type: formData.type,
        file_url: fileUrl,
      };

      if (editingDoc) {
        const { error } = await supabase
          .from('documents')
          .update(docData)
          .eq('id', editingDoc.id);
        
        if (error) throw error;
        toast({ title: 'Success', description: 'Document updated successfully' });
      } else {
        const { error } = await supabase
          .from('documents')
          .insert(docData);
        
        if (error) throw error;
        toast({ title: 'Success', description: 'Document added successfully' });
      }

      setIsDialogOpen(false);
      resetForm();
      fetchDocuments();
    } catch (error: any) {
      toast({ title: 'Error', description: error.message, variant: 'destructive' });
    } finally {
      setIsLoading(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this document?')) return;
    
    const { error } = await supabase
      .from('documents')
      .delete()
      .eq('id', id);
    
    if (error) {
      toast({ title: 'Error', description: error.message, variant: 'destructive' });
      return;
    }
    
    toast({ title: 'Success', description: 'Document deleted successfully' });
    fetchDocuments();
  };

  const getDocTypeLabel = (type: string) => {
    switch (type) {
      case 'resume': return 'Resume';
      case 'cover_letter': return 'Cover Letter';
      case 'portfolio': return 'Portfolio';
      case 'other': return 'Other';
      default: return type;
    }
  };

  const getDocTypeColor = (type: string) => {
    switch (type) {
      case 'resume': return 'bg-blue-500/20 text-blue-400';
      case 'cover_letter': return 'bg-purple-500/20 text-purple-400';
      case 'portfolio': return 'bg-cyan-500/20 text-cyan-400';
      default: return 'bg-gray-500/20 text-gray-400';
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-white">Documents</h2>
          <p className="text-gray-400">Manage your resume, cover letter, and other documents</p>
        </div>
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button 
              onClick={() => handleOpenDialog()}
              className="bg-cyan-500 hover:bg-cyan-600"
            >
              <Plus className="h-4 w-4 mr-2" />
              Add Document
            </Button>
          </DialogTrigger>
          <DialogContent className="bg-gray-800 border-gray-700">
            <DialogHeader>
              <DialogTitle className="text-white">
                {editingDoc ? 'Edit Document' : 'Add New Document'}
              </DialogTitle>
            </DialogHeader>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label className="text-gray-300">Name *</Label>
                <Input
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  placeholder="e.g., Maxwell Udekwe Resume"
                  className="bg-gray-700 border-gray-600 text-white"
                  required
                />
              </div>
              <div className="space-y-2">
                <Label className="text-gray-300">Type</Label>
                <Select value={formData.type} onValueChange={(value) => setFormData({ ...formData, type: value })}>
                  <SelectTrigger className="bg-gray-700 border-gray-600 text-white">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent className="bg-gray-700 border-gray-600">
                    <SelectItem value="resume">Resume</SelectItem>
                    <SelectItem value="cover_letter">Cover Letter</SelectItem>
                    <SelectItem value="portfolio">Portfolio</SelectItem>
                    <SelectItem value="other">Other</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label className="text-gray-300">File {!editingDoc && '*'}</Label>
                <Input
                  type="file"
                  accept=".pdf,.doc,.docx"
                  onChange={(e) => setFile(e.target.files?.[0] || null)}
                  className="bg-gray-700 border-gray-600 text-white"
                  required={!editingDoc}
                />
                {editingDoc?.file_url && (
                  <a 
                    href={editingDoc.file_url} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="text-cyan-400 hover:text-cyan-300 text-sm flex items-center gap-1"
                  >
                    <ExternalLink className="h-3 w-3" />
                    View current file
                  </a>
                )}
              </div>
              <div className="flex justify-end gap-3 pt-4">
                <Button type="button" variant="outline" onClick={() => setIsDialogOpen(false)} className="border-gray-600 text-gray-300">
                  Cancel
                </Button>
                <Button type="submit" disabled={isLoading} className="bg-cyan-500 hover:bg-cyan-600">
                  {isLoading ? 'Saving...' : (editingDoc ? 'Update' : 'Add')}
                </Button>
              </div>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      <div className="grid gap-4">
        {documents.length === 0 ? (
          <Card className="bg-gray-800/50 border-gray-700">
            <CardContent className="flex flex-col items-center justify-center py-12">
              <FileText className="h-12 w-12 text-gray-500 mb-4" />
              <p className="text-gray-400">No documents yet. Add your resume and cover letter!</p>
            </CardContent>
          </Card>
        ) : (
          documents.map((doc) => (
            <Card key={doc.id} className="bg-gray-800/50 border-gray-700">
              <CardHeader className="flex flex-row items-center justify-between space-y-0">
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 bg-gray-700 rounded-lg flex items-center justify-center">
                    <FileText className="h-5 w-5 text-cyan-400" />
                  </div>
                  <div>
                    <CardTitle className="text-white text-lg">{doc.name}</CardTitle>
                    <span className={`px-2 py-0.5 text-xs rounded-full ${getDocTypeColor(doc.type)}`}>
                      {getDocTypeLabel(doc.type)}
                    </span>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Button 
                    size="icon" 
                    variant="ghost" 
                    onClick={() => window.open(doc.file_url, '_blank')}
                    className="text-gray-400 hover:text-cyan-400"
                  >
                    <Download className="h-4 w-4" />
                  </Button>
                  <Button size="icon" variant="ghost" onClick={() => handleOpenDialog(doc)} className="text-gray-400 hover:text-white">
                    <Pencil className="h-4 w-4" />
                  </Button>
                  <Button size="icon" variant="ghost" onClick={() => handleDelete(doc.id)} className="text-red-400 hover:text-red-300">
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </CardHeader>
            </Card>
          ))
        )}
      </div>
    </div>
  );
};
