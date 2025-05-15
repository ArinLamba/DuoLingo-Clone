import { redirect } from 'next/navigation';

import { getLesson, getUserProgress, getUserSubscription } from '@/db/queries';

import { Quiz } from './quiz';

const LessonPage = async () => {

  const lessonData = getLesson();
  const userProgressData = getUserProgress();
  const userSubsscriptionData = getUserSubscription();

  const [
    lesson,
    userProgress,
    userSubscription,
  ] = await Promise.all([
    lessonData,
    userProgressData,
    userSubsscriptionData,
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
      userSubscription={userSubscription}
    />
    
  );
};

export default LessonPage;