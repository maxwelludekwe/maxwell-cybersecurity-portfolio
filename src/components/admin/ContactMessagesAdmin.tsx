import { useEffect, useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import { Mail, Trash2, Check, Circle, Loader2 } from 'lucide-react';

interface ContactMessage {
  id: string;
  name: string;
  email: string;
  subject: string;
  message: string;
  read: boolean;
  created_at: string;
}

export const ContactMessagesAdmin = () => {
  const [messages, setMessages] = useState<ContactMessage[]>([]);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  const fetchMessages = async () => {
    const { data, error } = await supabase
      .from('contact_messages')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) {
      toast({
        title: 'Error',
        description: 'Failed to fetch messages',
        variant: 'destructive',
      });
    } else {
      setMessages(data || []);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchMessages();
  }, []);

  const toggleRead = async (id: string, currentRead: boolean) => {
    const { error } = await supabase
      .from('contact_messages')
      .update({ read: !currentRead })
      .eq('id', id);

    if (error) {
      toast({
        title: 'Error',
        description: 'Failed to update message',
        variant: 'destructive',
      });
    } else {
      setMessages(messages.map(m => 
        m.id === id ? { ...m, read: !currentRead } : m
      ));
    }
  };

  const deleteMessage = async (id: string) => {
    const { error } = await supabase
      .from('contact_messages')
      .delete()
      .eq('id', id);

    if (error) {
      toast({
        title: 'Error',
        description: 'Failed to delete message',
        variant: 'destructive',
      });
    } else {
      setMessages(messages.filter(m => m.id !== id));
      toast({
        title: 'Deleted',
        description: 'Message deleted successfully',
      });
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const unreadCount = messages.filter(m => !m.read).length;

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-[400px]">
        <Loader2 className="h-8 w-8 text-cyan-400 animate-spin" />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <h2 className="text-2xl font-bold text-white">Contact Messages</h2>
          {unreadCount > 0 && (
            <Badge className="bg-cyan-500 text-white">
              {unreadCount} unread
            </Badge>
          )}
        </div>
      </div>

      {messages.length === 0 ? (
        <Card className="p-12 bg-gray-800/50 border-gray-700 text-center">
          <Mail className="h-12 w-12 text-gray-500 mx-auto mb-4" />
          <p className="text-gray-400">No messages yet</p>
          <p className="text-gray-500 text-sm mt-2">
            Messages from your contact form will appear here
          </p>
        </Card>
      ) : (
        <div className="space-y-4">
          {messages.map((message) => (
            <Card 
              key={message.id} 
              className={`p-6 border transition-all duration-200 ${
                message.read 
                  ? 'bg-gray-800/30 border-gray-700' 
                  : 'bg-gray-800/60 border-cyan-500/30'
              }`}
            >
              <div className="flex items-start justify-between gap-4">
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-3 mb-2">
                    {!message.read && (
                      <Circle className="h-3 w-3 fill-cyan-400 text-cyan-400 flex-shrink-0" />
                    )}
                    <h3 className="text-lg font-semibold text-white truncate">
                      {message.subject}
                    </h3>
                  </div>
                  
                  <div className="flex flex-wrap items-center gap-4 text-sm text-gray-400 mb-3">
                    <span className="font-medium text-cyan-400">{message.name}</span>
                    <a 
                      href={`mailto:${message.email}`}
                      className="hover:text-cyan-400 transition-colors"
                    >
                      {message.email}
                    </a>
                    <span>{formatDate(message.created_at)}</span>
                  </div>
                  
                  <p className="text-gray-300 whitespace-pre-wrap">{message.message}</p>
                </div>

                <div className="flex items-center gap-2 flex-shrink-0">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => toggleRead(message.id, message.read)}
                    className="text-gray-400 hover:text-cyan-400"
                    title={message.read ? 'Mark as unread' : 'Mark as read'}
                  >
                    <Check className={`h-4 w-4 ${message.read ? 'text-green-400' : ''}`} />
                  </Button>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => deleteMessage(message.id)}
                    className="text-gray-400 hover:text-red-400"
                    title="Delete message"
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
};
