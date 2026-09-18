import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { Link, useNavigate } from 'react-router-dom';

import { useCreateServiceRequest } from '../hooks/useCreateServiceRequest';
import {
  createRequestSchema,
  type CreateRequestFormData,
} from '../schemas/requestSchema';

export function NewRequestPage() {
  const navigate = useNavigate();

  const createMutation =
    useCreateServiceRequest();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<CreateRequestFormData>({
    resolver: zodResolver(createRequestSchema),

    defaultValues: {
      title: '',
      description: '',
      category: '',
      priority: 'MEDIUM',
      requesterName: '',
      requesterEmail: '',
    },
  });

  const onSubmit = (
    data: CreateRequestFormData,
  ) => {
    createMutation.mutate(data, {
      onSuccess: (createdRequest) => {
        navigate(
          `/requests/${createdRequest.id}`,
        );
      },
    });
  };

  return (
    <main>
      <Link to="/requests">
        ← Back to requests
      </Link>

      <h1>Create Service Request</h1>

      <form onSubmit={handleSubmit(onSubmit)}>
        <div>
          <label htmlFor="title">
            Title
          </label>

          <input
            id="title"
            type="text"
            {...register('title')}
          />

          {errors.title && (
            <p role="alert">
              {errors.title.message}
            </p>
          )}
        </div>

        <div>
          <label htmlFor="description">
            Description
          </label>

          <textarea
            id="description"
            rows={6}
            {...register('description')}
          />

          {errors.description && (
            <p role="alert">
              {errors.description.message}
            </p>
          )}
        </div>

        <div>
          <label htmlFor="category">
            Category
          </label>

          <input
            id="category"
            type="text"
            {...register('category')}
          />

          {errors.category && (
            <p role="alert">
              {errors.category.message}
            </p>
          )}
        </div>

        <div>
          <label htmlFor="priority">
            Priority
          </label>

          <select
            id="priority"
            {...register('priority')}
          >
            <option value="LOW">Low</option>
            <option value="MEDIUM">
              Medium
            </option>
            <option value="HIGH">High</option>
            <option value="CRITICAL">
              Critical
            </option>
          </select>

          {errors.priority && (
            <p role="alert">
              {errors.priority.message}
            </p>
          )}
        </div>

        <div>
          <label htmlFor="requesterName">
            Requester name
          </label>

          <input
            id="requesterName"
            type="text"
            {...register('requesterName')}
          />

          {errors.requesterName && (
            <p role="alert">
              {errors.requesterName.message}
            </p>
          )}
        </div>

        <div>
          <label htmlFor="requesterEmail">
            Requester email
          </label>

          <input
            id="requesterEmail"
            type="email"
            {...register('requesterEmail')}
          />

          {errors.requesterEmail && (
            <p role="alert">
              {errors.requesterEmail.message}
            </p>
          )}
        </div>

        {createMutation.isError && (
          <div role="alert">
            <p>
              Unable to create service request.
            </p>

            <p>
              {createMutation.error instanceof Error
                ? createMutation.error.message
                : 'An unexpected error occurred.'}
            </p>
          </div>
        )}

        <button
          type="submit"
          disabled={createMutation.isPending}
        >
          {createMutation.isPending
            ? 'Creating...'
            : 'Create request'}
        </button>
      </form>
    </main>
  );
}