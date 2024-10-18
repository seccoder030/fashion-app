import React, { ReactNode } from 'react';
import useBackHandler from '@/hooks/useBackHander';

interface BackHandlerProviderProps {
  children: ReactNode;
}

const BackHandlerProvider: React.FC<BackHandlerProviderProps> = ({ children }) => {
    useBackHandler();
  return <>{children}</>;
};

export default BackHandlerProvider;