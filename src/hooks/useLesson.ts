import { useState, useEffect } from 'react';
import { lessons, LessonData } from '../data/lessons';

export function useLesson(lessonId: string) {
  const [lesson, setLesson] = useState<LessonData | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // Simulate an async fetch from Supabase
    setLoading(true);
    setError(null);
    
    const fetchLesson = async () => {
      try {
        // In the future, replace this timeout with:
        // const { data, error } = await supabase.from('lessons').select('*').eq('id', lessonId).single();
        await new Promise(resolve => setTimeout(resolve, 500)); // Simulate network delay
        
        const data = lessons[lessonId];
        
        if (data) {
          setLesson(data);
        } else {
          setError('Lesson not found');
        }
      } catch (err) {
        setError('Failed to fetch lesson');
      } finally {
        setLoading(false);
      }
    };

    fetchLesson();
  }, [lessonId]);

  return { lesson, loading, error };
}
