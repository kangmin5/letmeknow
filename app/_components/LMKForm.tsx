"use client";

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { toast } from '@/hooks/use-toast';
import { MapPin } from 'lucide-react';
import React, { useState } from 'react';
import { strings } from '../utils/strings';
import { Calendar } from '@/components/ui/calendar';
import { ko } from 'date-fns/locale/ko';
import { submitLMK } from '../actions/submitLMK';

export default function LMKForm() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [accompany, setAccompany] = useState<string | null>(null);
  const [attendance, setAttendance] = useState('yes');
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const newErrors: Record<string, string> = {};
    if (!name) newErrors.name = '성명이 필수입력입니다.';
    if (!email) newErrors.email = 'email은 필수입력입니다.';

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    const formData = new FormData();
    formData.append('name', name);
    formData.append('email', email);
    formData.append('accompany', accompany || '0');
    formData.append('attendance', attendance);

    setIsLoading(true);
    const response = await submitLMK(formData);

    if (response.success) {
      toast({
        title: '저장 성공',
        description: strings.thankYouMessage,
      });
      setName('');
      setEmail('');
      setAccompany(null);
      setAttendance('yes');
      setErrors({});
    } else {
      toast({
        title: '저장 실패',
        description: response.message,
        variant: 'destructive',
      });
      if (response.error?.code === '23505') {
        setErrors({ email: 'Email이 이미 존재합니다.(이미 발송되었습니다.)' });
      }
    }

    setIsLoading(false);
  };

  const openNaverMaps = () => {
    window.open(
      `https://map.naver.com/p/entry/address/14165986.0462831,4374481.6786793,%EC%84%B8%EC%A2%85%20%EC%A0%95%EC%95%88%EC%84%B8%EC%A2%85%EB%A1%9C%201569?c=8.28,0,0,0,dh`
    );
  };

  return (
    <div className="max-w-md mx-auto my-10">
      <h1 className="text-2xl font-bold mb-4">{strings.title}</h1>
      <p className="mb-6">{strings.description}</p>
      <div className="mb-6">
        <Label>{strings.eventDateLabel}</Label>
        <Calendar
          selected={new Date(strings.eventDate)}
          className="border rounded-md flex justify-center items-center"
          fromDate={new Date(strings.eventDate)}
          toDate={new Date(strings.eventDate)}
          defaultMonth={new Date(strings.eventDate)}
          ISOWeek
          locale={ko}
        />
        <div className="mt-4">
          <Button
            type="button"
            variant="outline"
            className="w-full"
            onClick={openNaverMaps}
          >
            <MapPin />
            {strings.viewOnMapButton}
          </Button>
        </div>
      </div>
      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <Label htmlFor="name">{strings.nameLabel}</Label>
          <Input
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
          {errors.name && (
            <p className="text-red-500 text-sm mt-1">{errors.name}</p>
          )}
        </div>
        <div>
          <Label htmlFor="email">{strings.emailLabel}</Label>
          <Input
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          {errors?.email && (
            <p className="text-red-500 text-sm mt-1">{errors?.email}</p>
          )}
        </div>
        <div>
          <Label htmlFor="accompany">{strings.accompanylabel}</Label>
          <Input
            id="accompany"
            type="number"
            min="0"
            value={accompany || ''}
            onChange={(e) => setAccompany(e.target.value)}
          />
        </div>
        <div>
          <Label>{strings.lmkLabel}</Label>
          <RadioGroup value={attendance} onValueChange={setAttendance}>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="yes" id="yes" />
              <Label htmlFor="yes">{strings.yesOption}</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="no" id="no" />
              <Label htmlFor="no">{strings.noOption}</Label>
            </div>
          </RadioGroup>
        </div>
        <Button type="submit" className="w-full" disabled={isLoading}>
          {isLoading ? '저장 중...' : '제출'}
        </Button>
      </form>
    </div>
  );
}