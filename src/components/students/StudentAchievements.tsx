import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface StudentAchievementsProps {
  achievements: {
    id: number;
    title: string;
    date: string;
    description: string;
  }[];
}

export const StudentAchievements: React.FC<StudentAchievementsProps> = ({ achievements }) => {
  return (
    <div className="space-y-4">
      {achievements.map((achievement) => (
        <Card key={achievement.id} className="border-r-4 border-r-accent">
          <CardHeader className="py-3">
            <div className="flex justify-between">
              <CardTitle className="text-lg">{achievement.title}</CardTitle>
              <span className="text-sm text-muted-foreground">{achievement.date}</span>
            </div>
          </CardHeader>
          <CardContent>
            <p className="text-sm">{achievement.description}</p>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};
