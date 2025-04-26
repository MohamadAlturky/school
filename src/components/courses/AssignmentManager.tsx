import React, { useState } from 'react';
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardFooter, 
  CardHeader, 
  CardTitle 
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Progress } from "@/components/ui/progress";
import { Separator } from "@/components/ui/separator";
import { useToast } from "@/components/ui/use-toast";
import { useLanguage } from '@/contexts/LanguageContext';
import { File, FileText, Pencil } from 'lucide-react';

interface Assignment {
  id: number;
  title: string;
  description: string;
  dueDate: string;
  status: string;
  maxScore: number;
  submissions: {
    id: number;
    studentName: string;
    submissionDate: string;
    score?: number;
    feedback?: string;
    status: string;
  }[];
}

const AssignmentManager: React.FC = () => {
  const { t } = useLanguage();
  const { toast } = useToast();
  
  const [assignments, setAssignments] = useState<Assignment[]>([
    {
      id: 1,
      title: t('mathQuizAlgebra'),
      description: t('mathQuizDescription'),
      dueDate: '2025-05-10',
      status: 'active',
      maxScore: 100,
      submissions: [
        { id: 1, studentName: 'Ahmed Hassan', submissionDate: '2025-05-08', score: 85, feedback: t('goodWork'), status: 'graded' },
        { id: 2, studentName: 'Fatima Ali', submissionDate: '2025-05-09', score: 92, feedback: t('excellentWork'), status: 'graded' },
        { id: 3, studentName: 'Mohammed Saleh', submissionDate: '2025-05-07', status: 'submitted' }
      ]
    },
    {
      id: 2,
      title: t('scienceProjectEcosystem'),
      description: t('scienceProjectDescription'),
      dueDate: '2025-05-15',
      status: 'active',
      maxScore: 100,
      submissions: [
        { id: 1, studentName: 'Ahmed Hassan', submissionDate: '2025-05-12', status: 'submitted' },
        { id: 2, studentName: 'Fatima Ali', submissionDate: '', status: 'not_submitted' }
      ]
    }
  ]);
  
  const [selectedAssignment, setSelectedAssignment] = useState<Assignment | null>(null);
  const [selectedSubmission, setSelectedSubmission] = useState<any | null>(null);
  
  const handleGradeSubmission = (assignmentId: number, submissionId: number, score: number, feedback: string) => {
    setAssignments(assignments.map(assignment => {
      if (assignment.id === assignmentId) {
        return {
          ...assignment,
          submissions: assignment.submissions.map(submission => {
            if (submission.id === submissionId) {
              return { ...submission, score, feedback, status: 'graded' };
            }
            return submission;
          })
        };
      }
      return assignment;
    }));
    
    toast({
      title: t('submissionGraded'),
      description: t('submissionGradedMessage'),
    });
    
    setSelectedSubmission(null);
  };
  
  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>{t('assignmentsAndProjects')}</CardTitle>
          <CardDescription>{t('manageAssignmentsDescription')}</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex justify-between mb-6">
            <Tabs defaultValue="active" className="w-[400px]">
              <TabsList>
                <TabsTrigger value="active">{t('active')}</TabsTrigger>
                <TabsTrigger value="past">{t('past')}</TabsTrigger>
                <TabsTrigger value="draft">{t('draft')}</TabsTrigger>
              </TabsList>
            </Tabs>
            
            <Dialog>
              <DialogTrigger asChild>
                <Button>{t('createAssignment')}</Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-[500px]">
                <DialogHeader>
                  <DialogTitle>{t('createNewAssignment')}</DialogTitle>
                  <DialogDescription>{t('fillAssignmentDetails')}</DialogDescription>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                  <div className="grid gap-2">
                    <Label htmlFor="title">{t('title')}</Label>
                    <Input id="title" placeholder={t('assignmentTitlePlaceholder')} />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="description">{t('description')}</Label>
                    <textarea 
                      id="description" 
                      className="min-h-[100px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                      placeholder={t('assignmentDescriptionPlaceholder')}
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="grid gap-2">
                      <Label htmlFor="due-date">{t('dueDate')}</Label>
                      <Input id="due-date" type="date" />
                    </div>
                    <div className="grid gap-2">
                      <Label htmlFor="max-score">{t('maxScore')}</Label>
                      <Input id="max-score" type="number" defaultValue="100" />
                    </div>
                  </div>
                  <div className="grid gap-2">
                    <Label>{t('attachments')}</Label>
                    <div className="border-2 border-dashed rounded-md p-4 text-center">
                      <div className="flex justify-center mb-2">
                        <File className="h-8 w-8 text-muted-foreground" />
                      </div>
                      <p className="text-sm text-muted-foreground mb-2">{t('dragFilesHere')}</p>
                      <Button variant="outline" size="sm">{t('browseFiles')}</Button>
                    </div>
                  </div>
                </div>
                <DialogFooter>
                  <Button variant="outline">{t('saveAsDraft')}</Button>
                  <Button>{t('publish')}</Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </div>
          
          <div className="space-y-4">
            {assignments.map((assignment) => (
              <Card 
                key={assignment.id} 
                className={`border-r-4 ${
                  new Date(assignment.dueDate) < new Date() 
                    ? 'border-r-yellow-500' 
                    : 'border-r-green-500'
                }`}
              >
                <CardHeader>
                  <div className="flex justify-between items-center">
                    <CardTitle className="text-lg">{assignment.title}</CardTitle>
                    <span className="text-sm text-muted-foreground">
                      {t('due')}: {assignment.dueDate}
                    </span>
                  </div>
                  <CardDescription className="line-clamp-2">{assignment.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center justify-between">
                    <div>
                      <span className="text-sm text-muted-foreground">
                        {assignment.submissions.filter(s => s.status !== 'not_submitted').length} / {assignment.submissions.length} {t('submitted')}
                      </span>
                      <Progress 
                        className="w-[200px] mt-2" 
                        value={(assignment.submissions.filter(s => s.status !== 'not_submitted').length / assignment.submissions.length) * 100} 
                      />
                    </div>
                    <div>
                      <span className="text-sm text-muted-foreground">
                        {assignment.submissions.filter(s => s.status === 'graded').length} / {assignment.submissions.length} {t('graded')}
                      </span>
                      <Progress 
                        className="w-[200px] mt-2" 
                        value={(assignment.submissions.filter(s => s.status === 'graded').length / assignment.submissions.length) * 100} 
                        indicatorColor="bg-secondary"
                      />
                    </div>
                  </div>
                </CardContent>
                <CardFooter>
                  <div className="flex gap-2">
                    <Button 
                      variant="outline" 
                      size="sm"
                      onClick={() => setSelectedAssignment(assignment)}
                    >
                      {t('viewSubmissions')}
                    </Button>
                    <Button variant="outline" size="sm">
                      {t('edit')}
                    </Button>
                    <Button size="sm">
                      {t('sendReminder')}
                    </Button>
                  </div>
                </CardFooter>
              </Card>
            ))}
          </div>
        </CardContent>
      </Card>
      
      {selectedAssignment && (
        <Card>
          <CardHeader>
            <div className="flex justify-between items-center">
              <CardTitle>{selectedAssignment.title} - {t('submissions')}</CardTitle>
              <Button variant="ghost" size="sm" onClick={() => setSelectedAssignment(null)}>
                {t('close')}
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="all">
              <TabsList className="mb-4">
                <TabsTrigger value="all">{t('all')}</TabsTrigger>
                <TabsTrigger value="submitted">{t('submitted')}</TabsTrigger>
                <TabsTrigger value="graded">{t('graded')}</TabsTrigger>
                <TabsTrigger value="not_submitted">{t('notSubmitted')}</TabsTrigger>
              </TabsList>
              
              <div className="space-y-4">
                {selectedAssignment.submissions.map((submission) => (
                  <Card key={submission.id}>
                    <CardHeader className="py-3">
                      <div className="flex justify-between items-center">
                        <CardTitle className="text-base">{submission.studentName}</CardTitle>
                        <div>
                          {submission.status === 'graded' ? (
                            <span className="bg-green-100 text-green-800 text-xs px-2 py-1 rounded">
                              {submission.score} / {selectedAssignment.maxScore}
                            </span>
                          ) : submission.status === 'submitted' ? (
                            <span className="bg-yellow-100 text-yellow-800 text-xs px-2 py-1 rounded">
                              {t('needsGrading')}
                            </span>
                          ) : (
                            <span className="bg-red-100 text-red-800 text-xs px-2 py-1 rounded">
                              {t('notSubmitted')}
                            </span>
                          )}
                        </div>
                      </div>
                      {submission.status !== 'not_submitted' && (
                        <CardDescription>{t('submittedOn')}: {submission.submissionDate}</CardDescription>
                      )}
                    </CardHeader>
                    {submission.status !== 'not_submitted' && (
                      <CardContent className="py-2">
                        <div className="flex items-center gap-2 text-sm">
                          <div className="flex items-center gap-1">
                            <FileText className="h-4 w-4" />
                            <span>assignment-submission.pdf</span>
                          </div>
                          <Button variant="ghost" size="sm">{t('download')}</Button>
                        </div>
                        
                        {submission.status === 'graded' && (
                          <div className="mt-4 bg-muted p-3 rounded-md">
                            <p className="text-sm font-medium">{t('feedback')}:</p>
                            <p className="text-sm">{submission.feedback}</p>
                          </div>
                        )}
                      </CardContent>
                    )}
                    <CardFooter>
                      {submission.status === 'submitted' ? (
                        <Button 
                          size="sm"
                          onClick={() => setSelectedSubmission(submission)}
                        >
                          {t('grade')}
                        </Button>
                      ) : submission.status === 'graded' ? (
                        <Button 
                          variant="outline" 
                          size="sm"
                          onClick={() => setSelectedSubmission(submission)}
                        >
                          {t('updateGrade')}
                        </Button>
                      ) : (
                        <Button variant="outline" size="sm">
                          {t('sendReminder')}
                        </Button>
                      )}
                    </CardFooter>
                  </Card>
                ))}
              </div>
            </Tabs>
          </CardContent>
        </Card>
      )}
      
      {selectedSubmission && (
        <Dialog open={!!selectedSubmission} onOpenChange={() => setSelectedSubmission(null)}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>
                {selectedSubmission.status === 'graded' ? t('updateGrade') : t('gradeSubmission')}
              </DialogTitle>
              <DialogDescription>
                {t('gradeSubmissionFor')} {selectedSubmission.studentName}
              </DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid gap-2">
                <Label htmlFor="score">{t('score')}</Label>
                <Input 
                  id="score" 
                  type="number" 
                  defaultValue={selectedSubmission.score || ''}
                  max={selectedAssignment?.maxScore}
                  placeholder={`${t('outOf')} ${selectedAssignment?.maxScore}`}
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="feedback">{t('feedback')}</Label>
                <textarea 
                  id="feedback" 
                  className="min-h-[100px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                  defaultValue={selectedSubmission.feedback || ''}
                  placeholder={t('provideFeedback')}
                />
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setSelectedSubmission(null)}>
                {t('cancel')}
              </Button>
              <Button onClick={() => {
                const score = (document.getElementById('score') as HTMLInputElement).value;
                const feedback = (document.getElementById('feedback') as HTMLTextAreaElement).value;
                
                handleGradeSubmission(
                  selectedAssignment?.id || 0,
                  selectedSubmission.id,
                  parseInt(score),
                  feedback
                );
              }}>
                {t('saveGrade')}
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      )}
    </div>
  );
};

export default AssignmentManager;
