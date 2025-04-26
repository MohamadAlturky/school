import React from 'react';
import { CardTitle, CardDescription } from "@/components/ui/card";

interface StudentProfileHeaderProps {
  name: string;
  grade: string;
  email: string;
  image: string;
}

export const StudentProfileHeader: React.FC<StudentProfileHeaderProps> = ({ 
  name, 
  grade, 
  email, 
  image 
}) => {
  return (
    <div className="flex items-center gap-4">
      <img 
        src={image || '/placeholder.svg'} 
        alt={name}
        className="rounded-full w-16 h-16 object-cover border-2 border-primary"
      />
      <div>
        <CardTitle className="text-2xl">{name}</CardTitle>
        <CardDescription className="text-base">{grade} • {email}</CardDescription>
      </div>
    </div>
  );
};
