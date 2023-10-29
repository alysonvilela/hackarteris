import React from 'react';

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog';

type DialogProps = typeof AlertDialog;

interface ModalProps extends DialogProps {
  children: React.ReactNode | string;
  openModalComponent?: React.ReactNode;
}

export const Modal = ({ ...props }: ModalProps) => {
  return (
    <AlertDialog {...props}>
      {props.openModalComponent || <AlertDialogTrigger>Abrir</AlertDialogTrigger>}
      <AlertDialogContent>
        <AlertDialogHeader>{props.children}</AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction>Continue</AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};
