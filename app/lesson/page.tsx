import { redirect } from 'next/navigation';

import { getLesson, getUserProgress } from '@/db/queries';
import React from 'react'
import { Quiz } from './quiz';

const LessonPage = async () => {

  const lessonData = getLesson();
  const userProgressData = getUserProgress();

  const [
    lesson,
    userProgress,
  ] = await Promise.all([
    lessonData,
    userProgressData,
  ]);

  if(!lesson || !userProgress) {
    redirect("/learn");
  }

  const initialPercentagee = lesson.challenges
    .filter((challenge) => challenge.completed)
    .length / lesson.challenges.length * 100;
  
  return (
    <Quiz
      initialLessonId={lesson.id}
      initialLessonChallenges={lesson.challenges}
      initialHearts={userProgress.hearts}
      initialPercentage={initialPercentagee}
      userSubscription={null}
    />
    
  );
};

export default LessonPage;