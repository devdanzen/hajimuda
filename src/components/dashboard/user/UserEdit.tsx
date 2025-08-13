'use client';

import * as React from 'react';
import Alert from '@mui/material/Alert';
import Box from '@mui/material/Box';
import CircularProgress from '@mui/material/CircularProgress';
import { useRouter } from 'next/navigation';
import useNotifications from '@/hooks/dashboard/useNotifications/useNotifications';
import {
  getOne as getUser,
  updateOne as updateUser,
  validate as validateUser,
  type User,
} from '@/data/dashboard/users';
import UserForm, { type FormFieldValue, type UserFormState } from './UserForm';
import PageContainer from '../PageContainer';

function UserEditForm({
  initialValues,
  onSubmit,
  userId,
}: {
  initialValues: Partial<UserFormState['values']>;
  onSubmit: (formValues: Partial<UserFormState['values']>) => Promise<void>;
  userId: number;
}) {
  const router = useRouter();

  const notifications = useNotifications();

  const [formState, setFormState] = React.useState<UserFormState>(() => ({
    values: initialValues,
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
    setFormValues(initialValues);
  }, [initialValues, setFormValues]);

  const handleFormSubmit = React.useCallback(async () => {
    const { issues } = validateUser(formValues);
    if (issues && issues.length > 0) {
      setFormErrors(Object.fromEntries(issues.map((issue) => [issue.path?.[0], issue.message])));
      return;
    }
    setFormErrors({});

    try {
      await onSubmit(formValues);
      notifications.show('User edited successfully.', {
        severity: 'success',
        autoHideDuration: 3000,
      });

      router.push('/dashboard/users');
    } catch (editError) {
      notifications.show(`Failed to edit user. Reason: ${(editError as Error).message}`, {
        severity: 'error',
        autoHideDuration: 3000,
      });
      throw editError;
    }
  }, [formValues, router, notifications, onSubmit, setFormErrors]);

  return (
    <UserForm
      formState={formState}
      onFieldChange={handleFormFieldChange}
      onSubmit={handleFormSubmit}
      onReset={handleFormReset}
      submitButtonLabel="Save"
      backButtonPath={`/dashboard/users/${userId}`}
    />
  );
}

export default function UserEdit({ userId }: { userId: number }) {
  const [user, setUser] = React.useState<User | null>(null);
  const [isLoading, setIsLoading] = React.useState(true);
  const [error, setError] = React.useState<Error | null>(null);

  const loadData = React.useCallback(async () => {
    setError(null);
    setIsLoading(true);

    try {
      const showData = await getUser(Number(userId));

      setUser(showData);
    } catch (showDataError) {
      setError(showDataError as Error);
    }
    setIsLoading(false);
  }, [userId]);

  React.useEffect(() => {
    loadData();
  }, [loadData]);

  const handleSubmit = React.useCallback(
    async (formValues: Partial<UserFormState['values']>) => {
      const updatedData = await updateUser(Number(userId), formValues);
      setUser(updatedData);
    },
    [userId]
  );

  const renderEdit = React.useMemo(() => {
    if (isLoading) {
      return (
        <Box
          sx={{
            flex: 1,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            width: '100%',
            m: 1,
          }}
        >
          <CircularProgress />
        </Box>
      );
    }
    if (error) {
      return (
        <Box sx={{ flexGrow: 1 }}>
          <Alert severity="error">{error.message}</Alert>
        </Box>
      );
    }

    return user ? (
      <UserEditForm initialValues={user} onSubmit={handleSubmit} userId={userId} />
    ) : null;
  }, [isLoading, error, user, handleSubmit, userId]);

  return (
    <PageContainer
      title={`Edit User ${userId}`}
      breadcrumbs={[
        { title: 'Users', path: '/dashboard/users' },
        { title: `User ${userId}`, path: `/dashboard/users/${userId}` },
        { title: 'Edit' },
      ]}
    >
      <Box sx={{ display: 'flex', flex: 1 }}>{renderEdit}</Box>
    </PageContainer>
  );
}
