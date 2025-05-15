import { redirect } from 'next/navigation';

import { getLesson, getUserProgress, getUserSubscription } from '@/db/queries';

import { Quiz } from '../quiz';


type Props = {
  params: 
    Promise<Record<string, string>>
};

const LessonIdPage = async ({
  params,
}: Props) => {

  const resolvedParams = await params;
  const lessonNewId = parseInt(resolvedParams.lessonId, 10);
  
  const lessonData = getLesson(lessonNewId);
  const userProgressData = getUserProgress();
  const userSubscriptionData = await getUserSubscription();


  const [
    lesson,
    userProgress,
    userSubscription,
  ] = await Promise.all([
    lessonData,
    userProgressData,
    userSubscriptionData,
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

export default LessonIdPage;