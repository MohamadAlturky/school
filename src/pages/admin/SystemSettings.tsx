import React, { useState } from 'react';
import {
  FaSave,
  FaCog,
  FaBell,
  FaLock,
  FaEnvelope,
  FaGlobe,
  FaCalendarAlt,
  FaFileAlt
} from 'react-icons/fa';
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
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";

const SystemSettings = () => {
  const [settings, setSettings] = useState({
    schoolName: 'Example School',
    schoolEmail: 'contact@example.com',
    schoolPhone: '+1 234 567 8900',
    schoolAddress: '123 School Street, City, Country',
    timezone: 'UTC+0',
    dateFormat: 'MM/DD/YYYY',
    language: 'English',
    notifications: {
      email: true,
      sms: false,
      push: true
    },
    security: {
      passwordPolicy: {
        minLength: 8,
        requireNumbers: true,
        requireSpecialChars: true
      },
      twoFactorAuth: false,
      sessionTimeout: 30
    },
    maintenance: {
      mode: false,
      message: 'System is under maintenance'
    }
  });

  const handleInputChange = (section, field, value) => {
    setSettings(prev => ({
      ...prev,
      [section]: {
        ...prev[section],
        [field]: value
      }
    }));
  };

  const handleNestedInputChange = (section, subsection, field, value) => {
    setSettings(prev => ({
      ...prev,
      [section]: {
        ...prev[section],
        [subsection]: {
          ...prev[section][subsection],
          [field]: value
        }
      }
    }));
  };

  const handleSave = () => {
    // TODO: Implement save functionality
    console.log('Saving settings:', settings);
  };

  return (
    <div className="container py-8">
      <div className="flex flex-col md:flex-row justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold text-primary">System Settings</h1>
          <p className="text-gray-600">Configure system-wide settings</p>
        </div>
        <Button onClick={handleSave}>
          <FaSave className="mr-2 h-4 w-4" />
          Save Changes
        </Button>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <div className="flex items-center">
              <FaCog className="mr-2 h-5 w-5 text-primary" />
              <CardTitle>General Settings</CardTitle>
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="schoolName">School Name</Label>
              <Input
                id="schoolName"
                value={settings.schoolName}
                onChange={(e) => handleInputChange('schoolName', 'value', e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="schoolEmail">School Email</Label>
              <Input
                id="schoolEmail"
                type="email"
                value={settings.schoolEmail}
                onChange={(e) => handleInputChange('schoolEmail', 'value', e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="schoolPhone">School Phone</Label>
              <Input
                id="schoolPhone"
                type="tel"
                value={settings.schoolPhone}
                onChange={(e) => handleInputChange('schoolPhone', 'value', e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="schoolAddress">School Address</Label>
              <Input
                id="schoolAddress"
                value={settings.schoolAddress}
                onChange={(e) => handleInputChange('schoolAddress', 'value', e.target.value)}
              />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <div className="flex items-center">
              <FaGlobe className="mr-2 h-5 w-5 text-primary" />
              <CardTitle>Regional Settings</CardTitle>
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="timezone">Timezone</Label>
              <Select
                value={settings.timezone}
                onValueChange={(value) => handleInputChange('timezone', 'value', value)}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select timezone" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="UTC+0">UTC+0</SelectItem>
                  <SelectItem value="UTC+1">UTC+1</SelectItem>
                  <SelectItem value="UTC+2">UTC+2</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="dateFormat">Date Format</Label>
              <Select
                value={settings.dateFormat}
                onValueChange={(value) => handleInputChange('dateFormat', 'value', value)}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select date format" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="MM/DD/YYYY">MM/DD/YYYY</SelectItem>
                  <SelectItem value="DD/MM/YYYY">DD/MM/YYYY</SelectItem>
                  <SelectItem value="YYYY-MM-DD">YYYY-MM-DD</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="language">Language</Label>
              <Select
                value={settings.language}
                onValueChange={(value) => handleInputChange('language', 'value', value)}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select language" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="English">English</SelectItem>
                  <SelectItem value="Spanish">Spanish</SelectItem>
                  <SelectItem value="French">French</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <div className="flex items-center">
              <FaBell className="mr-2 h-5 w-5 text-primary" />
              <CardTitle>Notification Settings</CardTitle>
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <Label htmlFor="email-notifications">Email Notifications</Label>
              <Switch
                id="email-notifications"
                checked={settings.notifications.email}
                onCheckedChange={(checked) => handleNestedInputChange('notifications', 'email', 'value', checked)}
              />
            </div>
            <div className="flex items-center justify-between">
              <Label htmlFor="sms-notifications">SMS Notifications</Label>
              <Switch
                id="sms-notifications"
                checked={settings.notifications.sms}
                onCheckedChange={(checked) => handleNestedInputChange('notifications', 'sms', 'value', checked)}
              />
            </div>
            <div className="flex items-center justify-between">
              <Label htmlFor="push-notifications">Push Notifications</Label>
              <Switch
                id="push-notifications"
                checked={settings.notifications.push}
                onCheckedChange={(checked) => handleNestedInputChange('notifications', 'push', 'value', checked)}
              />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <div className="flex items-center">
              <FaLock className="mr-2 h-5 w-5 text-primary" />
              <CardTitle>Security Settings</CardTitle>
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="password-min-length">Password Minimum Length</Label>
              <Input
                id="password-min-length"
                type="number"
                value={settings.security.passwordPolicy.minLength}
                onChange={(e) => handleNestedInputChange('security', 'passwordPolicy', 'minLength', parseInt(e.target.value))}
              />
            </div>
            <div className="flex items-center justify-between">
              <Label htmlFor="require-numbers">Require Numbers in Passwords</Label>
              <Switch
                id="require-numbers"
                checked={settings.security.passwordPolicy.requireNumbers}
                onCheckedChange={(checked) => handleNestedInputChange('security', 'passwordPolicy', 'requireNumbers', checked)}
              />
            </div>
            <div className="flex items-center justify-between">
              <Label htmlFor="require-special-chars">Require Special Characters</Label>
              <Switch
                id="require-special-chars"
                checked={settings.security.passwordPolicy.requireSpecialChars}
                onCheckedChange={(checked) => handleNestedInputChange('security', 'passwordPolicy', 'requireSpecialChars', checked)}
              />
            </div>
            <div className="flex items-center justify-between">
              <Label htmlFor="two-factor-auth">Two-Factor Authentication</Label>
              <Switch
                id="two-factor-auth"
                checked={settings.security.twoFactorAuth}
                onCheckedChange={(checked) => handleNestedInputChange('security', 'twoFactorAuth', 'value', checked)}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="session-timeout">Session Timeout (minutes)</Label>
              <Input
                id="session-timeout"
                type="number"
                value={settings.security.sessionTimeout}
                onChange={(e) => handleNestedInputChange('security', 'sessionTimeout', 'value', parseInt(e.target.value))}
              />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <div className="flex items-center">
              <FaFileAlt className="mr-2 h-5 w-5 text-primary" />
              <CardTitle>Maintenance Mode</CardTitle>
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <Label htmlFor="maintenance-mode">Enable Maintenance Mode</Label>
              <Switch
                id="maintenance-mode"
                checked={settings.maintenance.mode}
                onCheckedChange={(checked) => handleNestedInputChange('maintenance', 'mode', 'value', checked)}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="maintenance-message">Maintenance Message</Label>
              <Input
                id="maintenance-message"
                value={settings.maintenance.message}
                onChange={(e) => handleNestedInputChange('maintenance', 'message', 'value', e.target.value)}
              />
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default SystemSettings; 