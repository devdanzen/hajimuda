'use client';

import * as React from 'react';
import { useRouter } from 'next/navigation';
import useNotifications from '@/hooks/dashboard/useNotifications/useNotifications';
import {
  createOne as createUser,
  validate as validateUser,
  type User,
} from '@/data/dashboard/users';
import UserForm, { type FormFieldValue, type UserFormState } from './UserForm';
import PageContainer from '../PageContainer';

const INITIAL_FORM_VALUES: Partial<UserFormState['values']> = {
  role: 'Market',
  isFullTime: true,
};

export default function UserCreate() {
  const router = useRouter();

  const notifications = useNotifications();

  const [formState, setFormState] = React.useState<UserFormState>(() => ({
    values: INITIAL_FORM_VALUES,
    errors: {},
  }));
  const formValues = formState.values;
  const formErrors = formState.errors;

  const setFormValues = React.useCallback((newFormValues: Partial<UserFormState['values']>) => {
    setFormState((previousState) => ({
      ...previousState,
      values: newFormValues,
    }));
  }, []);

  const setFormErrors = React.useCallback((newFormErrors: Partial<UserFormState['errors']>) => {
    setFormState((previousState) => ({
      ...previousState,
      errors: newFormErrors,
    }));
  }, []);

  const handleFormFieldChange = React.useCallback(
    (name: keyof UserFormState['values'], value: FormFieldValue) => {
      const validateField = async (values: Partial<UserFormState['values']>) => {
        const { issues } = validateUser(values);
        setFormErrors({
          ...formErrors,
          [name]: issues?.find((issue) => issue.path?.[0] === name)?.message,
        });
      };

      const newFormValues = { ...formValues, [name]: value };

      setFormValues(newFormValues);
      validateField(newFormValues);
    },
    [formValues, formErrors, setFormErrors, setFormValues]
  );

  const handleFormReset = React.useCallback(() => {
    setFormValues(INITIAL_FORM_VALUES);
  }, [setFormValues]);

  const handleFormSubmit = React.useCallback(async () => {
    const { issues } = validateUser(formValues);
    if (issues && issues.length > 0) {
      setFormErrors(Object.fromEntries(issues.map((issue) => [issue.path?.[0], issue.message])));
      return;
    }
    setFormErrors({});

    try {
      await createUser(formValues as Omit<User, 'id'>);
      notifications.show('User created successfully.', {
        severity: 'success',
        autoHideDuration: 3000,
      });

      router.push('/dashboard/users');
    } catch (createError) {
      notifications.show(`Failed to create user. Reason: ${(createError as Error).message}`, {
        severity: 'error',
        autoHideDuration: 3000,
      });
      throw createError;
    }
  }, [formValues, router, notifications, setFormErrors]);

  return (
    <PageContainer
      title="New User"
      breadcrumbs={[{ title: 'Users', path: '/dashboard/users' }, { title: 'New' }]}
    >
      <UserForm
        formState={formState}
        onFieldChange={handleFormFieldChange}
        onSubmit={handleFormSubmit}
        onReset={handleFormReset}
        submitButtonLabel="Create"
      />
    </PageContainer>
  );
}
