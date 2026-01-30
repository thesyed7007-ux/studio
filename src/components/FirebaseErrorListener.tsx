'use client';

import { useEffect } from 'react';
import { errorEmitter } from '@/firebase/error-emitter';
import { useToast } from '@/hooks/use-toast';
import { FirestorePermissionError } from '@/firebase/errors';

export default function FirebaseErrorListener() {
  const { toast } = useToast();

  useEffect(() => {
    const handlePermissionError = (error: Error) => {
      if (process.env.NODE_ENV === 'development') {
        console.error(error);

        // This creates an uncaught exception in development to surface the error
        // in the Next.js overlay.
        if (error instanceof FirestorePermissionError) {
             throw error;
        }
      }
      
      toast({
        variant: 'destructive',
        title: 'Error: Insufficient Permissions',
        description:
          'You do not have permission to perform this action. Check Firestore security rules.',
      });
    };

    errorEmitter.on('permission-error', handlePermissionError);

  }, [toast]);

  return null;
}
