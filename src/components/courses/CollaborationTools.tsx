import React, { useState } from 'react';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { 
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { useToast } from "@/components/ui/use-toast";
import { useLanguage } from '@/contexts/LanguageContext';
import { MessageSquare, Users, CheckSquare, Pencil, File } from 'lucide-react';

interface DiscussionMessage {
  id: number;
  user: string;
  message: string;
  timestamp: string;
  replies?: DiscussionMessage[];
}

interface DiscussionTopic {
  id: number;
  title: string;
  description: string;
  creator: string;
  date: string;
  tags: string[];
  messages: DiscussionMessage[];
}

interface ProjectGroup {
  id: number;
  name: string;
  description: string;
  members: string[];
  tasks: {
    id: number;
    title: string;
    assignedTo: string;
    status: "todo" | "in_progress" | "completed";
    dueDate: string;
  }[];
}

const CollaborationTools: React.FC = () => {
  const { t } = useLanguage();
  const { toast } = useToast();
  
  const [discussionTopics, setDiscussionTopics] = useState<DiscussionTopic[]>([
    {
      id: 1,
      title: t('mathProblemDiscussion'),
      description: t('discussionDescription1'),
      creator: 'Ahmed Hassan',
      date: '2025-04-20',
      tags: [t('math'), t('algebra')],
      messages: [
        {
          id: 1,
          user: 'Ahmed Hassan',
          message: t('discussionMessage1'),
          timestamp: '2025-04-20 10:30',
          replies: [
            {
              id: 2,
              user: 'Fatima Ali',
              message: t('discussionReply1'),
              timestamp: '2025-04-20 11:15',
            }
          ]
        },
        {
          id: 3,
          user: 'Mohammed Saleh',
          message: t('discussionMessage2'),
          timestamp: '2025-04-20 14:45',
        }
      ]
    },
    {
      id: 2,
      title: t('scienceProjectIdeas'),
      description: t('discussionDescription2'),
      creator: 'Sara Ahmed',
      date: '2025-04-18',
      tags: [t('science'), t('projects')],
      messages: [
        {
          id: 1,
          user: 'Sara Ahmed',
          message: t('discussionMessage3'),
          timestamp: '2025-04-18 09:20',
        }
      ]
    }
  ]);
  
  const [projectGroups, setProjectGroups] = useState<ProjectGroup[]>([
    {
      id: 1,
      name: t('scienceProjectGroup'),
      description: t('groupDescription1'),
      members: ['Ahmed Hassan', 'Fatima Ali', 'Mohammed Saleh', 'Sara Ahmed', 'Omar Khalid'],
      tasks: [
        {
          id: 1,
          title: t('researchTask'),
          assignedTo: 'Ahmed Hassan',
          status: 'completed',
          dueDate: '2025-04-15'
        },
        {
          id: 2,
          title: t('experimentTask'),
          assignedTo: 'Fatima Ali',
          status: 'in_progress',
          dueDate: '2025-04-25'
        },
        {
          id: 3,
          title: t('presentationTask'),
          assignedTo: 'Mohammed Saleh',
          status: 'todo',
          dueDate: '2025-05-10'
        }
      ]
    },
    {
      id: 2,
      name: t('mathStudyGroup'),
      description: t('groupDescription2'),
      members: ['Ahmed Hassan', 'Fatima Ali', 'Omar Khalid'],
      tasks: [
        {
          id: 1,
          title: t('practiceProblemsTask'),
          assignedTo: 'Ahmed Hassan',
          status: 'in_progress',
          dueDate: '2025-04-30'
        },
        {
          id: 2,
          title: t('conceptReviewTask'),
          assignedTo: 'Fatima Ali',
          status: 'todo',
          dueDate: '2025-05-05'
        }
      ]
    }
  ]);
  
  const [selectedTopic, setSelectedTopic] = useState<DiscussionTopic | null>(null);
  const [selectedGroup, setSelectedGroup] = useState<ProjectGroup | null>(null);
  const [newMessage, setNewMessage] = useState('');
  
  const handlePostMessage = () => {
    if (!newMessage.trim() || !selectedTopic) return;
    
    const updatedTopics = discussionTopics.map(topic => {
      if (topic.id === selectedTopic.id) {
        return {
          ...topic,
          messages: [
            ...topic.messages,
            {
              id: Math.max(...topic.messages.map(m => m.id)) + 1,
              user: 'Current User',
              message: newMessage,
              timestamp: new Date().toISOString().replace('T', ' ').substring(0, 16),
            }
          ]
        };
      }
      return topic;
    });
    
    setDiscussionTopics(updatedTopics);
    setNewMessage('');
    
    toast({
      title: t('messagePosted'),
      description: t('yourMessageHasBeenPosted'),
    });
    
    const updatedTopic = updatedTopics.find(t => t.id === selectedTopic.id);
    if (updatedTopic) {
      setSelectedTopic(updatedTopic);
    }
  };
  
  const addNewTask = (groupId: number, task: any) => {
    const updatedGroups = projectGroups.map(group => {
      if (group.id === groupId) {
        return {
          ...group,
          tasks: [
            ...group.tasks,
            {
              id: Math.max(...group.tasks.map(t => t.id)) + 1,
              ...task,
              status: 'todo',
            }
          ]
        };
      }
      return group;
    });
    
    setProjectGroups(updatedGroups);
    
    toast({
      title: t('taskAdded'),
      description: t('newTaskAddedToGroup'),
    });
    
    const updatedGroup = updatedGroups.find(g => g.id === groupId);
    if (updatedGroup) {
      setSelectedGroup(updatedGroup);
    }
  };
  
  return (
    <div className="space-y-8">
      <Card>
        <CardHeader>
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-2">
              <MessageSquare className="h-5 w-5 text-primary" />
              <CardTitle>{t('discussionForums')}</CardTitle>
            </div>
            <Dialog>
              <DialogTrigger asChild>
                <Button>{t('newTopic')}</Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>{t('createNewDiscussionTopic')}</DialogTitle>
                  <DialogDescription>{t('shareYourThoughts')}</DialogDescription>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                  <div className="grid gap-2">
                    <Label htmlFor="topic-title">{t('title')}</Label>
                    <Input id="topic-title" placeholder={t('enterTopicTitle')} />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="topic-description">{t('description')}</Label>
                    <textarea 
                      id="topic-description" 
                      className="min-h-[80px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                      placeholder={t('describeYourTopic')}
                    />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="topic-tags">{t('tags')}</Label>
                    <Input id="topic-tags" placeholder={t('tagsCommaSeparated')} />
                  </div>
                </div>
                <DialogFooter>
                  <Button type="submit">{t('createTopic')}</Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </div>
          <CardDescription>{t('discussionForumsDescription')}</CardDescription>
        </CardHeader>
        <CardContent>
          {selectedTopic ? (
            <div className="space-y-4">
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="text-xl font-medium">{selectedTopic.title}</h3>
                  <p className="text-sm text-muted-foreground">
                    {t('startedBy')} {selectedTopic.creator} • {selectedTopic.date}
                  </p>
                  <div className="flex gap-2 mt-2">
                    {selectedTopic.tags.map((tag, index) => (
                      <span key={index} className="text-xs bg-primary/10 text-primary px-2 py-1 rounded">
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
                <Button variant="outline" size="sm" onClick={() => setSelectedTopic(null)}>
                  {t('backToTopics')}
                </Button>
              </div>
              
              <p className="text-sm mt-4">{selectedTopic.description}</p>
              
              <Separator className="my-4" />
              
              <div className="space-y-4">
                {selectedTopic.messages.map((message) => (
                  <div key={message.id} className="bg-muted rounded-lg p-4">
                    <div className="flex justify-between">
                      <span className="font-medium">{message.user}</span>
                      <span className="text-xs text-muted-foreground">{message.timestamp}</span>
                    </div>
                    <p className="text-sm mt-2">{message.message}</p>
                    
                    {message.replies && message.replies.length > 0 && (
                      <div className="mt-3 pl-4 border-l-2 border-border space-y-3">
                        {message.replies.map((reply) => (
                          <div key={reply.id} className="bg-background rounded-lg p-3">
                            <div className="flex justify-between">
                              <span className="font-medium text-sm">{reply.user}</span>
                              <span className="text-xs text-muted-foreground">{reply.timestamp}</span>
                            </div>
                            <p className="text-sm mt-1">{reply.message}</p>
                          </div>
                        ))}
                      </div>
                    )}
                    
                    <div className="mt-3 flex justify-end gap-2">
                      <Button variant="ghost" size="sm">
                        {t('reply')}
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
              
              <div className="flex gap-2 mt-6">
                <Input
                  placeholder={t('writeYourMessage')}
                  value={newMessage}
                  onChange={(e) => setNewMessage(e.target.value)}
                  className="flex-grow"
                />
                <Button onClick={handlePostMessage}>{t('post')}</Button>
              </div>
            </div>
          ) : (
            <div className="space-y-4">
              {discussionTopics.map((topic) => (
                <Card 
                  key={topic.id} 
                  className="cursor-pointer hover:bg-muted/50 transition-colors"
                  onClick={() => setSelectedTopic(topic)}
                >
                  <CardHeader className="py-3">
                    <div className="flex justify-between">
                      <CardTitle className="text-lg">{topic.title}</CardTitle>
                      <span className="text-sm text-muted-foreground">{topic.date}</span>
                    </div>
                    <CardDescription className="line-clamp-2">{topic.description}</CardDescription>
                  </CardHeader>
                  <CardContent className="py-1">
                    <div className="flex justify-between items-center">
                      <div className="flex gap-2">
                        {topic.tags.map((tag, index) => (
                          <span key={index} className="text-xs bg-primary/10 text-primary px-2 py-1 rounded">
                            {tag}
                          </span>
                        ))}
                      </div>
                      <span className="text-sm text-muted-foreground flex items-center gap-1">
                        <MessageSquare className="h-4 w-4" />
                        {topic.messages.length}
                      </span>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader>
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-2">
              <Users className="h-5 w-5 text-primary" />
              <CardTitle>{t('projectGroups')}</CardTitle>
            </div>
            <Dialog>
              <DialogTrigger asChild>
                <Button>{t('createGroup')}</Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>{t('createNewProjectGroup')}</DialogTitle>
                  <DialogDescription>{t('collaborateWithOthers')}</DialogDescription>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                  <div className="grid gap-2">
                    <Label htmlFor="group-name">{t('groupName')}</Label>
                    <Input id="group-name" placeholder={t('enterGroupName')} />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="group-description">{t('description')}</Label>
                    <textarea 
                      id="group-description" 
                      className="min-h-[80px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                      placeholder={t('describeYourGroup')}
                    />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="group-members">{t('inviteMembers')}</Label>
                    <Input id="group-members" placeholder={t('enterEmailsCommaSeparated')} />
                  </div>
                </div>
                <DialogFooter>
                  <Button type="submit">{t('createGroup')}</Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </div>
          <CardDescription>{t('projectGroupsDescription')}</CardDescription>
        </CardHeader>
        <CardContent>
          {selectedGroup ? (
            <div className="space-y-4">
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="text-xl font-medium">{selectedGroup.name}</h3>
                  <p className="text-sm text-muted-foreground">
                    {selectedGroup.members.length} {t('members')}
                  </p>
                </div>
                <Button variant="outline" size="sm" onClick={() => setSelectedGroup(null)}>
                  {t('backToGroups')}
                </Button>
              </div>
              
              <p className="text-sm mt-2">{selectedGroup.description}</p>
              
              <Tabs defaultValue="tasks" className="mt-6">
                <TabsList>
                  <TabsTrigger value="tasks">{t('tasks')}</TabsTrigger>
                  <TabsTrigger value="members">{t('members')}</TabsTrigger>
                  <TabsTrigger value="files">{t('files')}</TabsTrigger>
                </TabsList>
                
                <TabsContent value="tasks" className="mt-4">
                  <div className="space-y-4">
                    <div className="flex justify-between">
                      <h4 className="text-lg font-medium">{t('groupTasks')}</h4>
                      <Dialog>
                        <DialogTrigger asChild>
                          <Button size="sm">{t('addTask')}</Button>
                        </DialogTrigger>
                        <DialogContent>
                          <DialogHeader>
                            <DialogTitle>{t('addNewTask')}</DialogTitle>
                            <DialogDescription>{t('createTaskForGroup')}</DialogDescription>
                          </DialogHeader>
                          <div className="grid gap-4 py-4">
                            <div className="grid gap-2">
                              <Label htmlFor="task-title">{t('taskTitle')}</Label>
                              <Input id="task-title" placeholder={t('enterTaskTitle')} />
                            </div>
                            <div className="grid gap-2">
                              <Label htmlFor="task-assignee">{t('assignTo')}</Label>
                              <select 
                                id="task-assignee" 
                                className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                              >
                                {selectedGroup.members.map((member, index) => (
                                  <option key={index} value={member}>{member}</option>
                                ))}
                              </select>
                            </div>
                            <div className="grid gap-2">
                              <Label htmlFor="task-due-date">{t('dueDate')}</Label>
                              <Input id="task-due-date" type="date" />
                            </div>
                          </div>
                          <DialogFooter>
                            <Button onClick={() => {
                              const title = (document.getElementById('task-title') as HTMLInputElement).value;
                              const assignedTo = (document.getElementById('task-assignee') as HTMLSelectElement).value;
                              const dueDate = (document.getElementById('task-due-date') as HTMLInputElement).value;
                              
                              if (title && assignedTo && dueDate) {
                                addNewTask(selectedGroup.id, { title, assignedTo, dueDate });
                              }
                            }}>
                              {t('addTask')}
                            </Button>
                          </DialogFooter>
                        </DialogContent>
                      </Dialog>
                    </div>
                    
                    <Accordion type="multiple" className="w-full">
                      <AccordionItem value="todo">
                        <AccordionTrigger className="text-base font-medium">
                          {t('todo')} ({selectedGroup.tasks.filter(t => t.status === 'todo').length})
                        </AccordionTrigger>
                        <AccordionContent>
                          <div className="space-y-2 pt-2">
                            {selectedGroup.tasks
                              .filter(task => task.status === 'todo')
                              .map(task => (
                                <div 
                                  key={task.id} 
                                  className="flex justify-between items-center p-2 bg-muted rounded-lg"
                                >
                                  <div>
                                    <p className="font-medium">{task.title}</p>
                                    <p className="text-xs text-muted-foreground">
                                      {t('assignedTo')}: {task.assignedTo} • {t('due')}: {task.dueDate}
                                    </p>
                                  </div>
                                  <Button variant="outline" size="sm">
                                    {t('startTask')}
                                  </Button>
                                </div>
                            ))}
                          </div>
                        </AccordionContent>
                      </AccordionItem>
                      
                      <AccordionItem value="in_progress">
                        <AccordionTrigger className="text-base font-medium">
                          {t('inProgress')} ({selectedGroup.tasks.filter(t => t.status === 'in_progress').length})
                        </AccordionTrigger>
                        <AccordionContent>
                          <div className="space-y-2 pt-2">
                            {selectedGroup.tasks
                              .filter(task => task.status === 'in_progress')
                              .map(task => (
                                <div 
                                  key={task.id} 
                                  className="flex justify-between items-center p-2 bg-muted rounded-lg"
                                >
                                  <div>
                                    <p className="font-medium">{task.title}</p>
                                    <p className="text-xs text-muted-foreground">
                                      {t('assignedTo')}: {task.assignedTo} • {t('due')}: {task.dueDate}
                                    </p>
                                  </div>
                                  <Button variant="outline" size="sm">
                                    {t('completeTask')}
                                  </Button>
                                </div>
                            ))}
                          </div>
                        </AccordionContent>
                      </AccordionItem>
                      
                      <AccordionItem value="completed">
                        <AccordionTrigger className="text-base font-medium">
                          {t('completed')} ({selectedGroup.tasks.filter(t => t.status === 'completed').length})
                        </AccordionTrigger>
                        <AccordionContent>
                          <div className="space-y-2 pt-2">
                            {selectedGroup.tasks
                              .filter(task => task.status === 'completed')
                              .map(task => (
                                <div 
                                  key={task.id} 
                                  className="flex justify-between items-center p-2 bg-muted rounded-lg"
                                >
                                  <div>
                                    <p className="font-medium">{task.title}</p>
                                    <p className="text-xs text-muted-foreground">
                                      {t('assignedTo')}: {task.assignedTo} • {t('due')}: {task.dueDate}
                                    </p>
                                  </div>
                                  <div className="flex items-center text-green-600">
                                    <CheckSquare className="h-4 w-4 mr-1" />
                                    <span className="text-sm">{t('completed')}</span>
                                  </div>
                                </div>
                            ))}
                          </div>
                        </AccordionContent>
                      </AccordionItem>
                    </Accordion>
                  </div>
                </TabsContent>
                
                <TabsContent value="members">
                  <div className="mt-4">
                    <h4 className="text-lg font-medium mb-4">{t('groupMembers')}</h4>
                    <div className="space-y-2">
                      {selectedGroup.members.map((member, index) => (
                        <div 
                          key={index} 
                          className="flex justify-between items-center p-2 bg-muted rounded-lg"
                        >
                          <span>{member}</span>
                          <Button variant="ghost" size="sm">
                            {t('message')}
                          </Button>
                        </div>
                      ))}
                    </div>
                    <div className="mt-4">
                      <Button variant="outline" size="sm">{t('inviteMore')}</Button>
                    </div>
                  </div>
                </TabsContent>
                
                <TabsContent value="files">
                  <div className="mt-4">
                    <div className="flex justify-between items-center mb-4">
                      <h4 className="text-lg font-medium">{t('sharedFiles')}</h4>
                      <Button size="sm">{t('uploadFile')}</Button>
                    </div>
                    
                    <div className="border-2 border-dashed rounded-lg p-8 text-center">
                      <div className="flex justify-center mb-3">
                        <File className="h-12 w-12 text-muted-foreground" />
                      </div>
                      <p className="text-muted-foreground mb-4">{t('noFilesYet')}</p>
                      <Button variant="outline">{t('uploadFirst')}</Button>
                    </div>
                  </div>
                </TabsContent>
              </Tabs>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {projectGroups.map((group) => (
                <Card 
                  key={group.id} 
                  className="cursor-pointer hover:bg-muted/50 transition-colors"
                  onClick={() => setSelectedGroup(group)}
                >
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Users className="h-4 w-4" />
                      {group.name}
                    </CardTitle>
                    <CardDescription className="line-clamp-2">{group.description}</CardDescription>
                  </CardHeader>
                  <CardContent className="py-1">
                    <div className="flex justify-between">
                      <span className="text-sm text-muted-foreground">
                        {group.members.length} {t('members')}
                      </span>
                      <span className="text-sm text-muted-foreground">
                        {group.tasks.length} {t('tasks')}
                      </span>
                    </div>
                  </CardContent>
                  <CardFooter>
                    <Button variant="outline" size="sm" onClick={(e) => {
                      e.stopPropagation();
                      toast({
                        title: t('requestSent'),
                        description: t('joinRequestSent'),
                      });
                    }}>
                      {t('join')}
                    </Button>
                  </CardFooter>
                </Card>
              ))}
              
              <Card className="border-2 border-dashed border-primary/20 flex flex-col items-center justify-center p-6">
                <div className="rounded-full bg-primary/10 p-3 mb-4">
                  <Pencil className="h-6 w-6 text-primary" />
                </div>
                <h3 className="font-medium mb-2">{t('createNewGroup')}</h3>
                <p className="text-sm text-muted-foreground text-center mb-4">{t('createGroupDescription')}</p>
                <Dialog>
                  <DialogTrigger asChild>
                    <Button>{t('createGroup')}</Button>
                  </DialogTrigger>
                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle>{t('createNewProjectGroup')}</DialogTitle>
                      <DialogDescription>{t('collaborateWithOthers')}</DialogDescription>
                    </DialogHeader>
                    <div className="grid gap-4 py-4">
                      <div className="grid gap-2">
                        <Label htmlFor="group-name">{t('groupName')}</Label>
                        <Input id="group-name" placeholder={t('enterGroupName')} />
                      </div>
                      <div className="grid gap-2">
                        <Label htmlFor="group-description">{t('description')}</Label>
                        <textarea 
                          id="group-description" 
                          className="min-h-[80px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                          placeholder={t('describeYourGroup')}
                        />
                      </div>
                      <div className="grid gap-2">
                        <Label htmlFor="group-members">{t('inviteMembers')}</Label>
                        <Input id="group-members" placeholder={t('enterEmailsCommaSeparated')} />
                      </div>
                    </div>
                    <DialogFooter>
                      <Button type="submit">{t('createGroup')}</Button>
                    </DialogFooter>
                  </DialogContent>
                </Dialog>
              </Card>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default CollaborationTools;
